# HealthEz Frontend

## Purpose
The frontend is a single-page React application powered by Vite. It provides an intuitive, high-performance interface for users to log their symptoms, view predicted medical specializations, and locate nearby healthcare facilities.

## Setup
1. Ensure Node.js is installed.
2. Install dependencies: `npm install`
3. Configure the `.env` file with your backend endpoint (`VITE_API_BASE_URL`).
4. Start the development server: `npm run dev`
5. Build for production: `npm run build`

## API Connection
All HTTP requests are routed to the Django backend. 
* Axios is typically used for API calls.
* JWT tokens are attached to the `Authorization: Bearer <token>` header for secured routes.
* Ensure the backend is running on `localhost:8000` (or as configured in your `.env`) to prevent CORS and connection errors.

## Key Folders
* `/src/components`: Reusable UI elements (Buttons, Navbars, Modals).
* `/src/pages`: Distinct page views (Home, Login, Dashboard).
* `/src/hooks`: Custom React hooks, including API mutation and query functions.
* `/src/context`: React Context providers for managing global state (e.g., AuthContext).