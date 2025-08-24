import React, { useState } from "react";

function AddRecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && ingredients && instructions) {
      onAddRecipe({ title, ingredients, instructions });
      setTitle("");
      setIngredients("");
      setInstructions("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Add New Recipe</h2>
      
      {/* Container with responsive flex for layout */}
      <div className="md:flex md:items-center md:space-x-4">
        {/* Title */}
        <div className="flex-1 mb-4">
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Recipe title"
          />
        </div>

        {/* Ingredients */}
        <div className="flex-1 mb-4">
          <label className="block text-gray-600 mb-1">Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="List ingredients"
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1">Instructions</label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Describe steps"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Recipe
      </button>
    </form>
  );
}

export default AddRecipeForm;