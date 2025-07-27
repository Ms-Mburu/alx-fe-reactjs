import useRecipeStore from '../store/recipeStore';

function FavoritesList() {
  const favorites = useRecipeStore(state =>
    state.favorites.map(id => state.recipes.find(r => r.id === id))
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.map(recipe => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default FavoritesList;