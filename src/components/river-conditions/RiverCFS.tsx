import React, { useState } from 'react';
import { fetchCFS } from '../../custom-hooks/FetchData';
import Button from "@mui/material/Button";

function RiverCFS({ river_name, onFetchCfs }: { river_name: string, onFetchCfs: (message: string) => void }) {
  const [ cfsData, setCfsData ] = useState(null);
  const [ cfsMessage, setCfsMessage ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const handleButtonClick = () => {
    setIsLoading(true);
    fetchCFS(river_name)
      .then(data => {
        setIsLoading(false);
        // ...
        onFetchCfs(`Current CFS: ${data.cfs}`);
      })
      .catch(error => {
        setIsLoading(false);
        console.error(error);
      });
  };
  
  return (
    <>
      <Button
        onClick={handleButtonClick}
        variant='contained'
        style={{ marginRight: '0.5rem' }}
      >
        Get CFS
      </Button>
      {isLoading && (
        <p>Loading...</p>
      )}
      {cfsMessage && (
        <div className='modal'>
          <div className='modal-content'>
            <h2 className='p-3 bg-blue-500 m-3 rounded text-white'>
              <pre>{cfsMessage}</pre>
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default RiverCFS;
