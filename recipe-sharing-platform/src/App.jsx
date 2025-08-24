import React, { useState } from "react";
import AddRecipeForm from "./components/AddRecipeForm";

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <AddRecipeForm onAddRecipe={handleAddRecipe} />

      <div className="mt-10 max-w-xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Recipe List</h3>
        <ul className="space-y-3">
          {recipes.map((r) => (
            <li key={r.id} className="bg-white p-4 rounded-lg shadow">
              <h4 className="text-lg font-bold">{r.title}</h4>
              <p className="text-gray-700">
                <strong>Ingredients:</strong> {r.ingredients.join(", ")}
              </p>
              <p className="text-gray-700">
                <strong>Steps:</strong> {r.steps}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
