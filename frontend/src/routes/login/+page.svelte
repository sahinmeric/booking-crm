<script lang="ts">
	import { handleLogin } from '$lib/api/auth';

	let username = '';
	let password = '';
	let errorMessage: string | null = null;

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		errorMessage = await handleLogin(username, password);
	}
</script>

<main class="flex justify-center items-center min-h-screen bg-gray-100">
	<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
		<h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>
		<form on:submit={onSubmit} class="space-y-4 max-w-md mx-auto mt-8">
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
				<input
					type="text"
					id="username"
					bind:value={username}
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					required
					class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
				/>
			</div>
			{#if errorMessage}
				<p class="text-red-500 text-center mb-4">{errorMessage}</p>
			{/if}
			<button
				type="submit"
				class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Login
			</button>
		</form>
		<p class="text-center mt-4">
			Don't you have an account? <a href="/register" class="text-blue-500">Register</a>
		</p>
	</div>
</main>
