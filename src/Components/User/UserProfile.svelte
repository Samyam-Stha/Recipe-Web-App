<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	import SkeletonProfile from '../Skeletons/SkeletonProfile.svelte';

	import { onMount } from 'svelte';
	import {
		getUserDetail,
		userName,
		recipeCount,
		savedRecipeCount,
		userImage
	} from '../../Store/userDetails.ts';

	let loading = true;

	onMount(async () => {
		await getUserDetail();
		loading = false;
	});
</script>

<section>
	<div class="mt-10">
		{#if loading}
			<SkeletonProfile />
		{:else}
			<div class="flex items-center gap-6">
				<Avatar.Root class="w-24 h-24 overflow-hidden rounded-full">
					<Avatar.Image
						class="h-full w-full object-cover"
						src={$userImage}
						alt={`@${$userName}`}
						referrerpolicy="no-referrer"
					/>
					<Avatar.Fallback class="flex h-full w-full items-center justify-center">
						{$userName.substring(0, 2).toUpperCase()}
					</Avatar.Fallback>
				</Avatar.Root>

				<div class="flex flex-1 justify-around">
					<div class="flex flex-col justify-center items-center">
						<h1 class="text-gray-500">My Recipe</h1>
						<h1 class="font-bold text-xl">{$recipeCount}</h1>
					</div>
					<div class="flex flex-col justify-center items-center">
						<h1 class="text-gray-500">Saved</h1>
						<h1 class="font-bold text-xl">{$savedRecipeCount}</h1>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>
