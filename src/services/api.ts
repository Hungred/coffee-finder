import type { Cafe } from '../types/cafe.js';
import type { City } from '../types/city.js';
import http from './http.js';
import { CITY_IMAGE_MAP } from '../tools/const.js';
const transformCafe = (item: any): Cafe => ({
  ...item,
  latitude: parseFloat(item.latitude),
  longitude: parseFloat(item.longitude),

  position: [parseFloat(item.latitude), parseFloat(item.longitude)],
  tags: [
    item.wifi >= 4 ? 'WiFi穩' : '',
    item.quiet >= 4 ? '安靜' : '',
    item.seat >= 4 ? '位子多' : '',
    item.limited_time === 'no' ? '不限時' : '',
  ].filter(Boolean),
  isFavorite: false,
  image: `https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&sig=${item.id}`,
  score: (item.wifi + item.seat + item.quiet + item.tasty) / 4,
});

export const fetchCafes = async (payload?: {
  searchQuery?: string;
  tags?: string[];
}): Promise<Cafe[]> => {
  try {
    const rawData = await http.get<Cafe[]>('', payload);

    return rawData.map(transformCafe);
  } catch (error) {
    console.error('獲取咖啡廳資料失敗', error);
    return [];
  }
};

export const fetchCafesById = async (id: string): Promise<Cafe | null> => {
  try {
    const rawData = await http.get(`/id/${id}`);

    return transformCafe(rawData);
  } catch (error) {
    console.error('獲取咖啡廳資料失敗', error);
    return null;
  }
};
export const fetchCafesByCity = async (city: string): Promise<Cafe[]> => {
  try {
    const rawData = await http.get(`/city/${city}`);

    return rawData.map(transformCafe);
  } catch (error) {
    console.error('獲取咖啡廳資料失敗', error);
    return [];
  }
};
export const fetchOptionsCity = async (): Promise<City[]> => {
  try {
    const rawData = await http.get(`/options/city`);

    return rawData.map((city: City) => ({
      ...city,
      image: CITY_IMAGE_MAP[city.name] ?? CITY_IMAGE_MAP.taipei,
    }));
  } catch (error) {
    console.error('獲取咖啡廳資料失敗', error);
    return [];
  }
};
