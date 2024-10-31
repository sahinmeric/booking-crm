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

Clone the repository:
git clone https://github.com/sahinmeric/booking-crm.git

Start the backend server:
cd booking-crm/backend
npm install
npm run dev

Start the frontend:
cd booking-crm/frontend
npm install
npm run dev

Access the application:
Go to http://localhost:5173 in your browser.
