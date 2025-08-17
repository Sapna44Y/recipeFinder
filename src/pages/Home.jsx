import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import FilterButtons from '../components/FilterButtons';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchRecipeDetails = async (meals) => {
    if (!meals) return [];
    
    try {
      const detailedRecipes = await Promise.all(
        meals.map(async (meal) => {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          );
          return response.data.meals[0];
        })
      );
      return detailedRecipes;
    } catch (err) {
      console.error('Error fetching recipe details:', err);
      return meals; 
    }
  };

  const fetchRecipes = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch all recipes 
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const recipes = response.data.meals || [];
      const detailedRecipes = await fetchRecipeDetails(recipes);
      setAllRecipes(detailedRecipes);
      setFilteredRecipes(detailedRecipes);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterRecipes = () => {
    let results = [...allRecipes];
    
    //category filter 
    if (filter !== 'all') {
      results = results.filter(recipe => 
        recipe.strCategory === filter
      );
    }
    
    //search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      results = results.filter(recipe => 
        recipe.strMeal.toLowerCase().includes(term) ||
        (recipe.strIngredients && recipe.strIngredients.toLowerCase().includes(term)) ||
        (recipe.strInstructions && recipe.strInstructions.toLowerCase().includes(term))
      );
    }
    
    setFilteredRecipes(results);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (category) => {
    setFilter(category);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filter, allRecipes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Discover Delicious Recipes
        </h1>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
        />
        <FilterButtons filter={filter} handleFilter={handleFilter} />
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
            />
            
          ))}
          
        </motion.div>
      )}
      

      {!loading && filteredRecipes.length === 0 && !error && (
        <div className="text-center  py-8">
          <p className="text-gray-500 dark:text-gray-400">
            {filter !== 'all' 
              ? `No ${filter.toLowerCase()} recipes found` 
              : 'No recipes found matching your search'}
          </p>
        </div>
      )}
    </div>
  );

 
};

export default Home;


