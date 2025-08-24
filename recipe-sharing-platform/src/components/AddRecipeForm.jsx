import React, { useState } from "react";

const AddRecipeForm = ({ onAddRecipe }) => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Recipe title is required.";

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required.";
    } else if (ingredients.split(",").length < 2) {
      newErrors.ingredients = "Please include at least two ingredients (comma separated).";
    }

    if (!steps.trim()) newErrors.steps = "Preparation steps are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newRecipe = {
        id: Date.now(),
        title,
        ingredients: ingredients.split(",").map((item) => item.trim()),
        steps,
      };
      if (onAddRecipe) onAddRecipe(newRecipe);
      setTitle("");
      setIngredients("");
      setSteps("");
      setErrors({});
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 md:grid md:grid-cols-2 md:gap-6">
        {/* Title */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 font-semibold mb-2">Recipe Title</label>
          <input
            type="text"
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-gray-700 font-semibold mb-2">Ingredients</label>
          <textarea
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            }`}
            rows="3"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="List ingredients, separated by commas"
          ></textarea>
          {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
        </div>

        {/* Steps */}
        <div className="col-span-2">
          <label className="block text-gray-700 font-semibold mb-2">Preparation Steps</label>
          <textarea
            className={`w-full border rounded-lg p-3 focus:outline-none focus:ring-2 ${
              errors.steps ? "border-red-500" : "border-gray-300"
            }`}
            rows="4"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Write preparation steps"
          ></textarea>
          {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
        </div>

        {/* Submit Button */}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
