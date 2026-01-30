import { useEffect, useState } from "react";
import { Cities } from "./Cities";
import { fetchWeatherApi } from "openmeteo";
import { SearchField } from "./SearchField";
import type { WeatherData, WeatherLocation } from "./types";
import { weatherCodes } from "./weatherCodes";

export function GetWeather() {

    const [searchText, setSearchText] = useState('')
    const [loading, setLoading] = useState(false)
    const [weatherData, setWeatherData] = useState<WeatherData>()
    const [location, setLocation] = useState<WeatherLocation>();


    const params = {
        latitude: location?.latitude,
        longitude: location?.longitude,
        daily: ["rain_sum", "temperature_2m_max", "temperature_2m_min"],
        hourly: ["temperature_2m", "visibility", "weather_code", "cloud_cover", "rain"],
        current: ["rain", "weather_code", "cloud_cover", "precipitation", "showers", "snowfall", "temperature_2m", "apparent_temperature", "wind_speed_10m",
        "relative_humidity_2m"
        ],
        timezone: "auto",
        wind_speed_unit: "ms",
    };

    const url = "https://geocoding-api.open-meteo.com/v1/search?count=1&language=en&format=json";
    const weatherUrl = "https://api.open-meteo.com/v1/forecast"

    useEffect(() => {

        const loadWeather = async () => {
            const responses = await fetchWeatherApi(weatherUrl, params);
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

            setWeatherData(weatherData)
        }
        loadWeather()
    }, [location])


    function searchForLocation(city: string) {


        if (!city) return;
        setLoading(true)

        fetch(`${url}&name=${city}`)
            .then(res => res.json())
            .then(data => {
                const location: WeatherLocation = data.results[0];

                setLocation(location)
            })

            .catch(() => setLoading(false));

        if (loading) return <p>Laddar plats ...</p>

        if (!location) return <p>Ingen plats hittad...</p>

    }


    function CityCard({ name }: { name: string }) {

        let icon;
        const code = weatherData?.current?.weather_code.toString();
        if (code && code in weatherCodes) {
            icon = weatherCodes[code]
        }
        
        let sensation = weatherData?.current.apparent_temperature;
        sensation = Math.round(sensation ?? 0);
        let windspeed = weatherData?.current.wind_speed_10m;
        windspeed = Math.round(windspeed ?? 0)
        let humidity = weatherData?.current.relative_humidity_2m;
        console.log(weatherData)

        const isDay = true;
        return (
            <>
                <div className="date-card">
                    <span>{`${location?.admin2}, ${location?.country_code} - ${location?.country}`}</span>
                    <h2>{name}</h2>
                    <h3>{Math.round(weatherData?.current.temperature_2m ?? 0)}°C 
                        &nbsp; {
                            isDay ? icon?.day.description : icon?.night.description
                        }

                    </h3>
                    <p><span className="arrow">↓</span> {Math.round(weatherData?.daily?.temperature_2m_min[0] ?? 0)}° 
                        &nbsp;&nbsp;<span className="arrow">↑</span> {Math.round(weatherData?.daily?.temperature_2m_max[0] ?? 0)}°
                        
                        Känns som: {sensation}° 
                        </p>
                        <p>Vind {windspeed} &nbsp;&nbsp; Fuktighet {humidity}</p>
                </div>
                <hr />

            </>
        )
    }


    return (
        <>
            <h1>
                Vädret
            </h1>
            {location?.name && <CityCard name={location?.name} />}

            <SearchField value={searchText} setSearchText={setSearchText}
                searchForText={searchForLocation} />
            
            {/* <Cities /> */}
        </>
    )
}