import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import AddRecipeForm from './components/AddRecipeForm'; 
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <div>
      {/* Other components like SearchBar, RecipeList, etc. */}
      <RecommendationsList />
    </div>
  );
}

export default App;