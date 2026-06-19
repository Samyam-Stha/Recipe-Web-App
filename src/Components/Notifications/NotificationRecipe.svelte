<script lang="ts">
	import NotificationCard from './NotificationCard.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Badge from '$lib/components/ui/badge/badge.svelte';

	let selectedNotification = 'All';

	$: selectNotification;

	function selectNotification(type: string) {
		selectedNotification = type;
	}
</script>

<div class="flex flex-col p-10 gap-5">
	<div class="flex justify-between items-center gap-3">
		<Badge
			variant={selectedNotification === 'All' ? 'default' : 'outline'}
			class={`w-20 h-10 flex-1 ${
				selectedNotification === 'All'
					? 'bg-emerald-600 text-white'
					: 'bg-white text-emerald-600 cursor-pointer'
			}`}
			onclick={() => selectNotification('All')}
		>
			All
		</Badge>
		<Badge
			variant={selectedNotification === 'Read' ? 'default' : 'outline'}
			class={`w-20 h-10 flex-1 ${
				selectedNotification === 'Read'
					? 'bg-emerald-600 text-white'
					: 'bg-white text-emerald-600 cursor-pointer'
			}`}
			onclick={() => selectNotification('Read')}
		>
			Read
		</Badge>
		<Badge
			variant={selectedNotification === 'Unread' ? 'default' : 'outline'}
			class={`w-20 h-10 flex-1 ${
				selectedNotification === 'Unread'
					? 'bg-emerald-600 text-white'
					: 'bg-white text-emerald-600 cursor-pointer'
			}`}
			onclick={() => selectNotification('Unread')}
		>
			Unread
		</Badge>
	</div>

	<div class="flex flex-col gap-5">
		<NotificationCard />
		<NotificationCard />
		<NotificationCard />
		<NotificationCard />
	</div>
</div>
