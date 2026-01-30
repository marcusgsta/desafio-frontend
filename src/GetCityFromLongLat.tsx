import { useEffect, useState } from "react";

export function GetCityFromLongLat({city}: {city: string}) {

    const [location, setLocation] = useState<any | null>(null)
    // const [loading, setLoading] = useState(false)

    // const url = "https://geocoding-api.open-meteo.com/v1/search?name=Rio&count=1&language=en&format=json";
    // const weatherUrl = "https://api.open-meteo.com/v1/forecast"
    
    // useEffect(() => {
    //     if (!city) return;
    //     setLoading(true)

    // fetch(url)
    // .then(res => res.json())
    // .then(data => {
    //     console.log("hej:", data.results[0])
    //     const endpoint = `${weatherUrl}?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&hourly=temperature_2m`;
    //     console.log(endpoint)
    //     return fetch(endpoint)
    //     // ?latitude=52.52&longitude=13.41&hourly=temperature_2m"
    //     // let endpoint = `${url}?=${latitude}&=${longitude}&hourly=temperature_2m`;
    //     // setLocation(data.results[0]);
    //     // setLoading(false);
    // })
    // .then(res => res.json())
    // .then(data => {
    //     console.log("data here: ", data)
        
    // })
    
    // .catch(() => setLoading(false));
    // }, [city]); // körs bara när city ändras

    // if (loading) return <p>Laddar plats ...</p>
    
    // if (!location) return <p>Ingen plats hittad...</p>

    return (
        <div>
            <h2>{location.name}, {location.country}</h2>
            <p>Lat: {location.latitude}, Long: {location.longitude}</p>
        </div>
    )

}
