import * as RNLocalize from "react-native-localize";
import DeviceInfo from "react-native-device-info";
import { bytesToMB } from "../../utils/raptorx-utils";
import RNFS from "react-native-fs";
import axios from 'axios';

const makeDeviceDataApiCall = async (api, sessionId, customerId, deviceData) => {
    const url = "https://server.panoplia.io/api/analytics/device/capture"; // Define the URL directly
    try {
        const deviceDataResult = await axios.post(url, { // Use axios.post with URL and data
            session_id: sessionId,
            customer_id: customerId,
            ip_address: deviceData.ipAddress,
            device_model: deviceData.model
        }, {
            headers: {
                api_key: "9a60f01e9b7d2d5d37a1b134241311fd7dfdbc38",
            }
        });
        console.log("API Response:", deviceDataResult.data); // Log the response data
        return deviceDataResult;
    } catch (error) {
        console.error('Error making API call:', error);
        throw error;
    }
};

const getAllDeviceData = async (api, sessionId, customerId) => {
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
        const storageInfo = await RNFS.getFSInfo(); // Using RNFS for detailed storage info
        const deviceData = {
            deviceInfo: {
                uniqueId,
                manufacturer,
                carrier,
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
            storageInfo: {
                totalSpace: bytesToMB(storageInfo.totalSpace),
                freeSpace: bytesToMB(storageInfo.freeSpace),
            },
        };
        const deviceDataResult = await makeDeviceDataApiCall(
            api,
            sessionId,
            customerId,
            deviceData,
        );

        return deviceDataResult;
    } catch (error) {
        console.error("Error retrieving device information:", error);
        throw error;
    }
};

export default getAllDeviceData;
