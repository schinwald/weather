import { ContextDashboard } from '../../App.js';
import { useContext } from 'react';
import { Weather, Bulletin } from '../helper';


function Current(props) {

    const { time, location, weather } = useContext(ContextDashboard);
    const current = weather ? weather.data.current : null;

    const forecastBody = weather ? (
        <div className="forecast__body">
            <Weather 
                title={<>
                    <h3>Now</h3>
                    <p>12:15pm EST</p>
                </>}
                code={current.weather[0].id} 
                description={current.weather[0].description}
                temperature={Math.round(current.temp - 273.15)} />
        </div>
    ) : (
        <div className="forecast__body">
        </div>
    )

    const newsBody = location ? (
        <div className="news__body">
            <img className="news__building animation--fade-in" src="assets/images/building.svg" alt="city building illustration"/>
            <p className="news__location animation--slide-up animation--delay-medium">{location.name}</p>
        </div>
    ) : (
        <div className="news__body">
        </div>
    );

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
                    { forecastBody }
                </div>
                {/* News section */}
                <div className="news card__title card__title--secondary">
                    <div className="news__title">
                        <h2>National News</h2>
                    </div>
                </div>
                <div className="news card__body card__body--secondary">
                    { newsBody }
                </div>
                <div className="news card__footer card__footer--secondary">
                    <Bulletin text={""} />
                </div>
            </div>
        </section>
    )
}


export { Current };