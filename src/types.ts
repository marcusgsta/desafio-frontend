export interface WeatherLocation {
  admin1: string;           // e.g. "Västra Götaland"
  admin1_id: number;        // e.g. 3337386
  admin2: string;           // e.g. "Gothenburg Municipality"
  admin2_id: number;        // e.g. 2711533
  country: string;          // e.g. "Sweden"
  country_code: string;     // e.g. "SE"
  country_id: number;       // e.g. 2661886
  elevation: number;        // e.g. 10 (meters)
  feature_code: string;     // e.g. "PPLA"
  id: number;               // e.g. 2711537
  latitude: number;         // e.g. 57.70716
  longitude: number;        // e.g. 11.96679
  name: string;             // e.g. "Gothenburg"
  population: number;       // e.g. 608462
  timezone: string;         // e.g. "Europe/Stockholm"
}

export interface WeatherData {
  current: {
    time: Date;
    rain: number;
    weather_code: number;
    cloud_cover: number;
    precipitation: number;
    showers: number;
    snowfall: number;
    temperature_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  
  hourly: {
    time: Date[];
    temperature_2m: number[];
    visibility: number[];
    weather_code: number[];
    cloud_cover: number[];
    rain: number[];
  };
  
  daily: {
    time: Date[];
    rain_sum: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

interface DayNightForecast {
  description: string;
  image: string;
}

interface WeatherCodeEntry {
  day: DayNightForecast;
  night: DayNightForecast;
}

export type WeatherCodes = Record<string, WeatherCodeEntry>;


