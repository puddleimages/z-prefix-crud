import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function DeleteItem() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3001/items/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data.message);
        navigate('/inventory');
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('An error occurred while deleting the item. Please try again later.');
      }
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
