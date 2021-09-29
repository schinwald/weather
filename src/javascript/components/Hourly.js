import { Line } from 'react-chartjs-2';
import { useContext, useState } from 'react';
import { ContextDashboard } from '../../App.js';
import { Details } from '../helper/Details.js';
import { Dropdown } from '../components/Dropdown.js'


function Hourly(props) {

    const { time, location, weather } = useContext(ContextDashboard);
    const [ category, setCategory ] = useState(0);
    const [ entry, setEntry ] = useState(0);
    let forecast;

    if (time && location && weather) {
        const hourly = weather.data.hourly;
        const local = time + weather.data.timezone_offset;
        const hours = Math.floor(local / 3600) % 24;
        const times = [
            "12:00am", "1:00am", "2:00am", "3:00am", "4:00am", "5:00am", "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am",
            "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm", "11:00pm",
        ].map((element, index, array) => {
            return array[(hours + index) % 24];
        })
        const values = weather.data.hourly.map((element) => {
            switch (category) {
                case 0: return Math.round(element.temp - 273.15)
                case 1: return Math.round(element.feels_like - 273.15);
                case 2: return element.pop;
                case 3: return element.humidity;
                case 4: return element.clouds;
                case 5: return Math.round(element.wind_speed);
                default: return 0;
            }
        });
        const data = {
            labels: times,
            datasets: [{ data: values }]
        }
        const options = {
            maintainAspectRatio: true,
            elements: {
                point: {
                    radius: 4,
                    hitRadius: 4,
                    hoverRadius: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderColor: "rgba(255, 255, 255, 0.7)"
                },
                line: {
                    fill: {
                        target: { value: 0 },
                        above: "rgba(255, 240, 230, 0.4)",
                        below: "rgba(230, 240, 255, 0.4)"
                    },
                    borderColor: "rgba(255, 255, 255, 0.7)",
                    cubicInterpolationMode: 'monotone'
                }
            },
            scales: {
                y: {
                    max: Math.max.apply(this, values) + 2,
                    min: Math.min.apply(this, values) - 2,
                    grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        tickColor: "rgba(255, 255, 255, 0.1)"
                    },
                    ticks: {
                        display: false,
                        stepSize: 1
                    }
                },
                xAxis: {
                    grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        tickColor: "rgba(255, 255, 255, 0.1)"
                    },
                    ticks: {
                        display: false
                    }
                },
                yAxis: {
                    max: Math.max.apply(this, values) + 2,
                    min: Math.min.apply(this, values) - 2,
                    grid: {
                        display: false,
                        borderColor: "rgba(255, 255, 255, 0)",
                        tickColor: "rgba(255, 255, 255, 0)"
                    },
                    ticks: {
                        color: "rgba(255, 255, 255, 1)",
                        stepSize: 1
                    }
                },
                x: {
                    grid: {
                        display: false,
                        borderColor: "rgba(255, 255, 255, 0)",
                        tickColor: "rgba(255, 255, 255, 0)"
                    },
                    ticks: {
                        color: "rgba(255, 255, 255, 1)",
                        callback: (element, index, array) => {
                            return ((index % 3) === 1) ? times[index] : null;
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    displayColors: false,
                    backgroundColor: "rgba(16, 80, 99, 1)",
                    callbacks: {
                        title: (context) => { return null; },
                        label: (context) => {
                            return context.formattedValue;
                        },
                        footer: () => { return null; }
                    }
                }
            }
        }
        forecast = {
            body: (
                <div className={"forecast__body"}>
                    <div className="weather__chart animation--fade-in">
                        <Line 
                            height={125}
                            data={data}
                            options={options}
                            getElementAtEvent={(element) => {if (element.length > 0) setEntry(element[0].index); }} />
                    </div>
                    <div className="weather__entry animation--fade-in">
                        <header className="weather__title">
                            <h3>Entry</h3>
                            <p>
                                <span>Time</span>
                                <span>{times[entry]}</span>
                            </p>
                        </header>
                        <Details
                            temperature={Math.round(hourly[entry].temp - 273.15)}
                            feelsLike={Math.round(hourly[entry].feels_like - 273.15)}
                            precipitation={hourly[entry].pop}
                            humidity={hourly[entry].humidity}
                            clouds={hourly[entry].clouds}
                            wind={{
                                degree: hourly[entry].wind_deg,
                                speed: hourly[entry].wind_speed
                            }} />
                    </div>
                </div>
            )
        }
    } else {
        forecast = {
            body: (
                <div className={"forecast__body"}>
                </div>
            )
        }
    }

    return (
        <div className="card">
            <div className="hourly card__content">
                {/* Forecast section */}
                <div className="forecast card__title card__title--primary">
                    <div className="forecast__title">
                        <h2>Hourly Forecast</h2>
                        <Dropdown 
                            index={0} 
                            items={["Temperature", "Feels-like", "Precipitation", "Humidity", "Clouds", "Wind Speed"]} 
                            callback={(index) => { setCategory(index) }}/>
                    </div>
                </div>
                <div className="forecast card__body card__body--primary">
                    { forecast.body }
                </div>
            </div>
        </div>
    )
}


export { Hourly };