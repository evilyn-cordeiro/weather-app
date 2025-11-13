import React from "react";
import { Image } from "react-native";

type Props = {
  condition: string;
  size?: number;
};

export function WeatherIcon({ condition, size = 60 }: Props) {
  const cond = condition.toLowerCase();

  const icons = {
    rain: require("../../assets/icons/rain.svg"),
    snow: require("../../assets/icons/snow.svg"),
    cloudy: require("../../assets/icons/cloudy.svg"),
    sunny: require("../../assets/icons/sunny.svg"),
  };

  let icon = icons.sunny;

  if (cond.includes("chuva") || cond.includes("rain")) icon = icons.rain;
  else if (cond.includes("neve") || cond.includes("snow")) icon = icons.snow;
  else if (cond.includes("nublado") || cond.includes("cloud")) icon = icons.cloudy;

  return (
    <Image
      source={icon}
      style={{
        width: size,
        height: size,
        resizeMode: "contain",
      }}
    />
  );
}
