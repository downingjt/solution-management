import React, { useState } from 'react';
import { Solution, HEALTH_CATEGORIES, DEPARTMENTS, DIGITAL_TEAMS } from '../types/solution';

interface SolutionFormProps {
  solution?: Solution;
  onSubmit: (data: Partial<Solution>) => void;
  onCancel: () => void;
}

export function SolutionForm({ solution, onSubmit, onCancel }: SolutionFormProps) {
  const [baseCost, setBaseCost] = useState<number>(solution?.base_cost || 0);
  const targetLicenseCost = Number((baseCost * 0.1).toFixed(2));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      solution_name: formData.get('solution_name') as string,
      department_owner: formData.get('department_owner') as string,
      digital_team_owner: formData.get('digital_team_owner') as string,
      year_created: parseInt(formData.get('year_created') as string),
      health_score_category: formData.get('health_score_category') as string,
      manual_management_cost: parseFloat(formData.get('manual_management_cost') as string),
      base_cost: parseFloat(formData.get('base_cost') as string),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="solution_name" className="block text-sm font-medium text-gray-300">
            Solution Name
          </label>
          <input
            type="text"
            name="solution_name"
            id="solution_name"
            defaultValue={solution?.solution_name}
            required
            className="mt-1 input-field block w-full"
          />
        </div>

        <div>
          <label htmlFor="department_owner" className="block text-sm font-medium text-gray-300">
            Department Owner
          </label>
          <select
            name="department_owner"
            id="department_owner"
            defaultValue={solution?.department_owner}
            required
            className="mt-1 input-field block w-full"
          >
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="digital_team_owner" className="block text-sm font-medium text-gray-300">
            Digital Team Owner
          </label>
          <select
            name="digital_team_owner"
            id="digital_team_owner"
            defaultValue={solution?.digital_team_owner}
            required
            className="mt-1 input-field block w-full"
          >
            {DIGITAL_TEAMS.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="year_created" className="block text-sm font-medium text-gray-300">
            Year Created
          </label>
          <input
            type="number"
            name="year_created"
            id="year_created"
            defaultValue={solution?.year_created}
            required
            min="2000"
            max={new Date().getFullYear()}
            className="mt-1 input-field block w-full"
          />
        </div>

        <div>
          <label htmlFor="health_score_category" className="block text-sm font-medium text-gray-300">
            Health Score Category
          </label>
          <select
            name="health_score_category"
            id="health_score_category"
            defaultValue={solution?.health_score_category}
            required
            className="mt-1 input-field block w-full"
          >
            {HEALTH_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="manual_management_cost" className="block text-sm font-medium text-gray-300">
            Manual Management Cost (£)
          </label>
          <input
            type="number"
            name="manual_management_cost"
            id="manual_management_cost"
            defaultValue={solution?.manual_management_cost}
            required
            min="0"
            step="0.01"
            className="mt-1 input-field block w-full"
          />
        </div>

        <div>
          <label htmlFor="base_cost" className="block text-sm font-medium text-gray-300">
            Base Cost (£)
          </label>
          <input
            type="number"
            name="base_cost"
            id="base_cost"
            value={baseCost}
            onChange={(e) => setBaseCost(Number(e.target.value))}
            required
            min="0"
            step="0.01"
            className="mt-1 input-field block w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">
            Target License Cost (£)
          </label>
          <div className="mt-1 block w-full py-2 px-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300">
            £{targetLicenseCost.toLocaleString()}
          </div>
          <p className="mt-1 text-sm text-gray-400">
            Automatically calculated as 10% of base cost
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary"
        >
          {solution ? 'Update' : 'Create'} Solution
        </button>
      </div>
    </form>
  );
}