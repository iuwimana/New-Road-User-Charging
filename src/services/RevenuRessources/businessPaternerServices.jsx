import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const apiEndpoint = apiUrl.apiUrl + "/businesspaterner/businesspaterner";
const apiEndpointbusiness =
  apiUrl.apiUrl + "/businesspaterner/businesspaternerreport";
const apiEndpointtype =
  apiUrl.apiUrl + "/businesspaterner/institutionpartenertype";

  const handleServiceUnavailable = () => {
    const navigate = useNavigate();
    navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
  };
  
export async function getBusinessPaterners() {
  try {
    const paterner = await http.get(apiEndpoint);
    return paterner;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}
export async function getBusinessPaternerstypes() {
  try {
    const paterner = await http.get(apiEndpointtype);
    return paterner;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}
export async function getBusinessPaternerreport(PartenerStatusId) {
  try {
    const paterner = await http.post(apiEndpointbusiness, { PartenerStatusId });
    return paterner;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}

export async function getBusinessPaternerById(InstitutionPartenerId) {
  try {
    return await http.get(apiEndpoint, InstitutionPartenerId);
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching InstitutionPartener data, Please try again later" +
        ex
    );
  }
}
export async function deleteBusinessPaterner(InstitutionPartenerId) {
  try {
    await http.delete(apiEndpoint, {
      data: { InstitutionPartenerId: InstitutionPartenerId },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while deleting InstitutionPartener Please try again later" +
        ex
    );
  }
}
export async function addBusinessPaterner(
  InstitutionPartenerId,
  InstitutionPartenerName,
  PartenerStatusId,
  AccountNumber,
  BankId
) {
  try {
    await http.post(apiEndpoint, {
      InstitutionPartenerId,
      InstitutionPartenerName,
      PartenerStatusId,
      AccountNumber,
      BankId,
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while saving BusinessPaterner of funds Please try again later" +
        ex
    );
  }
}
