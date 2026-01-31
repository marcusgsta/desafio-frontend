import type { ForecastData } from "./types";



export function Forecast({forecast}: {forecast: ForecastData}) {

    const Week = () => (
        <div className="week-wrapper">
            <ul className="weather-days">
            {
                forecast.time?.map((day, index) => (
                    <li key={index}>
                        <span className="weekday">
                            {
                                day.toLocaleDateString('sv-SE', { weekday: 'long' })
                            }
                        </span>
                        
                        <span className="minmax">
                            {Math.round(forecast.min?.[index] ?? 0)}°&nbsp;
                            {Math.round(forecast.max?.[index] ?? 0)}°
                        </span>
                            </li>)
                )
            }
            </ul>

        </div>
    )



    return (
        <>
            <Week />
        </>
    )
}