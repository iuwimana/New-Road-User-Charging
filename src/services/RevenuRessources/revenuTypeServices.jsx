import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/revenutype/revenutype";

export async function getrevenuTypes() {
  try {
    const revget = await http.get(apiEndpoint);
    return revget;
  } catch (ex) {
    return null;
  }
}

export async function getrevenuTypeById(RevenueTypeId) {
  try {
    return await http.get(apiEndpoint, RevenueTypeId);
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching Revenu Types data, Please try again later" +
        ex
    );
  }
}
export async function deleterevenuType(RevenueTypeId) {
  try {
    await http.delete(apiEndpoint, {
      data: { RevenueTypeId: RevenueTypeId },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting RevenueType Please try again later" + ex
    );
  }
}
export async function addRevenueType(RevenueTypeId, RevenueTypename) {
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

    await http.post(apiEndpoint, { RevenueTypeId, RevenueTypename });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving Revenu Type of funds Please try again later" +
        ex
    );
  }
}
