import useRecipeStore from '../store/recipeStore';

function RecipeList() {
  const recipes = useRecipeStore(state => state.filteredRecipes);

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;