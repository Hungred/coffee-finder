import React, { useState, useEffect } from 'react';
import { Search, Bell, SlidersHorizontal } from 'lucide-react';
import type { Cafe } from '../types/cafe.js';
import CoffeeCard from '../components/CoffeeCard.js';
import { fetchCafes } from '../services/api.js';
import lineImg from '../assets/line.jpg';

type Category = 'all' | 'wifi' | 'quiet' | 'seat' | 'limited_time';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category[]>([]);
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchCafes();
      setCafes(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const searchCafes = async (searchQuery: string, tags: string[] = []) => {
    const payload = {
      searchQuery,
      tags,
    };
    const data = await fetchCafes(payload);
    setCafes(data);
  };

  const handleSearch = async (filterString: string) => {
    setSearchQuery(filterString);

    searchCafes(filterString, activeCategory);
  };

  const handleClickTags = async (tag: Category) => {
    let newActiveCategory = [];
    if (activeCategory.includes(tag)) {
      // 如果已經選中，就取消
      newActiveCategory = activeCategory.filter((v) => v !== tag);
    } else {
      // 如果沒選中，就加入
      newActiveCategory = [...activeCategory, tag];
    }
    setActiveCategory(newActiveCategory);

    searchCafes(searchQuery, newActiveCategory);
  };

  const categories: Array<{ label: string; value: Category }> = [
    { label: '全部', value: 'all' },
    { label: 'WiFi', value: 'wifi' },
    { label: '安靜', value: 'quiet' },
    { label: '位置多', value: 'seat' },
    { label: '不限時', value: 'limited_time' },
  ];

  return (
    <div className='flex flex-col h-full bg-background-light'>
      <div className='shrink-0 flex-none'>
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
            <a
              href='https://lin.ee/NEkj0qG'
              target='_blank'
              rel='noopener noreferrer'
            >
              <button className='flex items-center justify-center rounded-full size-10 bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-200'>
                <img src={lineImg} className='w-6 h-6 rounded-full' />
              </button>
            </a>
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
              onChange={(e) => handleSearch(e.target.value)}
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
                activeCategory.includes(item.value)
                  ? 'bg-coffee-primary'
                  : 'bg-white border border-gray-200 text-coffee-medium hover:bg-coffee-chip-hover'
              }`}
              onClick={() => handleClickTags(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      {/* 列表區域 */}
      {loading ? (
        <div className='flex h-screen items-center justify-center text-coffee-medium'>
          正在尋找好店... ☕️
        </div>
      ) : (
        <div className='flex-1 overflow-y-auto pb-4'>
          <div className='flex flex-col px-4 gap-y-4'>
            {cafes.map((cafe: Cafe) => (
              <CoffeeCard key={cafe.id} cafe={cafe}></CoffeeCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
