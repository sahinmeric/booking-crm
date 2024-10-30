import { goto } from '$app/navigation';

export async function handleRegister(
	username: string,
	email: string,
	password: string
): Promise<string | null> {
	const response = await fetch('http://localhost:3000/api/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, email, password })
	});

	const data = await response.json();

	if (response.ok) {
		goto('/login');
		return null;
	} else {
		return data.error || 'Registration failed. Please try again.';
	}
}

export async function handleLogin(username: string, password: string): Promise<string | null> {
	const response = await fetch('http://localhost:3000/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password })
	});

	const data = await response.json();

	if (response.ok) {
		if (data.token) {
			localStorage.setItem('authToken', data.token);
		}
		goto('/dashboard');
		return null;
	} else {
		return data.error || 'Login failed. Please check your credentials.';
	}
}
