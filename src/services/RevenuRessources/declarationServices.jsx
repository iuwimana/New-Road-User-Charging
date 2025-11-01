import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";

const apiEndpoint = `${apiUrl.apiUrl}/declaration/declaration`;
const apiEndpointsByFiscalYear = `${apiUrl.apiUrl}/declaration/declarationbyfiscalyear`;
const apiEndpointSumByFiscalYear = `${apiUrl.apiUrl}/declaration/declarationtopaybyfiscalyear`;
const apiEndpointSummaryByFiscalYear = `${apiUrl.apiUrl}/declaration/declarationtsummarybyfiscalyear`;
const apiEndpointsenddeclaration = `${apiUrl.apiUrl}/declaration/senddeclaration`;


// Helper to handle API errors
const handleApiError = (ex, defaultMessage = "An error occurred") => {
  if (ex.response) {
    const statusCode = ex.response.status;
    const errorData = ex.response.data;
    if (statusCode === 503) {
      window.location.href = "/error503"; // redirect to service unavailable page
    } else if (statusCode === 404) {
      toast.warning(errorData.error || "Item not found");
    } else if (statusCode === 400) {
      const msg = errorData.details || errorData.error || 
        `Invalid data: ${Object.keys(errorData.errors || {}).join(", ")}`;
      toast.error(msg, { autoClose: 7000 });
    } else {
      toast.error(errorData.error || defaultMessage, { autoClose: 5000 });
    }
  } else {
    toast.error(defaultMessage, { autoClose: 5000 });
  }
};

// Fetch all declarations
export async function getAllDeclarations() {
  try {
    const { data } = await http.get(apiEndpoint);
    return data;
  } catch (ex) {
    handleApiError(ex, "Failed to fetch declarations");
    return null;
  }
}

// Fetch declarations by Fiscal Year
export async function getAllDeclarationByFiscalYear(FiscalYearID) {
  try {
   
    const { data } = await http.post(apiEndpointsByFiscalYear, {FiscalYearID});
    return data;
  } catch (ex) {
    handleApiError(ex, "Failed to fetch declarations by fiscal year");
    return null;
  }
}

// Fetch declaration summary by fiscal year
export async function getDeclarationSummaryByFiscalYear(FiscalYearID = null) {
  try {
    const payload = FiscalYearID ? { FiscalYearID } : {};
    const { data } = await http.post(apiEndpointSummaryByFiscalYear, payload);
    return data;
  } catch (ex) {
    handleApiError(ex, "Failed to fetch declaration summary");
    return null;
  }
}

// Fetch declarations payment summary by Fiscal Year
export async function getAllDeclarationPaymentByFiscalYear(FiscalYearID = null) {
  try {
    const payload = FiscalYearID ? { FiscalYearID } : {};
    const { data } = await http.post(apiEndpointSumByFiscalYear, payload);
    return data;
  } catch (ex) {
    handleApiError(ex, "Failed to fetch declaration payments");
    return null;
  }
}

// Fetch single declaration by ID
export async function getDeclarationById(DeclarationID) {
  try {
    const { data } = await http.get(`${apiEndpoint}/${DeclarationID}`);
    return data;
  } catch (ex) {
    handleApiError(ex, `Failed to fetch declaration ${DeclarationID}`);
    return null;
  }
}

// Save (create/update) declaration


// Save (create/update) declaration
// Save (create/update) declaration

export async function sendDeclaration(DeclarationID) {
  try {
        
    // Make POST request to backend with all fields at top-level
    const { data } = await http.post(apiEndpointsenddeclaration, {DeclarationID });

    toast.success(
      `Declaration send successfully!`,
      { autoClose: 3000 }
    );

    return data;
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      toast.error(
        ex.response.data.error || "Invalid data. Please check your inputs.",
        { autoClose: 5000 }
      );
    } else if (ex.response && ex.response.status === 503) {
      toast.error("Service unavailable. Please try again later.", { autoClose: 5000 });
    } else {
      toast.error("An unexpected error occurred.", { autoClose: 5000 });
    }
    throw ex;
  }
}

export async function saveDeclaration(declarationData) {
  try {
    const isUpdate = declarationData.DeclarationID > 0;

    // Prepare variables to match backend route
    const DeclarationID = declarationData.DeclarationID || 0;
    const firstname = declarationData.firstname;
    const middlename = declarationData.middlename || null;
    const lastname = declarationData.lastname;
    const platenumber = declarationData.platenumber;
    const AccidentDate = declarationData.AccidentDate;
    const AccidentRoad = declarationData.AccidentRoad; // match backend field name
    const LocationCoordinate = declarationData.LocationCoordinate || null;
    const FiscalYearID = declarationData.FiscalYearID;
    const UseInsurance = declarationData.UseInsurance || false;
    const InsuranceID = UseInsurance ? (declarationData.InsuranceID || 1) : null;
    const RevenueProductID = declarationData.RevenueProductID || null; // new field

    // Make POST request to backend with all fields at top-level
    const { data } = await http.post(apiEndpoint, {
      DeclarationID,
      firstname,
      middlename,
      lastname,
      platenumber,
      AccidentDate,
      AccidentRoad,
      LocationCoordinate,
      FiscalYearID,
      UseInsurance,
      InsuranceID,
      RevenueProductID // send new field
    });

    toast.success(
      `Declaration ${isUpdate ? "updated" : "created"} successfully!`,
      { autoClose: 3000 }
    );

    return data;
  } catch (ex) {
    if (ex.response && ex.response.status === 400) {
      toast.error(
        ex.response.data.error || "Invalid data. Please check your inputs.",
        { autoClose: 5000 }
      );
    } else if (ex.response && ex.response.status === 503) {
      toast.error("Service unavailable. Please try again later.", { autoClose: 5000 });
    } else {
      toast.error("An unexpected error occurred.", { autoClose: 5000 });
    }
    throw ex;
  }
}

// Delete a declaration
export async function deleteDeclaration(DeclarationID) {
  try {
    await http.delete(apiEndpoint, { data: { DeclarationID } });
    toast.success("Declaration deleted successfully!", { autoClose: 3000 });
    return true;
  } catch (ex) {
    handleApiError(ex, `Failed to delete declaration ${DeclarationID}`);
    return false;
  }
}

export default {
  getAllDeclarations,
  getAllDeclarationByFiscalYear,
  getAllDeclarationPaymentByFiscalYear,
  getDeclarationById,
  saveDeclaration,
  deleteDeclaration,
  sendDeclaration,
};
