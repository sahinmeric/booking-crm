<script lang="ts">
	import { goto } from '$app/navigation';

	function navigateTo(route: string) {
		goto(route);
	}
</script>

<nav class="bg-gray-800 p-4">
	<div class="container mx-auto flex justify-between items-center">
		<h1 class="text-white text-xl font-bold">Booking CRM</h1>
		<ul class="flex space-x-4">
			<li>
				<button on:click={() => navigateTo('/customers')} class="text-gray-300 hover:text-white"
					>Customers</button
				>
			</li>
			<li>
				<button on:click={() => navigateTo('/tables')} class="text-gray-300 hover:text-white"
					>Tables</button
				>
			</li>
			<li>
				<button on:click={() => navigateTo('/reservations')} class="text-gray-300 hover:text-white"
					>Reservations</button
				>
			</li>
			<li>
				<button on:click={() => navigateTo('/login')} class="text-gray-300 hover:text-white"
					>Logout</button
				>
			</li>
		</ul>
	</div>
</nav>

<style>
	@media (max-width: 640px) {
		nav ul {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
