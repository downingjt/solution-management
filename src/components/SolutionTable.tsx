import React, { useState } from 'react';
import { Solution } from '../types/solution';
import { Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

interface SolutionTableProps {
  solutions: Solution[];
  onEdit: (solution: Solution) => void;
  onDelete: (id: string) => void;
}

type SortField = keyof Solution;
type SortDirection = 'asc' | 'desc';

export function SolutionTable({ solutions, onEdit, onDelete }: SolutionTableProps) {
  const [sortField, setSortField] = useState<SortField>('solution_name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSolutions = [...solutions].sort((a, b) => {
    let comparison = 0;
    if (typeof a[sortField] === 'string' && typeof b[sortField] === 'string') {
      comparison = (a[sortField] as string).localeCompare(b[sortField] as string);
    } else if (typeof a[sortField] === 'number' && typeof b[sortField] === 'number') {
      comparison = (a[sortField] as number) - (b[sortField] as number);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const renderSortableHeader = (field: SortField, label: string) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700/50"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <SortIcon field={field} />
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-dark-lighter">
          <tr>
            {renderSortableHeader('solution_name', 'Solution Name')}
            {renderSortableHeader('department_owner', 'Department')}
            {renderSortableHeader('digital_team_owner', 'Digital Team')}
            {renderSortableHeader('year_created', 'Year')}
            {renderSortableHeader('health_score_category', 'Health')}
            {renderSortableHeader('manual_management_cost', 'Management Cost')}
            {renderSortableHeader('base_cost', 'Base Cost')}
            {renderSortableHeader('target_license_cost', 'License Cost')}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {sortedSolutions.map((solution) => (
            <tr key={solution.id} className="hover:bg-gray-800/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">{solution.solution_name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{solution.department_owner}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{solution.digital_team_owner}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{solution.year_created}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  solution.health_score_category === 'Critical' ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'
                }`}>
                  {solution.health_score_category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">£{solution.manual_management_cost.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">£{solution.base_cost.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">£{solution.target_license_cost.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(solution)}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(solution.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}