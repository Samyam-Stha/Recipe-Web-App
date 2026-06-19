<script lang="ts">
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Bookmark } from '@lucide/svelte';
	import type { Meal } from '../../Store/Recipe.ts';

	export let meal: Meal;
	export let routePrefix: string = 'meal';

	$: mealIngredients =
		meal?.ingredients?.length > 0
			? meal.ingredients.map((i) => i.name).join(', ')
			: 'No ingredients';

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
	class="detailscontent rounded-xl w-full h-[150px] bg-center bg-cover bg-no-repeat flex items-end p-4"
	style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url({meal.strMealThumb});"
	onclick={openDetails}
>
	<p class="text-white font-bold text-2xl">{meal.strMeal}</p>
</button>
