import './App.css';
import Redirect from './components/Redirect';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';
import Register from './components/Register';
import Inventory from './components/Inventory';
import NewItem from './components/NewItem';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(sessionStorage.getItem('userId'));

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('http://localhost:3001/items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    const storedUserId = JSON.parse(sessionStorage.getItem('userId'));
    setUser(storedUserId);
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <div style={isDarkMode ? appStyles.dark : appStyles.light}>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/inventory">Manage Inventory</Link>
          <Link to="/new">Create New Item</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <button onClick={handleToggleDarkMode}>Toggle Dark Mode</button>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/items/:id" element={<ItemDetails items={items} setItems={setItems} />} />
        <Route path="/login" element={<Login onLogin={(userId) => setUser(userId)} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/new" element={<NewItem setItems={setItems} />} />
      </Routes>
    </div>
  );
};

const appStyles = {
  light: {
    backgroundColor: '#ffffff',
    color: '#333333',
    minHeight: '100vh',
    padding: '1%',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  },
  dark: {
    backgroundColor: '#333333',
    color: '#ffffff',
    minHeight: '100vh',
    padding: '1%',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
  },
};

export default App;
