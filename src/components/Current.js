import { Weather, News } from '../helper';


function Current(props) {

    return (
        <div className="card__content">
            {/* Forecast section */}
            <div className="card__title card__title--primary">
                <h2>Current Forecast</h2>
            </div>
            <div className="card__body card__body--primary">
                <Weather title={""} data={null}/>
            </div>
            {/* News section */}
            <div className="card__title card__title--secondary">
                <h2>National News</h2>
            </div>
            <div className="card__body card__body--secondary">
                
            </div>
            <div className="card__footer card__footer--secondary">
                <News text={"No Alerts dsfaasdf asdf sd fasdf asdf asd fasd fasdf assdgs 1"} />
            </div>
        </div>
    )
}


export { Current };