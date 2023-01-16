import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  // Забираємо дані з імпута і перекидаємо в стейт
  const handleNameChange = e => {
    const newName = e.currentTarget.value.toLowerCase();
    setName(newName);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('click');
    const userInput = name.trim();
    if (userInput === '') {
      toast.error('fill in the fields');
      return;
    }

    onSubmit(userInput);
    // Очищуємо інпут
    cleanInput();
  };

  const cleanInput = () => {
    setName('');
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={name}
            onChange={handleNameChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>
    </>
  );
};


SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
