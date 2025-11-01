import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/bank/banks";
import { useNavigate } from 'react-router-dom';

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};

export async function getbanks() {
  try {
    const bankget = await http.get(apiEndpoint);
    return bankget;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}

export async function getbankById(BankId) {
  try {
    return await http.get(apiEndpoint, BankId);
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching Bank data, Please try again later" + ex
    );
  }
}
export async function deleteBank(BankId) {
  try {
    await http.delete(apiEndpoint, {
      data: { BankId: BankId },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while deleting Bank Please try again later" + ex
    );
  }
}
export async function addBank(BankId, Bankname, Swiftcode) {
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

    await http.post(apiEndpoint, { BankId, Bankname, Swiftcode });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while saving bank of funds Please try again later" + ex
    );
  }
}
