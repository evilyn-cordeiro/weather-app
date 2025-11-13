import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WeatherIcon } from "./WeatherIcon";

interface TopContainerProps {
  color: string;
  condition: string;
  temperature: number;
  city: string;
  time: string;
}

export default function TopContainer({
  color,
  condition,
  temperature,
  city,
  time,
}: TopContainerProps) {
  return (
    <View style={[styles.topContainer, { backgroundColor: color }]}>
      <View style={styles.tempRow}>
        <WeatherIcon condition={condition} size={60} />
        <Text style={styles.tempText}>{Math.round(temperature)}°</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: "85%",
    height: 350,
    borderRadius: 50,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tempText: {
    color: "#fff",
    fontSize: 64,
    fontWeight: "bold",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  city: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  time: {
    color: "#fff",
    fontSize: 18,
  },
});
