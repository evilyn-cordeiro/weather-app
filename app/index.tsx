import Loader from "@/src/components/Loader";
import TipCard from "@/src/components/TipCard";
import TopContainer from "@/src/components/TopContainer";
import { getWeather } from "@/src/services/weatherService";
import {
  generateTip,
  getColorByWeather,
  getIconByWeather,
  getPeriod,
  selectBackground,
} from "@/src/utils/weatherHelpers";

import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

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
  const city = weather.location.name;
  const period = getPeriod();

  const color = getColorByWeather(condition.text, period);
  const icon = getIconByWeather(condition.text);
  const time = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <ImageBackground source={background} style={styles.background}>
      <View style={styles.overlay}>
        <TopContainer
          color={color}
          condition={weather.current.condition.text}
          temperature={weather.current.temp_c}
          city={weather.location.name}
          time={time}
        />

        <Text style={styles.condition}>{condition.text}</Text>

        <TipCard tip={generateTip(temp_c, condition.text)} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  condition: { color: "#fff", fontSize: 22, marginTop: 10, fontWeight: "500" },
});
