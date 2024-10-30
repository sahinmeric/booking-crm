export interface Table {
	id: number;
	tableName: string;
	tableDescription: string;
	capacity: number;
	tableNumber: number;
}

export interface Customer {
	id: number;
	name: string;
	email: string;
	phone: string;
}

export interface Reservation {
	id: number;
	customerId: number;
	tableId: number;
	reservationDate: string;
	numberOfPeople: number;
	customerName: string;
	customerPhone: string;
	customerEmail: string;
	tableName: string;
	tableDescription: string;
	capacity: number;
	tableNumber: number;
}
