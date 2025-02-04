import { useState, useEffect } from 'react';
import { Solution } from '../../../types/solution';
import { supabaseClient } from '../../../lib/supabase';

export function useSolutions() {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSolutions();
  }, []); // Fetch on mount

  async function fetchSolutions() {
    if (!supabaseClient) return;
    
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabaseClient
        .from('solutions')
        .select('*')
        .order('solution_name');

      if (fetchError) throw fetchError;
      setSolutions(data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching solutions:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching solutions');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(data: Partial<Solution>) {
    if (!supabaseClient) return;

    try {
      setLoading(true);
      setError(null);

      const { target_license_cost, ...solutionData } = data;

      if (!solutionData.solution_name || !solutionData.department_owner || 
          !solutionData.digital_team_owner || !solutionData.year_created || 
          !solutionData.health_score_category || solutionData.manual_management_cost === undefined || 
          solutionData.base_cost === undefined) {
        throw new Error('All fields are required');
      }

      if ('id' in data) {
        const { error: updateError } = await supabaseClient
          .from('solutions')
          .update({
            ...solutionData,
            updated_at: new Date().toISOString()
          })
          .eq('id', data.id);
        
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabaseClient
          .from('solutions')
          .insert([{
            ...solutionData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);
        
        if (insertError) throw insertError;
      }
      
      await fetchSolutions();
    } catch (err) {
      console.error('Error saving solution:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while saving the solution');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!supabaseClient) return;
    
    if (!confirm('Are you sure you want to delete this solution?')) return;
    
    try {
      setLoading(true);
      const { error: deleteError } = await supabaseClient
        .from('solutions')
        .delete()
        .eq('id', id);
      if (deleteError) throw deleteError;
      await fetchSolutions();
      setError(null);
    } catch (err) {
      console.error('Error deleting solution:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while deleting the solution');
    } finally {
      setLoading(false);
    }
  }

  return {
    solutions,
    loading,
    error,
    fetchSolutions,
    handleSubmit,
    handleDelete
  };
}