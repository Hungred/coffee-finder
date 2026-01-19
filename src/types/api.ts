import type { Cafe } from '../types/cafe.js';
import type { City } from '../types/city.js';

// 泛型 API 回傳
interface ApiResponse<T> {
  data: T;
}

// 回傳多個咖啡廳
type fetchCafesRes = ApiResponse<{
  cafes: Cafe[];
  message?: string;
}>;

// 回傳單個咖啡廳
type fetchCafesByIdRes = ApiResponse<{
  cafe: Cafe;
  message?: string;
}>;

// 回傳同城市的咖啡廳
type fetchCafesByCityRes = ApiResponse<{
  cafes: Cafe[];
  message?: string;
}>;

// 回傳城市選項
type fetchOptionsCityRes = ApiResponse<{
  cities: City[];
  message?: string;
}>;

// 登入
type loginRes = ApiResponse<{
  token: string;
  user: { id: string; email: string; name: string };
}>;

// 登出
type logoutRes = ApiResponse<{
  message: string;
}>;

// 獲取咖啡廳收藏資料
type fetchFavoritesRes = ApiResponse<{
  cafes: Cafe[];
}>;

// 切換收藏狀態
type toggleFavoriteRes = ApiResponse<{
  success: boolean;
  action: 'added' | 'removed';
  message: string;
}>;

export type {
  ApiResponse,
  fetchCafesRes,
  fetchCafesByIdRes,
  fetchCafesByCityRes,
  fetchOptionsCityRes,
  loginRes,
  logoutRes,
  fetchFavoritesRes,
  toggleFavoriteRes,
};
