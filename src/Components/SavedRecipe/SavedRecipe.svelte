<script lang="ts">
	import { onMount } from 'svelte';
	import SavedCard from './SavedCard.svelte';
	import SkeletonCard from '../Skeletons/SkeletonCard.svelte';
	import { openDB, fetchSavedRecipes } from '../../Store/MyRecipe.ts';

	let loading = true;
	let savedMeals: any[] = [];

	onMount(async () => {
		await openDB();
		const recipes = await fetchSavedRecipes();
		savedMeals = recipes as any[];
		loading = false;
	});
</script>

<div class="p-10 ">
	{#if loading}
		<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 w-full">
			{#each Array(6) as _}
				<SkeletonCard />
			{/each}
		</div>
	{:else if savedMeals.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12 w-full">
			{#each savedMeals as meal (meal.idMeal)}
				<button>
					<SavedCard {meal} />
				</button>
			{/each}
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center h-64 text-center">
			<h2 class="text-2xl font-bold text-gray-600 mb-2">No Saved Recipes</h2>
			<p class="text-gray-500">Start bookmarking recipes to see them here!</p>
		</div>
	{/if}
</div>
