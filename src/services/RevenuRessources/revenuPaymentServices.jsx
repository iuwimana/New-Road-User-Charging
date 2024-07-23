import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/revenupayment/revenupayment";
const apiEndpoints = apiUrl.apiUrl + "/revenupayment/revenupayments";
export async function getrevenupayments() {
  try {
    const revenupaymentget = await http.get(apiEndpoint);
    return revenupaymentget;
  } catch (ex) {
    return null;
  }
}

export async function getrevenupaymentById(RevenuePaymentId) {
  try {
    return await http.get(apiEndpoint, RevenuePaymentId);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching RevenuePayment data, Please try again later" +
        ex
    );
  }
}
export async function deleteRevenuePayment(revenuepaymentid) {
  try {
    await http.delete(apiEndpoint, {
      data: { revenuepaymentid: revenuepaymentid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting RevenuePayment Please try again later" +
        ex
    );
  }
}
export async function addRevenuepayment(
  RevenuePaymentId,
  paymentmodeid,
  revenueproductid,
  Value,
  fiscalyearid
) {
  try {
    await http.post(apiEndpoint, {
      RevenuePaymentId,
      paymentmodeid,
      revenueproductid,
      Value,
      fiscalyearid,
    });
    
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving RevenuePayment of funds Please try again later" +
        ex
    );
  }
}

export async function getrevenupaymentByFiscalyear( fiscalyearid) {
  try {
     const revenupaymentget = await http.post(apiEndpoints, {
       fiscalyearid
     });
     return revenupaymentget;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving RevenuePayment of funds Please try again later" +
        ex
    );
  }
}
