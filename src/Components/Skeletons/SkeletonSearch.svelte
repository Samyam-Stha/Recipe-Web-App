<script lang="ts">
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
</script>

<button
	class=" w-full h-[150px] bg-gray-300 rounded-xl shadow-md p-4 cursor-pointer md:flex-1 md:w-full md:h-[200px] flex flex-col justify-end"
>
	<div class="flex flex-col items-baseline justify-end h-full gap-3">
		<Skeleton class=" w-full h-4" />
		<Skeleton class="w-full h-4" />
	</div>
</button>
