import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import AddRecipeForm from './components/AddRecipeForm'; 
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <Router>
      <div>
        <h1>Recipe Sharing App</h1>

        {/* ✅ STEP 2: Show the Add Recipe Form at the top of the homepage */}
        <AddRecipeForm />

        {/* These are your page routes */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/edit/:id" element={<EditRecipeForm />} />
        </Routes>
      </div>
       <div>

      <RecommendationsList />
    </div>
    </Router>
    
  );
}

export default App;