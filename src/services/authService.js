import {jwtDecode} from "jwt-decode";
import http from "./httpService";
import  apiUrl  from '../config.json';

const apiEndpoint = apiUrl.apiUrl + "/auth/logins";
const apiEndpoints = apiUrl.apiUrl + "/auth/loginss";
const apiEndpointresendtoken = apiUrl.apiUrl + "/auth/resendtoken";
const apiEndpointreset = apiUrl.apiUrl + "/auth/resetpassword";
const apiEndpointverify = apiUrl.apiUrl + "/auth/verify";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username,password) {
  const { data: jwt } = await http.post(apiEndpoint, {username, password });
  localStorage.setItem(tokenKey, jwt);
 // console.log(`${jwtDecode(jwt)}`)
  return jwtDecode(jwt);
  
}
export async function logins(username,password) {
  const { data: jwt } = await http.post(apiEndpoints, {username, password });
  localStorage.setItem(tokenKey, jwt);
  return jwt;
  
}
export async function verify(userId,token) {
  
  const verif=await http.post(apiEndpointverify, {userId,token});
   return verif;
  
}

export async function resendtoken(username) {
  
  return await http.post(apiEndpointresendtoken, {username});
   
  
}




export function loginWithJwt(jwt) { 
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);

    
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  verify,
  logins,
  resendtoken
};
