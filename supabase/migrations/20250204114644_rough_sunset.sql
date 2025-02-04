/*
  # Add Customer department

  1. Changes
    - Update department_owner check constraint to include 'Customer' department
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
      'Finance',
      'HR',
      'IT',
      'Marketing',
      'Sales',
      'Operations',
      'Legal',
      'Research',
      'Development',
      'Customer'
    ));
END $$;