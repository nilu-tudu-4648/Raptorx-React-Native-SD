import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'react-native-crypto-js';

const generateSessionId = async (apiKey) => {
    try {
        const existingSessionId = await AsyncStorage.getItem('sessionId');
        if (existingSessionId) {
            return existingSessionId;
        }

        if (!apiKey) {
            throw new Error('API key not provided. Make sure to set the API_KEY.');
        }

        const startTime = new Date().toISOString();
        const dataToHash = `${apiKey}_${startTime}`;
        const sessionId = CryptoJS.SHA256(dataToHash).toString().slice(0, 30);

        // Store sessionId and startTime in AsyncStorage
        await AsyncStorage.setItem('sessionId', sessionId);
        await AsyncStorage.setItem('start_time', startTime);

        return sessionId;
    } catch (error) {
        throw error;
    }
};

const createSessionData = async (api, sessionId, customerId) => {
    try {
        const startTime = await AsyncStorage.getItem('start_time');
        await makeApiCall(api, sessionId, customerId, startTime);
    } catch (error) {
        console.error('Error creating session data:', error);
    }
};

const clearSessionData = async (api, sessionId, customerId) => {
    try {
        const endTime = new Date().toISOString();
        const startTime = await AsyncStorage.getItem('start_time');

        await makeApiCall(api, sessionId, customerId, startTime, endTime);

        // Remove sessionId and startTime from AsyncStorage
        await AsyncStorage.removeItem('sessionId');
        await AsyncStorage.removeItem('start_time');
    } catch (error) {
        console.error('Error clearing session data:', error);
    }
};

// const makeApiCall = async (apiInstance, sessionId, customerId, startTime, endTime) => {
//     const params = { url: "analytics/session/capture" };
//     try {
//       const response = await apiInstance.post({
//         url: params.url,
//         data: {
//           session_id: sessionId,
//           customer_id: customerId,
//           start_time: startTime,
//           end_time: endTime
//         }
//       });
//       return response;
//     } catch (error) {
//       return error;
//     }
//   };
const makeApiCall = async (api, sessionId, customerId, startTime, endTime) => {
    const url = "analytics/session/capture"; // Define the URL directly
  console.log({sessionId})
    try {
        const response = await api.post({
            url: url, // Pass the URL directly, not as part of params object
            data: {
                session_id: sessionId,
                customer_id: customerId,
                start_time: startTime,
                end_time: endTime
            },
        });
        console.log({response})
        return response;
    } catch (error) {
        return error;
    }
  };
  
export { generateSessionId, clearSessionData, createSessionData };
