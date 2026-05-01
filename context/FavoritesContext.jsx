import { createContext, useContext, useState, useEffect, useCallback } from "react";

const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored.map(String));
  }, []);

  const toggleFavorite = useCallback((id) => {
    const idStr = String(id);
    setFavorites((prev) => {
      const newFavorites = prev.includes(idStr)
        ? prev.filter((fid) => fid !== idStr)
        : [...prev, idStr];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((id) => favorites.includes(String(id)), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
