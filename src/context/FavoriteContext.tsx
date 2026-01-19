import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchFavorites,
  toggleFavorite as toggleFavoriteApi,
} from '../services/api.js';
import type { Cafe } from '../types/cafe.js';

interface FavoriteContextType {
  favorites: Cafe[]; // 存收藏的咖啡廳
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Cafe[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchFavorites();
      if (data) setFavorites(data);
    };
    loadData();
  }, []);

  // 切換收藏狀態
  const toggleFavorite = async (id: string) => {
    const token = localStorage.getItem('token');

    // 如果沒有 Token，就導向登入頁面
    if (!token) {
      window.location.href = '/#/login';
      return;
    }

    const result = await toggleFavoriteApi(id);
    if (!result.success) return;

    const data = await fetchFavorites();
    if (data) setFavorites(data);
  };

  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context)
    throw new Error('useFavorites must be used within FavoriteProvider');
  return context;
};
