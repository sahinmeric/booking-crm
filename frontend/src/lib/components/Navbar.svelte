<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function navigate(view: string) {
		dispatch('navigate', { view });
	}
</script>

<nav class="bg-gray-800 text-white p-4">
	<ul class="flex space-x-4">
		<li><button on:click={() => navigate('customers')}>Customers</button></li>
		<li><button on:click={() => navigate('tables')}>Tables</button></li>
		<li><button on:click={() => navigate('reservations')}>Reservations</button></li>
	</ul>
</nav>
