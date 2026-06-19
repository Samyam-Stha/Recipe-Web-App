<script lang="ts">
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Bookmark } from '@lucide/svelte';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
</script>

<div
	class="relative w-[150px] h-[200px] mb-10 bg-gray-300 rounded-xl shadow-md p-4 flex flex-col cursor-pointer items-center flex-none md:w-[250px] md:h-[250px]"
>
	<Skeleton
		class=" absolute -top-12 w-[109px] h-[110px] rounded-full object-cover shadow-lg z-20 md:w-[150px] md:h-[151px]"
	/>

	<Skeleton class="mt-16 w-6/12 h-3 text-center font-bold text-lg md:mt-26 md:mb-10"  />

	<div class=" mt-2 w-full flex flex-col gap-3">
		<Skeleton class="text-left text-sm h-3" />
		<div class="flex justify-around items-center gap-3">
			<Skeleton class="h-3 w-full" />

			<Skeleton class="w-[25px] h-[25px] rounded-full" />
		</div>
	</div>
</div>
