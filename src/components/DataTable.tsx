import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { getFishingLocations, deleteFishingLocation, FishingLocation } from '../api/fishingLocationAPI';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'latitude', headerName: 'Latitude', width: 100 },
  { field: 'longitude', headerName: 'Longitude', width: 100 },
];

const DataTable = () => {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<FishingLocation | null>(null);
  const [data, setData] = useState<FishingLocation[] | null>(null);
  const [mapUrl, setMapUrl] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getData = async () => {
    try {
      const userId = localStorage.getItem('backendUserId');
      const token = localStorage.getItem('backendUserToken');

      if (!userId || !token) {
        throw new Error('User ID or token not found in local storage');
      }

      const fetchedData = await getFishingLocations(userId, token);
      if (fetchedData) {
        console.log(fetchedData);
        setData(fetchedData);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (locationId: string) => {
    try {
      const userId = localStorage.getItem('backendUserId');
      const token = localStorage.getItem('backendUserToken');

      if (!userId || !token) {
        throw new Error('User ID or token not found in local storage');
      }

      const deletedLocation = await deleteFishingLocation(locationId, userId, token);
      console.log('Fishing location deleted:', deletedLocation);
      getData();
    } catch (error) {
      console.error('Failed to delete fishing location:', (error as Error).message);
    }
  };

  const handleSendLocation = () => {
    if (selectedLocation) {
      const { latitude, longitude } = selectedLocation;
      const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      setMapUrl(mapUrl);
      navigator.clipboard.writeText(mapUrl);
      setConfirmationMessage('Google Maps Link copied!\nPaste into browser or Google Maps App.');

      setTimeout(() => {
        setConfirmationMessage('');
      }, 8000);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} getData={getData} selectedLocation={selectedLocation} />
        <div className="flex flex-row justify-center w-full">
          <div className="flex">
            <button
              className="p-3 m-3 bg-slate-300 rounded hover:bg-slate-800 hover:text-white"
              onClick={() => handleOpen()}
            >
              Add Fishing Location
            </button>
          </div>
          <div className="flex">
            <button
              className="p-3 m-3 bg-slate-300 rounded hover:bg-slate-800 hover:text-white"
              onClick={() => handleOpen()}
              disabled={!selectedLocation}
            >
              Update
            </button>
          </div>
          <div className="flex">
            <button
              onClick={() => selectedLocation && deleteData(selectedLocation.id)}
              disabled={!selectedLocation}
              className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white"
            >
              Delete
            </button>
          </div>
          <div className="flex">
            <button
              onClick={handleSendLocation}
              disabled={!selectedLocation}
              className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white"
            >
              Get Map Link
            </button>
          </div>
        </div>
        {confirmationMessage && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="p-3 bg-green-800 m-3 rounded text-white">
                <pre>{confirmationMessage}</pre>
            </h2>
          </div>
        </div>
      )}
      <div
        className={
          open ? "hidden" : "container mx-10 my-5 flex flex-col"
        }
        style={{ height: 400, width: "600px", minWidth: '500px' }}  
      >
        <h2 className='p-3 bg-slate-400 my-2 rounded'>Fishing Locations</h2>
          <DataGrid
          className='bg-opacity-100 bg-slate-200'
          rows={data || []}
          columns={columns}
          pageSizeOptions={[5, 100]}
          checkboxSelection={true}
          onRowSelectionModelChange={(newSelectionModel) => {
            const selectedRow = data?.find(row => row.id === newSelectionModel[0]) || null;
            setSelectedLocation(selectedRow);
          }}
          getRowId={(row) => row.id}
          autoHeight
                />
      </div>
    </>
  );
};

export default DataTable;
