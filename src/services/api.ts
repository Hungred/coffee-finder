import type { Cafe } from '../types/cafe.js';
import type { City } from '../types/city.js';
import http from './http.js';
import { CITY_IMAGE_MAP } from '../tools/const.js';
import type {
  ApiResponse,
  fetchCafesRes,
  fetchCafesByIdRes,
  fetchCafesByCityRes,
  fetchOptionsCityRes,
  loginRes,
  logoutRes,
  fetchFavoritesRes,
  toggleFavoriteRes,
} from '../types/api.js';

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
    const res = await http.get<fetchCafesRes>('', payload);
    return res.data.cafes.map(transformCafe);
  } catch (error) {
    console.error('獲取咖啡廳資料失敗', error);
    return [];
  }
};

export const fetchCafesById = async (id: string): Promise<Cafe | null> => {
  try {
    const res = await http.get<fetchCafesByIdRes>(`/id/${id}`);

    return transformCafe(res.data.cafe);
  } catch (error) {
    console.error('獲取咖啡廳資料失敗', error);
    return null;
  }
};

export const fetchCafesByCity = async (city: string): Promise<Cafe[]> => {
  try {
    const res = await http.get<fetchCafesByCityRes>(`/city/${city}`);

    return res.data.cafes.map(transformCafe);
  } catch (error) {
    console.error('獲取咖啡廳資料失敗', error);
    return [];
  }
};
export const fetchOptionsCity = async (): Promise<City[]> => {
  try {
    const res = await http.get<fetchOptionsCityRes>(`/options/city`);

    return res.data.cities.map((city: City) => ({
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
    const res = await http.post<loginRes>('/login', { email, password });
    const { token, user } = res.data;

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
    const res = (await http.post<logoutRes>('/logout')) as logoutRes;
    alert(res.data.message);

    localStorage.removeItem('token'); // 刪除 token
    localStorage.removeItem('isLoggedIn'); // 刪除 isLoggedIn
  } catch (error: any) {}
};

export const fetchFavorites = async (): Promise<Cafe[]> => {
  try {
    const res = await http.get<fetchFavoritesRes>('/favorites');
    console.log('獲取咖啡廳收藏資料', res.data.cafes);
    return res.data.cafes.map(transformCafe);
  } catch (error) {
    console.error('獲取咖啡廳收藏資料失敗', error);
    return [];
  }
};

export const toggleFavorite = async (id: string) => {
  try {
    const res = (await http.post<toggleFavoriteRes>('/favorites/toggle', {
      cafeId: id,
    })) as toggleFavoriteRes;
    return res.data;
  } catch (error: any) {}
};
