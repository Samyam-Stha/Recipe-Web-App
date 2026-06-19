<script lang="ts">
	import '../app.css';
	import './layout.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { House, Bookmark, Bell, User, Plus, ChevronLeft } from '@lucide/svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { onMount } from 'svelte';
	import { userImage, userName } from '../Store/userDetails.ts';
	import LoginPage from '../Components/Login/LoginPage.svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { registerSW } from 'virtual:pwa-register';
	import { loggedIn, clearAuthState } from '../Store/auth.store.ts';

	let webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');
	let logoutDialog: HTMLDialogElement;

	onMount(() => {
		loggedIn.set(localStorage.getItem('auth') === 'true');

		if (pwaInfo) {
			registerSW({ immediate: true });
		}
	});

	const bottomNavs = [
		{ name: 'Home', icon: House, route: '/' },
		{ name: 'Saved Recipes', icon: Bookmark, route: '/saved-recipe' },
		{ name: 'Create Recipe', icon: Plus, route: '/recipe-form' },
		{ name: 'Notifications', icon: Bell, route: '/notifications' },
		{ name: 'Profile', icon: User, route: '/user' }
	];

	function handleLogoutWrapper() {
		logoutDialog?.showModal();
	}

	function confirmLogout() {
		logoutDialog?.close();
		clearAuthState();
		goto('/');
	}

	let currentRoute = $derived(page.url.pathname);
	let currentTitle = $derived(bottomNavs.find((nav) => nav.route === currentRoute)?.name || '');
</script>

{@html webManifestLink}
{#if !$loggedIn}
	<LoginPage />
{:else}
	<nav class="navbar flex md:hidden bg-white">
		<ul class="navlinks flex justify-between items-center px-10 py-5 fixed bottom-0 left-0 z-50 bg-white w-full border-t-gray-300 border-t-2">
			{#each bottomNavs as nav}
				{#if nav.name === 'Create Recipe'}
					<li>
						<button class="bg-emerald-600 p-3 rounded-full" onclick={() => goto('/recipe-form')}>
							<Plus color="white" />
						</button>
					</li>
				{:else}
					{@const Icon = nav.icon}
					<li>
						<button
							onclick={() => goto(nav.route)}
							class={page.url.pathname === nav.route ? 'text-emerald-600' : 'text-gray-400'}
						>
							<Icon />
						</button>
					</li>
				{/if}
			{/each}
		</ul>
	</nav>

	<nav class="md:visible max-sm:hidden">
		<ul class="flex justify-between items-center py-2 px-10 bg-white w-full border-b-2">
			<li>
				<button onclick={() => goto('/')} class="font-bold text-4xl cursor-pointer">Recipe</button>
			</li>
			{#if currentRoute !== '/' && !currentRoute.startsWith('/meal') && !currentRoute.startsWith('/myrecipe')}
				<div class="flex pl-20 max-sm:hidden justify-center items-center">
					<p class="text-center flex-1 font-bold text-2xl">
						{#if currentRoute.startsWith('/search')}
							Search Recipe
						{:else}
							{currentTitle}
						{/if}
					</p>
				</div>
			{/if}
			<div class="flex justify-between items-center gap-5">
				<li>
					<button class="bg-emerald-600 p-3 rounded-xl flex text-white" onclick={() => goto('/recipe-form')}>
						<Plus color="white" />
						<span>Add Recipe</span>
					</button>
				</li>
				<li>
					<div class="cursor-pointer">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Avatar.Root class="w-15 h-15">
									<Avatar.Image src={$userImage} alt={$userName} />
									<Avatar.Fallback>{$userName.slice(0, 2).toUpperCase()}</Avatar.Fallback>
								</Avatar.Root>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Group>
									<DropdownMenu.Label>My Account</DropdownMenu.Label>
									<DropdownMenu.Separator />
									<DropdownMenu.Item onclick={() => goto('/user')} class="cursor-pointer">Profile</DropdownMenu.Item>
									<DropdownMenu.Item onclick={() => goto('/notifications')} class="cursor-pointer">Notification</DropdownMenu.Item>
									<DropdownMenu.Item onclick={() => goto('/saved-recipe')} class="cursor-pointer">Saved</DropdownMenu.Item>
									<DropdownMenu.Item onclick={handleLogoutWrapper} class="cursor-pointer text-red-600 hover:text-red-700 focus:bg-red-200">
										Logout
									</DropdownMenu.Item>
								</DropdownMenu.Group>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				</li>
			</div>
		</ul>
	</nav>

	{#if currentRoute !== '/' && !currentRoute.startsWith('/meal') && !currentRoute.startsWith('/myrecipe')}
		<div class="flex p-10 pb-0 md:hidden">
			<button class="font-bold" onclick={() => history.back()}><ChevronLeft /></button>
			<p class="text-center flex-1 font-bold text-2xl">
				{#if currentRoute.startsWith('/search')}
					Search Recipe
				{:else}
					{currentTitle}
				{/if}
			</p>
		</div>
	{/if}

	<div class="pb-24 md:pb-0">
		<slot />
	</div>

	<dialog bind:this={logoutDialog} class="rounded-lg p-6 max-w-md">
		<div class="flex flex-col gap-4">
			<h2 class="text-xl font-bold">Are you sure you want to logout?</h2>
			<p class="text-gray-600">You will be logged out of your account and redirected to the login page.</p>
			<div class="flex gap-3 justify-end mt-4">
				<button onclick={() => logoutDialog?.close()} class="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">
					Cancel
				</button>
				<button onclick={confirmLogout} class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
					Logout
				</button>
			</div>
		</div>
	</dialog>
{/if}

<style>
	button {
		cursor: pointer;
	}
</style>
