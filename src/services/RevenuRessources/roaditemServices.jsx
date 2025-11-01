import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
const apiEndpoint = apiUrl.apiUrl + "/roaditem/roaditem";
//const apiEndpoints = apiUrl.apiUrl + "/annualtarget/annualtargetfiscalyear";
//const apiEndpointsum=apiUrl.apiUrl + "/annualtarget//annualtargetfiscalyearsum";
import { useNavigate } from 'react-router-dom';

{/**
  "RoadItemID": 0,
  "ItemName": "trafic right",
  "ItemPrice": 781245960  
    
    */}

const handleServiceUnavailable = () => {
    const navigate = useNavigate();
    navigate('/error503'); // Redirect to service unavailable page
  };
  
  export async function getAllRoadItems() {
    try {
      const response = await http.get(apiEndpoint);
      return response.data;
    } catch (ex) {
      if (ex.response && ex.response.status === 503) {
        handleServiceUnavailable();
      } else {
        toast.error(
          "An error occurred while fetching road items. Please try again later.",
          { autoClose: 5000 }
        );
      }
      return null;
    }
  }
  
  export async function getRoadItemById(RoadItemID) {
    try {
      const response = await http.get(`${apiEndpoint}/${RoadItemID}`);
      return response.data;
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 503) {
          handleServiceUnavailable();
        } else if (ex.response.status === 404) {
          toast.warning("Road item not found");
        } else {
          toast.error(
            `Failed to get road item: ${ex.response.data.error || ex.message}`,
            { autoClose: 5000 }
          );
        }
      }
      return null;
    }
  }
  
  export async function saveRoadItem(roadItemData) {
    try {
      const isUpdate = roadItemData.RoadItemID > 0;
      const response = await http.post(apiEndpoint, roadItemData);
      
      toast.success(
        `Road item ${isUpdate ? 'updated' : 'created'} successfully!`,
        { autoClose: 3000 }
      );
      
      return response.data;
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 503) {
          handleServiceUnavailable();
        } else {
          const errorMsg = ex.response.data.error || 
            `Failed to ${roadItemData.roadItemId > 0 ? 'update' : 'create'} road item`;
          toast.error(errorMsg, { autoClose: 5000 });
        }
      }
      throw ex;
    }
  }
  
  export async function deleteRoadItem(RoadItemID) {
    try {
      await http.delete(apiEndpoint, { data: { RoadItemID: RoadItemID } });
      toast.success("Road item deleted successfully!", { autoClose: 3000 });
      return true;
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 503) {
          handleServiceUnavailable();
        } else if (ex.response.status === 404) {
          toast.warning("Road item not found or already deleted");
        } else {
          toast.error(
            `Failed to delete road item: ${ex.response.data.error || ex.message}`,
            { autoClose: 5000 }
          );
        }
      }
      return false;
    }
  }
export default {
    getAllRoadItems,
    getRoadItemById,
    saveRoadItem,
    deleteRoadItem
  };
