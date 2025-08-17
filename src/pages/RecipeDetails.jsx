import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaYoutube } from 'react-icons/fa';
import { BiTime, BiDish } from 'react-icons/bi';
import LoadingSpinner from '../components/LoadingSpinner';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [servings, setServings] = useState(1);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (response.data.meals) {
          setRecipe(response.data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to fetch recipe details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const adjustServings = (operation) => {
    if (operation === 'increase') {
      setServings(servings + 1);
    } else if (operation === 'decrease' && servings > 1) {
      setServings(servings - 1);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center text-blue-500 dark:text-blue-400"
        >
          <FaArrowLeft className="mr-2" /> Back to recipes
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600 dark:text-gray-400">Recipe not found</p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center text-blue-500 dark:text-blue-400"
        >
          <FaArrowLeft className="mr-2" /> Back to recipes
        </Link>
      </div>
    );
  }

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const youtubeId = recipe.strYoutube ? getYouTubeId(recipe.strYoutube) : null;

  return (
  <div className="container mx-auto px-4 sm:px-6  py-6 sm:py-8 max-w-6xl">
    {/* Back Button */}
    <Link
      to="/"
      className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mb-4 sm:mb-6 transition-colors duration-300 text-sm sm:text-base"
    >
      <FaArrowLeft className="mr-2" /> Back to recipes
    </Link>
      

    {/* Main Card */}
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      {/* Image + Details Row */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 flex justify-center items-center">
           <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-auto max-h-[400px] sm:max-h-[550px] object-cover rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border-2 sm:border-4 border-white dark:border-gray-700 
              transform group-hover:scale-[1.02] transition-all duration-500 ease-in-out"
            />
          
        </div>

        {/* Right Side - Details */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-4 text-center lg:text-left 
            [text-shadow:_0_1px_2px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_2px_rgba(255,255,255,0.1)]">
              {recipe.strMeal}
            </h1>
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
              <span className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                <BiTime className="mr-1 text-blue-500" /> {recipe.strCategory}
              </span>
              <span className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                <BiDish className="mr-1 text-blue-500" /> {recipe.strArea}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 text-center lg:text-left italic">
              {recipe.strInstructions?.split('\r\n').find(p => p.trim().length > 0) ||
                'No description available.'}
            </p>
          </div>

          {/* Servings Adjuster */}
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-inner">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm sm:text-base text-gray-800 dark:text-white">
                Servings: <span className="text-blue-600 dark:text-blue-400">{servings}</span>
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => adjustServings('decrease')}
                  disabled={servings <= 1}
                  className="px-3 py-0.5 sm:px-4 sm:py-1 bg-white dark:bg-gray-600 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors disabled:opacity-50 text-sm sm:text-base"
                >
                  -
                </button>
                <button
                  onClick={() => adjustServings('increase')}
                  className="px-3 py-0.5 sm:px-4 sm:py-1 bg-white dark:bg-gray-600 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors text-sm sm:text-base"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center lg:text-left 
            [text-shadow:_0_1px_1px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_1px_rgba(255,255,255,0.1)]">
              Ingredients
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];
                if (ingredient && ingredient.trim()) {
                  const adjustedMeasure = measure.trim().match(/\d+/)
                    ? `${parseFloat(measure) * servings} ${measure.replace(/^[\d.\s\/-]+/, '')}`
                    : measure;

                  return (
                    <li
                      key={i}
                      className="flex items-start bg-gray-50 dark:bg-gray-700 px-3 py-2 sm:px-4 sm:py-3 rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm sm:text-base"
                    >
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 mt-2 mr-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      <span className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{adjustedMeasure}</span> {ingredient}
                      </span>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section - Instructions and Video */}
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 sm:p-6 md:p-8 border-t border-gray-200 dark:border-gray-600">
        {/* Instructions */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-6 sm:mb-8 
            [text-shadow:_0_1px_1px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_1px_rgba(255,255,255,0.1)]">
            Cooking Instructions
          </h2>
          <ol className="space-y-4 sm:space-y-6">
            {recipe.strInstructions
              ?.split('\r\n')
              .filter(step => step.trim().length > 0)
              .map((step, index) => (
                <li 
                  key={index} 
                  className="flex items-start group"
                >
                  <span className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-3 sm:mr-4 mt-0.5 sm:mt-1 font-bold shadow-md text-sm sm:text-base">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors text-sm sm:text-base">
                    {step}
                  </span>
                </li>
              ))}
          </ol>
        </div>

        {/* Video Embed */}
        {youtubeId && (
          <div className="w-full max-w-full sm:max-w-[600px] md:max-w-[750px] mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-white mb-6 sm:mb-8 
            [text-shadow:_0_1px_1px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_1px_rgba(255,255,255,0.1)]">
              Video Tutorial
            </h2>
            <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={`${recipe.strMeal} video tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[200px] sm:h-[250px] md:h-[400px]"
              ></iframe>
            </div>
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-3 sm:mt-4 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm sm:text-base"
            >
              <FaYoutube className="mr-2 text-red-500" />
              Watch on YouTube
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
);

};

export default RecipeDetails;







