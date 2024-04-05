// import DeviceInfo from "react-native-device-info";
// import {
//   Keyboard,
//   StyleSheet,
//   TextInput,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import * as RNLocalize from "react-native-localize";
// import RNFS from "react-native-fs";
// import { useRef, useState } from "react";
// import KeystrokeDynamicsSDK from "./components/KeystrokeDynamicsSDK";
// import {
//   gyroscope,
//   accelerometer,
//   magnetometer,
//   setUpdateIntervalForType,
//   SensorTypes,
// } from "react-native-sensors";
// import ScrollSpeedCapture from "./components/ScrollSpeedCapture";
// import Geolocation from "@react-native-community/geolocation";
// import ScreenChangeListener from "./components/ScreenChangeListener";
// import { generateSessionId } from "./functions/generate_session_id/generateSessionId";
// setUpdateIntervalForType(SensorTypes.gyroscope, 3000);
// setUpdateIntervalForType(SensorTypes.accelerometer, 3000);
// setUpdateIntervalForType(SensorTypes.magnetometer, 3000);

// export function captureKeyboardEvents(callback) {
//   const keyboardDidShowListener = Keyboard.addListener(
//     "keyboardDidShow",
//     (event) => {
//       callback("keyboardDidShow", event);
//     }
//   );

//   const keyboardDidHideListener = Keyboard.addListener(
//     "keyboardDidHide",
//     (event) => {
//       callback("keyboardDidHide", event);
//     }
//   );

//   // Return a cleanup function to remove the event listeners when no longer needed
//   return () => {
//     keyboardDidShowListener.remove();
//     keyboardDidHideListener.remove();
//   };
// }
// export function captureTouchEvents(callback) {
//   return (
//     <TouchableWithoutFeedback onPress={(event) => callback("onPress", event)}>
//       <View />
//     </TouchableWithoutFeedback>
//   );
// }
// function bytesToMB(bytes, decimals = 2) {
//   if (bytes === 0) return "0 MB";

//   const MB = 1024 * 1024; // Conversion factor (1 KiB = 1024 bytes)
//   const mb = bytes / MB;

//   return mb.toFixed(decimals) + " MB";
// }
// export async function getDeviceInfo() {
//   try {
//     const uniqueId = await DeviceInfo.getUniqueId();
//     const manufacturer = await DeviceInfo.getManufacturer();
//     const carrier = await DeviceInfo.getCarrier();
//     const brand = DeviceInfo.getBrand();
//     const model = DeviceInfo.getModel();
//     const emulator = DeviceInfo.isEmulator();
//     const deviceId = DeviceInfo.getDeviceId();
//     const systemName = DeviceInfo.getSystemName();
//     const systemVersion = DeviceInfo.getSystemVersion();
//     const buildId = await DeviceInfo.getBuildId();
//     const ipAddress = await DeviceInfo.getIpAddress();
//     const instanceId = await DeviceInfo.getInstanceId();
//     const deviceName = await DeviceInfo.getDeviceName();
//     const userAgent = await DeviceInfo.getUserAgent();
//     const apiLevel = await DeviceInfo.getApiLevel();
//     const bootloader = await DeviceInfo.getBootloader();
//     const baseOs = await DeviceInfo.getBaseOs();
//     const fingerprint = await DeviceInfo.getFingerprint();
//     const tags = await DeviceInfo.getTags();
//     const type = await DeviceInfo.getType();
//     // build info
//     const buildNumber = DeviceInfo.getBuildNumber();
//     const bundleId = DeviceInfo.getBundleId();
//     const appName = DeviceInfo.getApplicationName();
//     const version = DeviceInfo.getVersion();
//     const readableVersion = DeviceInfo.getReadableVersion();
//     // local language
//     const localLanguage = RNLocalize.getLocales()[0].languageCode;
//     // storage information
//     const storageInfo = await RNFS.getFSInfo();
//     return {
//       deviceInfo: {
//         uniqueId,
//         manufacturer,
//         carrier, // Added carrier information
//         brand,
//         model,
//         emulator,
//         deviceId,
//         systemName,
//         systemVersion,
//         buildId,
//         ipAddress,
//         instanceId,
//         deviceName,
//         userAgent,
//         apiLevel,
//         bootloader,
//         baseOs,
//         fingerprint,
//         tags,
//         type,
//       },
//       buildInfo: {
//         bundleId,
//         buildNumber,
//         appName,
//         version,
//         readableVersion,
//       },
//       localLanguage,
//       storageinfo: {
//         totalSpace: bytesToMB(storageInfo.totalSpace),
//         freeSpace: bytesToMB(storageInfo.freeSpace),
//       },
//     };
//   } catch (error) {
//     console.error("Error retrieving device information:", error);
//     throw error;
//   }
// }
// export const KeyStrokeCapture = ({ style, ...props }) => {
//   const kdRef = useRef(new KeystrokeDynamicsSDK());

