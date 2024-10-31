<script lang="ts">
	import { onMount } from 'svelte';
	import type { Reservation, Customer, Table } from '$lib/types/models';

	let reservations: Reservation[] = [];
	let customers: Customer[] = [];
	let tables: Table[] = [];
	let errorMessage: string | null = null;
	let selectedCustomerId: number | null = null;
	let selectedTableId: number | null = null;
	let reservationDate = '';
	let numberOfPeople = 2;
	let searchTerm = '';
	let editingReservationId: number | null = null;
	let isEditing: boolean = false;

	const API_URL = 'http://localhost:3000/api';

	function resetForm() {
		selectedCustomerId = null;
		selectedTableId = null;
		reservationDate = '';
		numberOfPeople = 2;
		editingReservationId = null;
		isEditing = false;
		errorMessage = null;
	}

	async function fetchReservations() {
		const response = await fetch(`${API_URL}/reservations`);
		if (response.ok) {
			reservations = await response.json();
		} else {
			errorMessage = 'Failed to load reservations.';
		}
	}

	async function fetchCustomers() {
		const response = await fetch(`${API_URL}/customers`);
		if (response.ok) {
			customers = await response.json();
		} else {
			errorMessage = 'Failed to load customers.';
		}
	}

	async function fetchTables() {
		const response = await fetch(`${API_URL}/tables`);
		if (response.ok) {
			tables = await response.json();
		} else {
			errorMessage = 'Failed to load tables.';
		}
	}

	async function saveReservation() {
		if (!selectedCustomerId || !selectedTableId || !reservationDate || !numberOfPeople) {
			errorMessage = 'Please fill in all required fields.';
			return;
		}

		const payload = {
			customerId: selectedCustomerId,
			tableId: selectedTableId,
			reservationDate,
			numberOfPeople
		};

		if (isEditing) {
			const response = await fetch(`${API_URL}/reservations/${editingReservationId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				await fetchReservations();
				resetForm();
			} else {
				errorMessage = 'Failed to update reservation.';
			}
		} else {
			const response = await fetch(`${API_URL}/reservations`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				await fetchReservations();
				resetForm();
			} else {
				errorMessage = 'Failed to add reservation.';
			}
		}
	}

	function editReservation(reservation: Reservation) {
		selectedCustomerId = reservation.customerId;
		selectedTableId = reservation.tableId;
		reservationDate = new Date(reservation.reservationDate).toISOString().slice(0, 16);
		numberOfPeople = reservation.numberOfPeople;
		editingReservationId = reservation.id;
		isEditing = true;
	}

	async function deleteReservation(reservationId: number) {
		const response = await fetch(`${API_URL}/reservations/${reservationId}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			await fetchReservations();
		} else {
			errorMessage = 'Failed to delete reservation.';
		}
	}

	$: filteredReservations = reservations.filter(
		(reservation) =>
			reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			reservation.tableName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	onMount(async () => {
		await fetchReservations();
		await fetchCustomers();
		await fetchTables();
	});
</script>

<main class="p-6 bg-gray-100">
	{#if errorMessage}
		<p class="text-red-500 text-center mb-4">{errorMessage}</p>
	{/if}
	<div class="mb-6 p-4 border border-gray-300 rounded-lg shadow bg-white">
		<form on:submit|preventDefault={saveReservation} class="space-y-4">
			<div>
				<label for="customer" class="block text-gray-700 font-medium mb-2">Customer</label>
				<select
					id="customer"
					bind:value={selectedCustomerId}
					class="border border-gray-300 p-2 rounded-lg w-full"
					required
				>
					<option value="" disabled selected>Select a customer</option>
					{#each customers as customer}
						<option value={customer.id}>{customer.name}</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="table" class="block text-gray-700 font-medium mb-2">Table</label>
				<select
					id="table"
					bind:value={selectedTableId}
					class="border border-gray-300 p-2 rounded-lg w-full"
					required
				>
					<option value="" disabled selected>Select a table</option>
					{#each tables as table}
						<option value={table.id}>
							{table.tableName} (Capacity: {table.capacity}) - {table.tableDescription}
						</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="date" class="block text-gray-700 font-medium mb-2">Reservation Date</label>
				<input
					type="datetime-local"
					id="date"
					bind:value={reservationDate}
					class="border border-gray-300 p-2 rounded-lg w-full"
					required
				/>
			</div>

			<div>
				<label for="numberOfPeople" class="block text-gray-700 font-medium mb-2"
					>Expected People</label
				>
				<input
					type="number"
					id="numberOfPeople"
					bind:value={numberOfPeople}
					min="1"
					max="20"
					class="border border-gray-300 p-2 rounded-lg w-full"
					required
				/>
			</div>

			<button
				type="submit"
				class="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600 transition mx-auto block"
			>
				Save Reservation
			</button>
		</form>
	</div>
	<div class="mb-4">
		<input
			type="text"
			placeholder="Search by customer name or table name"
			bind:value={searchTerm}
			class="border border-gray-300 p-2 rounded-lg w-full"
		/>
	</div>
	<div class="bg-white rounded-lg shadow overflow-hidden">
		{#if filteredReservations.length > 0}
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-200">
					<tr>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Date</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Customer</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Table</th
						>
						<th
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>People</th
						>
						<th
							class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
							>Actions</th
						>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each filteredReservations as reservation (reservation.id)}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap"
								>{new Date(reservation.reservationDate).toLocaleDateString()}
								{new Date(reservation.reservationDate).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit'
								})}</td
							>
							<td class="px-6 py-4 whitespace-nowrap">{reservation.customerName}</td>
							<td class="px-6 py-4 whitespace-nowrap">{reservation.tableName}</td>
							<td class="px-6 py-4 whitespace-nowrap">{reservation.numberOfPeople}</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<button
									on:click={() => editReservation(reservation)}
									class="bg-yellow-500 text-white p-2 rounded-lg shadow hover:bg-yellow-600 transition"
								>
									Edit
								</button>
								<button
									on:click={() => deleteReservation(reservation.id)}
									class="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition ml-2"
								>
									Delete
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p class="text-center p-4 text-gray-500">There aren't any reservations yet.</p>
		{/if}
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
