import React, { useState } from 'react';
import {
  Search,
  Heart,
  MapPin,
  Bell,
  SlidersHorizontal,
  Star,
} from 'lucide-react';
import { CAFE_DATA } from '../data/cafes.js';
import type { Cafe } from '../types/cafe.js';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  type Category =
    | 'all'
    | 'socket'
    | 'wifi'
    | 'work'
    | 'quiet'
    | 'noTimeLimit'
    | 'parking';

  const categories = [
    { label: '全部', value: 'all' },
    { label: '有插座', value: 'socket' },
    { label: 'WiFi', value: 'wifi' },
    { label: '適合工作', value: 'work' },
    { label: '安靜', value: 'quiet' },
    { label: '不限時', value: 'noTimeLimit' },
    { label: '好停車', value: 'parking' },
  ];

  const filteredCafes = CAFE_DATA.filter((cafe: Cafe) => {
    const matchSearch =
      cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cafe.city.toLowerCase().includes(searchQuery);

    const matchCategory =
      activeCategory === 'all' || cafe.tags.includes(activeCategory);

    return matchSearch && matchCategory;
  });

  return (
    <div>
      <div>
        <header className='flex items-center p-4 pt-6 justify-between sticky top-0 z-10 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md transition-colors'>
          <div className='flex flex-row items-center gap-3'>
            <div
              className='bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 text-coffee-primary'
              data-alt='Portrait of a smiling user with glasses'
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCV4rY88B6aQw0wW_BlbhUgXpyiAKapF2Nbd9Xtyf8mnXdlQoEi5W_mZExi69Z__pJeLM03zgDWZKzd29BB95066s_-wLBljm532iot81SmcYGe57X94t5BaWEVib0tZkqNjacLb7RK9zYfkLkIEESqA-qIVoKzLaRHfn54H0o-YbjwRKc0XVphA3v11KqE38zDyxGVJSSv2BB_Jd-HDU-RaxBOhOuEbZHljpHJloyrBKLw5QhVMI_lPII8tdM0q5FkADDOkSi3Hw')`,
              }}
            ></div>
            <div className='flex flex-col'>
              <span className='text-xs font-bold text-coffee-dark'>
                Good Morning
              </span>
              <span className='text-sm text-coffee-medium mt-1'>
                Coffee Lover
              </span>
            </div>
          </div>
          <button className='flex items-center justify-center rounded-full size-10 bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200'>
            <Bell size={24} color='black' />
          </button>
        </header>
        <div className='relative flex items-center w-full px-4 mt-6 mb-4'>
          <div className='absolute inset-y-0 flex items-center pl-4 pointer-events-none text-gray-400'>
            <Search size={22} color='gray' />
          </div>
          <input
            type='text'
            className='w-full h-14 pl-12 pr-4 bg-white rounded-xl shadow-soft focus:ring-2 focus:ring-coffee-primary/30 outline-none text-coffee-dark placeholder:text-gray-300 transition-all border-none'
            placeholder='搜尋咖啡廳、地區或條件'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className='absolute inset-y-0 right-4 flex items-center'>
            <button className='p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
              <SlidersHorizontal size={22} color='black' />
            </button>
          </div>
        </div>
      </div>
      {/* 分類按鈕列 */}
      <div className='px-4'>
        {categories.map((item) => (
          <button
            key={item.value}
            className={`px-4 py-2 mr-3 mb-4 rounded-full  text-sm font-medium transition-colors ${
              activeCategory === item.value
                ? 'bg-coffee-primary'
                : 'bg-white border border-gray-200 text-coffee-medium hover:bg-coffee-chip-hover'
            }`}
            onClick={() => setActiveCategory(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {/* 列表區域 */}
      <div className='flex flex-col px-4 gap-y-4'>
        {filteredCafes.map((cafe: Cafe) => (
          <div
            key={cafe.id}
            className='group bg-coffee-card-light p-4 rounded-card shadow-soft border border-white hover:border-coffee-primary transition-all active:scale-[0.98]'
            style={{
              backgroundImage: `url('${cafe.image}')`,
            }}
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
              <button className='p-2 bg-coffee-bg-light rounded-full text-gray-300 hover:text-red-500 transition-colors'>
                <Heart
                  size={20}
                  fill={cafe.isFavorite ? 'currentColor' : 'none'}
                  className={cafe.isFavorite ? 'text-red-500' : ''}
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
        ))}
      </div>
    </div>
  );
};

export default Home;
