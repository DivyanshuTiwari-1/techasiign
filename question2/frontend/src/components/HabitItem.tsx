'use client';

import { useState, useEffect } from 'react';
import { completeHabit, checkHabitStatus } from '../lib/api';

interface Habit {
  _id: string;
  name: string;
  description?: string;
  completions: Array<{ date: string }>;
}

interface HabitItemProps {
  habit: Habit;
  onUpdate: () => void;
}

export default function HabitItem({ habit, onUpdate }: HabitItemProps) {
  const [isCompletedToday, setIsCompletedToday] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    // Check if habit is completed today
    const checkStatus = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const status = await checkHabitStatus(habit._id, today);
        setIsCompletedToday(status.completed);
      } catch (error) {
        console.error('Error checking habit status:', error);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkStatus();
  }, [habit._id]);

  const handleComplete = async () => {
    if (isCompletedToday) return;

    setLoading(true);
    try {
      await completeHabit(habit._id);
      setIsCompletedToday(true);
      onUpdate();
    } catch (error: any) {
      alert(error.message || 'Failed to mark habit as complete');
    } finally {
      setLoading(false);
    }
  };

  if (checkingStatus) {
    return (
      <div className="card">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="card" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      gap: '1rem'
    }}>
      <div style={{ flex: 1 }}>
        <h3 style={{ marginBottom: '0.5rem' }}>{habit.name}</h3>
        {habit.description && (
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            {habit.description}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ 
            fontSize: '1.5rem',
            color: isCompletedToday ? '#28a745' : '#6c757d'
          }}>
            {isCompletedToday ? '✓' : '✗'}
          </span>
          <span style={{ 
            color: isCompletedToday ? '#28a745' : '#6c757d',
            fontWeight: isCompletedToday ? 'bold' : 'normal'
          }}>
            {isCompletedToday ? 'Done today' : 'Not done today'}
          </span>
        </div>
      </div>
      
      <button
        onClick={handleComplete}
        className={`btn ${isCompletedToday ? 'btn-secondary' : 'btn-success'}`}
        disabled={loading || isCompletedToday}
        style={{ minWidth: '120px' }}
      >
        {loading 
          ? 'Processing...' 
          : isCompletedToday 
            ? 'Completed' 
            : 'Mark as Done'}
      </button>
    </div>
  );
}

