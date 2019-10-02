// Dependencies
import React, { Component } from 'react';
import posed from 'react-pose';
import config from '../../config';

import { TopRow, BottomRow } from './AnalyticsSections';
import { camelCase } from '../../tools/utils';

import DeviceController from '../../controllers/DeviceController';

import './overview-dashboard.scss';

const buildingLayout = config.buildingLayout;

// Documentation/Notes
/*
OverviewDashboard.js is a view component that is responsible for the base and structure of the dashboard, as well as keeping the device data updated in state.
TODO:
- add controls for time frame
*/

const Circle = posed.div({
    pressable: true,
    init: { scale: 1 },
    press: { scale: 0.8 },
    pressEnd: { scale: 1 }
})

const ClickableCircle = ({className, deviceId, deviceLabel, selectDevice }) => {
    return (
        <Circle
            onClick={() => selectDevice(deviceId, deviceLabel)}
            className={`clickable-device ${className}`}
        />
    )
}

class OverviewDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceReadings: {
                temperatureReadings: [],
                humidityReadings: []
            },
            lastDeviceData: {
                temperature: null,
                humidity: null,
                dewPoint: null,
                timestamp: null
            },
            currentDeviceId: "00030000000000000000000000000002",
            currentRoomLabel: "Living Room"
        };

        // Decides the update heartbeat in seconds
        this.UPDATE_HEARTBEAT = 30;
    }

    componentDidMount() {
        this.updateDeviceData();
        this.interval = setInterval(() => this.updateDeviceData(), this.UPDATE_HEARTBEAT * 1000)
    }

    selectDevice(currentDeviceId, currentRoomLabel) {
        this.setState({
            currentDeviceId,
            currentRoomLabel
        }, () => {
            this.updateDeviceData();
        })
    }

    updateDeviceData() {
        const { currentDeviceId } = this.state;
        this.getLastReading(currentDeviceId);
        this.getDeviceReadings(currentDeviceId);
    }

    getLastReading(deviceId) {
        DeviceController.getLastReading(deviceId)
            .then((lastDeviceData) => {
                this.setState({
                    lastDeviceData
                });
            })
    }

    getDeviceReadings(deviceId) {
        DeviceController.getReadings(deviceId)
            .then((deviceReadings) => {
                this.setState({
                    deviceReadings
                });
            })
    }

    renderBuildingFloor(floorObject, index) {
        return (
            <div key={index} className="floor">
                <h3>{floorObject.label}</h3>
                {floorObject.rooms.map((room, i) => {
                    const camelClass = camelCase(room.label);
                    const deviceSelected = this.state.currentRoomLabel === room.label ? "selected" : "";

                    return (
                        <React.Fragment key={camelClass}>
                            <ClickableCircle
                                className={`${camelClass} ${deviceSelected}`}
                                deviceId={room.deviceId}
                                deviceLabel={room.label}
                                selectDevice={(deviceId, deviceLabel) => this.selectDevice(deviceId, deviceLabel)}
                            />
                            <div
                                style={{animationDelay: "-3s"}}
                                className={`circle-animation ${camelClass} ${deviceSelected}`}
                            ></div>
                            <div
                                style={{animationDelay: "-2s"}}
                                className={`circle-animation ${camelClass} ${deviceSelected}`}
                            ></div>
                            <div
                                style={{animationDelay: "-1s"}}
                                className={`circle-animation ${camelClass} ${deviceSelected}`}
                            ></div>
                            <div
                                style={{animationDelay: "0s"}}
                                className={`circle-animation ${camelClass} ${deviceSelected}`}
                            ></div>
                        </React.Fragment>
                    )
                })}
                <img
                    src={floorObject.imagePath}
                    alt="Floor Graphic"
                />
            </div>
        )
    }

    render() {
        const {  currentRoomLabel, currentDeviceId, deviceReadings, lastDeviceData } = this.state;

        return (
            <div className="dashboard">
                <div className="triangle"></div>
                <div className="header">
                    <h3 className="device-id">{`Location: Company HQ`}</h3>
                </div>

                <div className="dashboard-content">
                    <div className="building row">
                        {buildingLayout.map((floor, index) => {
                            return this.renderBuildingFloor(floor, index)
                        })}
                    </div>

                    <h3 className="current-device">{`Device: ${currentRoomLabel}`}</h3>

                    <TopRow
                        deviceReadings={deviceReadings}
                        lastDeviceData={lastDeviceData}
                        currentDeviceId={currentDeviceId}
                    />

                    <BottomRow
                        deviceReadings={deviceReadings}
                        lastDeviceData={lastDeviceData}
                        currentDeviceId={currentDeviceId}
                    />
                </div>
            </div>
        );
    }
}

export default OverviewDashboard;
