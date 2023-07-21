import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectToItems() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/items');
  }, [navigate]);

  return null;
};
