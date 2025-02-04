export interface Solution {
  id: string;
  solution_name: string;
  department_owner: string;
  digital_team_owner: string;
  year_created: number;
  health_score_category: string;
  manual_management_cost: number;
  base_cost: number;
  target_license_cost: number;
  created_at: string;
  updated_at: string;
}

export const HEALTH_CATEGORIES = ['Critical', 'Average', 'Healthy'] as const;
export type HealthCategory = typeof HEALTH_CATEGORIES[number];

export const DEPARTMENTS = [
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
] as const;
export type Department = typeof DEPARTMENTS[number];

export const DIGITAL_TEAMS = ['Engineering', 'BI', 'Power Platform', 'Insights'] as const;
export type DigitalTeam = typeof DIGITAL_TEAMS[number];