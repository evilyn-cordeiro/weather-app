import {
  formatHour,
  getColorByWeather,
  getPeriod,
  getWeatherIcon,
} from "@/src/utils/weatherHelpers";
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

  if (!forecast || forecast.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noData}>Sem dados disponíveis</Text>
      </View>
    );
  }

  const now = new Date();
  const upcoming = forecast.filter((f) => new Date(f.time) >= now);
  const displayData = upcoming.slice(0, 24);
  const current = {
    time: now.toISOString(),
    temp: displayData[0]?.temp || forecast[0]?.temp || 0,
    condition:
      displayData[0]?.condition || forecast[0]?.condition || "ensolarado",
  };
  const allHours = [current, ...displayData];

  // TODO: estou determina o número de colunas dinamicamente
  const totalItems = allHours.length;
  const numCols =
    totalItems <= 4
      ? totalItems
      : totalItems <= 8
      ? 4
      : totalItems <= 10
      ? 5
      : 6;

  // TODO: estou dividindo os itens em linhas
  const rows: HourForecast[][] = [];
  for (let i = 0; i < totalItems; i += numCols) {
    rows.push(allHours.slice(i, i + numCols));
  }

  return (
    <View style={[styles.wrapper, { backgroundColor: `${baseColor}40` }]}>
      <BlurView
        intensity={50}
        tint="light"
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.darkOverlay} />

      <View style={styles.container}>
        {rows.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <View style={styles.row}>
              {row.map((item, index) => (
                <View
                  key={index}
                  style={[styles.hourItem, { width: `${100 / numCols - 4}%` }]}
                >
                  <Text style={styles.hourText}>
                    {formatHour(item.time, rowIndex * numCols + index)}
                  </Text>
                  <View style={styles.rowIcon}>
                    <MaterialCommunityIcons
                      name={getWeatherIcon(item.condition)}
                      size={20}
                      color="#fff"
                      style={{ marginVertical: 4 }}
                    />
                    <Text style={styles.tempText}>
                      {Math.round(item.temp)}°
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {rowIndex < rows.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 360,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 20,
    position: "relative",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  container: {
    paddingVertical: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 4,
  },
  rowIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    alignSelf: "stretch",
    marginHorizontal: 12,
  },
  hourItem: {
    alignItems: "center",
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
