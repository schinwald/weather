import { Navigation, Dashboard } from './layouts';
import { useState, useEffect, createContext } from 'react';

import './App.scss';

const axios = require('axios');



export const ContextLocations = createContext(null)

function App() {

	let [ locations, setLocations ] = useState(null);
	let [ location, setLocation ] = useState(null);

	// set default coordinates on mount
	useEffect(() => {

	}, [])
	
	useEffect(() => {
		axios.get(window.location.href + '/assets/worldcities.csv')
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
			<Dashboard />
			<footer className="attribution">
				<cite>
					<a href="https://storyset.com/city">City illustrations by Storyset</a>
				</cite>
			</footer>
		</div>
	)
}


export default App;