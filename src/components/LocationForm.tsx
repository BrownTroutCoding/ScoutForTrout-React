// LocationForm.tsx
import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { FishingLocation, createFishingLocation, updateFishingLocation } from '../api/fishingLocationAPI';
import { v4 as uuidv4 } from 'uuid';

interface LocationFormProps {
  id?: string;
  data?: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    user_id: string;
  };
  getData: () => void; // Add the getData prop
  onClose: () => void;
  selectedLocation: FishingLocation | null;
}

const containerStyle = {
  width: '400px',
  height: '300px',
};

const defaultCenter = {
  lat: 45.646251,
  lng: -111.523462,
};

const LocationForm: React.FC<LocationFormProps> = ({ selectedLocation, getData, onClose }) => {
  const { handleSubmit, control } = useForm();
  const [selectedLatLng, setSelectedLatlng] = useState<{ lat: number; lng: number }>({
    lat: selectedLocation?.latitude ?? 0,
    lng: selectedLocation?. longitude ?? 0,
  });

  const onSubmit = async (data: any) => {
    data.latitude = selectedLatLng.lat;
    data.longitude = selectedLatLng.lng;
    data.id = uuidv4();
    console.log(data);
  
    try {
      const userId = localStorage.getItem('backendUserId');
      const userToken = localStorage.getItem('backendUserToken');
    
      if (!userId || !userToken) {
        throw new Error('User is not authenticated');
      }
    
      data.user_id = userId;
    
      if (selectedLocation) {
        data.id = selectedLocation.id;
        const responseData = await updateFishingLocation(data.id, data, userId, userToken);
        console.log('Successfully updated:', responseData);
      } else {
        data.id = uuidv4();
        const responseData = await createFishingLocation(data, userId, userToken);
        console.log('Successfully submitted:', responseData);
      }
    
      getData();
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    setSelectedLatlng({ lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 });
  };

  return (
    <div className='flex flex-col items-center'>
      <h2 className='font-semibold text-xl tracking-tight text-gray-600 mb-2'>Add a fishing Location</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-1/2'>
          {/* Form fields */}
          <div className="flex flex-col items-center p-1">
            <Controller
              name="name"
              defaultValue={selectedLocation?.name ?? ""}
              control={control}
              render={({ field }) => <Input {...field} placeholder="name" />}
            />
          </div>
          <div className="flex flex-col items-center p-1">
            <Controller
              name="description"
              defaultValue={selectedLocation?.description ?? ""}
              control={control}
              render={({ field }) => <Input {...field} placeholder="description" />}
            />
          </div>
  
          {/* Map */}
          <div className="flex flex-col items-center p-1 w-full h-auto max-h-screen overflow-auto">
            <label htmlFor="map" className='font-semibold text-xl tracking-tight text-gray-600 mb-2'>Select Location</label>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={selectedLatLng.lat !== 0 && selectedLatLng.lng !== 0 ? selectedLatLng : defaultCenter}
              zoom={8}
              onClick={handleMapClick}
            >
              {selectedLatLng.lat !== 0 && (
                <Marker key={`${selectedLatLng.lat}-${selectedLatLng.lng}`} position={selectedLatLng} />
              )}
            </GoogleMap>
          </div>

  
          {/* Submit button */}
          <div className="flex p-1 mt-2 mb-8">
            <Button
              variant="contained"
              className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  };
  

export default LocationForm;
  