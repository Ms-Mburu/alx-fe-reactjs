import React from 'react';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;