import { gyroscope, accelerometer, magnetometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import axios from "axios";

const makeSensorsDataApiCall = async (
  api,
  sessionId,
  customerId,
  otherData
) => {
  const url = "https://server.panoplia.io/api/analytics/sensor/capture";
  try {
    const {
      timestamp,
      x,
      y,
      z,
      sensor_type
    } = otherData;
    const sensorsDataResult = await axios.post(
      url,
      {
        session_id: sessionId,
        customer_id: customerId,
        timestamp,
        x,
        y,
        z,
        sensor_type,
      },
      {
        headers: {
          api_key: "9a60f01e9b7d2d5d37a1b134241311fd7dfdbc38",
        },
      }
    );
    console.log("API Response:", sensorsDataResult.data);
    return sensorsDataResult;
  } catch (error) {
    console.error("Error making API call:", error);
    throw error;
  }
};

const getSensorsData = async (api, sessionId, customerId) => {
  try {
    // Set update intervals for sensor types
    setUpdateIntervalForType(SensorTypes.gyroscope, 3000);
    setUpdateIntervalForType(SensorTypes.accelerometer, 3000);
    setUpdateIntervalForType(SensorTypes.magnetometer, 3000);

    // Subscribe to gyroscope data
    const gyroscopeSubscription = gyroscope.subscribe(({ x, y, z, timestamp }) => {
      const otherData = { x, y, z, timestamp, sensor_type: 'gyroscope' };
      makeSensorsDataApiCall(api, sessionId, customerId, otherData);
    });

    // Subscribe to accelerometer data
    const accelerometerSubscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
      const otherData = { x, y, z, timestamp, sensor_type: 'accelerometer' };
      makeSensorsDataApiCall(api, sessionId, customerId, otherData);
    });

    // Subscribe to magnetometer data
    const magnetometerSubscription = magnetometer.subscribe(({ x, y, z, timestamp }) => {
      const otherData = { x, y, z, timestamp, sensor_type: 'magnetometer' };
      makeSensorsDataApiCall(api, sessionId, customerId, otherData);
    });

    // Return the subscriptions (optional)
    return { gyroscopeSubscription, accelerometerSubscription, magnetometerSubscription };
  } catch (error) {
    console.error("Error retrieving device information:", error);
    throw error;
  }
};

export default getSensorsData;
