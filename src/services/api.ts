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

interface ApiResponse<T> {
  data: T;
}

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

type LoginParams = { email: string; password: string };

export const login = async ({ email, password }: LoginParams) => {
  try {
    const res = await http.post('/login', { email, password });
    const { token, user } = res;
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('user_id', user.id);
    localStorage.setItem('user_name', user.name);
    localStorage.setItem('user_email', user.email);

    return token;
  } catch (error: any) {
    console.error('login failed', error.message);
    return;
  }
};
export const logout = async () => {
  try {
    const res = await http.post('/logout');
    alert(res.message);
    localStorage.removeItem('token'); // 刪除 token
    localStorage.removeItem('isLoggedIn'); // 刪除 isLoggedIn
  } catch (error: any) {}
};

export const fetchFavorites = async (): Promise<Cafe[]> => {
  try {
    const rawData = await http.get<Cafe[]>('/favorites');
    console.log('獲取咖啡廳收藏資料', rawData);
    return rawData.data.map(transformCafe);
  } catch (error) {
    console.error('獲取咖啡廳收藏資料失敗', error);
    return [];
  }
};
// export const fetchFavorites = async (): Promise<Cafe[]> => {
//   try {
//     const rawData = await http.get<ApiResponse<Cafe[]>>('/favorites');
//     console.log('獲取咖啡廳收藏資料', rawData);
//     return rawData.data.map(transformCafe); // 這裡才有 data
//   } catch (error) {
//     console.error('獲取咖啡廳收藏資料失敗', error);
//     return [];
//   }
// };

export const toggleFavorite = async (id: string) => {
  try {
    const res = await http.post('/favorites/toggle', { cafeId: id });
    return res;
  } catch (error: any) {}
};
