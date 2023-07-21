import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeleteItem from './DeleteItem';

export default function ItemDetails() {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/items/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching item details');
        }
        const data = await response.json();
        setItemDetails(data);
        setEditedItem(data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    fetch(`http://localhost:3001/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setIsEditing(false);
        setItemDetails(editedItem);
      })
      .catch((error) => {
        console.error('Error saving changes:', error);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedItem(itemDetails);
  };

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Item Details</h2>
      <div>
        {isEditing ? (
          <>
            <ul>
              <li>
                <strong>Item Name:</strong>
                <input
                  type="text"
                  name="item_name"
                  value={editedItem.item_name}
                  onChange={(e) => setEditedItem({ ...editedItem, item_name: e.target.value })}
                />
              </li>
              <li>
                <strong>Description:</strong>
                <input
                  name="description"
                  value={editedItem.description}
                  onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })}
                />
              </li>
              <li>
                <strong>Quantity:</strong>
                <input
                  type="number"
                  name="quantity"
                  value={editedItem.quantity}
                  onChange={(e) => setEditedItem({ ...editedItem, quantity: e.target.value })}
                />
              </li>
            </ul>
            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <ul>
              <li>
                <strong>Item Name:</strong> {itemDetails.item_name}
              </li>
              <li>
                <strong>Description:</strong> {itemDetails.description}
              </li>
              <li>
                <strong>Quantity:</strong> {itemDetails.quantity}
              </li>
            </ul>
            <div>
              <button onClick={handleEdit}>Edit</button>
              <DeleteItem itemId={id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
