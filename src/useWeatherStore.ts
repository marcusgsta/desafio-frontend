import { useCallback, useState } from "react";
import type { WeatherLocation } from "./types";
import type WeatherService from "./WeatherService";


export const useWeatherStore = (weatherService: WeatherService) => {
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState<WeatherLocation | null>(null);

    const loadWeather = useCallback(async () => {
        if (!location) {
            console.log("No location – could not load weather")
            return null;
        }
            setLoading(true);
            try {
                const weatherData = await weatherService.getWeatherData(location?.latitude, location?.longitude);
                return weatherData;
            } catch (error) {
                console.error("Weather load failed: ", error);
                return null;
            } finally {
                setLoading(false);
            }
    }, [location, weatherService]);

    const searchForLocation = useCallback(async (city: string) => {
        if (!city.trim()) return;
        setLoading(true)
        try {
            const foundLocation = await weatherService.searchLocation(city);            
            if (foundLocation) {
                setLocation(foundLocation);
            }
        } catch (error) {
            console.log("Location search failed:", error);
        } finally {
            setLoading(false);
        }
    }, [weatherService]);
    

return {
    loadWeather,
    searchForLocation,
    location,
    loading,
    getLocation : () => location,
}
}