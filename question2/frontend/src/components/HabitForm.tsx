'use client';

import { useState } from 'react';
import { createHabit } from '../lib/api';

interface HabitFormProps {
  onHabitCreated: () => void;
}

export default function HabitForm({ onHabitCreated }: HabitFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Habit name is required');
      return;
    }

    setLoading(true);
    try {
      await createHabit(name.trim(), description.trim());
      setName('');
      setDescription('');
      onHabitCreated();
    } catch (err: any) {
      setError(err.message || 'Failed to create habit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1rem' }}>Add New Habit</h2>
      
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label className="label" htmlFor="habit-name">
            Habit Name *
          </label>
          <input
            id="habit-name"
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Drink 8 glasses of water"
            required
          />
        </div>

        <div>
          <label className="label" htmlFor="habit-description">
            Description (optional)
          </label>
          <textarea
            id="habit-description"
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description for this habit"
            rows={3}
            style={{ resize: 'vertical' }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Add Habit'}
        </button>
      </form>
    </div>
  );
}

