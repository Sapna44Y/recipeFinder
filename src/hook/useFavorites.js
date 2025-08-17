
import { useState, useEffect } from 'react';

const useFavorites = (recipeId) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some((fav) => fav.idMeal === recipeId));
  }, [recipeId]);

  const toggleFavorite = (recipe) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
      const updatedFavorites = favorites.filter((fav) => fav.idMeal !== recipeId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(recipe);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event('storage'));
  };

  return { isFavorite, toggleFavorite };
};

export default useFavorites;
