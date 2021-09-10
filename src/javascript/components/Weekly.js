import { Weather } from '../helper';


function Weekly(props) {
    
    return (
        <div className="card">
            <div className="weekly card__content">
                {/* Forecast section */}
                <div className="card__title card__title--primary">
                    <h2>Weekly Forecast</h2>
                </div>
                <div className="card__body card__body--primary">
                    <div className="forecast__body">
                        <Weather title={<h3>Friday</h3>} code={"wi-owm-200"} data={null}></Weather>
                        <Weather title={<h3>Saturday</h3>} code={"wi-owm-200"} data={null}></Weather>
                        <Weather title={<h3>Sunday</h3>} code={"wi-owm-200"} data={null}></Weather>
                        <Weather title={<h3>Monday</h3>} code={"wi-owm-200"} data={null}></Weather>
                        <Weather title={<h3>Tuesday</h3>} code={"wi-owm-200"} data={null}></Weather>
                        <Weather title={<h3>Wednesday</h3>} code={"wi-owm-200"} data={null}></Weather>
                        <Weather title={<h3>Thursday</h3>} code={"wi-owm-200"} data={null}></Weather>
                    </div>
                </div>
            </div>
        </div>
    )
}


export { Weekly };