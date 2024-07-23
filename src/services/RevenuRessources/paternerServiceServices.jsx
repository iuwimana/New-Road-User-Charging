import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/paternerservice/paternerservice";

export async function getpaternerServices() {
  try {
    const service = await http.get(apiEndpoint);
    return service;
  } catch (ex) {
    return null;
  }
}

export async function getpaternerServicesById(PartenerServiceId) {
  try {
    return await http.get(apiEndpoint, PartenerServiceId);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching PartenerService data, Please try again later" +
        ex
    );
  }
}
export async function deletePartenerService(PartenerServiceId) {
  try {
    await http.delete(apiEndpoint, {
      data: { PartenerServiceId: PartenerServiceId },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting PartenerService Please try again later" +
        ex
    );
  }
}
export async function addPartenerService(
  PartenerServiceId,
  InstitutionPartenerId,
  RevenueProductId,
  StartDate,
  EndDate
) {
  try {
    await http.post(apiEndpoint, {
      PartenerServiceId,
      InstitutionPartenerId,
      RevenueProductId,
      StartDate,
      EndDate,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving PartenerService of funds Please try again later" +
        ex
    );
  }
}
