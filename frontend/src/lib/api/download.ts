const API_URL = 'http://localhost:3000/api';

export async function downloadReservationsPDF() {
	const response = await fetch(`${API_URL}/reports/pdf`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/pdf',
			Accept: 'application/pdf'
		}
	});

	if (response.ok) {
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'reservations.pdf';
		document.body.appendChild(a);
		a.click();
		a.remove();
		window.URL.revokeObjectURL(url);
	} else {
		console.error('Failed to download PDF');
	}
}

export async function downloadReservationsExcel() {
	const response = await fetch(`${API_URL}/reports/excel`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		}
	});

	if (response.ok) {
		const blob = await response.blob();
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'reservations.xlsx';
		document.body.appendChild(a);
		a.click();
		a.remove();
		window.URL.revokeObjectURL(url);
	} else {
		console.error('Failed to download Excel');
	}
}
