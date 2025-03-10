const BASE_URL = "https://crypto-stream-backend-5.onrender.com";

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    return null;
  }
};
