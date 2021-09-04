import { News, Search } from './components';
import { useState, useEffect } from 'react';

import './App.scss';

const axios = require('axios');


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

	return (
		<div className="container">
			<div className="logo">Weather</div>
			<div className="navigation">
				<News text={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo"} />
				<Search autocomplete={true} count={25} data={locations} onSearch={setLocation} />
			</div>
			<div className="current ">
				<div className="card">
					<div className="title">
						<span>Current</span>
					</div>
					<div className="body"></div>
					<div className="footer"></div>
				</div>
			</div>
			<div className="hourly">
				<div className="card">
					<div className="title">
						<span>Hourly</span>
					</div>
					<div className="body"></div>
				</div>
			</div>
			<div className="weekly">
				<div className="card">
					<div className="title">
						<span>Weekly Forecast</span>
					</div>
					<div className="body"></div>
				</div>
			</div>
		</div>
	)
}


export default App;