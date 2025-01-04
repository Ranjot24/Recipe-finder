import axios from 'axios';

const API_KEY = '617130e3e80848c1bffc77e65d35381d'; // Replace with your API key

export const fetchRecipes = async (ingredients, dietary) => {
  try {
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&diet=${dietary}&apiKey=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};
