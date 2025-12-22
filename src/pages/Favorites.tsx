import React from 'react';
import { useFavorites } from '../context/FavoriteContext.js';
import { CAFE_DATA } from '../data/cafes.js';
import { Heart, Coffee } from 'lucide-react';

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteCafes = CAFE_DATA.filter((cafe) => favorites.includes(cafe.id));

  return (
    <div className='flex flex-col relative h-full bg-coffee-bg-light px-6 pt-10'>
      <header className='flex-none sticky mb-8'>
        <h1 className='text-3xl font-bold text-coffee-dark tracking-tight'>
          我的收藏
        </h1>
        <p className='text-coffee-medium mt-2'>儲存你最愛的口袋名單</p>
      </header>
      <div className='flex-1 overflow-y-auto pt-4'>
        {favoriteCafes.length > 0 ? (
          <div className='flex flex-col gap-6'>
            {favoriteCafes.map((cafe) => (
              <div
                key={cafe.id}
                className='bg-white rounded-2xl shadow-soft overflow-hidden relative'
              >
                <img
                  src={cafe.image}
                  className='w-full h-32 object-cover'
                  alt=''
                />
                <button
                  onClick={() => toggleFavorite(cafe.id)}
                  className='absolute top-3 right-3 p-2 bg-white/90 rounded-full text-red-500 shadow-sm'
                >
                  <Heart size={18} fill='currentColor' />
                </button>
                <div className='p-4'>
                  <h3 className='font-bold text-coffee-dark'>{cafe.name}</h3>
                  <p className='text-xs text-coffee-medium mt-1'>
                    {cafe.city} · {cafe.district}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center pt-20 text-gray-300'>
            <Coffee size={64} strokeWidth={1} />
            <p className='mt-4 text-sm'>目前還沒有收藏任何咖啡廳喔</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
