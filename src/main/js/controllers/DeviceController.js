import request from '../tools/request';
import DeviceDataMock from '../data/device-data.mock';
import { calculateDewPoint } from '../tools/utils';

class DeviceController {
    /** ***** Get All Device Data *****
     *  Returns all device data
     */
    static getAllDeviceData() {
        return new Promise((resolve, reject) => {
            request('device-data')
                .then(deviceData => {

                    resolve(DeviceDataMock);
                })
                .catch(error => {
                    if (error) {
                        throw new Error(error);
                    }
                })
        })
    }

    /** ***** Get Last Reading*****
     *  Returns last reading for a device given an ID
     */
    static getLastReading(deviceId) {
        return new Promise((resolve, reject) => {
            request(`last_reading/${deviceId}`)
                .then(deviceData => {
                    const sensors = deviceData.sensors;

                    const temperature = parseFloat(sensors[0].reading);
                    const humidity = parseFloat(sensors[1].reading);
                    const timestamp = sensors[1].timestamp;

                    const sensorReadings = {
                        temperature,
                        humidity,
                        timestamp,
                        dewPoint: calculateDewPoint(temperature, humidity)
                    };

                    resolve(sensorReadings);
                })
                .catch(error => {
                    if (error) {
                        throw new Error(error);
                    }
                })
        })
    }

    /** ***** Get Readings*****
     *  Returns readings for last 12 hours for a device given an ID
     */
    static getReadings(deviceId) {
        return new Promise((resolve, reject) => {
            request(`readings/${deviceId}`)
                .then(deviceData => {
                    const temperatureReadings = [];
                    const humidityReadings = [];

                    // Parsing device arrays into Highcharts data format
                    deviceData.readings[0].forEach(tempObject => {
                        temperatureReadings.push([
                            tempObject.timestamp * 1000,
                            parseFloat(parseFloat(tempObject.reading).toFixed(1))
                            // have to double parseFloat because toFixed() returns a string
                        ]);
                    });

                    deviceData.readings[1].forEach(humidityObject => {
                        humidityReadings.push([
                            humidityObject.timestamp * 1000,
                            parseFloat(parseFloat(humidityObject.reading).toFixed(1))
                        ]);
                    });

                    const deviceReadings = {
                        temperatureReadings,
                        humidityReadings
                    };

                    resolve(deviceReadings);
                })
                .catch(error => {
                    if (error) {
                        throw new Error(error);
                    }
                })
        })
    }

    // TODO:
    // /** ***** Get Device Data *****
    //  *  Returns device data
    //  */
    // static getDeviceData(deviceId) {
    //     const channelIndex = 0;
    //     const startTime = 1565360200;

    //     // const startTime = moment().
    //     const endTime = moment().endOf('year').format("X");

    //     return new Promise((resolve, reject) => {
    //         request(`device-data?device_id=${deviceId}&channel_index=${channelIndex}&start_time=${startTime}&end_time=${endTime}`)
    //             .then(deviceData => {
    //                 resolve(deviceData);
    //             })
    //             .catch(error => {
    //                 if (error) {
    //                     throw new Error(error);
    //                 }
    //             })
    //     })
    // }
}

export default DeviceController;
