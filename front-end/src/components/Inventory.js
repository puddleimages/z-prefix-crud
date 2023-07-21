import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Inventory() {
  const user = JSON.parse(sessionStorage.getItem('userId'));
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${user}/items`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setItems(data))
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, [user]);

  const truncateDescription = (description) => {
    if (description.length <= 100) {
      return description;
    }
    return description.substring(0, 100) + '...';
  };

  const inventoryList = items.map((item) => (
    <li key={item.id}>
      <Link to={`/items/${item.id}`}>
        <strong>Item Name:</strong> {item.item_name}
      </Link>
      <br />
      <strong>Description:</strong> {truncateDescription(item.description)}
      <br />
      <strong>Quantity:</strong> {item.quantity}
      <br />
      <br />
    </li>
  ));

  return (
    <div>
      <h2>Your Inventory</h2>
      <ul>{inventoryList}</ul>
    </div>
  );
}
