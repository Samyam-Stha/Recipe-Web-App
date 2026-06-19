<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fetchMeals } from '../Store/Recipe.ts';
	import Home from '../Components/Home/Home.svelte';

	onMount(() => {
		fetchMeals();
	});
</script>

<main><Home /></main>
