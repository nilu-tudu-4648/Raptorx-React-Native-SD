import * as RNLocalize from "react-native-localize";
import DeviceInfo from "react-native-device-info";
import { bytesToMB } from "../../utils/raptorx-utils";
import RNFS from "react-native-fs";
import { Dimensions } from "react-native";

export const makeDeviceDataApiCall = async (
  api,
  sessionId,
  customerId,
  deviceData
) => {
  try {
    const response = await api.post("api/analytics/device/capture", {
      session_id: sessionId,
      customer_id: customerId,
      ...deviceData
    });
    console.log("Device data API response:", response);
    return response.data; // Assuming the API response contains useful data
  } catch (error) {
    console.error("Error making device data API call:", error);
    throw error;
  }
};

const getAllDeviceData = async (api, sessionId, customerId) => {
  try {
    const uniqueId = await DeviceInfo.getUniqueId();
    const manufacturer = await DeviceInfo.getManufacturer();
    const carrier = await DeviceInfo.getCarrier();
    const deviceVendor = DeviceInfo.getBrand();
    const device_model = DeviceInfo.getModel();
    const is_emulator = await DeviceInfo.isEmulator();
    const device_id = DeviceInfo.getDeviceId();
    const os_name = DeviceInfo.getSystemName();
    const os_version = DeviceInfo.getSystemVersion();
    const buildId = await DeviceInfo.getBuildId();
    const ip_address = await DeviceInfo.getIpAddress();
    const instanceId = await DeviceInfo.getInstanceId();
    const deviceName = await DeviceInfo.getDeviceName();
    const userAgent = await DeviceInfo.getUserAgent();//
    const baseOs = await DeviceInfo.getBaseOs();
    const fingerprint = await DeviceInfo.getFingerprint();//
    const buildNumber = await DeviceInfo.getBuildNumber();
    const bundleId = await DeviceInfo.getBundleId();
    const appName = await DeviceInfo.getApplicationName();
    const version = await DeviceInfo.getVersion();
    const readableVersion = await DeviceInfo.getReadableVersion();
    const deviceRam = DeviceInfo.getTotalMemory();
    const localLanguage = RNLocalize.getLocales()[0].languageCode;
    const storageInfo = await RNFS.getFSInfo();
    const available_storage = bytesToMB(storageInfo.freeSpace);
    const { width, height } = Dimensions.get("window");
    const screenResolution = `${width}x${height}`;
    
    const deviceData = {
      uniqueId,
      manufacturer,
      carrier,
      deviceVendor,
      device_model,
      is_emulator,
      device_id,
      os_name,
      os_version,
      buildId,
      ip_address,
      instanceId,
      deviceName,
      userAgent,
      baseOs,
      fingerprint,
      buildNumber,
      bundleId,
      appName,
      version,
      readableVersion,
      localLanguage,
      available_storage,
      screenResolution,
      deviceRam
    };
    
    const deviceDataResult = await makeDeviceDataApiCall(
      api,
      sessionId,
      customerId,
      deviceData
    );

    return deviceDataResult;
  } catch (error) {
    console.error("Error retrieving device information:", error);
    throw error;
  }
};

export default getAllDeviceData;
