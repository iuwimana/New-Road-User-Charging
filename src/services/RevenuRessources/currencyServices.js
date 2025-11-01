import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


const apiEndpoint = apiUrl.apiUrl + "/currency/currency";

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};


export async function getcurrencies() {
 try {
    const revget = await http.get(apiEndpoint);
    return revget;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}
 


export async function deletecurrencies(currencyid) {
  try {
    await http.delete(apiEndpoint, {
      data: { currencyid: currencyid },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while deleting currencies Please try again later" +
        ex
    );
  }
}
export async function addcurrencies(
  currencyid, 
  currencyname, 
  countryname, 
  buyrate, 
  salerate
) {
  try {
    await http.post(apiEndpoint, {
      currencyid, 
      currencyname, 
      countryname, 
      buyrate, 
      salerate
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while saving currencies of funds Please try again later" +
        ex
    );
  }
}
