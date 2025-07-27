import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  addRecipe: (recipe) => set((state) => ({
    recipes: [...state.recipes, recipe]
  })),

  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(r => r.id === updatedRecipe.id ? updatedRecipe : r)
  })),

  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(r => r.id !== id)
  })),

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes(); // trigger filtering when term changes
  },

  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    const filtered = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    set({ filteredRecipes: filtered });
  },

  addFavorite: (id) => set((state) => ({
    favorites: [...state.favorites, id]
  })),

  removeFavorite: (id) => set((state) => ({
    favorites: state.favorites.filter(fid => fid !== id)
  })),

  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const recommended = recipes.filter(r =>
      favorites.includes(r.id) && Math.random() > 0.5
    );
    set({ recommendations: recommended });
  }
}));

export default useRecipeStore;