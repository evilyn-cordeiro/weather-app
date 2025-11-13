import { getColorByWeather, getPeriod } from "@/src/utils/weatherHelpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HourForecast {
  time: string;
  temp: number;
  condition?: string;
}

interface HourlyForecastProps {
  forecast: HourForecast[];
  conditionColor?: string;
}

export default function HourlyForecast({
  forecast = [],
  conditionColor,
}: HourlyForecastProps) {
  const period = getPeriod();
  const baseColor =
    conditionColor ||
    getColorByWeather(forecast[0]?.condition || "ensolarado", period);

  const getIcon = (condition?: string) => {
    const cond = condition?.toLowerCase() || "";
    if (cond.includes("chuva") || cond.includes("rain")) return "weather-rainy";
    if (cond.includes("neve") || cond.includes("snow")) return "weather-snowy";
    if (cond.includes("nublado") || cond.includes("cloud"))
      return "weather-cloudy";
    return "weather-sunny";
  };

  const getHour = (timeStr: string, index: number) => {
    if (index === 0) return "AGORA";
    const date = new Date(timeStr);
    let hour = date.getHours();
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour.toString().padStart(2, "0")}:00 ${ampm}`;
  };

  if (!forecast || forecast.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>Sem dados disponíveis</Text>
      </View>
    );
  }

  const now = new Date();
  const upcoming = forecast.filter((f) => new Date(f.time) >= now).slice(0, 10);
  const displayData = upcoming.length > 0 ? upcoming : forecast.slice(0, 10);
  const current = {
    time: now.toISOString(),
    temp: displayData[0]?.temp || 0,
    condition: displayData[0]?.condition || "ensolarado",
  };

  const nextHours = [current, ...displayData];
  const firstRow = nextHours.slice(0, 5);
  const secondRow = nextHours.slice(5, 10);

  return (
    <View style={[styles.wrapper, { backgroundColor: `${baseColor}30` }]}>
      <BlurView
        intensity={60}
        tint="light"
        style={StyleSheet.absoluteFillObject}
      />

      <View style={styles.darkOverlay} />

      <View style={styles.container}>
        <View style={styles.row}>
          {firstRow.map((item, index) => (
            <View key={index} style={styles.hourItem}>
              <Text style={styles.hourText}>{getHour(item.time, index)}</Text>
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name={getIcon(item.condition)}
                  size={26}
                  color="#fff"
                  style={{ marginVertical: 4 }}
                />
                <Text style={styles.tempText}>{Math.round(item.temp)}°</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          {secondRow.map((item, index) => (
            <View key={index} style={styles.hourItem}>
              <Text style={styles.hourText}>
                {getHour(item.time, index + 5)}
              </Text>
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name={getIcon(item.condition)}
                  size={26}
                  color="#fff"
                  style={{ marginVertical: 4 }}
                />
                <Text style={styles.tempText}>{Math.round(item.temp)}°</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 20,
    position: "relative",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)", // 👈 leve camada escura para melhorar contraste
  },
  container: {
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignSelf: "stretch",
    marginHorizontal: 12,
  },
  hourItem: {
    alignItems: "center",
    width: "18%",
  },
  hourText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  tempText: {
    fontSize: 12,
    marginTop: 2,
    color: "#fff",
  },
  noData: {
    textAlign: "center",
    fontSize: 14,
    padding: 10,
    color: "#fff",
  },
});
