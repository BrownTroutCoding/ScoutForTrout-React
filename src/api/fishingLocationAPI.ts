//  fetches, creates, updates and deletes fishing location data using a user ID
// and token for authentication

export interface FishingLocation {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  user_id: string;
}

export interface LocationData {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  user_id: string;
}

// fetch fishing location data from the backend, based on user ID and token.
export async function getFishingLocations(userId: string, token: string): Promise<FishingLocation[]> {
  const response = await fetch(`https://scoutfortrout-flask.onrender.com/api/fishinglocations/${userId}`, 
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from the server.');
  }

  const data = await response.json();
  return data;
}

// creates a new fishing location on the server.
export async function createFishingLocation(locationData: LocationData, userId: string, token: string): Promise<FishingLocation> {
  const response = await fetch(`https://scoutfortrout-flask.onrender.com/api/fishinglocations/${userId}`, 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(locationData),
  });

  if (!response.ok) {
    throw new Error('Failed to create a new fishing location.');
  }

  const data = await response.json();
  return data;
}

// updates an existing fishing location on the server.
export async function updateFishingLocation(locationId: string, locationData: LocationData, userId: string, token: string): Promise<FishingLocation> {
  const response = await fetch(`https://scoutfortrout-flask.onrender.com/api/fishinglocations/${locationId}`, 
  {
    method: 'PUT', // Change this from POST to PUT for updating
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({...locationData, user_id: userId}), // Pass the correct user_id
  });

  if (!response.ok) {
    throw new Error('Failed to update the fishing location.');
  }

  const data = await response.json();
  return data;
}

// deletes a fishing location on the server.
export async function deleteFishingLocation(locationId: string, userId: string, token: string): Promise<FishingLocation> {
  const response = await fetch(`https://scoutfortrout-flask.onrender.com/api/fishinglocations/${locationId}`, 
  {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE',
      'Authorization': `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete fishing location.');
  }

  const data = await response.json();
  return data;
}

