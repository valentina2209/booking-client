const baseURL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
    USERS: {
        ROOT: `${baseURL}/users`,
        BUSINESS: `${baseURL}/users/business`,
        DETAILS: (id) => `${baseURL}/users/${id}`,
        UPDATE: (id) => `${baseURL}/users/${id}`,
        DELETE: (id) => `${baseURL}/users/${id}`,
    },
    BOOKINGS: {
        ROOT: `${baseURL}/bookings`,
        USER_BOOKINGS: (userId) => `${baseURL}/bookings/user/${userId}`,
        BUSINESS_BOOKINGS: (businessId) => `${baseURL}/bookings/business/${businessId}`,
    }
};

