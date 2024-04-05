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

import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "./api";
import { generateSessionId, createSessionData, clearSessionData } from "./functions/generate_session_id/generateSessionId";
import getAllDeviceData from './functions/deviceData';
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
      const customerId = '9155186701';
      // Generate session ID using the provided API key
      const sessionId = await generateSessionId(this.api_key);
      await this.storeCustomerID(customerId);
      await createSessionData(this.api, sessionId, customerId);
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

  async storeCustomerID(customerId) {
    try {
      await AsyncStorage.setItem('customerId', customerId);
      console.log("customerId saved successfully.");
    } catch (error) {
      console.error('Error storing customerId:', error);
      throw error;
    }
  }

  async initDeviceData() {
    const sessionId = await AsyncStorage.getItem('sessionId');
    const customerId = await AsyncStorage.getItem('customerId');
    this.deviceData = await getAllDeviceData(this.api, sessionId, customerId);
    }

}

export default RaptorX;

