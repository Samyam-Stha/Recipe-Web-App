<script lang="ts">
	import { goto } from '$app/navigation';
	import { loggedIn } from '../../Store/auth.store.ts';

	let email = '';
	let password = '';

	function handleSignIn(e: Event) {
		e.preventDefault();
		localStorage.setItem('auth', 'true');
		loggedIn.set(true);
		goto('/');
	}
</script>

<main class="bg-[#f8f8f8] flex justify-center h-dvh items-center">
	<section class="w-full max-w-sm px-6 pt-10 pb-8 flex flex-col justify-around">
		<div class="mb-10">
			<h1 class="font-bold text-2xl">Hello!</h1>
			<h1 class="text-2xl">Welcome Back</h1>
		</div>

		<form class="space-y-6" on:submit={handleSignIn}>
			<div class="space-y-2">
				<label for="email" class="text-sm font-medium text-gray-800">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					placeholder="Enter Email"
					class="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
				/>
			</div>

			<div class="space-y-2">
				<label for="password" class="text-sm font-medium text-gray-800">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					placeholder="Enter Password"
					class="w-full h-12 rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
				/>
			</div>

			<button
				type="submit"
				class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0C9B59] py-3 text-sm font-semibold text-white shadow-md hover:bg-[#0a7f48] transition-colors"
			>
				<span>Sign In</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
				</svg>
			</button>
		</form>

		<p class="mt-10 text-center text-xs text-gray-500">
			Don't have an account?
			<a href="/signup" class="font-semibold text-[#F6A623] hover:underline">Sign up</a>
		</p>
	</section>
</main>