//   const handleKeyPress = (event) => {
//     kdRef.current.handleKeyPress(event);
//   };

//   return (
//     <TextInput
//       style={[styles.input, style]}
//       onKeyPress={handleKeyPress}
//       {...props}
//     />
//   );
// };
// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//   },
// });
// export const MyTextInput = ({ onChange, ...rest }) => {
//   const [formData, setFormData] = useState({});

//   const onChangeText = (text) => {
//     const formattedText = text.trim(); // Trim extra spaces
//     const updatedFormData = { ...formData, [rest.fieldName]: formattedText };
//     setFormData(updatedFormData);
//     if (onChange) {
//       onChange(updatedFormData);
//     }
//     console.log("Form Data:", updatedFormData); // Logging the formData object
//   };

//   return (
//     <TextInput
//       {...rest}
//       onChangeText={onChangeText}
//       value={formData[rest.fieldName] || ''}
//     />
//   );
// };
// // export const gyroscopeSubscription = gyroscope.subscribe(
// //   ({ x, y, z, timestamp }) => console.log({ x, y, z, timestamp }, "gyroscope")
// // );
// // export const accelerometerSubscription = accelerometer.subscribe(
// //   ({ x, y, z, timestamp }) =>
// //     console.log({ x, y, z, timestamp }, "accelerometerSubscription")
// // );
// // export const magnetometersubscription = magnetometer.subscribe(({ x, y, z, timestamp }) =>
// //   console.log({ x, y, z, timestamp },'magnetometersubscription')
// // );
// export const ScrollEventCapture = (props) => {
//   return <ScrollSpeedCapture {...props} />;
// };
// export const getCurrentLocation = () => {
//   Geolocation.getCurrentPosition((info) => console.log(info));
// };
// export const NavigationCapture = () => {
//   return <ScreenChangeListener />;
// };
// export function generateSessionIdFunc(apiKey) {
//   try {
//     // Generate your session ID here, using the provided API key
//     const sessionId = generateSessionId(apiKey);

//     // Create an API instance using the provided API key
//     const apiInstance = createAPIInstance(apiKey);
// console.log({apiInstance})
//     // Assuming you have a function to create a session
//     // You may use the API instance to perform API calls
//     const createS = createSession(apiInstance,sessionId,'9155186701');

//     return createS;
//   } catch (error) {
//     console.error('Error generating session ID:', error);
//     throw error; // Re-throw the error for handling at higher levels if needed
//   }
// }
import API from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {generateSessionId,createSessionData,clearSessionData} from './functions/generate_session_id/generateSessionId'
class RaptorX {
  constructor(options = {}) {
    const { api_key, headers } = options;

    if (!api_key) {
      throw new Error("`api_key` is mandatory");
    }

    this.api_key = api_key;
    this.api = new API({
      hostUrl: "https://server.panoplia.io",
      api_key,
      headers,
    });
  }

  async createSession() {
    try {
      // Generate session ID using the provided API key
      const sessionId = await generateSessionId(this.api_key);
      await createSessionData(this.api, sessionId, '9155186701');
      console.log("Session created successfully.");
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  async clearSession() {
    try {
      // Retrieve the session ID from AsyncStorage or any other storage mechanism
      const sessionId = await AsyncStorage.getItem('sessionId');
      if (!sessionId) {
        console.log("No session ID found. Skipping session clearing.");
        return;
      }
      
      // Call clearSessionData function passing necessary parameters
      await clearSessionData(this.api, sessionId, '9155186701');
      console.log("Session cleared successfully.");
      
      // Remove session ID from AsyncStorage or any other storage mechanism
      await AsyncStorage.removeItem('sessionId');
    } catch (error) {
      console.error('Error clearing session:', error);
      throw error;
    }
  }

  async storeCustomerID() {
    try {
      const customerId = '9155186701';
      await AsyncStorage.setItem('customerId', customerId);
      console.log("customerId saved successfully.");
    } catch (error) {
      console.error('Error storing customerId:', error);
      throw error;
    }
  }
}

export default RaptorX;

