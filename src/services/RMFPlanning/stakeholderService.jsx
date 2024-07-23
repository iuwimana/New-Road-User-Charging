import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/stakeholder/stakeholder";
const apiEndpoints = apiUrl.apiUrl + "/stakeholder/stakeholders";

export async function getstakeholders() {
  try {
    const stakeholder = await http.get(apiEndpoint);
    return stakeholder;
  } catch (ex) {
    return null;
  }
}

export async function getstakeholderById(ActivityId) {
  try {
    const stakeholder = await http.post(apiEndpoints, { ActivityId });
    return stakeholder;
  } catch (ex) {
    return toast.error(
      "An Error Occured, while fetching stakeholder data, Please try again later" +
        ex
    );
  }
}
export async function deletestakeholder(StakeHolderId) {
  try {
    await http.delete(apiEndpoint, { data: { StakeHolderId: StakeHolderId } });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while deleting stakeholder Please try again later" + ex
    );
  }
}
export async function addstakeholder(
  StakeHolderId,
  ActivityId,
  StakeHolderName
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
      StakeHolderId,
      ActivityId,
      StakeHolderName,
    });
  } catch (ex) {
    return toast.error(
      "An Error Occured, while saving stakeholder of funds Please try again later" +
        ex
    );
  }
}
