import { Navigation, Dashboard, Attribution } from './javascript/layouts';
import { useState, useEffect, createContext } from 'react';

import './css/App.scss';
import './css/weather-icons.min.css';
import './css/weather-icons-wind.min.css';

const axios = require('axios');


export const ContextNavigation = createContext();
export const ContextDashboard = createContext();

function App() {

	const appid = "65db06f345b14374b5457eb57768f47f";
	let [ locations, setLocations ] = useState(null);
	let [ location, setLocation ] = useState(null);
	let [ weather, setWeather ] = useState(null);
	let [ time, setTime ] = useState(Math.floor(new Date().getTime() / 1000));

	setInterval(() => {
		setTime(Math.floor(new Date().getTime() / 1000));
	}, 1000);

	// retrieve locations data on mount
	useEffect(() => {
		let locations = JSON.parse(window.localStorage.getItem("locations"));
		if (locations === null) {
			axios.get(window.location.href + '/assets/data/worldcities.csv')
			.then((response) => {
				locations = response.data.split("\n")
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
			}).catch((error) => {
				locations = null;
			});
		}
		setLocations(locations);	
		return () => {
			window.localStorage.setItem("locations", JSON.stringify(locations));
		}	
	}, []);

	// retrieve GPS coordinates and attach to location name
	useEffect(() => {
		if (locations !== null) {
			navigator.geolocation.getCurrentPosition((position) => {
				const coordinates = position.coords;
				const reduced = locations.map((element, index) => {
						return {
							index: index,
							distance: Math.sqrt(Math.pow(element.latitude - coordinates.latitude, 2) + Math.pow(element.longitude - coordinates.longitude, 2))
						}
					})
					.reduce((accumulator, element, index) => {
						if (index === 0) return element;
						if (element.distance < accumulator.distance) return element;
						return accumulator;
					});
				const location = JSON.parse(JSON.stringify(locations[reduced.index]));
				location.latitude = coordinates.latitude;
				location.longitude = coordinates.longitude;
				setLocation(location);
			}, (error) => {
				
			});
		}
	}, [locations]);

	// retrieve weather information for each location including timestamp of last retrieval
	useEffect(() => {
		if (location !== null) {
			let update = false;
			// first time getting weather data
			if (weather === null) {
				const stored = JSON.parse(window.localStorage.getItem("weather: " + location.tag));
				// update if there is no cached information
				if (stored === null) {
					update = true;
				// check if cached information is outdated
				} else {
					const difference = stored.timestamp - time;
					// update outdated information
					if (difference <= -3600) {
						update = true;
					// information is up to date so we can use the cached information
					} else {
						setWeather(stored);
					}
				}
			// weather data exists should we update it?
			} else {
				// location has changed so we should update or use cached information
				if (weather.location.tag !== location.tag) {
					const stored = JSON.parse(window.localStorage.getItem("weather: " + location.tag));
					// update if there is no cached information
					if (stored === null) {
						update = true;
					// check if cached information is outdated
					} else {
						const difference = stored.timestamp - time;
						// update outdated information
						if (difference <= -3600) {
							update = true;
						// information is up to date so we can use the cached information
						} else {
							setWeather(stored);
						}
					}
				// location hasn't changed, but should we still update?
				} else {
					const difference = weather.timestamp - time;
					// update outdated information
					if (difference <= -3600) {
						update = true;
					}
				}
			}
			// update information from api
			if (update === true) {
				axios.get("https://api.openweathermap.org/data/2.5/onecall?lat=" + location.latitude + "&lon=" + location.longitude + "&appid=" + appid)
					.then((response) => {
						const object = {
							timestamp: time,
							location: location,
							data: response.data
						}
						setWeather(object);
						console.log("call")
						window.localStorage.setItem("weather: " + location.tag, JSON.stringify(object));
					})
					.catch((error) => {
						const object = {
							timestamp: time,
							location: location,
							data: error
						}
						setWeather(object);
						console.log("error")
						window.localStorage.setItem("weather: " + location.tag, JSON.stringify(object));
					});
			}
		}
	}, [location, weather, time]);

	function handleSearch(query) {
		setLocation(query);
	}

	return (
		<div className="container">
			<ContextNavigation.Provider value={{ locations: locations }}>
				<Navigation onSearch={handleSearch} />
			</ContextNavigation.Provider>
			<div className="content">
				<ContextDashboard.Provider value={{ time: time, location: location, weather: weather }}>
					<Dashboard />
				</ContextDashboard.Provider>
				<Attribution />
            	<img className="background" src="assets/images/background.svg" alt="mountains in the distance"/>
			</div>
		</div>
	)
}


export default App;