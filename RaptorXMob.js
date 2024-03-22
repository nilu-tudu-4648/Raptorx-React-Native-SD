import DeviceInfo from "react-native-device-info";
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import * as RNLocalize from "react-native-localize";
import RNFS from "react-native-fs";
import { useRef } from "react";
import KeystrokeDynamicsSDK from "./components/KeystrokeDynamicsSDK";
import { gyroscope, accelerometer, magnetometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.gyroscope, 3000);

export function captureKeyboardEvents(callback) {
  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    (event) => {
      callback("keyboardDidShow", event);
    }
  );

  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    (event) => {
      callback("keyboardDidHide", event);
    }
  );

  // Return a cleanup function to remove the event listeners when no longer needed
  return () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
}
export function captureTouchEvents(callback) {
  return (
    <TouchableWithoutFeedback onPress={(event) => callback("onPress", event)}>
      <View />
    </TouchableWithoutFeedback>
  );
}
function bytesToMB(bytes, decimals = 2) {
  if (bytes === 0) return "0 MB";

  const MB = 1024 * 1024; // Conversion factor (1 KiB = 1024 bytes)
  const mb = bytes / MB;

  return mb.toFixed(decimals) + " MB";
}
export async function getDeviceInfo() {
  try {
    const uniqueId = await DeviceInfo.getUniqueId();
    const manufacturer = await DeviceInfo.getManufacturer();
    const carrier = await DeviceInfo.getCarrier();
    const brand = DeviceInfo.getBrand();
    const model = DeviceInfo.getModel();
    const emulator = DeviceInfo.isEmulator();
    const deviceId = DeviceInfo.getDeviceId();
    const systemName = DeviceInfo.getSystemName();
    const systemVersion = DeviceInfo.getSystemVersion();
    const buildId = await DeviceInfo.getBuildId();
    const ipAddress = await DeviceInfo.getIpAddress();
    const instanceId = await DeviceInfo.getInstanceId();
    const deviceName = await DeviceInfo.getDeviceName();
    const userAgent = await DeviceInfo.getUserAgent();
    const apiLevel = await DeviceInfo.getApiLevel();
    const bootloader = await DeviceInfo.getBootloader();
    const baseOs = await DeviceInfo.getBaseOs();
    const fingerprint = await DeviceInfo.getFingerprint();
    const tags = await DeviceInfo.getTags();
    const type = await DeviceInfo.getType();
    // build info
    const buildNumber = DeviceInfo.getBuildNumber();
    const bundleId = DeviceInfo.getBundleId();
    const appName = DeviceInfo.getApplicationName();
    const version = DeviceInfo.getVersion();
    const readableVersion = DeviceInfo.getReadableVersion();
    // local language
    const localLanguage = RNLocalize.getLocales()[0].languageCode;
    // storage information
    const storageInfo = await RNFS.getFSInfo();
    return {
      deviceInfo: {
        uniqueId,
        manufacturer,
        carrier, // Added carrier information
        brand,
        model,
        emulator,
        deviceId,
        systemName,
        systemVersion,
        buildId,
        ipAddress,
        instanceId,
        deviceName,
        userAgent,
        apiLevel,
        bootloader,
        baseOs,
        fingerprint,
        tags,
        type,
      },
      buildInfo: {
        bundleId,
        buildNumber,
        appName,
        version,
        readableVersion,
      },
      localLanguage,
      storageinfo: {
        totalSpace: bytesToMB(storageInfo.totalSpace),
        freeSpace: bytesToMB(storageInfo.freeSpace),
      },
    };
  } catch (error) {
    console.error("Error retrieving device information:", error);
    throw error;
  }
}
export const KeyStrokeCapture = ({ style, ...props }) => {
  const kdRef = useRef(new KeystrokeDynamicsSDK());

  const handleKeyPress = (event) => {
      kdRef.current.handleKeyPress(event);
  };

  return (
      <TextInput
      style={[styles.input, style]}
          onKeyPress={handleKeyPress}
          {...props}
      />
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
 export const gyroscopeSubscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
      console.log({ x, y, z, timestamp }, 'gyroscope')
    );
