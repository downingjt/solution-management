/*
  # Add Healthy option to health categories

  1. Changes
    - Add check constraint to ensure health_score_category is one of: 'Critical', 'Average', 'Healthy'
*/

DO $$ 
BEGIN
  -- Drop existing constraint if it exists
  ALTER TABLE solutions DROP CONSTRAINT IF EXISTS solutions_health_score_category_check;
  
  -- Add new constraint with updated values
  ALTER TABLE solutions 
    ADD CONSTRAINT solutions_health_score_category_check 
    CHECK (health_score_category IN ('Critical', 'Average', 'Healthy'));
END $$;