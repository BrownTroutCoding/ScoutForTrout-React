import Background from '../assets/images/flyfisherman.jpg';
import gallatinImage from '../assets/images/gallatin.jpg';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { fetchCFS, fetchTemp } from '../custom-hooks/FetchData';
import Button from "@mui/material/Button";
import RiverCFS from '../components/river-conditions/RiverCFS';
import RiverTemp from '../components/river-conditions/RiverTemp';


function Home() {
  const [cfsMessage, setCfsMessage] = useState('');
  const [tempMessage, setTempMessage] = useState('');
  // gallatin useState
  const [gallatinCfsMessage, setGallatinCfsMessage] = useState('');
  const [madisonCfsMessage, setMadisonCfsMessage] = useState('');
  const [madisonTempMessage, setMadisonTempMessage] = useState('');
  const [jeffersonCfsMessage, setJeffersonCfsMessage] = useState('');
  const [jeffersonTempMessage, setJeffersonTempMessage] = useState('');
  const [yellowstoneCfsMessage, setYellowstoneCfsMessage] = useState('');
  const [yellowstoneTempMessage, setYellowstoneTempMessage] = useState('');
  const [missouriCfsMessage, setMissouriCfsMessage] = useState('');
  const [missouriTempMessage, setMissouriTempMessage] = useState('');
  const [shieldsCfsMessage, setShieldsCfsMessage] = useState('');

  return (
    <div
      // background
      style={{ backgroundImage: `url(${Background})` }}
      className="flex justify-center bg-cover bg-fixed"
    >
      {/* header */}
      <div className="flex flex-col items-center min-h-screen mt-5">
        <h2 className="text-center text-2xl my-5 sm:p-5 text-slate-100 rounded-lg border bg-black bg-opacity-70 mb-5">
          Welcome to Scout for Trout
        </h2>
        {/* description */}
        <h2 className="text-center text-2xl my-5 sm:p-5 text-slate-100 rounded-lg border bg-black bg-opacity-70 mb-5">
          Keep track of your favorite fishing locations in your dashboard
        </h2>
        {/* dashboard link */}
        <Link className="mt-5 block items-center mb-40" to="/dashboard">
          <Button variant="contained" className="flex place-items-center mt-4">
            Dashboard
          </Button>
        </Link>


        {/* river conditions div */}

        <h2 className="text-center text-2xl my-5 sm:p-5 text-slate-100 rounded-lg border bg-black bg-opacity-70 mb-5">
              Quick reference river conditions
            </h2>
        <div
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>


          {/* Gallatin River Div */}
            <div className="p-5 sm:p-5 text-slate-200 rounded-lg border bg-black bg-opacity-70">
              <h2 className="text-slate-100 text-lg mb-2 text-center">Gallatin River</h2>
              {/* <img
                className='mb-2'
                src={gallatinImage}
                alt="Gallatin River"
                style={{ width: '200px', height: 'auto' }}
              /> */}
              <RiverCFS river_name='gallatin' onFetchCfs={setGallatinCfsMessage} />

              {gallatinCfsMessage && (
                <div 
                className='modal'
                >
                  <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                      <pre>{gallatinCfsMessage}</pre>
                    </h2>
                  </div>
                </div>
              )}
            </div>

          {/* Madison River Div */}
          <div className="p-5 sm:p-5 text-slate-200 rounded-lg text-4x1 border bg-black bg-opacity-70">
            <h2 className="text-slate-100 text-lg mb-2 text-center">Madison River</h2>
            <RiverCFS river_name='madison' onFetchCfs={setMadisonCfsMessage} />
            <RiverTemp river_name='madison' onFetchTemp={setMadisonTempMessage} />

            {madisonCfsMessage && (
              <div 
              className='modal'
              >
                <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                    <pre>{madisonCfsMessage}</pre>
                  </h2>
                </div>
              </div>
            )}
            {madisonTempMessage && (
              <div
              className='modal'
              >
                <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                    <pre>{madisonTempMessage}</pre>
                  </h2>
                </div>
              </div>
            )}
          </div>

          {/* Jefferson River Div */}
          <div className="p-5 sm:p-5 text-slate-200 rounded-lg text-4x1 border bg-black bg-opacity-70">
            <h2 className="text-slate-100 text-1xl mb-2 text-center ">Jefferson River</h2>
            <RiverCFS river_name='jefferson' onFetchCfs={setJeffersonCfsMessage} />
            <RiverTemp river_name='jefferson' onFetchTemp={setJeffersonTempMessage} />

            {jeffersonCfsMessage && (
              <div 
              className='modal'
              >
                <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                    <pre>{jeffersonCfsMessage}</pre>
                  </h2>
                </div>
              </div>
            )}
            {jeffersonTempMessage && (
              <div
              className='modal'
              >
                <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                    <pre>{jeffersonTempMessage}</pre>
                  </h2>
                </div>
              </div>
            )}
          </div>

          {/* Yellowstone River Div */}
          <div className="p-5 sm:p-5 text-slate-200 rounded-lg text-4x1 border bg-black bg-opacity-70">
            <h2 className="text-slate-100 text-lg mb-2 text-center">Yellowstone River</h2>
            <RiverCFS river_name='yellowstone' onFetchCfs={setYellowstoneCfsMessage} />
            <RiverTemp river_name='yellowstone' onFetchTemp={setYellowstoneTempMessage} />

            {yellowstoneCfsMessage && (
              <div 
              className='modal'
              >
                <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                    <pre>{yellowstoneCfsMessage}</pre>
                  </h2>
                </div>
              </div>
            )}
            {yellowstoneTempMessage && (
              <div
              className='modal'
              >
                <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                    <pre>{yellowstoneTempMessage}</pre>
                  </h2>
                </div>
              </div>
            )}
          </div>

          {/* Missouri River Div */}
          <div className="p-5 sm:p-5 text-slate-200 rounded-lg text-4x1 border bg-black bg-opacity-70">
            <h2 className="text-slate-100 text-lg mb-2 text-center">Missouri River</h2>
            <RiverCFS river_name='missouri' onFetchCfs={setMissouriCfsMessage} />
            <RiverTemp river_name='missouri' onFetchTemp={setMissouriTempMessage} />

            {missouriCfsMessage && (
              <div 
              className='modal'
              >
                <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                    <pre>{missouriCfsMessage}</pre>
                  </h2>
                </div>
              </div>
            )}
            {missouriTempMessage && (
              <div
              className='modal'
              >
                <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                    <pre>{missouriTempMessage}</pre>
                  </h2>
                </div>
              </div>
            )}
          </div>

          {/* shields River Div */}
          <div className="p-5 sm:p-5 text-slate-200 rounded-lg text-4x1 border bg-black bg-opacity-70">
              <h2 className="text-slate-100 text-lg mb-2 text-center">Shields River</h2>
              <RiverCFS river_name='shields' onFetchCfs={setShieldsCfsMessage} />

              {shieldsCfsMessage && (
                <div 
                className='modal'
                >
                  <div 
                  className='modal-content' style={{width: '200px', height: '20px'}}
                  >
                    <h2
                    className='modal-content' style={{width: '200px', height: '20px'}}
                    >
                      <pre>{shieldsCfsMessage}</pre>
                    </h2>
                  </div>
                </div>
              )}
            </div>

          
        </div>
      </div>
    </div>
  )
};

export default Home;



{/* <a
              href="https://fwp.mt.gov/gis/maps/fishingGuide/?llid=1114924459385&type=stream&toggleLayers=%5B%27River%20Mile%20Points%27%5D&"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-100 underline"
            >
              Guide Mapper
            </a> */}
