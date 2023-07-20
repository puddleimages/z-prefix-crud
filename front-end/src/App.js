import './App.css';
import ItemList from './ItemList'
import React, { useState } from 'react';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prevState => !prevState);
  };

  const appStyles = {
    backgroundColor: isDarkMode ? '#333333' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#333333',
    minHeight: '100vh',
    padding: '20px',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  };

  return (
    <div style={appStyles}>
      <button onClick={handleToggleDarkMode}>Toggle Dark Mode</button>
      <ItemList />
    </div>
  );
};

export default App;