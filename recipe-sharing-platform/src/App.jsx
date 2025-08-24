import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white/80 backdrop-blur sticky top-0 z-10 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
            <NavLink
              to="/"
              className="text-lg font-semibold hover:opacity-80"
            >
              Recipes
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `ml-auto rounded-md px-4 py-2 transition ${
                  isActive ? "bg-green-700 text-white" : "bg-green-600 text-white hover:bg-green-700"
                }`
              }
            >
              Add Recipe
            </NavLink>
          </div>
        </nav>

        <main className="py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/add" element={<AddRecipeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
