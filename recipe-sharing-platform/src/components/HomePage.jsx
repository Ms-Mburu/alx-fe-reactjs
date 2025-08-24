import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../data.json";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load mock data into state on mount
    setRecipes(data);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Recipe Sharing Platform</h1>
        <Link
          to="/add"
          className="inline-block rounded-lg bg-green-600 px-5 py-2.5 text-white font-medium hover:bg-green-700 transition"
        >
          + Add New Recipe
        </Link>
      </header>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <article
            key={recipe.id}
            className="bg-white rounded-xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 line-clamp-3 mb-4">{recipe.summary}</p>
              <Link
                to={`/recipe/${recipe.id}`}
                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
              >
                View Recipe
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
