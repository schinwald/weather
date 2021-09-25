const classNames = require('classnames');


const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];

function degreeToDirection(degree) {
    return directions[Math.round(degree / 22.5) % 16];
}

function Details(props) {

    const { temperature, feelsLike, precipitation, humidity, clouds, wind } = props;
    const classWindDirection = "wi-towards-" + degreeToDirection(wind.degree).toLowerCase()

    return (
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
    )
}


export { Details };