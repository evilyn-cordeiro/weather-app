import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface TipCardProps {
  tip: string;
}

export default function TipCard({ tip }: TipCardProps) {
  return (
    <View style={styles.tipContainer}>
      <Text style={styles.tipTitle}>Dica do dia</Text>
      <Text style={styles.tipText}>{tip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tipContainer: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    width: "80%",
  },
  tipTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
    fontSize:18,
    textAlign: "justify",
  },
  tipText: { color: "#fff", textAlign: "justify", fontSize: 16},
});
