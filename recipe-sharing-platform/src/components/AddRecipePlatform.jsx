import { useState } from "react";
import { Link } from "react-router-dom";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    const nextErrors = {};
    if (!title.trim()) nextErrors.title = "Title is required.";

    const raw = ingredientsText.trim();
    const list = raw
      ? raw
          .split(/\n|,/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    if (list.length < 2) nextErrors.ingredients = "Provide at least two ingredients.";

    if (!steps.trim()) nextErrors.steps = "Preparation steps are required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    // For now, we just log. You can later save to an API or localStorage.
    console.log({
      title,
      ingredients: ingredientsText,
      steps,
    });

    setTitle("");
    setIngredientsText("");
    setSteps("");
    setErrors({});
    setSuccess("Recipe submitted! (Mock submit)");
  };

  const inputBase =
    "w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Add New Recipe</h1>
        <Link
          to="/"
          className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-900 transition"
        >
          Home
        </Link>
      </header>

      {success && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-5 bg-white rounded-xl shadow p-6">
        <div>
          <label className="block font-medium mb-1">Recipe Title</label>
          <input
            type="text"
            className={`${inputBase} ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="e.g., Creamy Mushroom Pasta"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block font-medium mb-1">
            Ingredients <span className="text-gray-500">(comma or newline separated)</span>
          </label>
          <textarea
            rows={4}
            className={`${inputBase} h-28 ${
              errors.ingredients ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={"e.g.,\n200g pasta\n1 cup cream\nMushrooms, sliced"}
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
          />
          {errors.ingredients && (
            <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        <div>
          <label className="block font-medium mb-1">Preparation Steps</label>
          <textarea
            rows={6}
            className={`${inputBase} h-36 ${errors.steps ? "border-red-500" : "border-gray-300"}`}
            placeholder="Describe the cooking steps clearly…"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
          {errors.steps && <p className="text-red-600 text-sm mt-1">{errors.steps}</p>}
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-white font-medium hover:bg-green-700 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}
