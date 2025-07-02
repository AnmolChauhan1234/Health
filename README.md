# Health Management System

A full-stack health management system with a Django backend and a React (Vite + Tailwind) frontend. This project provides hospital management, user profiles, payments, search, and machine learning API integration.

---

## Project Structure

```
backend/                # Django backend
  server/               # Django project root
    accounts/           # User accounts app
    hospital_management/# Hospital management app
    ml_api/             # Machine learning API integration
    payments/           # Payments app
    profiles/           # User profiles app
    search_api/         # Search functionality
    server/             # Django settings, URLs, WSGI/ASGI
frontend/               # React frontend (Vite + Tailwind)
  src/                  # React source code
  public/               # Static assets
ml_model/               # Machine learning models (if any)
```

---

## Backend Setup (Django)

1. Navigate to the backend directory:
   ```sh
   cd backend/server
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   .\venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On macOS/Linux
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Apply migrations and run the server:
   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

---

## Frontend Setup (React + Vite + Tailwind)

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

---

## Features
- User authentication and profiles
- Hospital and patient management
- Payment processing
- Search functionality
- Machine learning API integration
- Responsive UI with dark/light mode

---

