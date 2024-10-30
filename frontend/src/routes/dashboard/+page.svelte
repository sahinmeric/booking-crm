<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	let currentView = 'dashboard';

	function handleNavigate(page: string) {
		currentView = page;
	}
</script>

<Navbar onNavigate={handleNavigate} />

<main class="flex flex-col items-center p-4">
	{#if currentView === 'dashboard'}
		<h1 class="text-3xl font-bold mb-6">Dashboard</h1>
	{:else if currentView === 'customers'}
		<h1 class="text-3xl font-bold mb-6">Customers</h1>
	{:else if currentView === 'reservations'}
		<h1 class="text-3xl font-bold mb-6">Reservations</h1>
	{/if}
</main>

<style>
	main {
		padding-top: 60px;
	}
</style>
