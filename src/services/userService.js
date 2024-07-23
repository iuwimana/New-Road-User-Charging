import http from "./httpService";
import  apiUrl  from "../config.json";

const apiEndpoint = apiUrl.apiUrl + "/auth/register";
const apiEndpointreset = apiUrl.apiUrl + "/auth/resetpassword";

export function register(Email,Password,FullName) {
  return http.post(apiEndpoint, {
    Email,
    Password,
    FullName
  });
}
export async function resetpassword(Email,Password) {
  return http.post(apiEndpointreset, {
    Email,
    Password
  });
}

