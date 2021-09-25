import { ContextDashboard } from '../../App';
import { Weather } from '../helper';
import { useContext } from 'react';


function Weekly(props) {

    const { time, location, weather } = useContext(ContextDashboard);
    let forecast;

    if (location !== null && weather !== null) {
        const current = weather.data.current;
        const daily = weather.data.daily;
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const weekdayOffset = new Date(time + weather.data.timezone_offset).getDay();
        forecast = {
            body: 
                <div className="forecast__body">
                    { 
                        daily.map((day, index) => {
                            if (index === 7) return null;
                            return (
                                <Weather 
                                    key={index}
                                    title={
                                        <h3>{weekdays[(index + weekdayOffset) % 7]}</h3>
                                    }
                                    code={day.weather[0].id}
                                    description={day.weather[0].description}
                                    temperature={Math.round(day.temp.day - 273.15)}
                                    feelsLike={Math.round(day.feels_like.day - 273.15)}
                                    precipitation={day.pop}
                                    humidity={day.humidity}
                                    clouds={day.clouds}
                                    wind={{
                                        degree: day.wind_deg,
                                        speed: day.wind_speed
                                    }} />
                            )
                        })
                    }
                    </div>
        }        
    } else {
        forecast = {
            body: 
                <div className="forecast__body">
                </div>
        }
    }
    
    return (
        <div className="card">
            <div className="weekly card__content">
                {/* Forecast section */}
                <div className="forecast card__title card__title--primary">
                    <h2>Weekly Forecast</h2>
                </div>
                <div className="forecast card__body card__body--primary">
                    { forecast.body }
                </div>
            </div>
        </div>
    )
}


export { Weekly };