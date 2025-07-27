// src/components/RecipeList.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const { recipes, searchTerm } = useRecipeStore((state) => ({
    recipes: state.recipes,
    searchTerm: state.searchTerm,
  }));

  // Optional: Filter recipes by search term
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {filteredRecipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link> {/* ✅ Use Link */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;