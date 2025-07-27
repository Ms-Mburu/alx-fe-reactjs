import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !ingredients.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newRecipe = {
      id: Date.now(),
      title,
      description,
      ingredients,
    };

    addRecipe(newRecipe);
    setTitle('');
    setDescription('');
    setIngredients('');
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Add a New Recipe</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={inputStyle}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={textareaStyle}
      />

      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>
        Add Recipe
      </button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '1rem',
  border: '1px solid #ccc',
  borderRadius: '10px',
  backgroundColor: '#f9f9f9',
};

const inputStyle = {
  padding: '0.5rem',
  marginBottom: '1rem',
  fontSize: '1rem',
};

const textareaStyle = {
  padding: '0.5rem',
  marginBottom: '1rem',
  fontSize: '1rem',
  resize: 'vertical',
};

const buttonStyle = {
  padding: '0.75rem',
  fontSize: '1rem',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default AddRecipeForm;