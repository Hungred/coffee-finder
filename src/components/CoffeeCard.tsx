import React from 'react';
import type { Cafe } from '../types/cafe.js';
import { Heart, MapPin, Star } from 'lucide-react';
import { useFavorites } from '../context/FavoriteContext.js';
import { useNavigate } from 'react-router-dom';

interface CoffeeCardProps {
  cafe: Cafe;
  cardHeight?: string; // 讓外部自訂高度，例如 "h-32" 或 "h-60"
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ cafe, cardHeight = '' }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleCardClick = (cafeId: number) => {
    navigate(`/cafe/${cafeId}`);
  };

  return (
    <div
      key={cafe.id}
      className={`${cardHeight} group bg-coffee-card-light p-4 rounded-card shadow-soft border border-white hover:border-coffee-primary transition-all active:scale-[0.98]`}
      style={{
        backgroundImage: `url('${cafe.image}')`,
      }}
      onClick={() => handleCardClick(cafe.id)}
    >
      <div className='w-fit px-2.5 py-1 rounded-full bg-coffee-bg-light backdrop-blur-md text-xs font-bold text-[#181811] dark:text-white shadow-sm flex items-center gap-1'>
        <Star size={16} color='#f9f506' />
        <span className='text-sm font-medium text-coffee-dark'>
          {cafe.score.toFixed(1)}
        </span>
      </div>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-lg font-bold text-coffee-dark group-hover:text-black transition-colors mb-1'>
            {cafe.name}
          </h3>
          <div className='flex items-center gap-1 text-xs text-coffee-medium font-medium '>
            <MapPin size={12} />
            <span>
              {cafe.city} · {cafe.district}
            </span>
          </div>
        </div>
        <button
          className='p-2 bg-coffee-bg-light rounded-full text-gray-300 hover:text-red-500 transition-colors'
          onClick={() => toggleFavorite(cafe.id)}
        >
          <Heart
            size={20}
            fill={isFavorite(cafe.id) ? 'currentColor' : 'none'}
            className={isFavorite(cafe.id) ? 'text-red-500' : ''}
          />
        </button>
      </div>
      {/* 咖啡廳標籤 */}
      <div className='flex gap-2 mt-4'>
        {cafe.tags.map((tag) => (
          <span
            key={tag}
            className='text-[10px] px-3 py-1 bg-accent-green text-coffee-green rounded-full font-semibold tracking-wider'
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CoffeeCard;
