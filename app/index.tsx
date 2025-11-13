import Loader from "@/src/components/Loader";
import TipCard from "@/src/components/TipCard";
import TopContainer from "@/src/components/TopContainer";
import { getWeather } from "@/src/services/weatherService";
import {
  generateTip,
  getColorByWeather,
  getFontColorByWeather,
  getPeriod,
  selectBackground,
} from "@/src/utils/weatherHelpers";

import HourlyForecast from "@/src/components/HourlyForecast";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function App() {
  const [weather, setWeather] = useState<any>(null);
  const [background, setBackground] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getWeather();
        setWeather(data);
        const bg = selectBackground(data.current.condition.text);
        setBackground(bg);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !background) return <Loader />;

  const { temp_c, condition } = weather.current;
  const period = getPeriod();

  const color = getColorByWeather(condition.text, period);
  const fontColor = getFontColorByWeather(condition.text, period);
  const time = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      {" "}
      <View style={styles.overlay}>
        <TopContainer
          color={color}
          condition={weather.current.condition.text}
          temperature={weather.current.temp_c}
          feelsLike={weather.current.feelslike_c}
          city={weather.location.name}
          region={weather.location.region}
          time={time}
          sunset={weather.forecast.forecastday[0].astro.sunset}
          fontColor={fontColor}
        />
        <HourlyForecast
          forecast={
            weather?.forecast?.forecastday?.[0]?.hour?.map((h: any) => ({
              time: h.time,
              temp: h.temp_c,
              condition: h.condition.text,
            })) || []
          }
        />

        <TipCard tip={generateTip(temp_c, condition.text)} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 40,
  },
});
