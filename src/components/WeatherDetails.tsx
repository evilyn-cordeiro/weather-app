import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WeatherDetailsProps {
  condition: string;
  city: string;
  feelsLike: number;
  sunset: string;
}

export default function WeatherDetails({
  condition,
  city,
  feelsLike,
  sunset,
}: WeatherDetailsProps) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <Text style={styles.condition}>{condition}</Text>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <Text style={styles.info}>Sensação térmica: {Math.round(feelsLike)}°</Text>
      <Text style={styles.info}>Pôr do sol: {sunset}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  condition: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    textTransform: "capitalize",
  },
  city: {
    fontSize: 18,
    color: "#fff",
    marginTop: 4,
  },
  date: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
  },
  info: {
    fontSize: 16,
    color: "#fff",
    marginTop: 6,
  },
});
