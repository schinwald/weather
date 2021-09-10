import { ContextLocation } from '../../App.js';
import { useContext } from 'react';
import { Weather, Bulletin } from '../helper';


function Current(props) {

    const { location } = useContext(ContextLocation);
    console.log(location)

    const weatherTitle = (
        <>
            <h3>Now</h3>
            <p>12:15pm EST</p>
        </>
    )

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
                    <div className="forecast__body">
                        <Weather title={weatherTitle} code={"wi-owm-200"} data={null}/>
                    </div>
                </div>
                {/* News section */}
                <div className="news card__title card__title--secondary">
                    <div className="news__title">
                        <h2>National News</h2>
                    </div>
                </div>
                <div className="news card__body card__body--secondary">
                    <img className="news__building" src="assets/images/building.svg" alt="city building illustration"/>
                    <p className="news__location">{"Guelph, Ontario"}</p>
                </div>
                <div className="news card__footer card__footer--secondary">
                    <Bulletin text={""} />
                </div>
            </div>
        </section>
    )
}


export { Current };