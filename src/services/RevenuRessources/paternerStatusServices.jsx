import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/paternerstatus/paternerstatus";
import { useNavigate } from 'react-router-dom';

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};

export async function getpaternerstatuses() {
  try {
    const paternerstatus = await http.get(apiEndpoint);
    return paternerstatus;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}

export async function getpaternerstatusById(PartenerStatusId) {
  try {
    return await http.get(apiEndpoint, PartenerStatusId);
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching Partener Status data, Please try again later" +
        ex
    );
  }
}
export async function deletepaternerstatus(PartenerStatusId) {
  try {
    await http.delete(apiEndpoint, {
      data: { PartenerStatusId: PartenerStatusId },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while deleting PartenerStatus Please try again later" +
        ex
    );
  }
}
export async function addpaternerstatus(PartenerStatusId, PartenerStatusName) {
  try {
    await http.post(apiEndpoint, { PartenerStatusId, PartenerStatusName });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while saving Paterner status of funds Please try again later" +
        ex
    );
  }
}
