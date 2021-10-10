import { ContextDashboard } from '../../App.js';
import { useContext } from 'react';
import { Weather, Bulletin } from '../helper';

function Current(props) {

    const { time, location, weather } = useContext(ContextDashboard);
    let forecast;
    let news;

    if (time && location && weather) {
        const current = weather.data.current;
        const minutely = weather.data.minutely;
        const hourly = weather.data.hourly;
        let local = time + weather.data.timezone_offset;
        let minutes = Math.floor(local / 60) % 60;
        let hours = ((Math.floor(local / 3600) - 1) % 24) + 1;
        let period = hours < 12 ? "am" : "pm";
        hours = ((hours - 1) % 12) + 1;
        forecast = {
            body: 
                <div className="forecast__body">
                    <Weather 
                        title={<>
                            <h3>Now</h3>
                            <p>{hours + ":" + minutes.toString().padStart(2, "0") + period}</p>
                        </>}
                        code={current.weather[0].id} 
                        description={current.weather[0].description}
                        temperature={Math.round(current.temp - 273.15)}
                        feelsLike={Math.round(current.feels_like - 273.15)}
                        precipitation={minutely ? minutely[minutes].precipitation : hourly[0].pop}
                        humidity={current.humidity}
                        clouds={current.clouds}
                        wind={{
                            degree: current.wind_deg,
                            speed: current.wind_speed
                        }} />
                </div>
        }
        news = {
            body: (
                <div className="news__body">
                    <img className="news__building animation--fade-in" src="assets/images/building.svg" alt="city building illustration"/>
                    <p className="news__location animation--slide-up animation--delay-medium">{location.name}</p>
                </div>
            ),
            alerts: weather.data.alerts
        }
    } else {
        forecast = {
            body: 
                <div className="forecast__body">
                </div>
        }
        news = {
            body: (
                <div className="news__body">
                </div>
            ),
            alerts: null
        }
    }

    return (
        <section className="card">
            <div className="current card__content">
                {/* Forecast section */}
                <div className="forecast current card__title card__title--primary">
                    <div className="forecast__title">
                        <h2>Current Forecast</h2>
                    </div>
                </div>
                <div className="forecast card__body card__body--primary">
                    { forecast.body }
                </div>
                {/* News section */}
                <div className="news card__title card__title--secondary">
                    <div className="news__title">
                        <h2>National News</h2>
                    </div>
                </div>
                <div className="news card__body card__body--secondary">
                    { news.body }
                </div>
                <div className="news card__footer card__footer--secondary">
                    <Bulletin alerts={news.alerts} />
                </div>
            </div>
        </section>
    )
}


export { Current };