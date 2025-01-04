import { useState } from 'react';
import { fetchRecipes } from '../utils/api';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [ingredients, setIngredients] = useState('');
  const [dietary, setDietary] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = await fetchRecipes(ingredients, dietary);
    setRecipes(data);
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recipe Finder</h1>
      
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter ingredients (e.g., chicken, tomatoes)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className={styles.input}
        />
        <select
          value={dietary}
          onChange={(e) => setDietary(e.target.value)}
          className={styles.select}
        >
          <option value="">Select dietary preference</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="glutenFree">Gluten-Free</option>
        </select>
        <button
          onClick={handleSearch}
          className={styles.searchButton}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search Recipes'}
        </button>
      </div>

      <div className={styles.recipeList}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className={styles.recipeCard}>
              <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
              <h3 className={styles.recipeTitle}>{recipe.title}</h3>
              <p className={styles.recipeTime}>Ready in {recipe.readyInMinutes} minutes</p>
              <a
                href={`https://spoonacular.com/recipes/${recipe.title}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.recipeLink}
              >
                View Recipe
              </a>
            </div>
          ))
        ) : (
          <p className={styles.noRecipes}>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
