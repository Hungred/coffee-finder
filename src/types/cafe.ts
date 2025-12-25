export interface Cafe {
  id: string; // API 給的是 UUID 字串
  name: string;
  city: string;
  wifi: number;
  seat: number;
  quiet: number;
  tasty: number;
  cheap: number;
  music: number;
  url: string;
  address: string;
  position: [number, number]; // 需從 API 的 latitude, longitude 轉換
  limited_time: string;
  socket: string;
  standing_desk: string;
  mrt: string;
  open_time: string;
  //自定義
  tags?: string[];
  isFavorite?: boolean;
  image?: string;
  score?: number;
}
