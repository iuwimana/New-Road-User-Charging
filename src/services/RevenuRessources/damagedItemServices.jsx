import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const apiEndpoint = apiUrl.apiUrl + "/damagedItem/damagedItem";
const apiEndpointByFiscalYear = apiUrl.apiUrl + "/damagedItem/damagedItembyfiscalyear";
const apiEndpointByDeclaration = apiUrl.apiUrl + "/damagedItem/damagedItembydeclarationid";

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate("/error503");
};

// ✅ Get all damaged items
export async function getAllDamagedItems() {
  try {
    const response = await http.get(apiEndpoint);
    return response.data;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable();
    } else {
      toast.error("Failed to fetch damaged items. Please try again.", { autoClose: 5000 });
    }
    return null;
  }
}

// ✅ Get damaged items by fiscal year
export async function getDamagedItemsByFiscalYear(fiscalYearId) {
  try {
    const response = await http.post(apiEndpointByFiscalYear, { FiscalYearID: fiscalYearId });
    return response.data;
  } catch (ex) {
    toast.error("Failed to load damaged items by fiscal year", { autoClose: 5000 });
    return null;
  }
}

// ✅ Get damaged items by declaration ID
export async function getDamagedItemsByDeclarationId(declarationId) {
  try {
    const response = await http.post(apiEndpointByDeclaration, { declarationid: declarationId });
    return response.data;
  } catch (ex) {
    toast.error("Failed to load damaged items for this declaration", { autoClose: 5000 });
    return null;
  }
}

// ✅ Create or update a damaged item
export async function saveDamagedItem(data) {
  try {
    // Wrap your data as "payload" for backend
    const payload = {
      payload: {
        DamagedItemID: data.damagedItemId || 0,
        DeclarationID: data.declarationId,
        ItemID: data.itemId,
        ItemValue: data.itemValue,
        PayedAmount: data.payedAmount,
        Status: data.status || "Pending",
      },
    };

    const isUpdate = data.damagedItemId > 0;
    const response = await http.post(apiEndpoint, payload);

    toast.success(
      `Damaged item ${isUpdate ? "updated" : "created"} successfully!`,
      { autoClose: 3000 }
    );

    return response.data;
  } catch (ex) {
    if (ex.response) {
      const msg =
        ex.response.data.error ||
        `Failed to ${data.damagedItemId > 0 ? "update" : "create"} damaged item`;
      toast.error(msg, { autoClose: 5000 });
    }
    throw ex;
  }
}

// ✅ Delete damaged item
export async function deleteDamagedItem(damagedItemId) {
  try {
    await http.delete(apiEndpoint, { data: { DamagedItemID: damagedItemId } });
    toast.success("Damaged item deleted successfully!", { autoClose: 3000 });
    return true;
  } catch (ex) {
    if (ex.response && ex.response.status === 404) {
      toast.warning("Damaged item not found or already deleted");
    } else {
      toast.error(
        `Failed to delete damaged item: ${ex.response?.data?.error || ex.message}`,
        { autoClose: 5000 }
      );
    }
    return false;
  }
}
