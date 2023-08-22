// import { logoImage } from '../assets';

export const API_ENDPOINT_BASE_URL = 'https://bvp-api.onrender.com';
// export const APP_CLIENT_LOGO = logoImage; 


export const BUILD_VARIANT = 'PRODUCTION'
export const APP_VERSION = '1.0.1'

export const API_ENDPOINTS = {
  BASE: API_ENDPOINT_BASE_URL,
  LOGIN: API_ENDPOINT_BASE_URL + "/cpuser/login",
  // LOGINbyOTP: API_ENDPOINT_BASE_URL + "/otp/send/",
  OTP: API_ENDPOINT_BASE_URL + "/otp",
  Registration: API_ENDPOINT_BASE_URL + "/cpuser",

  // Allvisit: API_ENDPOINT_BASE_URL + "/property-schedule",
  ScheduleVisit: API_ENDPOINT_BASE_URL + "/property-schedule/cpvisits",
 
  
  LOGOUT: API_ENDPOINT_BASE_URL + "/v1/api/logout",
  FORGET_PASSWORD: API_ENDPOINT_BASE_URL + "/v1/account/sendForgotPwd",
};