<script lang="ts">
	import { goto } from '$app/navigation';
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

	function openDetails() {
		if (!meal?.idMeal) return;
		goto(`/meal/${meal.idMeal}`);
	}
</script>

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
