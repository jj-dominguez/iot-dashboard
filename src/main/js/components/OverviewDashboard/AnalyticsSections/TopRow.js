import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import CountUp from 'react-countup';

class TopRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tomorrowTemp: 75,
            tomorrowHumidity: 56,
            options: {
                chart: {
                    zoomType: 'xy',
                    height: '250'
                },
                title: {
                    text: 'Predicted Next Week'
                },
                subtitle: {
                    text: 'Temperature/Humidity'
                },
                xAxis: [{
                    categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
                        'Sunday']
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}°F',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'Temperature',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: 'Humidity',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value} %',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || // theme
                        'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: 'Humidity',
                    type: 'column',
                    yAxis: 1,
                    data: [68, 65, 66.4, 66.2, 64.0, 66.0, 65.6],
                    tooltip: {
                        valueSuffix: '%'
                    }

                }, {
                    name: 'Temperature',
                    type: 'spline',
                    data: [77.0, 81.9, 77.5, 77.5, 76.2, 75.5, 73],
                    tooltip: {
                        valueSuffix: ' °F'
                    }
                }]
            }
        }
    }

    render() {
        const { temperature, humidity, dewPoint } = this.props.lastDeviceData;
        const { options } = this.state;

        return (
            <div className="top-row row">
                <div className="data-section today">
                    <h3>Today</h3>
                    <div className="data">
                        <div className="temp-text">{"Temperature"}</div>
                        <CountUp
                            end={temperature}
                            className="data-numbers"
                            duration={3}
                            useEasing={true}
                            preserveValue={true}
                            suffix={"º F"}
                        />
                        <div className="vertical-divider"></div>
                        <div className="humidity-text">{"Humidity"}</div>
                        <CountUp
                            end={humidity}
                            className="data-numbers"
                            preserveValue={true}
                            duration={3}
                            useEasing={true}
                            suffix={"%"}
                        />
                    </div>
                </div>

                <div className="data-section dew-point">
                    <h3>Calculated Dew Point</h3>
                    <div className="data">
                        <CountUp
                            end={dewPoint}
                            className="data-numbers"
                            duration={3}
                            useEasing={true}
                            suffix={"º F"}
                        />
                    </div>
                </div>


                <div className="data-section predicted-tomorrow">
                    <h3>Predicted Tomorrow</h3>
                    <div className="data">
                        <div className="temp-text">{"Temperature"}</div>
                        <CountUp
                            end={temperature + 3}
                            className="data-numbers"
                            duration={3}
                            useEasing={true}
                            suffix={"º F"}
                        />
                        <div className="vertical-divider"></div>
                        <div className="humidity-text">{"Humidity"}</div>
                        <CountUp
                            className="data-numbers"
                            end={humidity + 2}
                            duration={3}
                            useEasing={true}
                            suffix={"%"}
                        />
                    </div>
                </div>

                <div className="data-section high-chart predicted-next-week">
                    <div className="data">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default TopRow;
