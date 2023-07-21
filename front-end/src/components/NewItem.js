import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewItem() {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleCreateItem = async () => {
    const user = JSON.parse(sessionStorage.getItem('userId'));

    try {
      const response = await fetch('http://localhost:3001/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user,
          itemName,
          description,
          quantity,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('Item created successfully.');
        navigate('/inventory');
      } else {
        console.log('Error creating item:', data.message);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div>
      <h2>Create New Item</h2>
      <div>
        <label htmlFor="itemName">Item Name:</label>
        <input
          type="text"
          id="itemName"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button onClick={handleCreateItem}>Create</button>
    </div>
  );
}
