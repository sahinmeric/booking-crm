<script lang="ts">
	import { onMount } from 'svelte';
	import type { Table } from '$lib/types/models';

	let tables: Table[] = [];
	let errorMessage: string | null = null;
	let newTableName = '';
	let newTableDescription = '';
	let newTableCapacity = '';
	let newTableNumber = '';
	let showForm = false;
	const API_URL = 'http://localhost:3000/api/tables';

	async function fetchTables() {
		const response = await fetch(`${API_URL}`);
		if (response.ok) {
			tables = await response.json();
		} else {
			errorMessage = 'Failed to load tables.';
		}
	}

	async function addTable() {
		const response = await fetch(`${API_URL}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				tableName: newTableName,
				tableDescription: newTableDescription,
				capacity: parseInt(newTableCapacity),
				tableNumber: parseInt(newTableNumber)
			})
		});

		if (response.ok) {
			newTableName = '';
			newTableDescription = '';
			newTableCapacity = '';
			newTableNumber = '';
			showForm = false;
			await fetchTables();
		} else {
			errorMessage = 'Failed to add table.';
		}
	}

	async function deleteTable(tableId: number): Promise<boolean> {
		const response = await fetch(`${API_URL}/${tableId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			await fetchTables();
			return true;
		} else {
			console.error('Error deleting table:', await response.text());
			return false;
		}
	}

	function toggleForm() {
		showForm = !showForm;
	}

	onMount(fetchTables);
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
			{showForm ? 'Cancel' : 'Create a New Table'}
		</button>
	</div>

	{#if showForm}
		<div class="mb-6 p-4 border border-gray-300 rounded-lg shadow bg-white">
			<form on:submit|preventDefault={addTable} class="space-y-4">
				<input
					type="text"
					placeholder="Table Name"
					bind:value={newTableName}
					required
					class="border border-gray-300 p-2 rounded-lg"
				/>
				<input
					type="text"
					placeholder="Table Description"
					bind:value={newTableDescription}
					required
					class="border border-gray-300 p-2 rounded-lg"
				/>
				<input
					type="number"
					placeholder="Capacity"
					bind:value={newTableCapacity}
					required
					class="border border-gray-300 p-2 rounded-lg"
				/>
				<input
					type="number"
					placeholder="Table Number"
					bind:value={newTableNumber}
					required
					class="border border-gray-300 p-2 rounded-lg"
				/>
				<button
					type="submit"
					class="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition"
					>Add Table</button
				>
			</form>
		</div>
	{/if}

	<div class="bg-white rounded-lg shadow overflow-hidden">
		{#if tables.length > 0}
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-200">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Table Name</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Description</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Capacity</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Table Number</th
						>
						<th
							class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Actions</th
						>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each tables as table (table.id)}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap">{table.tableName}</td>
							<td class="px-6 py-4 whitespace-nowrap">{table.tableDescription}</td>
							<td class="px-6 py-4 whitespace-nowrap">{table.capacity}</td>
							<td class="px-6 py-4 whitespace-nowrap">{table.tableNumber}</td>
							<td class="px-6 py-4 whitespace-nowrap text-right">
								<button
									class="text-red-600 hover:text-red-800"
									on:click={() => deleteTable(table.id)}>Delete</button
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p class="text-center p-4 text-gray-500">There aren't any tables yet.</p>
		{/if}
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
