import React, {  useEffect, useState } from 'react';
import { Map } from '../../components/index';
import { useMenuContext } from '../../context/MenuContext/MenuContextProvider';

function Home() {

  const { isOpen } = useMenuContext();

  const [searchText, setSearchText] = useState('');

  const [showMap, setShowMap] = useState(() => {
    const storedMapStatus = localStorage.getItem('showmap');
    return storedMapStatus === 'true';
  });

  useEffect( () => {
    localStorage.setItem('showmap', showMap);
  } , [showMap]);

  const handleMarkerClick = () => {
    setShowMap(prev => !prev);
  };

  return (
    <main 
      className="h-max w-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors ease-in duration-200 flex flex-col"
    >
      {/* Location and search box starts here */}
      <section 
        className='flex h-16 sm:h-20 items-center justify-center gap-x-4 my-4 px-2 sm:px-0'
      >
        {/* Location section */}
        <button 
          className='bg-amber-50 dark:bg-white basis-auto flex flex-col h-2/3 items-center justify-center py-1 px-2 rounded-md cursor-pointer shadow-md shadow-gray-500 dark:shadow-none'
          onClick={handleMarkerClick}
        >
          <img 
            className='h-[70%] w-[80%] object-contain'
            src="/images/Marker.png"
            alt="location icon"
          />
        </button>

        {/* Search box */}
        <div 
          className='bg-gray-300 dark:bg-white basis-4/5 h-2/3 rounded-md overflow-hidden inset-0 shadow'
        >
          <input 
            type="text"
            placeholder='Search here....'
            className='h-full w-full text-black outline-none bg-transparent border-none px-5 ubuntu-medium-italic text-base sm:text-lg tracking-wide'
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); }}
          />
        </div>
      </section>
      {/* Location and search box ends here */}

      {/* Map box starts here */}
      {
        !isOpen && showMap && (
          <section className='h-max w-full py-3 px-3'>
            <Map />
          </section>
        )
      }
      {/* Map box ends here */}

      {/* Search results section starts here */}
      <section className='bg-purple-500'>
        Search results
      </section>
      {/* Search results section ends here */}
    </main>
  );
}

export default Home;
