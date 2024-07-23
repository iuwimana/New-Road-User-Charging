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
export async function addroad(
  RoodId,
  RoodName,
  RoodDistance,
  RoodTypeId,
  roadcharacteristicsid
) {
  try {
    await http.post(apiEndpoint, {
      RoodId,
      RoodName,
      RoodDistance,
      RoodTypeId,
      roadcharacteristicsid,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving road of funds Please try again later" + ex
    );
  }
}
