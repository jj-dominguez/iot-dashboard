import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';

import DeviceController from '../../../controllers/DeviceController';

HighchartsMore(Highcharts);

class BottomRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveChartOptions: {
                chart: {
                    type: 'line',
                    animation: Highcharts.svg, // don't animate in old IE
                    height: "250",
                    events: {
                        load: function () {
                            // set up the updating of the chart every 10 seconds
                            var tempSeries = this.series[0];
                            var humiditySeries = this.series[1];
                            setInterval(function () {
                                const x = (new Date()).getTime();
                                DeviceController.getLastReading(props.currentDeviceId)
                                    .then(({temperature, humidity}) => {
                                        tempSeries.addPoint([x, temperature], true, true);
                                        humiditySeries.addPoint([x, humidity], true, true);
                                    })
                            }, 10 * 1000);
                        }
                    }
                },

                time: {
                    useUTC: false
                },

                title: {
                    text: 'Live Device Readings'
                },
                xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 30
                },
                yAxis: [{ // left y axis
                    title: {
                        text: "Temperature"
                    },
                    labels: {
                        format: '{value}°F'
                    },
                    showFirstLabel: false
                }, { // right y axis
                    linkedTo: 0,
                    gridLineWidth: 0,
                    opposite: true,
                    title: {
                        text: "Humidity"
                    },
                    labels: {
                        format: '{value}%'
                    },
                    showFirstLabel: false
                }],
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true,
                            label: '{value}°F'
                        },
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br/>',
                    pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
                },
                legend: {
                    backgroundColor:
                        Highcharts.defaultOptions.legend.backgroundColor || // theme
                        'rgba(255,255,255,0.25)'
                },
                series: [{
                    name: 'Temperature',
                    data: [[]]
                }, {
                    name: 'Humidity',
                    data: [[]]
                }]
            },
            historicalOptions: {
                chart: {
                    type: 'line',
                    height: '250'
                },
                title: {
                    text: 'Historical Data'
                },
                subtitle: {
                    text: "Temperature/Humidity"
                },
                time: {
                    useUTC: false
                },
                xAxis: {
                    title: {
                        text: "Date"
                    },
                    type: 'datetime',
                    tickPixelInterval: 30
                },
                yAxis: [{ // left y axis
                    title: {
                        text: "Temperature"
                    },
                    labels: {
                        format: '{value}°F'
                    },
                    showFirstLabel: false,
                    tickInterval: 5
                }, { // right y axis
                    linkedTo: 0,
                    gridLineWidth: 0,
                    opposite: true,
                    title: {
                        text: "Humidity"
                    },
                    labels: {
                        format: '{value}%'
                    },
                    showFirstLabel: false
                }],
                plotOptions: {
                    line: {
                        enableMouseTracking: true
                    }
                },
                series: [
                    {
                        name: "Temperature",
                        data: []
                    },
                    {
                        name: "Humidity",
                        data: []
                    }
                ]
            },
            temperatureOptions: {
                chart: {
                    type: 'boxplot',
                    height: '250'
                },
                title: {
                    text: 'Temperature Analysis'
                },
                legend: {
                    enabled: true
                },
                xAxis: {
                    categories: ['Temperature'],
                },
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}F',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'Temperature',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    tickInterval: 2

                }],
                series: [{
                    name: 'Temperature',
                    data: [[]]
                }]

            },
            humidityOptions: {
                chart: {
                    type: 'boxplot',
                    height: '250'
                },
                title: {
                    text: 'Humidity Analysis'
                },
                legend: {
                    enabled: true
                },
                xAxis: {
                    categories: ['Humidity'],
                },
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}%',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'Humidity',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                }],
                series: [
                    {
                        name: 'Humidity',
                        data: [
                            []
                        ]
                    }
                ]
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (JSON.stringify(props.deviceReadings.temperatureReadings) !== JSON.stringify(state.historicalOptions.series[0]["data"])) {
            const { temperatureReadings, humidityReadings } = props.deviceReadings;

            const historicalSeries = [
                {
                    name: "Temperature",
                    data: temperatureReadings
                },
                {
                    name: "Humidity",
                    data: humidityReadings
                }
            ];

            const temperatureSeries = [
                {
                    name: "Temperature",
                    data: [temperatureReadings.map(reading => {return reading[1]})]
                }
            ];

            const humiditySeries = [
                {
                    name: "Humidity",
                    data: [humidityReadings.map(reading => {return reading[1]})]
                }
            ];

            const liveChartSeries = [{
                name: 'Temperature',
                data: temperatureReadings.slice(0,25)
            }, {
                name: 'Humidity',
                data: humidityReadings.slice(0,25)
            }];

            return({
                historicalOptions: {
                    series: historicalSeries
                },
                temperatureOptions: {
                    series: temperatureSeries
                },
                humidityOptions: {
                    series: humiditySeries
                },
                liveChartOptions: {
                    series: liveChartSeries
                }
            });
        } else {
            return null;
        }
    }

    render() {
        const { liveChartOptions, historicalOptions, temperatureOptions, humidityOptions } = this.state;

        return (
            <div className="bottom-row row">
                <div className="data-section high-chart live-readings">
                    <div className="data">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={liveChartOptions}
                        />
                    </div>
                </div>
                <div className="data-section high-chart historical-low">
                    <div className="data">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={historicalOptions}
                        />
                    </div>
                </div>

                <div className="data-section high-chart historical-high">
                    <div className="data">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={temperatureOptions}
                        />
                    </div>
                </div>

                <div className="data-section high-chart historical-low">
                    <div className="data">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={humidityOptions}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default BottomRow;
