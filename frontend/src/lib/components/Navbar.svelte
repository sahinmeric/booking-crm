<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';

	const dispatch = createEventDispatcher();

	function navigate(view: string) {
		dispatch('navigate', { view });
	}

	function logout() {
		localStorage.removeItem('authToken');
		goto('/login');
	}
</script>

<nav class="flex justify-between items-center p-4 bg-gray-800 text-white">
	<div class="flex space-x-4">
		<ul class="flex space-x-4">
			<li><button on:click={() => navigate('customers')}>Customers</button></li>
			<li><button on:click={() => navigate('tables')}>Tables</button></li>
			<li><button on:click={() => navigate('reservations')}>Reservations</button></li>
		</ul>
	</div>
	<button on:click={logout} class="bg-red-500 p-2 rounded hover:bg-red-600 transition">
		Logout
	</button>
</nav>
