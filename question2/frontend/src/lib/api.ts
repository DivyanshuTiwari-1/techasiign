/**
 * API Client for Habit Tracker
 * Handles all API calls to the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Get authentication token from localStorage
 */
const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

/**
 * Set authentication token in localStorage
 */
const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

/**
 * Remove authentication token from localStorage
 */
const removeToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
  }
};

/**
 * Make authenticated API request
 */
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: headers as HeadersInit,
  });
  
  // If unauthorized, remove token and redirect to login
  if (response.status === 401) {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
  
  return response;
};

/**
 * Sign up a new user
 */
export const signup = async (email: string, password: string) => {
  const response = await apiRequest('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Signup failed');
  }
  
  if (data.token) {
    setToken(data.token);
  }
  
  return data;
};

/**
 * Login user
 */
export const login = async (email: string, password: string) => {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Login failed');
  }
  
  if (data.token) {
    setToken(data.token);
  }
  
  return data;
};

/**
 * Logout user (remove token)
 */
export const logout = (): void => {
  removeToken();
};

/**
 * Get all habits for the current user
 */
export const getHabits = async () => {
  const response = await apiRequest('/habits');
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch habits');
  }
  
  return data;
};

/**
 * Create a new habit
 */
export const createHabit = async (name: string, description?: string) => {
  const response = await apiRequest('/habits', {
    method: 'POST',
    body: JSON.stringify({ name, description }),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create habit');
  }
  
  return data;
};

/**
 * Mark a habit as complete for today
 */
export const completeHabit = async (habitId: string) => {
  const response = await apiRequest(`/habits/${habitId}/complete`, {
    method: 'POST',
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to mark habit as complete');
  }
  
  return data;
};

/**
 * Check if a habit is completed on a given date
 */
export const checkHabitStatus = async (habitId: string, date?: string) => {
  const url = date 
    ? `/habits/${habitId}/status?date=${date}`
    : `/habits/${habitId}/status`;
  
  const response = await apiRequest(url);
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to check habit status');
  }
  
  return data;
};

export { getToken, removeToken };

