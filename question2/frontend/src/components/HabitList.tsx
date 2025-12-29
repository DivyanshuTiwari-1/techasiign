'use client';

import { useState, useEffect } from 'react';
import { getHabits } from '../lib/api';
import HabitItem from './HabitItem';

interface Habit {
  _id: string;
  name: string;
  description?: string;
  completions: Array<{ date: string }>;
}

export default function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchHabits = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getHabits();
      setHabits(data.habits || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load habits');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div>Loading habits...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="error">{error}</div>
        <button onClick={fetchHabits} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Retry
        </button>
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="card">
        <p style={{ textAlign: 'center', color: '#666' }}>
          No habits yet. Add your first habit below!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Your Habits ({habits.length})</h2>
      {habits.map((habit) => (
        <HabitItem key={habit._id} habit={habit} onUpdate={fetchHabits} />
      ))}
    </div>
  );
}

