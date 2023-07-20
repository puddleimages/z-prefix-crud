import React, { useState, useEffect } from 'react';

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Error fetching items:', error));
  }, []);

  const mappedItems = items.map((item) => (
    <li key={item.id}>
      <strong>Item Name:</strong> {item.item_name}<br />
      <strong>Description:</strong> {item.description}<br />
      <strong>Quantity:</strong> {item.quantity}
    </li>
  ));

  return (
    <ul>
      {mappedItems}
    </ul>
  )
};
