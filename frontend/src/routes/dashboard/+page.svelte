<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import CustomerPage from '../customers/+page.svelte';
	import Tables from '../tables/+page.svelte';
	import Reservations from '../reservations/+page.svelte';

	let currentView = 'dashboard';

	function handleNavigate(event: CustomEvent) {
		currentView = event.detail.view;
	}
</script>

<Navbar on:navigate={handleNavigate} />

<main class="flex flex-col items-center p-4">
	{#if currentView === 'dashboard'}
		<h1 class="text-3xl font-bold mb-6">Dashboard</h1>
		<p>Welcome to the dashboard!</p>
	{:else if currentView === 'customers'}
		<CustomerPage />
	{:else if currentView === 'tables'}
		<Tables />
	{:else if currentView === 'reservations'}
		<Reservations />
	{/if}
</main>

<style>
	main {
		padding-top: 60px;
	}
</style>
