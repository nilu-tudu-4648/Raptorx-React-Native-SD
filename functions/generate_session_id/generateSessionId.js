// import CryptoJS from "crypto-js";

// const generateSessionId = async(apiKey,api,customerId) => {
//     try {
//         const existingSessionId = localStorage.getItem('sessionId');
//         if (existingSessionId) {
//             return existingSessionId;
//         }

//         if (!apiKey) {
//             throw new Error('API key not provided. Make sure to set the API_KEY.');
//         }

//         const startTime =  new Date().toISOString();;
//         const dataToHash = `${apiKey}_${startTime}`;
//         const sessionId = CryptoJS.SHA256(dataToHash).toString().slice(0,30);
//         localStorage.setItem('sessionId', sessionId);
//         localStorage.setItem('start_time',startTime)
//         await makeApiCall(api, sessionId, customerId,startTime)
//         return sessionId;
//     } catch (error) {
//         throw error; 
//     }
// }

// const clearSessionData = async(api,sessionId,customerId) => {
//     try {
//         const endTime = new Date().toISOString();
//         const startTime=null
//         await makeApiCall(api, sessionId, customerId,startTime, endTime);

//         localStorage.removeItem('sessionId');
//         localStorage.removeItem('start_time');
//         localStorage.removeItem('customerId');
//     } catch (error) {
//         console.error('Error clearing session data:', error);
//     }
// };


// const makeApiCall = async (api, sessionId, customerId, startTime, endTime) => {
//     const params = { url: "analytics/session/capture" };
//     try {
//         const response = await api.post({
//             url:params,
//             data: {
//                 session_id: sessionId,
//                 customer_id: customerId,
//                 start_time: startTime,
//                 end_time: endTime
//             },
//         });
//         return response;
//     } catch (error) {
//         return error;
//     }
// };
// export {generateSessionId,clearSessionData};

import CryptoJS from "crypto-js";

const generateSessionId =(apiKey) => {
    try {

        if (typeof localStorage !== 'undefined') {
            const existingSessionId = localStorage.getItem('sessionId');
            if (existingSessionId) {
                return existingSessionId;
            }
        }

        if (!apiKey) {
            throw new Error('API key not provided. Make sure to set the API_KEY.');
        }

        const startTime = new Date().toISOString();
        const dataToHash = `${apiKey}_${startTime}`;
        const sessionId = CryptoJS.SHA256(dataToHash).toString().slice(0, 30);

        // Check if localStorage is available (client-side only) and set items
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('sessionId', sessionId);
            localStorage.setItem('start_time', startTime);
        }
        return sessionId;
    } catch (error) {
        throw error;
    }
};
const createSessionData = async(api,sessionId,customerId) => {
    try {
        if(typeof localStorage !=='undefined'){
         const sessionId=localStorage.getItem('sessionId');
         const startTime=localStorage.getItem('start_time')
        await makeApiCall(api, sessionId, customerId,startTime);
        }else{
            console.warn('localStorage is not supported in this environment.');
        }

    } catch (error) {
        console.error('Error clearing session data:', error);
    }
};

const clearSessionData = async (api, sessionId, customerId) => {
    try {
        const endTime = new Date().toISOString();
        const startTime = null;

        await makeApiCall(api, sessionId, customerId, startTime, endTime);

        // Check if localStorage is available (client-side only) and remove items
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('sessionId');
            localStorage.removeItem('start_time');
            localStorage.removeItem('customerId');
        }
    } catch (error) {
        console.error('Error clearing session data:', error);
    }
};

const makeApiCall = async (api, sessionId, customerId, startTime, endTime) => {
    const params = { url: "analytics/session/capture" };
    try {
        const response = await api.post({
            url: params,
            data: {
                session_id: sessionId,
                customer_id: customerId,
                start_time: startTime,
                end_time: endTime
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};

export { generateSessionId, clearSessionData,createSessionData };