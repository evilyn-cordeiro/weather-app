export function selectBackground(condition: string) {
  const hour = new Date().getHours();

  let period = "morning";
  if (hour >= 12 && hour < 18) period = "afternoon";
  else if (hour >= 18 || hour < 6) period = "night";

  let type = "sunny";
  const cond = condition.toLowerCase();
  if (cond.includes("rain") || cond.includes("chuva")) type = "rain";
  else if (cond.includes("snow") || cond.includes("neve")) type = "snow";
  else if (cond.includes("cloud") || cond.includes("nublado")) type = "cloudy";

  const paths: any = {
    morning: {
      sunny: require("../../assets/backgrounds/morning/sunny.png"),
      cloudy: require("../../assets/backgrounds/morning/cloudy.png"),
      rain: require("../../assets/backgrounds/morning/rain.png"),
      snow: require("../../assets/backgrounds/morning/snow.png"),
    },
    afternoon: {
      sunny: require("../../assets/backgrounds/afternoon/sunny.png"),
      cloudy: require("../../assets/backgrounds/afternoon/cloudy.png"),
      rain: require("../../assets/backgrounds/afternoon/rain.png"),
      snow: require("../../assets/backgrounds/afternoon/snow.png"),
    },
    night: {
      cloudy: require("../../assets/backgrounds/night/cloudy.png"),
      rain: require("../../assets/backgrounds/night/rain.png"),
      sunny: require("../../assets/backgrounds/morning/sunny.png"),
      snow: require("../../assets/backgrounds/night/rain.png"),
    },
  };

  return paths[period][type];
}


export const getWeatherIcon = (condition?: string) => {
  const cond = condition?.toLowerCase() || "";
  if (cond.includes("chuva") || cond.includes("rain")) return "weather-rainy";
  if (cond.includes("neve") || cond.includes("snow")) return "weather-snowy";
  if (cond.includes("nublado") || cond.includes("cloud")) return "weather-cloudy";
  return "weather-sunny";
};

export const formatHour = (timeStr: string, index: number) => {
  if (index === 0) return "AGORA";
  const date = new Date(timeStr);
  let hour = date.getHours();
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour.toString().padStart(2, "0")}:00 ${ampm}`;
};


export function getColorByWeather(condition: string, period: string) {
  const cond = condition.toLowerCase();

  // NUBLADO
  if (cond.includes("nublado") || cond.includes("cloud")) {
    if (period === "morning") return "#91B4C6";
    if (period === "afternoon") return "#5A8BAB";
    return "#9090AC"; // noite
  }

  // ENSOLARADO
  if (cond.includes("sol") || cond.includes("sunny")) {
    return "#FAE2BD";
  }

  // CHUVOSO
  if (cond.includes("chuva") || cond.includes("rain")) {
    if (period === "morning") return "#7FC3AE";
    if (period === "afternoon") return "#40666A";
    return "#615273"; // noite
  }

  // NEVANDO ❄️
  if (cond.includes("neve") || cond.includes("snow")) {
    return "#99B8CC";
  }

  return "#FAE2BD";
}

export function getFontColorByWeather(condition: string, period: string) {
  const cond = condition.toLowerCase();

  // NUBLADO
  if (cond.includes("nublado") || cond.includes("cloud")) {
    if (period === "morning") return "#CAD7DF";
    if (period === "afternoon") return "#AED5E4";
    return "#484A82"; // noite
  }

  // ENSOLARADO
  if (cond.includes("sol") || cond.includes("sunny")) {
    return "#EFAA82";
  }

  // CHUVOSO
  if (cond.includes("chuva") || cond.includes("rain")) {
    if (period === "morning") return "#C9E8E0";
    if (period === "afternoon") return "#C9E8E0";
    return "#C2B8FF"; // noite
  }

  // NEVANDO
  if (cond.includes("neve") || cond.includes("snow")) {
    return "#E4F1F9";
  }

  return "#FFFFFF"; // fallback neutro
}



export function getIconByWeather(condition: string) {
  const cond = condition.toLowerCase();
  if (cond.includes("chuva")) return "weather-rainy";
  if (cond.includes("neve")) return "weather-snowy";
  if (cond.includes("nublado")) return "weather-cloudy";
  return "weather-sunny";
}

export function getPeriod() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  return "night";
}

export function generateTip(temp: number, condition: string) {
  const cond = condition.toLowerCase();
  if (cond.includes("chuva"))
    return "Leve um guarda-chuva e evite sair sem capa de chuva.";
  if (cond.includes("neve"))
    return "Vista-se bem! O clima está gelado e pode nevar.";
  if (temp > 30) return "Hidrate-se bem e evite o sol forte entre 10h e 16h.";
  if (temp < 20)
    return "Clima ameno — bom momento para um café ou uma caminhada leve.";
  return "Dia agradável para aproveitar ao ar livre!";
}
