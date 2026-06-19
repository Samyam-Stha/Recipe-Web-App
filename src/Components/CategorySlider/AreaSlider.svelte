<script lang="ts">
	import { area } from '../../Store/Form.ts';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { selectedArea } from '../../Store/Recipe.ts';

	async function SelectArea(areaName: string) {
		selectedArea.set(areaName);
	}
</script>

<div class="categorySlider flex overflow-auto gap-3">
	<Badge
		variant={$selectedArea === 'All' ? 'default' : 'outline'}
		class={`w-20 h-10 ${$selectedArea === 'All' ? 'bg-emerald-600 text-white font-bold' : 'bg-white text-emerald-600 cursor-pointer font-bold'}`}
		onclick={() => SelectArea('All')}
	>
		All
	</Badge>

	{#each $area as a}
		<Badge
			variant={$selectedArea === a.strArea ? 'default' : 'outline'}
			class={`w-20 h-10 ${
				$selectedArea === a.strArea
					? 'bg-emerald-600 text-white font-bold'
					: 'bg-white text-emerald-600 cursor-pointer font-bold'
			}`}
			onclick={() => SelectArea(a.strArea)}
		>
			{a.strArea}
		</Badge>
	{/each}
</div>

<style>
	@media (min-width: 768px) {
		.categorySlider::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}
		
		.categorySlider::-webkit-scrollbar-track {
			background: transparent;
		}
		
		.categorySlider::-webkit-scrollbar-thumb {
			background: transparent;
			border-radius: 4px;
		}
		
		.categorySlider:hover::-webkit-scrollbar-thumb {
			background: #888;
		}
		
		.categorySlider:hover::-webkit-scrollbar-thumb:hover {
			background: #555;
		}
	}
</style>
