import { useState } from 'react';

const classNames = require('classnames');


function Weather(props) {

    const { title, data } = props;
    const [ details, setDetails ] = useState(false);
    
    return (
        <div className="weather">
            <div className="weather__title">
                {title}
            </div>
            <div className="weather__body"
                onClick={() => { setDetails(!details); }}>
                <div className={classNames("weather__content", { "show": !details, "hide": details })}>
                    <div className="weather__image wi wi-owm-300">
                    </div>
                    <p className="weather__description">{"Cloudy with a chance of meatballs"}</p>
                    <p className="temperature">
                        <span className="temperature__value">{"15"}</span>
                        <span className="temperature__unit">{"°C"}</span>
                    </p>
                </div>
                <div className={classNames("weather__content", { "show": details, "hide": !details })}>
                    <div>details</div>
                </div>
            </div>
            <div className="weather__button"
                onClick={() => { setDetails(!details); }}>
                <span className={classNames({ "active": !details })}>More Details</span>
                <span className={classNames({ "active": details })}>Less Details</span>
            </div>
        </div>
    )
}


export { Weather };