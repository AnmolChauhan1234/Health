# HealthEz Backend

## Purpose
This Django REST Framework (DRF) backend serves as the core API gateway and data processing layer. It manages user authentication, interacts with the PostgreSQL database, and processes symptom data through our machine learning model.

## Setup
1. Create a virtual environment: `python -m venv venv`
2. Activate it: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
3. Install dependencies: `pip install -r requirements.txt`
4. Setup environment variables in a `.env` file.
5. Apply migrations: `python manage.py migrate`
6. Start the server: `python manage.py runserver`

## Model Usage
The backend depends heavily on `model.pkl` for symptom classification. 
* **Required Path**: `server/ml_app/model.pkl`
* If the model is missing, ML endpoints will fallback to generic responses ("General Physician") or raise errors. Ensure it is extracted from the `/resources` folder.

## Key Modules
* `auth_app`: Handles JWT logic, user registration, and session management.
* `ml_app`: Contains `SymptomPredictionView` and `NearbyHospitalsBySymptomView`. Loads the `joblib` ML model directly into memory upon server initialization.
* `core/models.py`: Defines database schemas.
