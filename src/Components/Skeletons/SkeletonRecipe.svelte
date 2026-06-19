<script lang="ts">
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
</script>

<div class="bg-gray-300 flex h-[86vh] gap-10 p-10">
	<div class="flex-1 p-10 flex flex-col gap-10">
		<Skeleton class="w-full h-2/3" />
		<div class="w-full flex flex-col gap-10">
			<Skeleton class="w-full h-3" />
			<div class="flex gap-5">
				<Skeleton class="h-[50px] w-[50px] rounded-full" />
				<div class="w-full gap-5 flex flex-col">
					<Skeleton class="w-full h-3" />
					<Skeleton class="w-full h-3" />
				</div>
			</div>
		</div>
	</div>
	<div class="flex-1 p-10 flex flex-col gap-5">
		<Skeleton class="w-full h-18" />
		<Skeleton class="w-full h-18" />
		<Skeleton class="w-full h-18" />
		<Skeleton class="w-full h-18" />
		<Skeleton class="w-full h-18" />
		<Skeleton class="w-full h-18" />
	</div>
</div>
