import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const itemListElements = items.map((item) => (
    <div key={item.id}>
      <Link to={`/items/${item.id}`}>
        <strong>Item Name:</strong> {item.item_name}
      </Link>
      <br />
      <strong>Description:</strong> {item.description}
      <br />
      <strong>Quantity:</strong> {item.quantity}
      <br />
      <br />
    </div>
  ));

  return (
    <>
      <h2>All Items</h2>
      {itemListElements}
    </>
  );
}
