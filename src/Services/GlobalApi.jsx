// src/Service/GlobalApi.jsx
// const Base_Url = "http://192.168.86.11:3000/";
const Base_Url = import.meta.env.SUB_BASE_URL || "http://192.168.86.11:3000/";

export const apiConfig = {
    Base_Url
};
