import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";

const apiEndpoint = apiUrl.apiUrl + "/rejectionmessage/rejectionmessage";

export async function getrejectionmessages() {
  try {
    const rejectionmessage = await http.get(apiEndpoint);
    return rejectionmessage;
  } catch (ex) {
    return null;
  }
}



export async function deleterejectionmessage(rejectionmessageid) {
  try {
    await http.delete(apiEndpoint, {
      data: { rejectionmessageid: rejectionmessageid },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting rejectionmessage Please try again later" +
        ex
    );
  }
}

export async function addrejectionmessage(rejectionmessageid,rejectionmessage, rejectedby, rejectionlevel, itemrejectedon) {
  try {
    await http.post(apiEndpoint, {
      rejectionmessageid,
      rejectionmessage, 
      rejectedby, 
      rejectionlevel, 
      itemrejectedon
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving rejectionmessage of funds Please try again later" +
        ex
    );
  }
}
