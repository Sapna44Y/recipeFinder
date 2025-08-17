import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mb-4">
      <input
        type="text"
        placeholder="Search by ingredient or dish name..."
        value={searchTerm}
        onChange={setSearchTerm}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <FiSearch 
        size={20} 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
      />
    </div>
  );
};

export default SearchBar;