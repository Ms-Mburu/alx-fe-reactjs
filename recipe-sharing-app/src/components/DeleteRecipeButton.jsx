import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      deleteRecipe(recipeId);
      navigate('/'); // Navigate to home or recipe list after deletion
    }
  };

  return (
    <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;