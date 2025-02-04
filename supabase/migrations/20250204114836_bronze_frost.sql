/*
  # Update departments list safely

  1. Changes
    - Update any existing records to use 'PMO' as department_owner if their current value is not in the new list
    - Add new department_owner check constraint with updated department list
*/

-- First update any existing records to use a valid department
UPDATE solutions 
SET department_owner = 'PMO'
WHERE department_owner NOT IN (
  'PMO',
  'Customer',
  'Sales',
  'Infram',
  'Product',
  'Marketing',
  'Institutional',
  'Investment Ops',
  'Finance',
  'Digital solutions',
  'DFM Ops'
);

-- Then add the constraint
DO $$ 
BEGIN
  -- Drop existing constraint if it exists
  ALTER TABLE solutions DROP CONSTRAINT IF EXISTS solutions_department_owner_check;
  
  -- Add new constraint with updated values
  ALTER TABLE solutions 
    ADD CONSTRAINT solutions_department_owner_check 
    CHECK (department_owner IN (
      'PMO',
      'Customer',
      'Sales',
      'Infram',
      'Product',
      'Marketing',
      'Institutional',
      'Investment Ops',
      'Finance',
      'Digital solutions',
      'DFM Ops'
    ));
END $$;