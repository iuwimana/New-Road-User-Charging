import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/roleuser/users";
const apiEndpointhead = apiUrl.apiUrl + "/roleuser/headuser";
const headofunitapiEndpoint = apiUrl.apiUrl + "/roleuser/setheadofunit";
export async function getUsers() {
  try {
    const userget = await http.get(apiEndpoint);
    return userget;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching User Data Please try again later" + ex
    );
  }
}

export async function getUserheads(username) {
  try {
    const userget = await http.post(apiEndpointhead, {username});
    return userget;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching User Data Please try again later" + ex
    );
  }
}

export async function getUserByID(RoleID) {
  try {
    const userget = await http.get(apiEndpoint);
    return userget;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching User Data Please try again later" + ex
    );
  }
}

export async function activateUsers(UserId) {
  try {
    const useractivation = await http.put(apiEndpoint, { UserId });
    return useractivation;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching User Data Please try again later" + ex
    );
  }
}
export async function desactivateUsers(UserId) {
  try {
    const useractivation = await http.put(apiEndpoint, { UserId });
    return useractivation;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching User Data Please try again later" + ex
    );
  }
}
export async function setheadofunit(UserId) {
  try {
    const useractivation = await http.post(headofunitapiEndpoint, { UserId });
    return useractivation;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching User Data Please try again later" + ex
    );
  }
}
