<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import CustomerPage from '../customers/+page.svelte';
	import Tables from '../tables/+page.svelte';
	import Reservations from '../reservations/+page.svelte';

	let currentView = 'customers';

	function handleNavigate(event: CustomEvent) {
		currentView = event.detail.view;
	}
</script>

<Navbar on:navigate={handleNavigate} />

<main class="flex flex-col items-center p-4">
	{#if currentView === 'customers'}
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
