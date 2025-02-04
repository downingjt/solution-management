/*
  # Make target license cost a calculated field

  1. Changes
    - Add function to calculate target license cost (10% of base cost)
    - Modify solutions table to make target_license_cost computed
    - Remove target_license_cost column and add it back as a computed column

  Note: The percentage (10%) is hardcoded in the function for immutability.
  To change this value in the future, the function will need to be updated.
*/

-- Add function to calculate target license cost
CREATE OR REPLACE FUNCTION calculate_target_license_cost(base_cost decimal)
RETURNS decimal AS $$
BEGIN
    -- Hardcoded 10% for immutability
    RETURN ROUND((base_cost * 0.10)::decimal, 2);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Modify solutions table to use computed column
ALTER TABLE solutions DROP COLUMN target_license_cost;
ALTER TABLE solutions ADD COLUMN target_license_cost decimal(10,2) 
    GENERATED ALWAYS AS (calculate_target_license_cost(base_cost)) STORED;