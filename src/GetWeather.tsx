import { useCallback, useEffect, useMemo, useState } from "react";
import { SearchField } from "./SearchField";
import type { ForecastData, WeatherData } from "./types";
import { CityCard } from "./CityCard";
import WeatherService from "./WeatherService";
import { useWeatherStore } from "./useWeatherStore";

export function GetWeather() {

    const [searchText, setSearchText] = useState('')
    const [weatherData, setWeatherData] = useState<WeatherData | null>()

    const weatherService = useMemo(() => new WeatherService(), [])

    const {
        searchForLocation,
        loadWeather,
        location
    } = useWeatherStore(weatherService);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!location) return;
            try {
                const weatherData = await loadWeather();
                setWeatherData(weatherData);
            } catch (error) {
                console.log("Could not fetch weather data", error);
            }
        }
        
        fetchWeather();

    }, [loadWeather, location])


    const getForecast = useCallback(() => {

        const forecast: ForecastData = {
            time: weatherData?.daily.time.slice(1, 6),
            min: weatherData?.daily.temperature_2m_min.slice(1, 6),
            max: weatherData?.daily.temperature_2m_max.slice(1, 6),
        }        
        return forecast;
    }, [weatherData])


    return (
        <>
            <h1>
                Väder
            </h1>
            <div className="wrapper">
                {weatherData &&
                    <CityCard
                        weatherData={weatherData}
                        location={location}
                        forecast={getForecast()} />}

                <SearchField value={searchText} setSearchText={setSearchText}
                    searchForText={searchForLocation} />


                {/* <Cities /> */}
            </div>
            <hr />
        </>
    )
}