<script lang="ts">
	import {
		meals,
		fetchMeals,
		selectedArea,
		fetchMealsByArea,
		fetchMealsByCategory,
		selectedCategory,
		categories
	} from '../../Store/Recipe.ts';
	import { area } from '../../Store/Form.ts';
	import { openDB } from '../../Store/MyRecipe.ts';
	import { userImage, userName } from '../../Store/userDetails.ts';
	import Card from '../Card/Card.svelte';
	import { onMount } from 'svelte';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { SlidersHorizontal } from '@lucide/svelte';
	import AreaSlider from '../CategorySlider/AreaSlider.svelte';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { goto } from '$app/navigation';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { handleLogout, initMiniApp } from '../../utils/miniappInitializer.ts';
	import SkeletonCard from '../Skeletons/SkeletonCard.svelte';
	import axios from 'axios';
	// import { loggedIn } from '../../Store/auth.store.ts';

	let searched = '';
	let val = '';
	let timer: NodeJS.Timeout;
	let loading = true;

	$: searched;

	onMount(async () => {
		await openDB();
		const areaRes = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
		const areaData = await areaRes.data;
		area.set(areaData.meals);
		await fetchMeals('');

		const categoryRes = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
		const categoryData = await categoryRes.data;
		categories.set(categoryData.categories);
		loading = false;

		initMiniApp();

		// const profile =
		// 	JSON.parse(localStorage.getItem('mini-app-profile') ?? '{}')?.user_profile ?? false;
		// loggedIn.set(!!profile);
	});

	let loggedIn = false;

	onMount(() => {
		const profile =
			JSON.parse(localStorage.getItem('mini-app-profile') ?? '{}')?.user_profile ?? false;
		loggedIn = !!profile;
	});

	// const handleLogout = async () => {
	// 	try {
	// 		const miniapp = (window as any)?.miniapp;
	// 		if (!miniapp) return;

	// 		const resp = await miniapp.logout();
	// 		console.log('logout response', resp);

	// 		// Clear local storage + store
	// 		miniapp.logout();
	// 		localStorage.removeItem('mini-app-profile');
	// 		loggedIn.set(false);

	// 		goto('/login');
	// 	} catch (e) {
	// 		console.log('logout error', e);
	// 	}
	// };

	function handleLogoutWrapper() {
		handleLogout().then(() => {
			loggedIn = false;
			goto('/');
			window.location.reload();
		});
	}

	$: {
		if (val && val.length > 0 && $selectedArea === 'All' && searched.length > 0) {
			fetchMeals(val);
		} else if ($selectedArea && $selectedArea !== 'All') {
			fetchMealsByArea($selectedArea);
		} else {
			fetchMeals('');
		}
	}

	$: filteredMeals = ($meals ?? []).filter((meal) =>
		meal.strMeal.toLowerCase().includes(searched.toLowerCase())
	);

	function selectCategory(category: string) {
		selectedCategory.set(category);
	}

	function areaReset() {
		selectedArea.set('All');
	}
	// const handleLogin = (platform = 'google') => {
	// 	const miniapp = (window as any)?.miniapp;
	// 	if (!miniapp) return;
	// 	miniapp.login(platform);
	// };
</script>

<section class="p-5 md:p-8 lg:px-16 xl:px-24 min-h-screen flex flex-col gap-5">
	<div class="flex justify-between items-center">
		<div>
			<h1 class="font-bold text-4xl">Hello</h1>
			<p class="text-gray-500">What are we cooking today?</p>
		</div>

		<div class="md:hidden sm:hidden">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root class="w-15 h-15 ">
						<Avatar.Image src={$userImage || 'https://github.com/shadcn.png'} alt={$userName} />
						<Avatar.Fallback>{$userName.slice(0, 2).toUpperCase()}</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item onclick={() => goto('/user')}>Profile</DropdownMenu.Item>
						<DropdownMenu.Item onclick={() => goto('/notifications')}
							>Notification</DropdownMenu.Item
						>
						<DropdownMenu.Item
							onclick={() => {
								goto('saved-recipe');
							}}>Saved</DropdownMenu.Item
						>
						<DropdownMenu.Item onclick={handleLogoutWrapper}>Logout</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>

	<div class="flex gap-4 mt-5">
		<div class="w-full">
			<input
				placeholder="Search"
				type="text"
				class="w-full rounded-xl"
				onfocus={() => {
					goto('/search');
				}}
			/>
		</div>

		<Sheet.Root>
			<Sheet.Trigger class="bg-emerald-600 w-10 flex justify-center items-center rounded-xl p-2">
				<SlidersHorizontal color={'white'} />
			</Sheet.Trigger>
			<Sheet.Content class="bg-white">
				<Sheet.Header>
					<Sheet.Title>Select Category</Sheet.Title>
					<Sheet.Description class="flex flex-wrap mt-5 gap-5 justify-around items-center">
						<Badge
							variant={$selectedCategory === 'All' ? 'default' : 'outline'}
							class={`w-20 h-10 ${$selectedCategory === 'All' ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-600 cursor-pointer'}`}
							onclick={() => selectCategory('All')}
						>
							All
						</Badge>
						{#each $categories as c}
							<Badge
								variant={$selectedCategory === c.strCategory ? 'default' : 'outline'}
								class={`w-20 h-10 ${
									$selectedCategory === c.strCategory
										? 'bg-emerald-600 text-white'
										: 'bg-white text-emerald-600 cursor-pointer'
								}`}
								onclick={() => selectCategory(c.strCategory)}
							>
								{c.strCategory}
							</Badge>
						{/each}
					</Sheet.Description>
				</Sheet.Header>
			</Sheet.Content>
		</Sheet.Root>
	</div>

	<section>
		<AreaSlider />
	</section>

	<div class="overflow-visible w-full">
		{#if loading}
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 lg:gap-16 w-full pb-20 pt-16">
				{#each Array(10)}
					<SkeletonCard />
				{/each}
			</div>
		{:else if filteredMeals.length > 0}
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 lg:gap-16 w-full pb-20 pt-16">
				{#each filteredMeals as meal (meal.idMeal)}
					<button onclick={areaReset}>
						<Card {meal} routePrefix="meal" />
					</button>
				{/each}
			</div>
		{:else}
			<h1>No meal found</h1>
		{/if}
	</div>
</section>

<!-- <style>
	.overflowbox::-webkit-scrollbar {
		scrollbar-width: none;
	}
</style> -->
