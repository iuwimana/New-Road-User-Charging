import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/activity/activity";
const apiEndpoints = apiUrl.apiUrl + "/activity/activities";

export async function getactivities() {
  try {
    const activity = await http.get(apiEndpoint);
    return activity;
  } catch (ex) {
    return null;
  }
}

export async function getactivityById(TargetId) {
  try {
    const activity = await http.post(apiEndpoints, { TargetId });
    return activity;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching activity data, Please try again later" +
        ex
    );
  }
}
export async function deleteactivity(ActivityId) {
  try {
    await http.delete(apiEndpoint, { data: { ActivityId: ActivityId } });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting activity Please try again later" + ex
    );
  }
}
export async function addactivity(
  ActivityId,
  TargetId,
  ActivityName,
  EstimatedBudget
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
      ActivityId,
      TargetId,
      ActivityName,
      EstimatedBudget,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving activity of funds Please try again later" +
        ex
    );
  }
}
