import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Map } from 'lucide-react';
import { CAFE_DATA } from '../data/cafes.js';
import { CITIES } from '../data/cities.js';
import type { City } from '../types/city.js';
import type { Cafe } from '../types/cafe.js';

const CityList: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const navigate = useNavigate();

  const currentCity = CITIES.find((c: City) => c.id === cityId);
  const cityCafes = CAFE_DATA.filter(
    (cafe: Cafe) => cafe.city === currentCity?.name
  );

  if (!currentCity) return <div>城市不存在</div>;

  return (
    <div className='relative h-full bg-coffee-bg-light flex flex-col'>
      <div className='flex-none sticky top-0 z-30 bg-coffee-bg-light/80 backdrop-blur-md px-6 py-4 flex items-center justify-between'>
        <button
          onClick={() => navigate(-1)}
          className='p-2 -ml-2 text-coffee-dark'
        >
          <ChevronLeft size={28} />
        </button>
        <h1 className='text-xl font-bold text-coffee-dark'>
          {currentCity.name}
        </h1>
        <button
          onClick={() =>
            navigate('/map', {
              state: { center: currentCity.center, cityName: currentCity.name },
            })
          }
          className='text-coffee-green p-2'
        >
          <Map size={24} />
        </button>
      </div>

      <div className='flex-1 overflow-y-auto px-6 pt-4'>
        <p className='text-coffee-medium mb-6'>
          共找到 {cityCafes.length} 間咖啡廳
        </p>
        <div className='flex flex-col gap-6'>
          {cityCafes.map((cafe) => (
            <div
              key={cafe.id}
              className='bg-coffee-card-light rounded-2xl shadow-soft overflow-hidden active:scale-[0.98] transition-all'
            >
              <img
                src={cafe.image}
                className='w-full h-40 object-cover'
                alt={cafe.name}
              />
              <div className='p-4'>
                <h3 className='text-lg font-bold text-coffee-dark'>
                  {cafe.name}
                </h3>
                <p className='text-sm text-coffee-medium mt-1'>
                  {cafe.district}
                </p>
                <div className='flex gap-2 mt-3'>
                  {cafe.tags.map((tag) => (
                    <span
                      key={tag}
                      className='bg-accent-green text-coffee-green px-2 py-1 rounded-md text-[10px] font-bold'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityList;
