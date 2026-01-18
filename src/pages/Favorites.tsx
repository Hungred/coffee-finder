import React from 'react';
import { useFavorites } from '../context/FavoriteContext.js';
import { Coffee } from 'lucide-react';
import CoffeeCard from '../components/CoffeeCard.js';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className='flex flex-col relative h-full bg-coffee-bg-light px-6 pt-10'>
      <header className='flex-none sticky mb-8'>
        <h1 className='text-3xl font-bold text-coffee-dark tracking-tight'>
          我的收藏
        </h1>
        <p className='text-coffee-medium mt-2'>儲存你最愛的口袋名單</p>
      </header>
      <div className='flex-1 overflow-y-auto pt-4'>
        {favorites.length > 0 ? (
          <div className='flex flex-col gap-6'>
            {favorites.map((cafe) => (
              <CoffeeCard key={cafe.id} cafe={cafe} />
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
