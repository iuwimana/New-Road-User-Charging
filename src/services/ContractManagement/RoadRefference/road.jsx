import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/road/road";
const apiEndpoints = apiUrl.apiUrl + "/road/roads";

export async function getroads() {
  try {
    const road = await http.get(apiEndpoint);
    return road;
  } catch (ex) {
    return null;
  }
}

export async function getroadById(RoodId) {
  try {
    return await http.post(apiEndpoints, RoodId);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching road data, Please try again later" + ex
    );
  }
}
export async function deleteroad(RoodId) {
  try {
    await http.delete(apiEndpoint, {
      data: { RoodId: RoodId },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting road Please try again later" + ex
    );
  }
}
export async function addroad(road) {
  try {
    toast.success("Road updated successfully!"+JSON.stringify(road));
    await http.post(apiEndpoint, {
      RoodId:road.roodid,
      RoodName: road.roodname,
      RoodDistance: road.rooddistance,
      RoodTypeId: road.roodtypeid,
      roadcharacteristicsid: road.roadcharacteristicsid,
    });
  } catch (ex) {
    toast.error(
      "An error occurred while saving the road. Please try again later. " + ex
    );
    throw ex; // re-throw if you want the calling code to handle it
  }
}