import type { Cafe } from '../types/cafe.js';

export const CAFE_DATA: Cafe[] = [
  {
    id: 1,
    name: '微光咖啡 Simple Light',
    city: '台北市',
    district: '大安區',
    address: '台北市大安區忠孝東路某段',
    position: [25.033, 121.5654],
    tags: ['有插座', 'WiFi', '安靜'],
    isFavorite: false,
    score: 4,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500',
  },
  {
    id: 2,
    name: '漫步雲端 Roasting Lab',
    city: '台中市',
    district: '西區',
    address: '台中市西區公益路某段',
    position: [24.15, 120.66],
    tags: ['適合工作', '不限時', '好停車'],
    isFavorite: true,
    score: 4.5,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500',
  },
];
