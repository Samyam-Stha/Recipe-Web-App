<script lang="ts">
	export let searched = '';
	let timer: NodeJS.Timeout;
	let val = '';

	function handleSearch() {
		debounce(searched);
	}

	const debounce = (v: any) => {
		console.log('value', v);
		clearTimeout(timer);
		timer = setTimeout(() => {
			val = v;
		}, 0);
	};
</script>

<div class="w-full">
	<input
		type="text"
		placeholder="Search..."
		bind:value={searched}
		oninput={handleSearch}
		class="border rounded p-2 w-full"
	/>
</div>
