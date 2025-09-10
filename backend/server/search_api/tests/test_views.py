import pytest
from django.urls import reverse
from accounts.models import Hospital, User
from unittest.mock import patch

@pytest.mark.django_db
@patch("search_api.views.requests.post")  # Mock ML API call
def test_search_by_symptom_returns_expected_results(mock_post, client):
    # 1️⃣ Mock ML API response
    mock_post.return_value.status_code = 200
    mock_post.return_value.json.return_value = {
        "prediction": ["Cardiologist"]
    }

    # 2️⃣ Create a user
    user = User.objects.create(
        full_name="City Hospital",
        email="city@example.com"
    )

    # 3️⃣ Create a hospital linked to that user
    hospital = Hospital.objects.create(
        user=user,
        latitude=28.6139,
        longitude=77.2090,
        hospital_address="123 Main Street",
        license_number="LIC-123"
    )

    # 4️⃣ Call the API
    url = reverse("get_nearby_hospitals")
    response = client.get(url, {
        "lat": "28.6139",
        "lng": "77.2090",
        "search": "chest pain",
        "search_type": "symptom"
    })

    # 5️⃣ Check response
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

    # Optional: verify ML API was called once
    mock_post.assert_called_once()
