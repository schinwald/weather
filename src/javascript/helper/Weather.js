import { useState } from 'react';

const classNames = require('classnames');


function Weather(props) {

    const { title, code, description, temperature } = props;
    const [ details, setDetails ] = useState(false);
    
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
                    <p className="weather__description">{description}</p>
                    <p className="temperature">
                        <span className="temperature__value">{temperature}</span>
                        <span className="temperature__unit">{"°C"}</span>
                    </p>
                </div>
                <div className={classNames("weather__content", { "show": details, "hide": !details })}>
                    <div>details</div>
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