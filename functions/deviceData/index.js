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
    // const uniqueId = await DeviceInfo.getUniqueId();
    // const fingerprint = await DeviceInfo.getFingerprint();
    const carrier_info = await DeviceInfo.getCarrier();
    const device_vendor = DeviceInfo.getBrand();
    const device_model = DeviceInfo.getModel();
    const is_emulator = await DeviceInfo.isEmulator();
    const device_id = DeviceInfo.getDeviceId();
    const ip_address = await DeviceInfo.getIpAddress();
    const os_name = await DeviceInfo.getBaseOs();
    const os_version = DeviceInfo.getSystemVersion();
    const device_ram = DeviceInfo.getTotalMemory();
    const local_language = RNLocalize.getLocales()[0].languageCode;
    const storageInfo = await RNFS.getFSInfo();
    const available_storage = bytesToMB(storageInfo.freeSpace);
    const { width, height } = Dimensions.get("window");
    const screen_resolution = `${width}x${height}`;
    const cpu_archt_model = DeviceInfo.getModel()
    const buildInfo_buildNumber = DeviceInfo.getBuildNumber()
    const buildInfo_appVersion = DeviceInfo.getVersion();
    const buildInfo_buildId = await DeviceInfo.getBuildId();
    const buildInfo_bundleId = DeviceInfo.getBundleId();
    const buildInfo_appName =  DeviceInfo.getApplicationName();
    const deviceData = {
      carrier_info,
      device_vendor,
      device_model,
      is_emulator,
      device_id,
      os_name,
      os_version,
      ip_address,
      local_language,
      available_storage,
      screen_resolution,
      device_ram,
      cpu_archt_model,
      buildInfo_buildNumber,
      buildInfo_appVersion,
      buildInfo_buildId,
      buildInfo_bundleId,
      buildInfo_appName,
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
