import React, { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Tìm phòng..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} className='icon' /></button>
            </form>
        </div>
    );
};

export default SearchBar;
