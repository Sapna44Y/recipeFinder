import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { FaHeart } from 'react-icons/fa';

const Header = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  const handleHomeClick = (e)=>{
    if(location.pathname === '/'){
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" onClick={handleHomeClick} className="text-2xl font-bold text-gray-800 dark:text-white">
          RecipeFinder
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/favorites"
            className="flex items-center text-gray-700 dark:text-gray-200 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <FaHeart className="mr-1" />
            Favorites
          </Link>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;



