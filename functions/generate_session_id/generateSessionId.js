import AsyncStorage from '@react-native-async-storage/async-storage';
import { SHA256 } from 'crypto-js';
import axios from 'axios';
import API from '../../api';
const api = new API({
    hostUrl: "https://server.panoplia.io",
    api_key: "9a60f01e9b7d2d5d37a1b134241311fd7dfdbc38",
    headers: {
      // Any custom headers you want to include
    }
  });
// const makeApiCall = async (api, sessionId, customerId, startTime, endTime) => {
//     const url = "https://server.panoplia.io/api/analytics/session/capture"; 
// console.log({sessionId})
//     try {
//         const response = await axios.post(url, { 
//             session_id: sessionId,
//             customer_id: customerId,
//             start_time: startTime,
//             end_time: endTime 
//         }, {
//             headers: {
//                 api_key: "9a60f01e9b7d2d5d37a1b134241311fd7dfdbc38",
//             }
//         });
//         console.log("API Response:", response.data); 
//         return response;
//     } catch (error) {
//         console.error('Error making API call:', error);
//         throw error;
//     }
// };
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
        const sessionId = SHA256(dataToHash).toString().slice(0, 30);

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

        await AsyncStorage.removeItem('sessionId');
        await AsyncStorage.removeItem('start_time');
        await AsyncStorage.removeItem('customerId');
    } catch (error) {
        console.error('Error clearing session data:', error);
    }
};

const makeApiCall = async (apiInstance, sessionId, customerId, startTime, endTime) => {
    const params = { url: "analytics/session/capture" };
    try {
      const response = await api.post({
        url: params.url,
        data: {
          session_id: sessionId,
          customer_id: customerId,
          start_time: startTime,
          end_time: endTime
        }
      });
      console.log('new api worked',response)
      return response;
    } catch (error) {
      return error;
    }
  };



  
export { generateSessionId, clearSessionData, createSessionData };
