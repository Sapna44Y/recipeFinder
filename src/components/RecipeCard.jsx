import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useFavorites from '../hook/useFavorites';
const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites(recipe.idMeal);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe);
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-lg ${
      isFavorite ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    toast.textContent = isFavorite 
      ? 'Removed from favorites!' 
      : 'Added to favorites!';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 2000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <Link to={`/recipe/${recipe.idMeal}`} className="block">
        <div className="relative">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-40 sm:h-48 object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite 
                ? 'text-red-500 bg-white/90 dark:bg-gray-800/90' 
                : 'text-gray-400 dark:text-gray-500 bg-white/80 dark:bg-gray-800/80'
            } shadow-md hover:scale-110 transition-transform`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <FaHeart size={18} className="animate-pulse" />
            ) : (
              <FaRegHeart size={18} />
            )}
          </button>
        </div>

        <div className="p-3 sm:p-4 flex justify-between items-center">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
            {recipe.strMeal}
          </h3>
          <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white text-sm sm:text-base rounded-md hover:bg-blue-600 transition-colors cursor-pointer shadow-md">
            Instructions
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;