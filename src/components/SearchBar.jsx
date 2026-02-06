import { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="input-field"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;