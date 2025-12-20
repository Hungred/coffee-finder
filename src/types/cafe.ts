export interface Cafe {
  id: number;
  name: string;
  city: string;
  district: string;
  address: string;
  position: [number, number]; // [緯度, 經度]
  tags: string[];
  isFavorite: boolean;
  score: number;
  image?: string;
}
