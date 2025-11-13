import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Loader() {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.text}>Carregando clima...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "#fff", marginTop: 10 },
});
