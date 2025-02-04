import React from 'react';
import { AuthForm } from './features/auth/components/AuthForm';
import { SolutionTable } from './components/SolutionTable';
import { SolutionForm } from './components/SolutionForm';
import { Filter, LogOut, PlusCircle, AlertCircle } from 'lucide-react';
import { DEPARTMENTS, DIGITAL_TEAMS, HEALTH_CATEGORIES } from './types/solution';
import { useAuth } from './features/auth/hooks/useAuth';
import { useSolutions } from './features/solutions/hooks/useSolutions';
import { useFilters } from './features/solutions/hooks/useFilters';
import { supabaseClient } from './lib/supabase';

function App() {
  const {
    user,
    authLoading,
    error: authError,
    email,
    setEmail,
    password,
    setPassword,
    isSignUp,
    setIsSignUp,
    handleAuth,
    handleSignOut
  } = useAuth();

  const {
    solutions,
    loading,
    error: solutionsError,
    handleSubmit,
    handleDelete
  } = useSolutions();

  const {
    filters,
    setFilters,
    isFilterOpen,
    setIsFilterOpen,
    filteredSolutions
  } = useFilters(solutions);

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingSolution, setEditingSolution] = React.useState(undefined);

  if (!supabaseClient) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="bg-dark-card p-8 rounded-lg shadow-xl">
          <p className="text-red-400">
            Please connect to Supabase using the "Connect to Supabase" button in the top right corner.
          </p>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <AuthForm
          isSignUp={isSignUp}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setIsSignUp={setIsSignUp}
          handleAuth={handleAuth}
          error={authError}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-100">Solutions Management</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="btn-secondary flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
              <span className="text-sm text-gray-400">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="btn-secondary flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </button>
              <button
                onClick={() => {
                  setEditingSolution(undefined);
                  setIsFormOpen(true);
                }}
                className="btn-primary flex items-center"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Add Solution
              </button>
            </div>
          </div>

          {isFilterOpen && (
            <div className="bg-dark-card p-4 rounded-lg shadow-xl mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Department
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                    className="input-field w-full"
                  >
                    <option value="">All Departments</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Digital Team
                  </label>
                  <select
                    value={filters.digitalTeam}
                    onChange={(e) => setFilters(prev => ({ ...prev, digitalTeam: e.target.value }))}
                    className="input-field w-full"
                  >
                    <option value="">All Teams</option>
                    {DIGITAL_TEAMS.map(team => (
                      <option key={team} value={team}>{team}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Health Status
                  </label>
                  <select
                    value={filters.health}
                    onChange={(e) => setFilters(prev => ({ ...prev, health: e.target.value }))}
                    className="input-field w-full"
                  >
                    <option value="">All Statuses</option>
                    {HEALTH_CATEGORIES.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {(authError || solutionsError) && (
            <div className="bg-red-900/50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-300">{authError || solutionsError}</p>
                </div>
              </div>
            </div>
          )}

          {isFormOpen ? (
            <div className="bg-dark-card shadow-xl rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-100 mb-4">
                {editingSolution ? 'Edit Solution' : 'Add New Solution'}
              </h2>
              <SolutionForm
                solution={editingSolution}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingSolution(undefined);
                }}
              />
            </div>
          ) : loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredSolutions.length === 0 ? (
            <div className="bg-dark-card shadow-xl rounded-lg p-8 text-center">
              <p className="text-gray-400">No solutions found. Click the "Add Solution" button to create one.</p>
            </div>
          ) : (
            <div className="bg-dark-card shadow-xl rounded-lg overflow-hidden">
              <SolutionTable
                solutions={filteredSolutions}
                onEdit={(solution) => {
                  setEditingSolution(solution);
                  setIsFormOpen(true);
                }}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App