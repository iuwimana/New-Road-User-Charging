import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/characteristic/characteristic";
const apiEndpoints = apiUrl.apiUrl + "/characteristic/characteristics";

export async function getcharacteristics() {
  try {
    const characteristic = await http.get(apiEndpoint);
    return characteristic;
  } catch (ex) {
    return null;
  }
}

export async function getcharacteristicById(roadcharacteristicsid) {
  try {
    return await http.get(apiEndpoints, roadcharacteristicsid);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching characteristic data, Please try again later" +
        ex
    );
  }
}
export async function deletecharacteristic(roadcharacteristicsid) {
  try {
    await http.delete(apiEndpoint, {
      data: { roadcharacteristicsid: roadcharacteristicsid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting characteristic Please try again later" +
        ex
    );
  }
}
export async function addcharacteristic(
  roadcharacteristicsid,
  roadclassificationid,
  numberoflames,
  shoulderid,
  pavettypeid,
  lamewidth
) {
  try {
    await http.post(apiEndpoint, {
      roadcharacteristicsid,
      roadclassificationid,
      numberoflames,
      shoulderid,
      pavettypeid,
      lamewidth,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving characteristic of funds Please try again later" +
        ex
    );
  }
}
