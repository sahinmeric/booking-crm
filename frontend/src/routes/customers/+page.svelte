<script lang="ts">
	import { onMount } from 'svelte';
	import type { Customer } from '$lib/types/models';

	let customers: Customer[] = [];
	let errorMessage: string | null = null;
	let newCustomerName = '';
	let newCustomerEmail = '';
	let newCustomerPhone = '';
	let showForm = false;
	const API_URL = 'http://localhost:3000/api/customers';

	async function fetchCustomers() {
		const response = await fetch(`${API_URL}`);
		if (response.ok) {
			customers = await response.json();
		} else {
			errorMessage = 'Failed to load customers.';
		}
	}

	async function addCustomer() {
		const response = await fetch(`${API_URL}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: newCustomerName,
				email: newCustomerEmail,
				phone: newCustomerPhone
			})
		});

		if (response.ok) {
			newCustomerName = '';
			newCustomerEmail = '';
			newCustomerPhone = '';
			showForm = false;
			await fetchCustomers();
		} else {
			errorMessage = 'Failed to add customer.';
		}
	}

	export async function deleteCustomer(customerId: number): Promise<boolean> {
		const response = await fetch(`${API_URL}/${customerId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			await fetchCustomers();
			return true;
		} else {
			console.error('Error deleting customer:', await response.text());
			return false;
		}
	}

	function toggleForm() {
		showForm = !showForm;
	}

	onMount(fetchCustomers);
</script>

<main class="p-6 bg-gray-100">
	{#if errorMessage}
		<p class="text-red-500 text-center">{errorMessage}</p>
	{/if}

	<div class="flex justify-center mb-6">
		<button
			on:click={toggleForm}
			class="bg-green-500 text-white p-3 rounded-lg shadow hover:bg-green-600 transition"
		>
			{showForm ? 'Cancel' : 'Create a New Customer'}
		</button>
	</div>

	{#if showForm}
		<div class="mb-6 p-4 border border-gray-300 rounded-lg shadow bg-white">
			<form on:submit|preventDefault={addCustomer} class="space-y-4">
				<input
					type="text"
					placeholder="Name"
					bind:value={newCustomerName}
					required
					class="border border-gray-300 p-2 rounded-lg"
				/>
				<input
					type="email"
					placeholder="Email"
					bind:value={newCustomerEmail}
					required
					class="border border-gray-300 p-2 rounded-lg"
				/>
				<input
					type="text"
					placeholder="Phone"
					bind:value={newCustomerPhone}
					required
					class="border border-gray-300 p-2 rounded-lg"
				/>
				<button
					type="submit"
					class="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition"
					>Add Customer</button
				>
			</form>
		</div>
	{/if}

	<div class="bg-white rounded-lg shadow overflow-hidden">
		{#if customers.length > 0}
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-200">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Name</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Email</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Phone</th
						>
						<th
							class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Actions</th
						>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each customers as customer (customer.id)}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap">{customer.name}</td>
							<td class="px-6 py-4 whitespace-nowrap">{customer.email}</td>
							<td class="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
							<td class="px-6 py-4 whitespace-nowrap text-right">
								<button
									class="text-red-600 hover:text-red-800"
									on:click={() => deleteCustomer(customer.id)}>Delete</button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p class="text-center p-4 text-gray-500">There aren't any customers yet.</p>
		{/if}
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
