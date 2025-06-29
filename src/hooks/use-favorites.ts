"use client"

import { useState, useEffect, useCallback } from 'react';
import type { Destination } from '@/lib/types';

const FAVORITES_KEY = 'pacitan-explorer-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Could not load favorites from localStorage", error);
    }
  }, []);

  const saveFavorites = (newFavorites: string[]) => {
    try {
      setFavorites(newFavorites);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
       console.error("Could not save favorites to localStorage", error);
    }
  };

  const addFavorite = useCallback((destinationId: string) => {
    saveFavorites([...favorites, destinationId]);
  }, [favorites]);

  const removeFavorite = useCallback((destinationId: string) => {
    saveFavorites(favorites.filter((id) => id !== destinationId));
  }, [favorites]);

  const isFavorite = useCallback((destinationId: string) => {
    return favorites.includes(destinationId);
  }, [favorites]);

  const toggleFavorite = useCallback((destinationId: string) => {
    if (isFavorite(destinationId)) {
      removeFavorite(destinationId);
    } else {
      addFavorite(destinationId);
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  return { favorites, toggleFavorite, isFavorite, addFavorite, removeFavorite };
}
