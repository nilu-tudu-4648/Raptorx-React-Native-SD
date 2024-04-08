import * as RNLocalize from "react-native-localize";
import DeviceInfo from "react-native-device-info";
import { bytesToMB } from "../../utils/raptorx-utils";
import RNFS from "react-native-fs";

export const makeDeviceDataApiCall = async (
  api,
  sessionId,
  customerId,
  deviceData
) => {
  const { ip_address, device_id, is_emulator,
     device_model,os_name,os_version ,available_storage} =
    deviceData;
  const params = { url: "api/analytics/device/capture" };
  try {
    const postData = {
      session_id: sessionId,
      customer_id: customerId,
      device_id,
      ip_address,
      device_model,
      is_emulator,
      available_storage,
      os_name,
      os_version
    };
    console.log(postData);
    const postResponse = await api.post(params.url, postData);
    return postResponse;
  } catch (error) {
    console.error("Error making API call:");
    throw error;
  }
};
const getAllDeviceData = async (api, sessionId, customerId) => {
  try {
    const uniqueId = await DeviceInfo.getUniqueId();
    const manufacturer = await DeviceInfo.getManufacturer();
    const carrier = await DeviceInfo.getCarrier();
    const brand = DeviceInfo.getBrand();
    const device_model = DeviceInfo.getModel();
    const is_emulator = await DeviceInfo.isEmulator();
    const device_id = DeviceInfo.getDeviceId(); // Retrieve deviceId directly
    const os_name = DeviceInfo.getSystemName();
    const os_version = DeviceInfo.getSystemVersion();
    const buildId = await DeviceInfo.getBuildId();
    const ip_address = await DeviceInfo.getIpAddress();
    const instanceId = await DeviceInfo.getInstanceId();
    const deviceName = await DeviceInfo.getDeviceName();
    const userAgent = await DeviceInfo.getUserAgent();
    const apiLevel = await DeviceInfo.getApiLevel();
    const bootloader = await DeviceInfo.getBootloader();
    const baseOs = await DeviceInfo.getBaseOs();
    const fingerprint = await DeviceInfo.getFingerprint();
    const tags = await DeviceInfo.getTags();
    const type = await DeviceInfo.getType();
    const buildNumber = DeviceInfo.getBuildNumber();
    const bundleId = DeviceInfo.getBundleId();
    const appName = DeviceInfo.getApplicationName();
    const version = DeviceInfo.getVersion();
    const readableVersion = DeviceInfo.getReadableVersion();
    const localLanguage = RNLocalize.getLocales()[0].languageCode;
    const storageInfo = await RNFS.getFSInfo();
    const available_storage = bytesToMB(storageInfo.freeSpace);

    const deviceData = {
      uniqueId,
      manufacturer,
      carrier,
      brand,
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
      apiLevel,
      bootloader,
      baseOs,
      fingerprint,
      tags,
      type,
      buildNumber,
      bundleId,
      appName,
      version,
      readableVersion,
      localLanguage,
      available_storage,
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
