import { apiRequest } from './queryClient';

// Get authentication URL
export async function getAuthUrl() {
  try {
    const response = await fetch('/api/auth/url');
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error getting auth URL:', error);
    throw error;
  }
}

// Check authentication status
export async function checkAuthStatus() {
  try {
    const response = await fetch('/api/auth/status');
    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
}

// Log out user
export async function logout() {
  try {
    await apiRequest('POST', '/api/auth/logout', {});
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}
