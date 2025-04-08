import { apiRequest } from './queryClient';
import { type InsertBusinessProfile, type BusinessProfile } from '@shared/schema';

// Create a new business profile
export async function createBusinessProfile(profileData: InsertBusinessProfile) {
  try {
    const response = await apiRequest('POST', '/api/profiles', profileData);
    const data = await response.json();
    return data as BusinessProfile;
  } catch (error) {
    console.error('Error creating business profile:', error);
    throw error;
  }
}

// Get business profiles
export async function getBusinessProfiles() {
  try {
    const response = await fetch('/api/profiles');
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const data = await response.json();
    return data as BusinessProfile[];
  } catch (error) {
    console.error('Error fetching business profiles:', error);
    throw error;
  }
}

// Run test claim function
export async function runTestClaim() {
  try {
    const response = await fetch('/api/test');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error running test claim:', error);
    throw error;
  }
}
