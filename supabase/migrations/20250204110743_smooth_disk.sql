/*
  # Consolidated Solutions Table Schema

  1. Table Structure
    - Creates solutions table with all required fields
    - Sets up proper timestamps and UUID handling
    
  2. Security
    - Enables Row Level Security (RLS)
    - Sets up policies for authenticated users:
      - Read access
      - Insert access
      - Update access
      - Delete access
*/

-- Create the solutions table if it doesn't exist
CREATE TABLE IF NOT EXISTS solutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  solution_name text NOT NULL,
  department_owner text NOT NULL,
  digital_team_owner text NOT NULL,
  year_created integer NOT NULL,
  health_score_category text NOT NULL,
  manual_management_cost decimal(10,2) NOT NULL,
  base_cost decimal(10,2) NOT NULL,
  target_license_cost decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;

-- Safely handle policies using DO block
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can read all solutions" ON solutions;
  DROP POLICY IF EXISTS "Users can insert solutions" ON solutions;
  DROP POLICY IF EXISTS "Users can update solutions" ON solutions;
  DROP POLICY IF EXISTS "Users can delete solutions" ON solutions;
  DROP POLICY IF EXISTS "Enable read access for authenticated users" ON solutions;
  DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON solutions;
  DROP POLICY IF EXISTS "Enable update access for authenticated users" ON solutions;
  DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON solutions;

  -- Create new policies
  CREATE POLICY "Enable read access for authenticated users"
    ON solutions
    FOR SELECT
    TO authenticated
    USING (true);

  CREATE POLICY "Enable insert access for authenticated users"
    ON solutions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

  CREATE POLICY "Enable update access for authenticated users"
    ON solutions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

  CREATE POLICY "Enable delete access for authenticated users"
    ON solutions
    FOR DELETE
    TO authenticated
    USING (true);
END $$;