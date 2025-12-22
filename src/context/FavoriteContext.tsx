import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoriteContextType {
  favorites: number[]; // 存咖啡廳的 ID
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // 初始化：從 localStorage 讀取已收藏的 ID
  useEffect(() => {
    const saved = localStorage.getItem('coffee_favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // 切換收藏狀態
  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id) // 移除
      : [...favorites, id]; // 新增

    setFavorites(newFavorites);
    localStorage.setItem('coffee_favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error('useFavorites must be used within FavoriteProvider');
  return context;
};