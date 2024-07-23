import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";


const apiEndpoint = apiUrl.apiUrl + "/currency/currency";
export async function getcurrencies() {
 try {
    const revget = await http.get(apiEndpoint);
    return revget;
  } catch (ex) {
    return null;
  }
}
 


export async function deletecurrencies(currencyid) {
  try {
    await http.delete(apiEndpoint, {
      data: { currencyid: currencyid },
    });
  } catch (ex) {
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
    return toast.error(
      "An Error Occured, while saving currencies of funds Please try again later" +
        ex
    );
  }
}
