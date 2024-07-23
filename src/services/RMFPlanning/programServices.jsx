import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/program/program";


export async function getprograms() {
  try {
    const program = await http.get(apiEndpoint);
    return program
  } catch (ex) {
    return null;
  }

  

}

export async function getprogramById(ProgramId) {
  try {
    return await http.get(apiEndpoint,ProgramId);
  } catch (ex) {
    return toast.error("An Error Occured, while fetching program data, Please try again later"+ex);
  }
}
export async function deleteprogram(ProgramId) {
  try {
       
     await http.delete(apiEndpoint,{ data: { ProgramId: ProgramId } });
     
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting program Please try again later"+ex);
  }
}
export async function addprogram(ProgramId,ProgramName,Description) {
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
  
     await http.post(apiEndpoint,{ ProgramId,ProgramName,Description});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving program of funds Please try again later" + ex );;
  }
}
 
   



 