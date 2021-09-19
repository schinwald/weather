import { ContextDashboard } from '../../App';
import { Weather } from '../helper';
import { useContext } from 'react';


function Weekly(props) {

    const { location, weather } = useContext(ContextDashboard);

    const forecastBody = location ? (
        <div className="forecast__body">
            <Weather title={<h3>Friday</h3>} code={200} data={null}></Weather>
            <Weather title={<h3>Saturday</h3>} code={200} data={null}></Weather>
            <Weather title={<h3>Sunday</h3>} code={200} data={null}></Weather>
            <Weather title={<h3>Monday</h3>} code={200} data={null}></Weather>
            <Weather title={<h3>Tuesday</h3>} code={200} data={null}></Weather>
            <Weather title={<h3>Wednesday</h3>} code={200} data={null}></Weather>
            <Weather title={<h3>Thursday</h3>} code={200} data={null}></Weather>
        </div>
    ) : (
        <div className="forecast__body">
        </div>
    )
    
    return (
        <div className="card">
            <div className="weekly card__content">
                {/* Forecast section */}
                <div className="card__title card__title--primary">
                    <h2>Weekly Forecast</h2>
                </div>
                <div className="card__body card__body--primary">
                    { forecastBody }
                </div>
            </div>
        </div>
    )
}


export { Weekly };