import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CITIES } from '../data/cities.js';
import { ChevronRight, Coffee } from 'lucide-react';

const City: React.FC = () => {
  const navigate = useNavigate();

  const handleCitySelect = (cityId: string) => {
    navigate(`/city/${cityId}`);
  };

  return (
    <div className='flex flex-col h-full bg-coffee-bg-light px-6 pt-10'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold text-coffee-dark tracking-tight'>
          選擇城市
        </h1>
        <p className='text-coffee-medium mt-2'>探索不同城市的咖啡香</p>
      </header>

      <div className='flex-1 overflow-y-auto no-scrollbar'>
        <div className='grid grid-cols-1 gap-4'>
          {CITIES.map((city) => (
            <div
              key={city.id}
              onClick={() => handleCitySelect(city.id)}
              className='group relative h-40 w-full rounded-2xl overflow-hidden shadow-soft cursor-pointer active:scale-[0.98] transition-all'
            >
              <img
                src={city.image}
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                alt={city.name}
              />
              <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-transparent' />

              <div className='px-3 py-1 bg-accent-green text-coffee-green rounded-2xl absolute left-4 top-2 flex flex-row justify-center items-center gap-0.5'>
                <Coffee size={20} color='#2e7d32' />
                <span className='text-sm font-bold'>{city.count} Cafes</span>
              </div>
              <div className='absolute inset-y-0 left-6 flex flex-col justify-center text-white'>
                <span className='text-xs font-bold uppercase tracking-widest opacity-80 mb-1'>
                  {city.engName}
                </span>
                <h2 className='text-2xl font-bold'>{city.name}</h2>
              </div>
              <div className='absolute inset-y-0 right-6 flex items-center'>
                <div className='bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white'>
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default City;
