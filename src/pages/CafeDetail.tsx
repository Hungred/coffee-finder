import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Heart,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Star,
} from 'lucide-react';
import { useFavorites } from '../context/FavoriteContext.js';
import { fetchCafesById } from '../services/api.js';
import type { Cafe } from '../types/cafe.js';

const CafeDetail: React.FC = () => {
  const { cafeId } = useParams<{ cafeId: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [cafe, setCafe] = useState<Cafe | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!cafeId) return;
      const data = await fetchCafesById(cafeId);
      if (data) setCafe(data);
    };
    loadData();
  }, []);

  if (!cafe)
    return (
      <div className='p-10 text-center text-coffee-medium text-lg'>
        找不到這間咖啡廳 ☕️
      </div>
    );

  return (
    <div className='min-h-screen bg-coffee-bg-light pb-24 relative'>
      <div className='relative h-[40vh] w-full'>
        <img
          src={cafe.image}
          className='w-full h-full object-cover'
          alt={cafe.name}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />

        <button
          onClick={() => navigate(-1)}
          className='absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 active:scale-90 transition-transform'
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => toggleFavorite(cafe.id)}
          className='absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30 active:scale-90 transition-transform'
        >
          <Heart
            size={24}
            fill={isFavorite(cafe.id) ? 'currentColor' : 'none'}
            className={isFavorite(cafe.id) ? 'text-red-500' : ''}
          />
        </button>
      </div>

      <div className='relative -mt-8 bg-coffee-bg-light rounded-t-[32px] px-6 pt-8'>
        <div className='flex justify-between items-start mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-coffee-dark mb-2'>
              {cafe.name}
            </h1>
            <div className='flex flex-wrap gap-2'>
              {cafe.tags.map((tag) => (
                <span
                  key={tag}
                  className='bg-accent-green text-coffee-green px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1'
                >
                  <Star size={12} fill='currentColor' />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='space-y-6 mb-6'>
          <div className='flex items-start gap-4'>
            <div className='p-3 bg-white rounded-2xl shadow-sm text-coffee-primary'>
              <MapPin size={20} />
            </div>
            <div>
              <p className='text-xs text-coffee-medium mb-1 uppercase tracking-widest font-bold'>
                地址
              </p>
              <p className='text-sm text-coffee-dark font-medium leading-relaxed'>
                {cafe.city} {cafe.address || '詳細地址請洽店家'}
              </p>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <div className='p-3 bg-white rounded-2xl shadow-sm text-coffee-primary'>
              <Clock size={20} />
            </div>
            <div>
              <p className='text-xs text-coffee-medium mb-1 uppercase tracking-widest font-bold'>
                營業時間
              </p>
              <p className='text-sm text-coffee-dark font-medium'>
                {cafe.open_time}
              </p>
            </div>
          </div>

          <div className='flex items-start gap-4'>
            <div className='p-3 bg-white rounded-2xl shadow-sm text-coffee-primary'>
              <Phone size={20} />
            </div>
            <div>
              <p className='text-xs text-coffee-medium mb-1 uppercase tracking-widest font-bold'>
                聯絡電話
              </p>
              <p className='text-sm text-coffee-dark font-medium'>-</p>
            </div>
          </div>
        </div>

        <div className='sticky flex gap-4'>
          <button
            disabled='true'
            className='flex-1 bg-white border border-gray-100 h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-coffee-dark shadow-lg active:scale-95 transition-transform'
            onClick={() => (window.location.href = `tel:0223456789`)}
          >
            <Phone size={20} />
            致電預約
          </button>
          <button
            className='flex-1 bg-coffee-primary h-14 rounded-2xl flex items-center justify-center gap-2 font-bold text-white shadow-lg active:scale-95 transition-transform'
            onClick={() =>
              navigate('/map', {
                state: { center: cafe.position, searchName: cafe.name },
              })
            }
          >
            <Navigation size={20} />
            開啟導航
          </button>
        </div>
      </div>
    </div>
  );
};

export default CafeDetail;
