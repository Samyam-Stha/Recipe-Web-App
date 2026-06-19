<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { openDB, getRecipe } from '../../../Store/MyRecipe.ts';
	import SkeletonRecipe from '../../../Components/Skeletons/SkeletonRecipe.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { fetchMealById, type Meal } from '../../../Store/Recipe.ts';
	import { fly } from 'svelte/transition';
	import { slide, fade } from 'svelte/transition';
	import { ChevronLeft } from '@lucide/svelte';

	const id = page.params?.id;

	let mealData: Meal | null = null;
	let loading = false;
	let steps: any[] = [];

	async function fetchRecipeDetail() {
		loading = true;
		try {
			await openDB();
			const res = await getRecipe(id!);
			mealData = res || null;

			if (mealData) {
				mealData.ingredients = mealData.ingredients || [];
				mealData.strInstructions = mealData.strInstructions || '';
				totalIngredient = mealData.ingredients.length;
				steps = mealData!?.strInstructions.split('\n').filter(Boolean);
			}
		} catch (err) {
			console.error('Recipe detail fetch error', err);
		} finally {
			loading = false;
			console.log(mealData?.strInstructions);
		}
	}

	onMount(() => {
		fetchRecipeDetail();
	});

	let totalIngredient: number;
	let selected = 'Ingredient';

	function selectedTerm(Name: string) {
		selected = Name;
	}

	$: youtubeId = mealData?.strYoutube ? mealData.strYoutube.split('v=')[1]?.split('&')[0] : null;

	$: following = true;

	function toggleFollowing() {
		if (following) {
			following = false;
		} else {
			following = true;
		}
	}
</script>

