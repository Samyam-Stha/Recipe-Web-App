<script lang="ts">
	import { onMount } from 'svelte';
	import {
		fetchMeals,
		meals,
		selectedCategory,
		categories,
		fetchCategories
	} from '../../Store/Recipe.ts';
	import SearchCard from './searchCard.svelte';
	import { SlidersHorizontal } from '@lucide/svelte';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import SkeletonSearch from '../Skeletons/SkeletonSearch.svelte';

	let loading = true;
	let searched = '';
	let timer: NodeJS.Timeout;

	onMount(async () => {
		await fetchMeals('');
		await fetchCategories();
		loading = false;
	});

	function handleSearch() {
		debounce(searched);
	}

	const debounce = (value: string) => {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			loading = true;
			await fetchMeals(value);
			loading = false;
		}, 350);
	};

	function selectCategory(category: string) {
		selectedCategory.set(category);
	}
</script>

<section class="p-10">
	<div class="w-full flex gap-5 mb-10">
		<input
			type="search"
			placeholder="Search..."
			bind:value={searched}
			oninput={handleSearch}
			class="border rounded-xl p-2 w-full"
		/>
		<button class="bg-emerald-600 w-10 flex justify-center items-center rounded-xl p-2">
			<Drawer.Root>
				<Drawer.Trigger><SlidersHorizontal color={'white'} /></Drawer.Trigger>
				<Drawer.Content class="bg-white">
					<div>
						<Drawer.Header>
							<Drawer.Title>Select Category</Drawer.Title>
							<Drawer.Description>
								<div class="flex flex-wrap justify-left gap-5 items-start mt-5">
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
								</div>
							</Drawer.Description>
						</Drawer.Header>
						<Drawer.Footer>
							<Drawer.Close>Cancel</Drawer.Close>
						</Drawer.Footer>
					</div>
				</Drawer.Content>
			</Drawer.Root>
		</button>
	</div>

	<div class="flex">
		{#if loading}
			<div class="grid grid-cols-2 gap-5 w-full justify-around md:grid-cols-3">
				{#each Array(8) as _}
					<SkeletonSearch />
				{/each}
			</div>
		{:else if $meals && $meals.length > 0}
			<div class="grid grid-cols-2 gap-5 w-full justify-around md:grid-cols-3">
				{#each $meals as meal (meal.idMeal)}
					<button class="w-full md:flex">
						<SearchCard {meal} routePrefix="meal" />
					</button>
				{/each}
			</div>
		{:else}
			<h1>No meal found</h1>
		{/if}
	</div>
</section>
