import { fetchWeatherApi } from "openmeteo";
import type { WeatherApiParams, WeatherData, WeatherLocation } from "./types";


const URL = "https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast"


export default class WeatherService {

    private readonly weatherUrl: string;
    private readonly baseParams: WeatherApiParams;
    private readonly url: string = URL;

    constructor(urlOverride: string = WEATHER_URL) {
        this.weatherUrl = urlOverride;
        this.baseParams = {
            latitude: 0,
            longitude: 0,
            daily: ["rain_sum", "temperature_2m_max", "temperature_2m_min"],
            hourly: ["temperature_2m", "visibility", "weather_code", "cloud_cover", "rain"],
            current: ["rain", "weather_code", "cloud_cover", "precipitation", "showers", "snowfall", "temperature_2m", "apparent_temperature", "wind_speed_10m",
                "relative_humidity_2m"
            ],
            timezone: "auto",
            wind_speed_unit: "ms",
        };

    }

    async getWeatherData(lat: number, long: number): Promise<WeatherData> {
        const params = {...this.baseParams, latitude: lat, longitude: long};
        const responses = await fetchWeatherApi(this.weatherUrl, params);
            const response = responses[0]
            // Attributes for timezone and location
            const utcOffsetSeconds = response.utcOffsetSeconds();

            const current = response.current()!;
            const hourly = response.hourly()!;
            const daily = response.daily()!;

            // Note: The order of weather variables in the URL query and the indices below need to match!
            const weatherData = {
                current: {
                    time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                    rain: current.variables(0)!.value(),
                    weather_code: current.variables(1)!.value(),
                    cloud_cover: current.variables(2)!.value(),
                    precipitation: current.variables(3)!.value(),
                    showers: current.variables(4)!.value(),
                    snowfall: current.variables(5)!.value(),
                    temperature_2m: current.variables(6)!.value(),
                    apparent_temperature: current.variables(7)!.value(),
                    wind_speed_10m: current.variables(8)!.value(),
                    relative_humidity_2m: current.variables(9)!.value(),

                },
                hourly: {
                    time: Array.from(
                        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
                        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                    ),
                    temperature_2m: Array.from(hourly.variables(0)?.valuesArray() || []),
                    visibility: Array.from(hourly.variables(1)?.valuesArray() || []),
                    weather_code: Array.from(hourly.variables(2)?.valuesArray() || []),
                    cloud_cover: Array.from(hourly.variables(3)?.valuesArray() || []),
                    rain: Array.from(hourly.variables(4)?.valuesArray() || []),
                },
                daily: {
                    time: Array.from(
                        { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
                        (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
                    ),
                    rain_sum: Array.from(daily.variables(0)?.valuesArray() || []),
                    temperature_2m_max: Array.from(daily.variables(1)!.valuesArray() || []),
                    temperature_2m_min: Array.from(daily.variables(2)?.valuesArray() || []),
                },
            };
            return weatherData;
    }

    async searchLocation(city: string): Promise<WeatherLocation | undefined> {

        try {
            const res = await fetch(`${this.url}&name=${city}`)
            const data = await res.json();

            return data.results[0] || undefined;
        } catch (error) {
            console.log("Could not fetch weather data", error)
            return undefined;
        }

    }
}
