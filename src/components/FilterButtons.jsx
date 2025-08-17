import { useEffect, useState } from 'react';

const FilterButtons = ({ filter, handleFilter }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        
        const categoryNames = data.meals.map(category => category.strCategory);
        
        setCategories(['all', ...categoryNames]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="flex flex-wrap gap-2 mt-4">Loading categories...</div>;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === category
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
          }`}
        >
          {category.toLowerCase()}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;