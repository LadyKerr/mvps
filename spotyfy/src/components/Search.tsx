import { Search as SearchIcon, X } from 'lucide-react';
import './Search.css';

interface SearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
}

export const Search = ({ 
  query, 
  onQueryChange, 
  placeholder = "Search for songs, artists, or albums..." 
}: SearchProps) => {
  const handleClear = () => {
    onQueryChange('');
  };

  return (
    <div className="search">
      <SearchIcon className="search__icon" size={20} />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder={placeholder}
        className="search__input"
      />
      {query && (
        <button 
          onClick={handleClear}
          className="search__clear"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
