import { Navigation, Dashboard, Attribution } from './javascript/layouts';
import { useState, useEffect, createContext } from 'react';

import './css/App.scss';
import './css/weather-icons.min.css';
import './css/weather-icons-wind.min.css';

const axios = require('axios');



export const ContextLocations = createContext();
export const ContextLocation = createContext();

function App() {

	let [ locations, setLocations ] = useState(null);
	let [ location, setLocation ] = useState({ name: "hello" });

	// set default coordinates on mount
	useEffect(() => {

	}, [])
	
	useEffect(() => {
		axios.get(window.location.href + '/assets/data/worldcities.csv')
			.then((response) => {
				const data = response.data.split("\n")
					.filter((line, index) => {
						if (index !== 0) return true;
						return false;
					})
					.map((line) => {
						const lines = line.split(/[\s]*[,][\s]*/);
						return {
							tag: (lines[0] + ", " + lines[1]).toLowerCase(),
							name: lines[2] + ", " + lines[1],
							latitude: lines[3],
							longitude: lines[4],
							iso: lines[5]
						}
					});
				setLocations(data);
			})
			.catch((error) => {
				
			});
	}, []);

	function handleSearch(query) {
		setLocation(query);
	}

	return (
		<div className="container">
			<ContextLocations.Provider value={locations}>
				<Navigation onSearch={handleSearch} />
			</ContextLocations.Provider>
			<ContextLocation.Provider value={location}>
				<Dashboard />
			</ContextLocation.Provider>
			<Attribution />
		</div>
	)
}


export default App;