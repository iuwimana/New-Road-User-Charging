import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint =
  apiUrl.apiUrl + "/paternerservicepayment/paternerservicepayment";
const apiEndpoints =
  apiUrl.apiUrl + "/paternerservicepayment/paternerservicepayments";
  import { useNavigate } from 'react-router-dom';

function paternerservicepaymentUrl(id) {
  return `${apiEndpoints}/${id}`;
}

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};

export async function getpaternerservicepayments() {
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

export async function getpaternerservicepaymentById(ServicePaymentId) {
  try {
    const paterner = await http.post(apiEndpoints, { ServicePaymentId });
    return paterner;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching paternerservicepayment data, Please try again later" +
        ex
    );
  }
}
export async function deletePaternerServicePayment(PaternerServicePaymentId) {
  try {
    await http.delete(apiEndpoint, {
      data: { PaternerServicePaymentId: PaternerServicePaymentId },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while deleting PaternerServicePayment Please try again later" +
        ex
    );
  }
}
export async function addPaternerServicePayment(
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
      "An Error Occured, while saving PaternerServicePayment of funds Please try again later" +
        ex
    );
  }
}
