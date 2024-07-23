import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/nationalborder/nationalborder";


export async function getnationalborders() {
  try {
    const nationalborder = await http.get(apiEndpoint);
    return nationalborder;
  } catch (ex) {
    return null;
  }
}




export async function deletenationalborder(borderid) {
  try {
    await http.delete(apiEndpoint, {
      data: { borderid: borderid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting nationalborder Please try again later" +
        ex
    );
  }
}
export async function addnationalborder(
   borderid, bordername
) {
  try {
    await http.post(apiEndpoint, {
       borderid, bordername,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving nationalborder  Please try again later" +
        ex
    );
  }
}
