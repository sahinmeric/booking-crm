## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [Future Improvements](#future-improvements)
- [License](#license)

## Project Overview

This application provides a streamlined interface for managing restaurant reservations. Users can add customers, create tables, and handle reservations with ease. The system includes features such as exporting reservations to PDF or Excel, searching, editing, and deleting reservations, as well as user authentication and logout.

## Features

- **Customer Management**: Add, edit, and delete customer records.
- **Table Management**: Define tables with descriptions and seating capacity.
- **Reservation Management**: Create, edit, delete, and view reservations for tables.
- **Authentication**: Secure login and logout functionality.
- **Search**: Search bar for filtering reservations.
- **Export**: Download reservation data as PDF or Excel.
- **Responsive UI**: User-friendly and responsive design.

## Tech Stack

- **Frontend**: Svelte
- **Backend**: Node.js with Express (for API endpoints)
- **Database**: SQLite
- **Styling**: Tailwind CSS
- **PDF/Excel Export**: Backend functionality for export

## Setup Instructions

### Prerequisites

- **Node.js** and **npm**
- **SQLite** (configured as the database for this application)

### Installation

- **Clone the repository:**
  git clone https://github.com/sahinmeric/booking-crm.git

- **Start the backend server:**
  cd booking-crm/backend
  npm install
  npm run dev

- **Start the frontend:**
  cd booking-crm/frontend
  npm install
  npm run dev

- **Access the application:**
  Go to http://localhost:5173 in your browser.

## Usage

### Authentication

- **Login**: Use the login form on the homepage.
- **Logout**: Click the "Logout" button in the navigation bar to sign out.

### Managing Customers

- Navigate to the **"Customers"** tab to view, add, or edit customer records.

### Managing Tables

- Go to the **"Tables"** tab to add new tables and manage seating configurations.

### Creating Reservations

- In the **"Reservations"** tab, select a customer, table, and reservation date, and specify the number of people.
- Use the **search bar** to filter through reservations by customer name, table name, or date.

### Exporting Reservations

- Click the **Download as a pdf** or **Download as a excel** button to download reservation data as PDF or Excel.

## API Endpoints

Here is a list of the available API endpoints for this application:

### Authentication

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | /api/auth/login    | Log in a user       |
| POST   | /api/auth/register | Register a new user |

### Customer Management

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| GET    | /api/customers     | Retrieve all customers      |
| POST   | /api/customers     | Add a new customer          |
| PUT    | /api/customers/:id | Update an existing customer |
| DELETE | /api/customers/:id | Delete a customer           |

### Table Management

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | /api/tables     | Retrieve all tables      |
| POST   | /api/tables     | Add a new table          |
| PUT    | /api/tables/:id | Update an existing table |
| DELETE | /api/tables/:id | Delete a table           |

### Reservation Management

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| GET    | /api/reservations     | Retrieve all reservations      |
| POST   | /api/reservations     | Add a new reservation          |
| PUT    | /api/reservations/:id | Update an existing reservation |
| DELETE | /api/reservations/:id | Delete a reservation           |

### Report Export

| Method | Endpoint           | Description                        |
| ------ | ------------------ | ---------------------------------- |
| GET    | /api/reports/pdf   | Download reservation data as PDF   |
| GET    | /api/reports/excel | Download reservation data as Excel |
