import React, { useState } from 'react';
import { fetchTemp } from '../../custom-hooks/FetchData';
import Button from "@mui/material/Button";

function RiverTemp({ river_name, onFetchTemp }: { river_name: string, onFetchTemp: (message: string) => void }) {
  const [ TempData, setTempData ] = useState(null);
  const [ TempMessage, setTempMessage ] = useState('');

  const handleButtonClick = () => {
    fetchTemp(river_name)
      .then(data => {
        // ...
        onFetchTemp(`Current Temperature: ${data.temp} F`);
      });
  };
  
  return (
    <>
      <Button
        onClick={handleButtonClick}
        variant='contained'
        className='flex place-items-center'
      >
        Get Temp
      </Button>
      {TempMessage && (
        <div className='modal'>
          <div className='modal-content'>
            <h2 className='p-3 bg-blue-500 m-3 rounded text-white'>
              <pre>{TempMessage}</pre>
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default RiverTemp;
