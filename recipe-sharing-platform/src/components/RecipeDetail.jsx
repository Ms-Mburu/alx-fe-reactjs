import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import data from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const found = data.find((r) => r.id === Number(id));
    setRecipe(found || null);
  }, [id]);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Recipe not found.</p>
        <div className="text-center mt-6">
          <Link
            to="/"
            className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{recipe.title}</h1>

      <section className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc pl-6 space-y-1">
          {recipe.ingredients.map((item, idx) => (
            <li key={idx} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
        <p className="text-gray-800 leading-relaxed">{recipe.instructions}</p>
      </section>

      <Link
        to="/"
        className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}