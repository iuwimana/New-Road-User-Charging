import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint =
  apiUrl.apiUrl + "/activitySourceoffund/activitySourceoffund";
const apiEndpoints =
  apiUrl.apiUrl + "/activitySourceoffund/activitySourceoffunds";

export async function getactivitySourceoffunds() {
  try {
    const activitySourceoffund = await http.get(apiEndpoint);
    return activitySourceoffund;
  } catch (ex) {
    return null;
  }
}

export async function getactivitySourceoffundById(ActivityId) {
  try {
    const activitySourceoffund = await http.post(apiEndpoints, {
      ActivityId,
    });
    return activitySourceoffund;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching activitySourceoffund data, Please try again later" +
        ex
    );
  }
}
export async function deleteactivitySourceoffund(ActivitySourceoffundId) {
  try {
    await http.delete(apiEndpoint, {
      data: { ActivitySourceoffundId: ActivitySourceoffundId },
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting activitySourceoffund Please try again later" +
        ex
    );
  }
}
export async function addactivitySourceoffund(
  ActivitySourceoffundId,
  ActivityId,
  SourceoffundName
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
      ActivitySourceoffundId,
      ActivityId,
      SourceoffundName,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving activitySourceoffund of funds Please try again later" +
        ex
    );
  }
}