<!-- {#if loading}
	<p>Loading meal...</p>
{:else if mealData}
	<section class="detailbox p-8 flex flex-col gap-2">
		<div
			class="detailscontent rounded-xl w-full h-[150px] bg-center bg-cover bg-no-repeat"
			style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url({mealData.strMealThumb});"
		></div>
		<div class="flex flex-col gap-4">
			<div class="flex justify-between">
				<h1 class="font-bold text-xl">{mealData.strMeal}</h1>
				<h1 class="text-gray-400">(13k Reviews)</h1>
			</div>

			<div class=" flex gap-3 items-center justify-between mb-5">
				<div class="flex gap-3 items-center">
					<Avatar.Root class="w-15 h-15">
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<h1 class="font-bold">Some Name</h1>
						<h1>Some, Place</h1>
					</div>
				</div>
				<button
					class="border-none outline-none bg-emerald-600 text-white h-10 w-20 text-center rounded-xl"
					>Follow</button
				>
			</div>
		</div>

		<section>
			<div class="flex w-full gap-4">
				<button
					class={`flex-1 border-none outline-non h-10 w-20 text-center rounded-xl ${selected === 'Ingredient' ? ' bg-emerald-600 text-white' : 'bg-white text-emerald-600'}`}
					onclick={() => selectedTerm('Ingredient')}>Ingredients</button
				>
				<button
					class={`flex-1 border-none outline-non h-10 w-20 text-center rounded-xl ${selected === 'Procedure' ? ' bg-emerald-600 text-white' : 'bg-white text-emerald-600'}`}
					onclick={() => selectedTerm('Procedure')}>Procedures</button
				>
			</div>
		</section>

		{#if selected === 'Ingredient'}
			<div class="flex justify-between">
				<h1 class="text-gray-500">1 serve</h1>
				<h1 class="text-gray-500">{totalIngredient} Items</h1>
			</div>
			<div class="instructionbox">
				<div class="ingredients">
					<div class="flex flex-col gap-5">
						{#each mealData.ingredients as item, index}
							<div class="flex flex-row border-2 justify-between p-5 rounded-xl bg-gray-200">
								<h1 class="font-bold">{item.name}</h1>
								<h1 class="text-gray-500">{item.measure}</h1>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else}
			<div class="flex justify-between">
				<h1 class="text-gray-500">1 serve</h1>
				<h1 class="text-gray-500">{totalIngredient} Items</h1>
			</div>
			<div>
				<div class="instructions">
					<div class="flex flex-col gap-3">
						<div class="bg-gray-200 rounded-xl p-5 text-justify flex flex-col gap-2">
							<h1 class="font-bold">{mealData.strInstructions}</h1>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</section>
{:else}
	<p>No meal found for this ID.</p>
{/if} -->

{#if loading}
	<SkeletonRecipe />
{:else if mealData}
	<section class="detailbox p-8 flex flex-col gap-2 md:pb-0 md:pt-0 md:flex-row md:gap-8 md:h-fit">
		<div class="md:flex md:flex-col md:flex-1">
			<div class="flex justify-between mb-6 md:hidden">
				<button class="font-bold md:hidden" onclick={() => history.back()}><ChevronLeft /> </button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>...</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Group>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>Share</DropdownMenu.Item>
							<DropdownMenu.Item>Rate</DropdownMenu.Item>
							<DropdownMenu.Item>Review</DropdownMenu.Item>
							<DropdownMenu.Item>Save</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			<div class="overflow-hidden relative mt-5 md:flex md:flex-col">
				<div
					class="flex transition-transform duration-300 ease-in-out h-fit"
					style={`transform: translateX(${selected === 'Ingredient' ? '0%' : '-100%'});`}
				>
					<div
						class="detailscontent rounded-xl min-w-full h-[150px] bg-center bg-cover bg-no-repeat md:h-[325px]"
						style="background-image: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url({mealData.strMealThumb});"
					></div>
					<div class="min-w-full">
						<iframe
							class="w-full h-[150px] rounded-xl md:h-[325px]"
							src={`https://www.youtube.com/embed/${youtubeId}`}
							title={mealData.strMeal}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						></iframe>
					</div>
				</div>
			</div>
			<div class="flex flex-col gap-4">
				<div class="flex justify-between md:mt-5">
					<h1 class="font-bold text-xl">{mealData.strMeal}</h1>
					<h1 class="text-gray-400">(13k Reviews)</h1>
				</div>
				<div class=" flex gap-3 items-center justify-between mb-5">
					<div class="flex gap-3 items-center">
						<Avatar.Root class="w-15 h-15">
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>CN</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<h1 class="font-bold">Some Name</h1>
							<h1>Some, Place</h1>
						</div>
					</div>
					<button
						onclick={toggleFollowing}
						class="border-none outline-none bg-emerald-600 text-white h-10 w-20 text-center rounded-xl"
					>
						{#if following}
							Following
						{:else}
							Follow
						{/if}
					</button>
				</div>
				<!-- <div>
					<p>Category: {mealData.strCategory}</p>
					<p>Area: {mealData.strArea}</p>
				</div> -->
			</div>
		</div>

		<div class="md:flex-1 md:py-5">
			<section>
				<div class="flex w-full gap-4">
					<button
						class={`flex-1 border-none outline-non h-10 w-20 text-center rounded-xl transition-all ${selected === 'Ingredient' ? ' bg-emerald-600 text-white' : 'bg-white text-emerald-600 hover:bg-gray-200'}`}
						onclick={() => selectedTerm('Ingredient')}>Ingredients</button
					>
					<button
						class={`flex-1 border-none outline-non h-10 w-20 text-center rounded-xl transition-all ${selected === 'Procedure' ? ' bg-emerald-600 text-white' : 'bg-white text-emerald-600 hover:bg-gray-200'}`}
						onclick={() => selectedTerm('Procedure')}>Procedures</button
					>
				</div>
			</section>
			<!-- <div class="mt-4 relative overflow-hidden">
				{#if selected === 'Ingredient'}
					<div transition:fade|slide>
						<div class="flex justify-between">
							<h1 class="text-gray-500">1 serve</h1>
							<h1 class="text-gray-500">{totalIngredient} Items</h1>
						</div>
						<div class="instructionbox">
							<div class="ingredients">
								<div class="flex flex-col gap-5">
									{#each items as item, index}
										<div class="flex flex-row border-2 justify-between p-5 rounded-xl bg-gray-200">
											<h1 class="font-bold">{item}</h1>
											<h1 class="text-gray-500">{measures[index]}</h1>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{:else}
					<div transition:fade|slide>
						<div class="flex justify-between">
							<h1 class="text-gray-500">1 serve</h1>
							<h1 class="text-gray-500">{totalIngredient} Items</h1>
						</div>
						<div>
							<div class="instructions">
								<div class="flex flex-col gap-3">
									{#each steps as step, index}
										<div class="bg-gray-200 rounded-xl p-5 text-justify flex flex-col gap-2">
											<h1 class="font-bold">Step {index + 1}:</h1>
											<h1>{step}</h1>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div> -->
			<div class="mt-4 relative overflow-hidden md:h-[400px] md:overflow-y-scroll">
				<div
					class="flex transition-transform duration-300 ease-in-out"
					style={`transform: translateX(${selected === 'Ingredient' ? '0%' : '-100%'});`}
				>
					<div class="min-w-full pr-4">
						<div class="flex justify-between">
							<h1 class="text-gray-500">1 serve</h1>
							<h1 class="text-gray-500">{totalIngredient} Items</h1>
						</div>
						<div class="instructionbox">
							<div class="ingredients">
								<div class="flex flex-col gap-5">
									{#each mealData.ingredients as item, index}
										<div class="flex flex-row justify-between p-5 rounded-xl bg-gray-200">
											<h1 class="font-bold">{item.name}</h1>
											<h1 class="text-gray-500">{item.measure}</h1>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
					<div class="min-w-full">
						<div class="flex justify-between">
							<h1 class="text-gray-500">1 serve</h1>
							<h1 class="text-gray-500">{totalIngredient} Items</h1>
						</div>
						<div class="instructions mt-2">
							<div class="flex flex-col gap-3">
								{#each steps as step, index}
									<div class="bg-gray-200 rounded-xl p-5 text-justify flex flex-col gap-2">
										<h1 class="font-bold">Step {index + 1}:</h1>
										<h1>{step}</h1>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
{:else}
	<p>No meal found for this ID.</p>
{/if}
