import http from "../httpService";
import  apiUrl  from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/securable/securable";
const permissionapiEndpoint = apiUrl.apiUrl + "/rolepermission/rolepermission";
const permissionapiEndpoints = apiUrl.apiUrl + "/rolepermission/rolepermissions";
const revenucollectionapiEndpoints = apiUrl.apiUrl + "/securable/revenucollection";
const revenucollectionsapiEndpoints = apiUrl.apiUrl + "/securable/revenucollectionsecurables";
const planingapiEndpoints = apiUrl.apiUrl + "/securable/planingsecurable";
const planingsapiEndpoints = apiUrl.apiUrl + "/securable/planingsecurables";
const conractapiEndpoints = apiUrl.apiUrl + "/securable/contractsecurable";
const contractsapiEndpoints = apiUrl.apiUrl + "/securable/contractsecurables";
const revenucollectionsaddapiEndpoints = apiUrl.apiUrl + "/rolepermission/userpermission";
const collectionuserapiEndpoint = apiUrl.apiUrl + "/securable/revenucollectionusersecurables";
const planninguserapiEndpoint = apiUrl.apiUrl + "/securable/planningusersecurables";
const contractuserapiEndpoint = apiUrl.apiUrl + "/securable/contractusersecurables";

const apiEndpointaudit = apiUrl.apiUrl + "/securable/audit";

export async function getsecurables() {
  try {
    return await http.get(apiEndpoint);
  } catch (ex) {
    return null;
  }
}

export async function getaudittrails() {
  try {
    return await http.get(apiEndpointaudit);
  } catch (ex) {
    return null;
  }
}
export async function getsecurableId(SecurableID) {
  try {
    return await http.get(apiEndpoint,SecurableID);
  } catch (ex) {
    return toast.error("An Error Occured, while fetching securable data, Please try again later"+ex);
  }
}
export async function deletesecurable(SecurableID) {
  try {
     await http.delete(apiEndpoint,{ data: { SecurableID: SecurableID } });
    
  } catch (ex) {
    return toast.error("An Error Occured, while deleting role Please try again later"+ex);
  }
}

export async function getsecurableaccess(Email,securableid) {
  try {
    return await http.post(permissionapiEndpoints,{Email,securableid});
  } catch (ex) {
    return null;
  }
}

export async function addrolepermission(RolePermissionID,RoleID,SecurableID,CanAccess,CanCreate,CanView,CanModify,CanDelete,CanExecute) {
  try {
    
  
     await http.post(permissionapiEndpoint,{ RolePermissionID,RoleID,SecurableID,CanAccess,CanCreate,CanView,CanModify,CanDelete,CanExecute});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving Role Permission Please try again later" + ex );;
  }
}


export async function addsecurables(SecurableID,SecurableName) {
  try {
    
  
     await http.post(apiEndpoint,{ SecurableID,SecurableName});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving securable Please try again later" + ex );;
  }
}

/////////////////////////////////usersecurables
/////////////////////////////////revenucollectionusersecurables

export async function getrevenucollectionusersecurables(securableid,email) {
  try {
    return await http.post(collectionuserapiEndpoint ,{securableid,email});
  } catch (ex) {
    return null;
  }
}

/////////////////////////////////endrevenucollectionusersecurable
/////////////////////////////////Planningusersecurables

export async function getPlanningusersecurables(securableid,email) {
  try {
    return await http.post(planninguserapiEndpoint ,{securableid,email});
  } catch (ex) {
    return null;
  }
}

/////////////////////////////////endPlanningusersecurable
/////////////////////////////////contractusersecurables


export async function contractusersecurables(securableid,email) {
  try {
    return await http.post(contractuserapiEndpoint,{securableid,email});
  } catch (ex) {
    return null;
  }
}


/////////////////////////////////endcontractusersecurable
/////////////////////////////////endusersecurable
 
 ////////////////////////////revenucollection securables
 export async function getrevenucollectionsecurable(userid) {
  try {
    return await http.post(revenucollectionapiEndpoints,{userid});
  } catch (ex) {
    return null;
  }
}
 export async function getrevenucollectionsecurables() {
  try {
    return await http.get(revenucollectionsapiEndpoints,{});
  } catch (ex) {
    return null;
  }
}

export async function addrevenucollectionsecurables(userpermissionid, userid, securableid, canaccess, cancreate, canview, canmodify, candelete, canexecute) {
  try {
    
  
     await http.post(revenucollectionsaddapiEndpoints,{userpermissionid, userid, securableid, canaccess, cancreate, canview, canmodify, candelete, canexecute});
    
  } catch (ex) {
    return toast.error("An Error Occured, while saving securable Please try again later" + ex );;
  }
}
 
 /////////////////////////////////END revenucollection securables

 ////////////////////////////Planing securables
 export async function getplaningsecurable(userid) {
  try {
    return await http.post(planingapiEndpoints,{userid});
  } catch (ex) {
    return null;
  }
}
 export async function getplaningsecurables() {
  try {
    return await http.get(planingsapiEndpoints,{});
  } catch (ex) {
    return null;
  }
}


 
 /////////////////////////////////END Planing securables 
 ////////////////////////////contract securables
 export async function getcontractsecurable(userid) {
  try {
    return await http.post(conractapiEndpoints,{userid});
  } catch (ex) {
    return null;
  }
}
 export async function getcontractsecurables() {
  try {
    return await http.get(contractsapiEndpoints,{});
  } catch (ex) {
    return null;
  }
}


 
 /////////////////////////////////END contract securables

 