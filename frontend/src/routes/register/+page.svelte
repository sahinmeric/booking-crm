<script lang="ts">
  import { handleRegister } from '$lib/api/auth';
  import { onMount } from 'svelte';

  let username = '';
  let email = '';
  let password = '';
  let errorMessage: string | null = null;

  async function onSubmit(event: SubmitEvent) {
    event.preventDefault();
    errorMessage = await handleRegister(username, email, password);
  }
</script>

<main class="flex justify-center items-center min-h-screen bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h2 class="text-2xl font-semibold mb-6 text-center">Register</h2>

    {#if errorMessage}
      <p class="text-red-500 text-center mb-4">{errorMessage}</p>
    {/if}

    <form on:submit={onSubmit} class="space-y-4">
      <div>
        <label for="username" class="block text-gray-700">Username</label>
        <input
          id="username"
          type="text"
          bind:value={username}
          required
          class="mt-1 px-3 py-2 border rounded-lg w-full"
        />
      </div>
      <div>
        <label for="email" class="block text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          class="mt-1 px-3 py-2 border rounded-lg w-full"
        />
      </div>
      <div>
        <label for="password" class="block text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          class="mt-1 px-3 py-2 border rounded-lg w-full"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
      >
        Register
      </button>
    </form>

    <p class="text-center mt-4">
      Already have an account? <a href="/login" class="text-blue-500">Login</a>
    </p>
  </div>
</main>
