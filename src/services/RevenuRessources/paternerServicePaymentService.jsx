import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint =
  apiUrl.apiUrl + "/paternerservicepayment/paternerservicepayment";
const apiEndpoints =
  apiUrl.apiUrl + "/paternerservicepayment/paternerservicepayments";

function paternerservicepaymentUrl(id) {
  return `${apiEndpoints}/${id}`;
}
export async function getpaternerservicepayments() {
  try {
    const paterner = await http.get(apiEndpoint);
    return paterner;
  } catch (ex) {
    return null;
  }
}

export async function getpaternerservicepaymentById(ServicePaymentId) {
  try {
    const paterner = await http.post(apiEndpoints, { ServicePaymentId });
    return paterner;
  } catch (ex) {
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
    return toast.error(
      "An Error Occured, while saving PaternerServicePayment of funds Please try again later" +
        ex
    );
  }
}
