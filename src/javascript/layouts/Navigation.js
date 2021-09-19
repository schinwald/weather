import { useContext } from 'react';
import { Search } from '../components';
import { ContextNavigation } from '../../App.js'


function Navigation(props) {

    const { onSearch } = props;
    const { locations } = useContext(ContextNavigation);

    return (
        <div className="navigation">
            <header className="header">
                <h1>Weather</h1>
            </header>
            <section className="message">
                <p>
                    <span>A semi-serious weather dashboard fueled by puns</span>
                </p>
            </section>
            <Search autocomplete={true} count={25} data={locations} onSearch={onSearch} />
        </div>
    )
}


export { Navigation };