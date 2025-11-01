import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/revenuproduct/revenuproduct";
import { useNavigate } from 'react-router-dom';


const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate('../pages/Pages/Error503');  // Redirect to "Service Unavailable" page
};

export async function getrevenuproducts() {
  try {
    const revenuproductget = await http.get(apiEndpoint);
    return revenuproductget;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return null;
  }
}

export async function getrevenuproductById(RevenueProductId) {
  try {
    return await http.get(apiEndpoint, RevenueProductId);
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while fetching RevenueProduct data, Please try again later" +
        ex
    );
  }
}
export async function deleteRevenueProduct(RevenueProductId) {
  try {
    await http.delete(apiEndpoint, {
      data: { RevenueProductId: RevenueProductId },
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
export async function addRevenueProduct(
  RevenueProductId,
  RevenueProductname,
  SourceofFundId
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
      RevenueProductId,
      RevenueProductname,
      SourceofFundId,
    });
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable(); // Redirect to the Service Unavailable page
    }
    return toast.error(
      "An Error Occured, while saving RevenueProduct of funds Please try again later" +
        ex
    );
  }
}
