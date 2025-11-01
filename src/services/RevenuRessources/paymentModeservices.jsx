import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/paymentmode/paymentmode";
import { useNavigate } from 'react-router-dom';

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};

export async function getpaymentModes() {
  try {
    const paymentModeget = await http.get(apiEndpoint);
    return paymentModeget;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}

export async function getpaymentModeById(PaymentModeId) {
  try {
    return await http.get(apiEndpoint, PaymentModeId);
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching PaymentMode data, Please try again later" +
        ex
    );
  }
}
export async function deletePaymentMode(PaymentModeId) {
  try {
    await http.delete(apiEndpoint, {
      data: { PaymentModeId: PaymentModeId },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while deleting RevenueCorrection Please try again later" +
        ex
    );
  }
}
export async function addPaymentMode(
  PaymentModeId,
  PaymentModename,
  isFixed,
  PayUnit
) {
  try {
    //fetch(apiEndpoint, {
    //method: 'POST',
    // body: JSON.stringify({
    //  RoleID: RoleID,
    //   RoleName: RoleName,
    //  Description: Description,
    //   IsSystemRole: IsSystemRole,
    // }),
    // headers: {
    //   'Content-type': 'application/json; charset=UTF-8',
    // },
    // })

    await http.post(apiEndpoint, {
      PaymentModeId,
      PaymentModename,
      isFixed,
      PayUnit,
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while saving PaymentMode of funds Please try again later" +
        ex
    );
  }
}
