import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/service/service";
const apiEndpoints = apiUrl.apiUrl + "/service/services";

export async function getservices() {
  try {
    const service = await http.get(apiEndpoint);
    return service;
  } catch (ex) {
    return null;
  }
}


export async function getserviceById(ServiceId) {
  try {
    return await http.get(apiEndpoint, ServiceId);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching Service data, Please try again later" +
        ex
    );
  }
}

export async function getserviceByserviceorderId(serviceorderid) {
  try {
    return await http.post(apiEndpoints, {serviceorderid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching Service data, Please try again later" +
        ex
    );
  }
}

export async function deleteservice(ServiceId) {
  try {
    await http.delete(apiEndpoint, {
      data: { ServiceId: ServiceId },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting Service Please try again later" +
        ex
    );
  }
}
export async function addservice(serviceid,serviceorderid,servicename,discription,measurementid,servicebudget,areaofmaintenance) {
  try {
    await http.post(apiEndpoint, {
      serviceid,
      serviceorderid,
      servicename,
      discription,
      measurementid,
      servicebudget,
      areaofmaintenance
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving service of funds Please try again later" +
        ex
    );
  }
}
