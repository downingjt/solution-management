/*
  # Update departments list

  1. Changes
    - Update department_owner check constraint with new department list
*/

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