<script lang="ts">
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Bookmark } from '@lucide/svelte';
	import { selectedArea } from '../../Store/Recipe.ts';
	import { saveRecipe, removeSavedRecipe, isSavedRecipe, openDB } from '../../Store/MyRecipe.ts';
	import { onMount } from 'svelte';

	type Ingredient = {
		name: string;
		measure: string;
	};

	type Meal = {
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
	};

	export let meal: Meal;
	export let routePrefix: string = 'meal';

	let isSaved = false;

	onMount(async () => {
		await openDB();
		if (meal?.idMeal) {
			isSaved = await isSavedRecipe(meal.idMeal);
		}
	});

	async function toggleBookmark(event: MouseEvent) {
		event.stopPropagation();
		event.preventDefault();

		if (!meal?.idMeal) return;

		try {
			if (isSaved) {
				await removeSavedRecipe(meal.idMeal);
				isSaved = false;
			} else {
				await saveRecipe(meal);
				isSaved = true;
			}
		} catch (error) {
			console.error('Error toggling bookmark:', error);
		}
	}

	$: mealIngredients =
		meal?.ingredients?.length > 0
			? meal.ingredients.map((i) => i.name).join(', ')
			: 'No ingredients';

	function openDetails() {
		if (!meal?.idMeal) return;
		const sanitized = routePrefix || 'meal';
		goto(`/${sanitized}/${meal.idMeal}`);
	}

	$: slicedNameDesktop = (() => {
		if (!meal?.strMeal) return '';

		const words = meal.strMeal.split(' ');
		return words.length > 3 ? words.slice(0, 2).join(' ') + '...' : meal.strMeal;
	})();

	$: slicedNameMobile = (() => {
		if (!meal?.strMeal) return '';

		const words = meal.strMeal.split(' ');
		return words.length > 2 ? words.slice(0, 2).join(' ') + '...' : meal.strMeal;
	})();

	console.log(`Name: ${meal.strMeal}`);
	console.log(`Display : ${meal.strCategory}`);
</script>

<!-- 
<button
	class="container rounded-xl flex p-3 shadow-[0_0_15px_5px_rgba(0,0,0,0.4)]"
	on:click={openDetails}
>
	<div class="box p-2">
		<div class="imgcontainer">
			<img class="imgbox rounded-xl aspect-3/2" src={meal.strMealThumb} alt={meal.strMeal} />
		</div>

		<div class="content p-3">
			<div class="des flex flex-col justify-baseline items-baseline">
				<h2 class="font-bold text-4xl mb-4">{meal.strMeal}</h2>
				<p class="text-gray-500 text-justify">{mealIngredients}</p>
				<div class="flex gap-2">
					<h2 class="bg-gray-200 p-1.5 rounded-xl">{meal.strCategory}</h2>
					<Badge>Badge</Badge>
					<Badge variant="outline" class="border-red-500">{meal.strArea}</Badge>

					{#if meal.strTags}
						<p>{meal.strTags}</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</button> -->

<button
	class="relative w-full mb-10 bg-gray-200 rounded-xl shadow-md p-4 flex flex-col cursor-pointer items-center"
	onclick={openDetails}
>
	<img
		src={meal.strMealThumb}
		alt={meal.strMeal}
		class=" absolute -top-12 w-[109px] h-[110px] rounded-full object-cover border-4 border-white shadow-lg z-20 md:w-[150px] md:h-[151px]"
	/>

	<h1 class="mt-16 font-bold text-gray-800 text-lg hidden md:mt-26 md:block">
		{slicedNameDesktop}
	</h1>
	<h1 class="mt-16 font-bold text-gray-800 text-lg md:mt-26 md:hidden">{slicedNameMobile}</h1>

	<div class=" mt-2 w-full">
		<h1 class="text-gray-400 text-left text-sm">Category</h1>
		<div class="flex justify-between items-center">
			<h1>{meal.strCategory}</h1>
			<div
				class="mt-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
				onclick={toggleBookmark}
				onkeydown={(e) => e.key === 'Enter' && toggleBookmark(e)}
				role="button"
				tabindex="0"
				aria-label={isSaved ? 'Remove from saved recipes' : 'Save recipe'}
			>
				{#if isSaved}
					<Bookmark color="rgb(16 185 129)" fill="rgb(16 185 129)" />
				{:else}
					<Bookmark color="rgb(16 185 129)" />
				{/if}
			</div>
		</div>
	</div>
</button>
