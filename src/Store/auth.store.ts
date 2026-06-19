import { writable } from 'svelte/store';

export const loggedIn = writable<boolean>(false);

export function initAuthStore(): void {
	if (typeof localStorage === 'undefined') return;
	loggedIn.set(localStorage.getItem('auth') === 'true');
}

export function clearAuthState(): void {
	loggedIn.set(false);
	if (typeof localStorage !== 'undefined') {
		localStorage.removeItem('auth');
	}
}
