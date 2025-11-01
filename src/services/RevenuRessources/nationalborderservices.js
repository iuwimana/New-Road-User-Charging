import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/nationalborder/nationalborder";
import { useNavigate } from 'react-router-dom';

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};


export async function getnationalborders() {
  try {
    const nationalborder = await http.get(apiEndpoint);
    return nationalborder;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}




export async function deletenationalborder(borderid) {
  try {
    await http.delete(apiEndpoint, {
      data: { borderid: borderid },
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
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
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while saving nationalborder  Please try again later" +
        ex
    );
  }
}
