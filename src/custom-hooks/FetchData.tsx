import { useEffect, useState } from 'react';
import { getFishingLocations } from '../api/fishingLocationAPI';

interface FishingLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  user_id: string;
}

// fetches fishing location data using a user ID and token, 
// sets the fetched data in the component state, 
// and provides the fetched data and a function to refetch the data as the return values of the hook
export const useGetData = (userId: string, token: string) => {
  const [fishingLocations, setFishingLocations] = useState<FishingLocation[]>([]);

  async function handleDataFetch() {
    const result = await getFishingLocations(userId, token);
    setFishingLocations(result);
  }

  useEffect(() => {
    handleDataFetch();
  }, []);

  return { fishingLocations, getData: handleDataFetch };
};


// fetches user data from a server using a token and user ID, and returns the fetched data
export const fetchUserData = async (token: string, userId: string) => {
  try {
    const response = await fetch(`https://scoutfortrout-flask.onrender.com/auth/userdata/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export const fetchCFS = async (river_name: string) => {
  try {
    const response = await fetch(`https://scoutfortrout-flask.onrender.com/api/cfs/${river_name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  } catch (error) {
    console.error(error)
  }
}

export const fetchTemp = async (river_name: string) => {
  try {
    const response = await fetch(`https://scoutfortrout-flask.onrender.com/api/temp/${river_name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  } catch (error) {
    console.error(error)
  }
}


