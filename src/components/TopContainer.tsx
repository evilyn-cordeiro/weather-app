import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WeatherIcon } from "./WeatherIcon";

interface TopContainerProps {
  color: string;
  condition: string;
  temperature: number;
  feelsLike: number;
  city: string;
  region: string;
  time: string;
  sunset: string;
  fontColor?: string;
  onDayChange?: (day: string) => void;
}

export default function TopContainer({
  color,
  condition,
  temperature,
  feelsLike,
  city,
  region,
  sunset,
  fontColor = "#fff",
  onDayChange,
}: TopContainerProps) {
  const [selectedDay, setSelectedDay] = useState("Hoje");
  const [modalVisible, setModalVisible] = useState(false);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const nextDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(date.getDate() + i);
    if (i === 0) return { label: "Hoje", value: "Hoje" };
    return {
      label: d.toLocaleDateString("pt-BR", { weekday: "long" }),
      value: d.toISOString(),
    };
  });

  const handleSelectDay = (value: string) => {
    setSelectedDay(value);
    setModalVisible(false);
    if (onDayChange) onDayChange(value);
  };

  return (
    <View style={[styles.topContainer, { backgroundColor: color }]}>
      {/* SELETOR SIMPLES (TEXTO + SETA) */}
      <TouchableOpacity
        style={styles.daySelector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.dayText, { color: fontColor }]}>
          {selectedDay}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={26}
          color={fontColor}
        />
      </TouchableOpacity>

      {/* MODAL DE SELEÇÃO */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[styles.modalContent, { backgroundColor: color + "DD" }]}
          >
            <FlatList
              data={nextDays}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectDay(item.label)}
                >
                  <Text style={[styles.modalText, { color: fontColor }]}>
                    {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* ÍCONE + TEMPERATURA */}
      <View style={styles.tempRow}>
        <WeatherIcon condition={condition} size={64} />
        <Text style={[styles.tempText, { color: fontColor }]}>
          {Math.round(temperature)}°
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={[styles.condition, { color: fontColor }]}>
          {condition}
        </Text>
        <Text style={[styles.city, { color: fontColor }]}>
          {city}, {region}
        </Text>
        <Text style={[styles.date, { color: fontColor }]}>{formattedDate}</Text>
        <View style={styles.rowDetails}>
          {/* sensação termica */}
          <Text style={[styles.info, { color: fontColor }]}>
            ST: {Math.round(feelsLike)}°{" "}
          </Text>
          {/* pôr do sol */}
          <Text style={[styles.info, { color: fontColor }]}>
            {" "}
            | SS: {sunset}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width: 360,
    height: 400,
    borderRadius: 35,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  daySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  dayText: {
    fontSize: 25,
    fontWeight: "500",
    marginRight: 6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 220,
    borderRadius: 16,
    paddingVertical: 10,
  },
  modalItem: {
    paddingVertical: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
  },
  tempRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  tempText: {
    fontSize: 100,
    fontWeight: 600,
    marginLeft: 8,
  },
  details: {
    alignItems: "center",
    gap: 8,
  },
  condition: {
    fontSize: 22,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  city: {
    fontSize: 18,
    marginTop: 2,
  },
  date: {
    fontSize: 16,
    marginTop: 4,
  },
  info: {
    fontSize: 16,
    marginTop: 4,
  },
  rowDetails: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
