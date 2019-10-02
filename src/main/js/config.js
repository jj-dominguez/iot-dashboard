import floor1Svg from '../../assets/floor-images/floor-1.svg';
import floor2Svg from '../../assets/floor-images/floor-2.svg';
import floor3Svg from '../../assets/floor-images/floor-3.svg';

export default {
    buildingLayout: [
        {
            label: "Floor 1",
            imagePath: floor1Svg,
            rooms: [
                {
                    label: "Garage Dev",
                    deviceId: "00030000000000000000000000000005"
                },
                {
                    label: "Main Dev",
                    deviceId: "00030000000000000000000000000001"
                },
                {
                    label: "Lab",
                    deviceId: "00030000000000000000000000000006"
                }
            ]
        }, {
            label: "Floor 2",
            imagePath: floor2Svg,
            rooms: [
                {
                    label: "Living Room",
                    deviceId: "00030000000000000000000000000002"
                },
                {
                    label: "2nd Floor Office",
                    deviceId: "00030000000000000000000000000007"
                },
                {
                    label: "Conference Room",
                    deviceId: "00030000000000000000000000000008"
                }
            ]
        }, {
            label: "Floor 3",
            imagePath: floor3Svg,
            rooms: [
                {
                    label: "Upper Den",
                    deviceId: "00030000000000000000000000000004"
                },
                {
                    label: "Glass Meeting Room",
                    deviceId: "00030000000000000000000000000003"
                }
            ]
        }
    ]
}
