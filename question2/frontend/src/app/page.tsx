'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { getToken } from '../lib/api';
import HabitList from '../components/HabitList';
import HabitForm from '../components/HabitForm';
import { useState } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Redirect to login if not authenticated
    const token = getToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleHabitCreated = () => {
    // Refresh the habit list
    setRefreshKey(prev => prev + 1);
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #eee'
      }}>
        <h1>Habit Tracker</h1>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <HabitForm key={`form-${refreshKey}`} onHabitCreated={handleHabitCreated} />
      </div>

      <div key={`list-${refreshKey}`}>
        <HabitList />
      </div>
    </div>
  );
}

