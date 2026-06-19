import { writable } from 'svelte/store';
import { openDB, getRecipeCountDB, getSavedRecipeCount } from './MyRecipe.ts';

export const userName = writable<string>('User');
export const recipeCount = writable<number>(0);
export const savedRecipeCount = writable<number>(0);
export const userImage = writable<string | null>(null);

export async function getUserDetail() {
	try {
		await openDB();
		const count = await getRecipeCountDB();
		recipeCount.set(count);

		const savedCount = await getSavedRecipeCount();
		savedRecipeCount.set(savedCount);
	} catch (error) {
		console.error('Error fetching recipe count:', error);
	}
}
