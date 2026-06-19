<script lang="ts">
	import { onMount } from 'svelte';

	import { area } from '../../Store/Form.ts';
	import { categories } from '../../Store/Recipe.ts';
	import { openDB, savedRecipes, saveUserRecipe } from '../../Store/MyRecipe.ts';

	import '../../app.css';
	import postcss from 'postcss';
	import { Trash2 } from '@lucide/svelte';
	import { Camera } from '@lucide/svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';

	onMount(async () => {
		await openDB();
		const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
		const data = await res.data;
		categories.set(data.categories);

		const areaRes = await axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
		const areaData = await areaRes.data;
		area.set(areaData.meals);
	});

	let selectedImageBase64: string = '';

	function handleImageUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const file = input.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			selectedImageBase64 = reader.result as string;
		};
		reader.readAsDataURL(file);
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();

		const recipe = {
			idMeal: crypto.randomUUID(),
			strMeal: RecipeName,
			strCategory: selectedCategory,
			strArea: selectedArea,
			strInstructions: Instructions,
			strMealThumb: selectedImageBase64,
			strTags: Tags || '',
			strYoutube: Youtube || '',
			ingredients: [...ingredients]
		};

		await saveUserRecipe(recipe);

		RecipeName = '';
		selectedCategory = '';
		selectedArea = '';
		Instructions = '';
		Tags = '';
		Youtube = '';
		ingredients = [{ name: '', measure: '' }];
		selectedImageBase64 = '';

		alert('Recipe saved in IndexedDB!');

		goto('/user');
	}

	let selectedCategory: string;
	let selectedArea: string;
	let RecipeName: string;
	// let Area: string;
	let Instructions: string;
	let Tags: string;
	let Youtube: string;

	let ingredients: { name: string; measure: string }[] = [{ name: '', measure: '' }];
	let selectedImage: File | null = null;

	function addIngredients(e: MouseEvent) {
		e.preventDefault();
		ingredients = [...ingredients, { name: '', measure: '' }];
	}
	function deleteIngredients(index: number) {
		ingredients = ingredients.filter((ingredient, i) => i !== index);
	}
</script>

<section class="flex w-full justify-center items-center p-2 flex-col md:pt-10">
	<form onsubmit={handleSubmit} class="flex items-baseline flex-col px-5 pb-5 pt-2 gap-2.5">
		<div class="w-full flex flex-col">
			<label for="RecipeName" class="">Recipe Name*</label>
			<input
				name="RecipeName"
				placeholder="Recipe Name"
				type="text"
				bind:value={RecipeName}
				required
				class="input-box"
			/>
		</div>
		<label for="Category">Category</label>
		<select bind:value={selectedCategory} required class="select-box" name="Category">
			<option disabled selected>-- Select Category --</option>

			{#if $categories}
				{#each $categories as cat}
					<option value={cat.strCategory}>{cat.strCategory}</option>
				{/each}
			{:else}
				<option disabled>Loading...</option>
			{/if}
		</select>
		<select bind:value={selectedArea} required class="select-box">
			<option disabled selected>-- Select Area --</option>

			{#if $area}
				{#each $area as a}
					<option value={a.strArea}>{a.strArea}</option>
				{/each}
			{:else}
				<option disabled>Loading...</option>
			{/if}
		</select>
		<!-- <input type="text" placeholder="Area" bind:value={Area} /> -->

		<textarea
			placeholder="Instructions"
			bind:value={Instructions}
			required
			class=" w-full rounded-xl border-2 border-gray-400 p-4"
			rows="3"
			cols="3"
		></textarea>
		<!-- <div class="img-box">
			<label for="thumbnail">Image:</label>
			<input name="thumbnail" type="file" accept="image/*" onchange={handleImageUpload} />
		</div> -->

		<div class="form-group flex flex-col w-full">
			<label for="Image-upload">Recipe Image</label>
			<button
				type="button"
				class="file-upload-wrapper border-2 border-dotted border-gray-500 rounded-2xl flex flex-col justify-center items-center min-h-[140px] gap-2 p-5 cursor-pointer hover:bg-gray-50 hover:border-gray-600 transition-all w-full max-w-full overflow-hidden"
				onclick={() => document.getElementById('image-upload-input')?.click()}
			>
				<input
					id="image-upload-input"
					type="file"
					name="Image-upload"
					accept="image/*"
					class="hidden"
					onchange={handleImageUpload}
				/>
				{#if selectedImageBase64}
					<div
						class="w-full max-w-xs h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
					>
						<img src={selectedImageBase64} alt="Preview" class="w-full h-full object-contain" />
					</div>
				{:else}
					<Camera class="text-gray-500" size={32} />
					<span class="upload-text text-gray-500">Click to upload or drag image here</span>
				{/if}
			</button>
		</div>
		<input type="text" placeholder="Tags" bind:value={Tags} class="input-box" />
		<input
			class="input-box"
			type="text"
			bind:value={Youtube}
			pattern="^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}$"
			placeholder="Enter valid YouTube URL like https://www.youtube.com/watch?v=xxxxxxxxxx"
		/>

		<div class="mb-4">
			<div class="flex justify-between mt-4 items-center">
				<label for="Ingredients">Ingredients </label>
				<button
					onclick={addIngredients}
					class="  text-green-500 border-none outline-none cursor-pointer h-auto p-2 font-bold"
					>+ Add Ingredients</button
				>
			</div>
			{#each ingredients as ingredient, index}
				<div class="flex gap-3.5 items-center justify-center">
					<input
						type="text"
						placeholder="Ingredient"
						bind:value={ingredient.name}
						required
						class="input-box"
					/>
					<input
						type="text"
						placeholder="Measurement"
						bind:value={ingredient.measure}
						required
						class="input-box"
					/>
					<button
						onclick={() => deleteIngredients(index)}
						class="border-2 border-red-300 rounded-xl border-dotted text-gray-400 h-12 p-5 mt-2.5 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-solid hover:border-red-500 transition-all"
						><Trash2 />
					</button>
				</div>
			{/each}
		</div>

		<button class="w-full bg-blue-500 text-white h-12 rounded-xl cursor-pointer">Submit</button>
	</form>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.input-box {
		@apply mt-2 h-12 w-full rounded-xl border-2 border-gray-400 p-5;
	}

	.input-box:focus {
		@apply border-none ring-2 ring-blue-400 outline-none;
	}

	.select-box {
		@apply mb-2 h-auto w-full rounded-xl border-2 border-gray-400 p-3;
	}

	.select-box:focus {
		@apply ring-2 ring-blue-400;
	}
</style>
