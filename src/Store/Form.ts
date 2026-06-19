import { writable } from 'svelte/store';

export interface Recipe {
	idMeal: string;
	strMeal: string;
	strCategory: string;
	strArea: string;
	strInstructions: string;
	strTags: string | null;
	strYoutube: string | null;
}


export type Area = {
	strArea: string;
};


import { browser } from '$app/environment';

export const area = writable<Area[] | null>(null);

let saved = { meals: [] };
if (browser) {
	try {
		saved = JSON.parse(localStorage.getItem('meals') || '{"meals": []}');
	} catch (e) {
		console.error('Error parsing meals from localStorage', e);
	}
}

export const recipes = writable<Recipe[]>(saved.meals || []);
