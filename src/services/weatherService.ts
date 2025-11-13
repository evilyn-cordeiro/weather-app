import axios from "axios";
import * as Location from "expo-location";

// chave da api - usada apenas para estudo e aplicação de testes
// TODO: quando necessário vou criar o arquivo .env
const API_KEY = "9ab30d5f73ad466387022357251311";

export async function getWeather() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Permissão de localização negada.");
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&lang=pt&days=1`
  );

  return response.data;
}
