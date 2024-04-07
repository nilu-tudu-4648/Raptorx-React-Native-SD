import { gyroscope, accelerometer, magnetometer, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";
import { formatDate } from "../../utils/raptorx-utils";

const makeSensorsDataApiCall = async (
  api,
  session_id,
  customer_id,
  otherData
) => {
  const url = "api/analytics/sensor/capture";
  try {
    const { timestamp, x, y, z, sensor_type } = otherData;
    const formattedTimestamp = formatDate(timestamp);
    const formData = {
      session_id,
      customer_id,
      timestamp: formattedTimestamp,
      x,
      y,
      z,
      sensor_type,
    };
    const sensorsDataResult = await api.post(url, formData);
    return sensorsDataResult;
  } catch (error) {
    console.error("Error making API call:", error.response.data);
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

    const accelerometerSubscription = accelerometer.subscribe(({ x, y, z, timestamp }) => {
      const otherData = { x, y, z, timestamp, sensor_type: 'accelerometer' };
      makeSensorsDataApiCall(api, sessionId, customerId, otherData);
    });

    const magnetometerSubscription = magnetometer.subscribe(({ x, y, z, timestamp }) => {
      const otherData = { x, y, z, timestamp, sensor_type: 'magnetometer' };
      makeSensorsDataApiCall(api, sessionId, customerId, otherData);
    });

 } catch (error) {
    console.error("Error retrieving device information:", error);
    throw error;
  }
};

export default getSensorsData;
