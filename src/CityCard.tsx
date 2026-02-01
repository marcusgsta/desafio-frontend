import { Forecast } from "./Forecast";
import type { ForecastData, WeatherData, WeatherLocation } from "./types";
import { weatherCodes } from "./weatherCodes-se";

    export function CityCard({weatherData, location, forecast}: 
        {
            weatherData: WeatherData,
            location: WeatherLocation | null,
            forecast?: ForecastData
        }) {

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

        const isDay = true;
        return (
            <>
                <div className="city-card">
                    <span className="address">{`${location?.admin2}, ${location?.country_code} - ${location?.country}`}</span>

                    <h2>{Math.round(weatherData?.current.temperature_2m ?? 0)}°C
                        &nbsp; {
                            isDay ? icon?.day.description : icon?.night.description
                        }

                    </h2>
                    <div className="weather-details">
                        <div>
                            <span className="arrow">↓</span>
                            <span className="bold">{Math.round(weatherData?.daily?.temperature_2m_min[0] ?? 0)}°
                            </span>
                            &nbsp;&nbsp;
                            <span className="arrow">↑</span>
                            <span className="bold">
                                {Math.round(weatherData?.daily?.temperature_2m_max[0] ?? 0)}°C
                            </span>
                        </div>
                        <div>
                            Känns som: <span className="bold">{sensation}°</span>
                        </div>
                        <div>
                            Vind <span className="bold">{windspeed} m/s</span>
                        </div>
                        <div>
                            Fuktighet<span className="bold"> {humidity}%</span>
                        </div>

                        

                    </div>
                    <hr className="divider" />

                <Forecast forecast={forecast}/>

                </div>

                </>
                )
    }
