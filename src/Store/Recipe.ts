import { writable } from 'svelte/store';
import axios from 'axios';

export interface Ingredient {
	name: string;
	measure: string;
}

export interface Meal {
	idMeal: string;
	strMeal: string;
	strCategory: string;
	strArea: string;
	strInstructions: string;
	strMealThumb: string;
	strTags?: string;
	strYoutube?: string;
	ingredients: Ingredient[];
	strSource?: string;
	dateModified?: string;
}

export interface Category {
	idCategory: string;
	strCategory: string;
	strCategoryThumb: string;
	strCategoryDescription: string;
}

export const meals = writable<Meal[] | null>(null);

function transformMeal(raw: Meal): Meal {
	const ingredients: Ingredient[] = [];
	for (let i = 1; i <= 20; i++) {
		const name = raw[`strIngredient${i}`]?.trim();
		const measure = raw[`strMeasure${i}`]?.trim();
		if (name && name !== '') {
			ingredients.push({ name, measure: measure || '' });
		}
	}

	return {
		idMeal: raw.idMeal,
		strMeal: raw.strMeal,
		strCategory: raw.strCategory,
		strArea: raw.strArea,
		strInstructions: raw.strInstructions,
		strMealThumb: raw.strMealThumb,
		strTags: raw.strTags,
		strYoutube: raw.strYoutube,
		ingredients,
		strSource: raw.strSource,
		dateModified: raw.dateModified
	};
}

export async function fetchMeals(search: string = '') {
	// const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
	const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
	const data = await res.data;

	if (data.meals) {
		const transformed = data.meals.map((meal: Meal) => transformMeal(meal));
		meals.set(transformed);
	} else {
		meals.set([]);
	}
}

export async function fetchMealById(id: string): Promise<Meal | null> {
	const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
	const data = await res.data;
	if (data.meals) {
		return transformMeal(data.meals[0]);
	}
	return null;
}
export const selectedArea = writable('All');

export const categories = writable<Category[]>([]);
export const selectedCategory = writable('All');

export async function fetchMealsByArea(area: string) {
	if (area === 'All') {
		return;
	}

	const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
	const data = await res.data;

	if (data.meals) {
		const fullDetailsPromises = data.meals.map((meal: Meal) => fetchMealById(meal.idMeal));
		const fullMeals = await Promise.all(fullDetailsPromises);
		meals.set(fullMeals.filter((m): m is Meal => m !== null));
	} else {
		meals.set([]);
	}
		console.log('Data: ', meals);
}

export async function fetchMealsByCategory(category: string) {
	const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
	const data = await res.data;

	if (data.meals) {
		const fullDetailsPromises = data.meals.map((meal: Meal) => fetchMealById(meal.idMeal));
		const fullMeals = await Promise.all(fullDetailsPromises);
		meals.set(fullMeals.filter((m): m is Meal => m !== null));
	} else {
		meals.set([]);
	}
}

export async function fetchCategories() {
	const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
	const data = await res.data;

	if (data.categories) {
		categories.set(data.categories);
	}
}
