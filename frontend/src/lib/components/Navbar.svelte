<script lang="ts">
	export let onNavigate: (page: string) => void;
</script>

<nav>
	<div class="container mx-auto flex justify-between items-center h-full px-4">
		<div class="text-xl font-bold">My App</div>
		<ul class="flex space-x-4">
			<li>
				<a href="#" on:click={() => onNavigate('dashboard')} class="hover:text-indigo-600"
					>Dashboard</a
				>
			</li>
			<li>
				<a href="#" on:click={() => onNavigate('customers')} class="hover:text-indigo-600"
					>Customers</a
				>
			</li>
			<li>
				<a href="#" on:click={() => onNavigate('reservations')} class="hover:text-indigo-600"
					>Reservations</a
				>
			</li>
			<li>
				<a href="#" on:click={() => onNavigate('logout')} class="hover:text-indigo-600">Logout</a>
			</li>
		</ul>
	</div>
</nav>

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 60px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}
</style>
