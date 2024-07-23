import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/paymenttype/paymenttype";


export async function getpaymenttypes() {
  try {
    const contractor = await http.get(apiEndpoint);
    return contractor;
  } catch (ex) {
    return null;
  }
}



export async function getcontractpaymentreport(contractpaymentid) {
  try {
    return await http.post(apiEndpointreport, {contractpaymentid});
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching contractpayment data, Please try again later" +
        ex
    );
  }
}
