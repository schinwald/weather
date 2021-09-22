import { useState } from 'react';

const classNames = require('classnames');


function Weather(props) {

    const { title, code, description, temperature, feelsLike, precipitation, humidity, clouds, wind } = props;
    const [ details, setDetails ] = useState(false);
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

    function degreeToDirection(degree) {
        return directions[Math.round(degree / 22.5) % 16];
    }
    const classWindDirection = "wi-towards-" + degreeToDirection(wind.degree).toLowerCase()
    
    return (
        <div className="weather">
            <div className="weather__title animation--slide-up animation--delay-medium">
                {title}
            </div>
            <div className="weather__body animation--fade-in"
                onClick={() => { setDetails(!details); }}>
                <div className={classNames("weather__content", { "show": !details, "hide": details })}>
                    <div className={classNames("weather__image wi", "wi-owm-" + code)}>
                    </div>
                    <p className="temperature">
                        <span className="temperature__value">{temperature}</span>
                        <span className="temperature__unit">{"°C"}</span>
                    </p>
                    <p className="weather__description">{description}</p>
                </div>
                <div className={classNames("weather__content", { "show": details, "hide": !details })}>
                    <table className={"weather__details"}>
                        <tbody>
                            <tr>
                                <td>Temperature:</td>
                                <td>{temperature + "°C"}</td>
                            </tr>
                            <tr>
                                <td>Feels-like:</td>
                                <td>{feelsLike + "°C"}</td>
                            </tr>
                            <tr>
                                <td>Precepitation:</td>
                                <td>{Math.round(precipitation * 100) + "%"}</td>
                            </tr>
                            <tr>
                                <td>Humidity:</td>
                                <td>{humidity + "%"}</td>
                            </tr>
                            <tr>
                                <td>Clouds:</td>
                                <td>{clouds + "%"}</td>
                            </tr>
                            <tr>
                                <td>Wind Speed:</td>
                                <td>{Math.round(wind.speed) + "m/s"}</td>
                            </tr>
                            <tr>
                                <td>Direction:</td>
                                <td>
                                    <p>
                                        <span>{degreeToDirection(wind.degree)}</span>
                                        <span className={classNames("wi wi-wind", classWindDirection)}></span>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="weather__button animation--slide-up animation--delay-medium"
                onClick={() => { setDetails(!details); }}>
                <span className={classNames({ "active": !details })}>More Details</span>
                <span className={classNames({ "active": details })}>Less Details</span>
            </div>
        </div>
    )
}


export { Weather };