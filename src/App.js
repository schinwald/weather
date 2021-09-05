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
			<div className="navigation">
				<header className="header">
					<h1>Weather</h1>
				</header>
				<section className="message">
					<p>
						<span>A semi-serious weather dashboard fueled by puns</span>
					</p>
				</section>
				<Search autocomplete={true} count={25} data={locations} onSearch={setLocation} />
			</div>
			<main className="dashboard">
				<section className="card">
					<div className="card__content">
						<div className="card__title card__title--primary">
							<h2>Current Forecast</h2>
						</div>
						<div className="card__body card__body--primary">

						</div>
					</div>
					<div className="card__content">
						<div className="card__title card__title--secondary">
							<h2>National News</h2>
						</div>
						<div className="card__body card__body--secondary">

						</div>
						<div className="card__footer card__footer--secondary">
							<div className="bulletin">
								<p>
									<span>No Alerts</span>
								</p>
							</div>
						</div>
					</div>
				</section>
				<section className="card">
					<div className="card__content">
						<div className="card__title card__title--primary">
							<h2>Weekly Forecast</h2>
						</div>
						<div className="card__body card__body--primary">

						</div>
					</div>
				</section>
				<section className="card">
					<div className="card__content">
						<div className="card__title card__title--primary">
							<h2>Hourly Forecast</h2>
						</div>
						<div className="card__body card__body--primary">

						</div>
					</div>
				</section>
			</main>
			<footer className="attribution">
				<cite>

				</cite>
			</footer>
		</div>
	)
}


export default App;