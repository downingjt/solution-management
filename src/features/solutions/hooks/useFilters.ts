import { useState, useEffect } from 'react';
import { Solution } from '../../../types/solution';

interface Filters {
  department: string;
  digitalTeam: string;
  health: string;
}

export function useFilters(solutions: Solution[]) {
  const [filters, setFilters] = useState<Filters>({
    department: '',
    digitalTeam: '',
    health: ''
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>(solutions);

  useEffect(() => {
    let filtered = [...solutions];
    
    if (filters.department) {
      filtered = filtered.filter(s => s.department_owner === filters.department);
    }
    if (filters.digitalTeam) {
      filtered = filtered.filter(s => s.digital_team_owner === filters.digitalTeam);
    }
    if (filters.health) {
      filtered = filtered.filter(s => s.health_score_category === filters.health);
    }
    
    setFilteredSolutions(filtered);
  }, [solutions, filters]);

  return {
    filters,
    setFilters,
    isFilterOpen,
    setIsFilterOpen,
    filteredSolutions
  };
}