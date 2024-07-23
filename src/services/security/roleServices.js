import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/role/roles";
const roleuserapiEndpoint = apiUrl.apiUrl + "/role/roleusers";
const roleuserapiEndpoints = apiUrl.apiUrl + "/role/roleuser";

export async function getRoles() {
  try {
    return await http.get(apiEndpoint);
  } catch (ex) {
    return null;
  }
}
export async function getRolesearched(query) {
  try {
    const apiEndpoints=apiEndpoint+"/search"
    return await http.get(apiEndpoints,{query});
  } catch (ex) {
    return toast.error("An Error Occured, while fetching role data, Please try again later" + ex );;
  }
}
export async function getRoleById(RoleID) {
  try {
    return await http.post(roleuserapiEndpoints,{  RoleID } );
  } catch (ex) {
    return toast.error("An Error Occured, while fetching role data, Please try again later"+ex);
  }
}
export async function deleteRole(RoleID) {
  try {
     await http.delete(apiEndpoint,{ data: { RoleID: RoleID } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting role Please try again later"+ex);
  }
}



export async function addRoles(user,RoleID,RoleName,Description,IsSystemRole) {
  try {
    
  
     await http.post(apiEndpoint,{ RoleID,RoleName,Description,IsSystemRole});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving role Please try again later" + ex );;
  }
}

export async function addRoleUsers(RoleUserID,RoleID,UserID) {
  try {
    
      // await http.get(roleuserapiEndpoint,{ data: { RoleID: RoleID } });
       await http.post(roleuserapiEndpoint,{ RoleUserID,RoleID,UserID});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving role User Please try again later" + ex );;
  }
}
 
   



 