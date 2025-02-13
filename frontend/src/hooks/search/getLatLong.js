import axios from "axios";

async function getLatLong(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data)

    if (data.length > 0) {
      const { lat, lon } = data[0]; // Get first result
      return { lat: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      console.error("Location not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}

export default getLatLong;