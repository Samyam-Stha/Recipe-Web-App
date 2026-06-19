import { writable } from 'svelte/store';

export const savedRecipes = writable<any[]>([]);

let db: IDBDatabase;

export function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open('recipesDB', 3);

		request.onupgradeneeded = () => {
			const db = request.result;
			if (!db.objectStoreNames.contains('recipes')) {
				db.createObjectStore('recipes', { keyPath: 'idMeal' });
			}
			if (!db.objectStoreNames.contains('savedRecipes')) {
				db.createObjectStore('savedRecipes', { keyPath: 'idMeal' });
			}
		};

		request.onsuccess = () => {
			db = request.result;
			resolve(db);
		};

		request.onerror = () => reject(request.error);
	});
}

export function fetchRecipes() {
	return new Promise((resolve, reject) => {
		const tx = db.transaction('recipes', 'readonly');
		const store = tx.objectStore('recipes');
		const request = store.getAll();

		console.log('request', request);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

fetchRecipes();

export function getRecipe(id: string) {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject('DB not initialized');
			return;
		}
		const tx = db.transaction('recipes', 'readonly');
		const store = tx.objectStore('recipes');
		const request = store.get(id);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export function getRecipeCountDB() {
	return new Promise<number>((resolve, reject) => {
		if (!db) {
			reject('DB not initialized');
			return;
		}
		const tx = db.transaction('recipes', 'readonly');
		const store = tx.objectStore('recipes');
		const request = store.count();

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}
export function saveUserRecipe(recipe: any) {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject('DB not initialized');
			return;
		}
		const tx = db.transaction('recipes', 'readwrite');
		const store = tx.objectStore('recipes');
		const request = store.put(recipe);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export function saveRecipe(recipe: any) {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject('DB not initialized');
			return;
		}
		const tx = db.transaction('savedRecipes', 'readwrite');
		const store = tx.objectStore('savedRecipes');
		const request = store.put(recipe);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export function removeSavedRecipe(id: string) {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject('DB not initialized');
			return;
		}
		const tx = db.transaction('savedRecipes', 'readwrite');
		const store = tx.objectStore('savedRecipes');
		const request = store.delete(id);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export function getSavedRecipe(id: string) {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject('DB not initialized');
			return;
		}
		const tx = db.transaction('savedRecipes', 'readonly');
		const store = tx.objectStore('savedRecipes');
		const request = store.get(id);

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export function fetchSavedRecipes() {
	return new Promise((resolve, reject) => {
		if (!db) {
			reject('DB not initialized');
			return;
		}
		const tx = db.transaction('savedRecipes', 'readonly');
		const store = tx.objectStore('savedRecipes');
		const request = store.getAll();

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

export function isSavedRecipe(id: string) {
	return new Promise<boolean>((resolve, reject) => {
		if (!db) {
			reject('DB not initialized');
			return;
		}
		const tx = db.transaction('savedRecipes', 'readonly');
		const store = tx.objectStore('savedRecipes');
		const request = store.get(id);

		request.onsuccess = () => resolve(!!request.result);
		request.onerror = () => reject(request.error);
	});
}

export function getSavedRecipeCount() {
	return new Promise<number>((resolve, reject) => {
		if (!db) {
			reject('DB not initialized');
			return;
		}
		const tx = db.transaction('savedRecipes', 'readonly');
		const store = tx.objectStore('savedRecipes');
		const request = store.count();

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}
