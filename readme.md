<div align="center">
  <h1>🏥 HealthEasy</h1>
  <p><strong>Intelligent Healthcare Platform Powered by Machine Learning</strong></p>
</div>

---

## 📖 Project Overview

**HealthEasy** is an advanced, full-stack healthcare platform designed to seamlessly connect patients with the right medical professionals and facilities. By leveraging Machine Learning, HealthEasy analyzes user symptoms to accurately predict required medical specializations and intelligently recommends nearby hospitals and doctors based on geolocation data.

Whether it's securely managing medical histories, processing secure payments, or discovering local healthcare options through interactive maps, HealthEz provides a unified, highly-responsive ecosystem for digital healthcare.

### ✨ Key Features

- **ML-Powered Diagnostics:** Classifies user symptoms and predicts appropriate medical specializations using a highly optimized Scikit-Learn model.
- **Geolocation & Maps:** Interactive hospital discovery using Mapbox and Leaflet for real-time local healthcare recommendations.
- **Role-Based Access Control:** Secure, JWT-authenticated dashboards distinct for Patients, Doctors, and Super Admins.
- **Secure Payments:** Integrated Razorpay checkout for seamless and secure medical transactions.
- **Dynamic UI:** A blazing-fast, responsive frontend built with React, Vite, TailwindCSS, and React Three Fiber for immersive 3D elements.

---

## 🏗 Architecture & Tech Stack

**Architecture Flow:** `React Frontend (Vite) → Django REST API Gateway → ML Model Classification → PostgreSQL DB`

### Frontend

- **Core:** React 18, Vite, React Router DOM
- **Styling:** Tailwind CSS 4, Lucide React
- **Maps & 3D:** React Leaflet, Mapbox GL, React Three Fiber, Drei
- **Media Management:** Cloudinary React

### Backend

- **Core:** Django, Django REST Framework (DRF)
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** PostgreSQL
- **Machine Learning:** Scikit-Learn, Joblib
- **Payments:** Razorpay API

---

## 📂 Project Structure

The project is structured into independent applications for modularity and scalability:

```text
Health/
├── backend/                  # Django backend application
│   ├── server/               # Core Django configurations
│   │   ├── accounts/         # JWT Auth & Role management
│   │   ├── hospital_management/ # Hospital data and geolocation logic
│   │   ├── ml_app/           # Machine learning inference views & model loading
│   │   ├── payments/         # Razorpay transaction handlers
│   │   ├── profiles/         # Patient and Doctor profile management
│   │   └── history/          # Medical history tracking
├── frontend/                 # React (Vite) user interface
│   ├── src/components/       # Reusable UI components
│   ├── src/pages/            # View components (Home, Dashboard, Maps)
│   └── src/hooks/            # Custom API communication hooks
└── resources/
    └── model.zip          # Compressed ML model and static resources
```

---

## 🚀 Local Setup Instructions

Follow these steps to get the HealthEz platform running on your local machine.

### Prerequisites

- **Node.js** (v18+)
- **Python** (v3.9+)
- **PostgreSQL** (installed and running)
- **Git**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Health
```

### 2. Machine Learning Model Setup (CRITICAL)

The application relies on a trained ML model for symptom prediction. **The backend will fail or return fallback responses if this model is missing.**

1. In the root directory, locate the `.zip` file (e.g., `model.zip` or within a `/resources` folder).
2. Unzip the file and extract `model.pkl`.
3. Move `model.pkl` exactly into the backend machine learning application folder:
   **Path:** `backend/server/ml_app/model.pkl`

### 3. Backend Setup

Navigate to the backend directory and set up the Python environment:

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure Environment Variables
# Copy the `.env.example` to `.env` in `backend/server/` and fill in your actual data:
cp server/.env.example server/.env
# Ensure you update values like DATABASE_NAME, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD,
# RAZORPAY_KEY_ID, and RAZORPAY_KEY_SECRET with your real credentials.

# Run Database Migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django Development Server
python manage.py runserver
```

_The API will be available at `http://localhost:8000`_

### 4. Frontend Setup

Open a new terminal window, navigate to the frontend directory, and start the Vite server:

```bash
cd frontend

# Install Node dependencies
npm install

# Configure Environment Variables
# Copy the `.env.example` to `.env` and fill in your actual data:
cp .env.example .env
# Make sure to provide your Cloudinary credentials (VITE_CLOUDINARY_CLOUD_NAME)
# and verify that VITE_API_URL points to your running backend.

# Start the Vite Development Server
npm run dev
```

_The Frontend will be available at `http://localhost:5173`_

---

## 📡 Key API Endpoints

- `POST /api/auth/login/` - Authenticate and receive JWT tokens.
- `POST /api/ml/predict/` - Submit a symptom string and receive a medical specialization prediction.
- `POST /api/hospitals/nearby/` - Get nearby hospitals based on coordinates and predicted specialization.
- `POST /api/payments/create-order/` - Initialize a Razorpay payment order.

---

## 🤝 Contribution Guidelines

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -m 'Add some awesome feature'`
4. Push to the branch: `git push origin feature/awesome-feature`
5. Open a Pull Request for review.
