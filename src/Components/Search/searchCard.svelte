<script lang="ts">
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Bookmark } from '@lucide/svelte';

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

	function openDetails() {
		if (!meal?.idMeal) return;
		const sanitized = routePrefix || 'meal';
		goto(`/${sanitized}/${meal.idMeal}`);
	}
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
	class=" w-full h-[150px] bg-gray-200 rounded-xl shadow-md p-4 cursor-pointer md:flex-1 md:w-full md:h-[200px] flex flex-col justify-end"
	style={`background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${meal.strMealThumb}); background-size: cover; background-position: center;`}
	onclick={openDetails}
>
	<!-- <img src={meal.strMealThumb} alt={meal.strMeal} class="" /> -->

	<div class="flex flex-col items-baseline justify-end h-full">
		<h1 class=" text-white text-lg text-left">{meal.strMeal}</h1>
		<h1 class="text-gray-300">{meal.strCategory}</h1>
		<!-- <div class="mt-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
				<Bookmark color="rgb(16 185 129)" />
			</div> -->
	</div>
</button>
