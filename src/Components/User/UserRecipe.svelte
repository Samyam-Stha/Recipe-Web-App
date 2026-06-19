<script lang="ts">
	import { onMount } from 'svelte';
	import Card from '../Card/Card.svelte';
	import { openDB, fetchRecipes, savedRecipes } from '../../Store/MyRecipe.ts';
	import MyRecipe from '../MyRecipe/MyRecipe.svelte';

	onMount(async () => {
		await openDB();
		const data: any = await fetchRecipes();
		savedRecipes.set(data);
	});
</script>

<section class=" mt-5">
	<div>
		<button class="w-full rounded-xl bg-emerald-600 text-white border-none outline-none p-2 mb-5"
			>My Recipe</button
		>
	</div>
	<div class=" w-full">
		<MyRecipe />
	</div>
</section>
