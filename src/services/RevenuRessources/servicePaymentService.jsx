import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/servicepayment/servicepayment";
import { useNavigate } from 'react-router-dom';


const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};


export async function getservicepayment() {
  try {
    const SerPay = await http.get(apiEndpoint);
    return SerPay;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}

export async function getservicepaymentById(ServicePaymentId) {
  try {
    return await http.get(apiEndpoint, ServicePaymentId);
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching servicepayment data, Please try again later" +
        ex
    );
  }
}
export async function deleteservicepayment(ServicePaymentId) {
  try {
    await http.delete(apiEndpoint, {
      data: { ServicePaymentId: ServicePaymentId },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while deleting servicepayment Please try again later" +
        ex
    );
  }
}
export async function addservicepayment(
  ServicePaymentId,
  PartenerServiceId,
  PaymentModeId,
  Value
) {
  try {
    await http.post(apiEndpoint, {
      ServicePaymentId,
      PartenerServiceId,
      PaymentModeId,
      Value,
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while saving servicepayment Please try again later" +
        ex
    );
  }
}
