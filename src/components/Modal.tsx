import React from 'react';
import LocationForm from './LocationForm';
import { FishingLocation } from '../api/fishingLocationAPI';

interface Props {
  open: boolean;
  onClose: () => void;
  getData: () => void;
  selectedLocation: FishingLocation | null;
}

const Modal: React.FC<Props> = ({ open, onClose, getData, selectedLocation }) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 w-full flex justify-center items-center overflow-y-auto bg-gray-300 bg-opacity-30"
    >
      <div
        className="w-full max-w-xl max-h-4/5 m-5 flex flex-col z-1 bg-white shadow-xl rounded overflow-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex flex-col">
          <div className="flex justify-between p-3">
            <p
              className="bg-slate-300 p-2 rounded hover:bg-slate-800 text-white cursor-pointer"
              onClick={onClose}
            >
              X
            </p>
          </div>
          <div className="p-3">
            <LocationForm getData={getData} onClose={onClose} selectedLocation={selectedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};





export default Modal;
