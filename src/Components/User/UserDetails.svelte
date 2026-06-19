<script lang="ts">
	import { onMount } from 'svelte';

	let userName = $state('User');

	onMount(() => {
		const profileStr = localStorage?.getItem('mini-app-profile');
		if (profileStr) {
			try {
				const profile = JSON.parse(profileStr);
				const userProfile = profile?.user_profile;
				if (userProfile) {
					userName = userProfile?.display_name || userProfile?.email || 'User';
				}
			} catch (error) {
				console.error('Error parsing user profile:', error);
			}
		}
	});
</script>

<section class=" mt-5">
	<p class="font-bold text-xl">{userName}</p>
	<p class="text-gray-500 mb-5">Chef</p>

	<p class="text-justify text-gray-500">
		Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis, quam!
	</p>
</section>
