<script lang="ts">
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
</script>

<section>
	<div class="mt-10 flex items-center gap-6">
		<Skeleton class="w-24 h-24 rounded-full" />

		<div class="flex flex-1 justify-around">
			<div class="flex flex-col justify-center items-center gap-2">
				<Skeleton class="h-4 w-20" />
				<Skeleton class="h-6 w-10" />
			</div>
			<div class="flex flex-col justify-center items-center gap-2">
				<Skeleton class="h-4 w-16" />
				<Skeleton class="h-6 w-8" />
			</div>
		</div>
	</div>
</section>
