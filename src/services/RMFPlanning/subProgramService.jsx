import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/subprogram/subprogram";
const apiEndpoints = apiUrl.apiUrl + "/subprogram/subprograms";


export async function getsubprograms() {
  try {
    const subprogram = await http.get(apiEndpoint);
    return subprogram
  } catch (ex) {
    return null;
  }

  

}

export async function getsubprogramById(ProgramId) {
  try {
    
    const subprogram = await http.post(apiEndpoints,{ProgramId});
    return subprogram
  } catch (ex) {
    return toast.error("An Error Occured, while fetching subprogram data, Please try again later"+ex);
  }
}
export async function deletesubprogram(SubProgramId) {
  try {
    await http.delete(apiEndpoint,{ data: { SubProgramId: SubProgramId } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting subprogram Please try again later"+ex);
  }
}
export async function addsubprogram(SubProgramId,ProgramId,SubProgramName,Description) {
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
  
     await http.post(apiEndpoint,{SubProgramId,ProgramId,SubProgramName,Description});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving subprogram of funds Please try again later" + ex );;
  }
}
 
   



 