import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";

// Base endpoints
const apiBase = apiUrl.apiUrl + "/inspectionevaluation";
const apiDetails = apiBase + "/details";
const apiDetailss = apiBase + "/details/byinspection";
const apiSummary = apiBase + "/summary";

// =====================
// ✅ Get all evaluations
// =====================
export async function getInspectionEvaluations() {
  try {
    return await http.get(apiBase);
  } catch (ex) {
    return toast.error("Error while fetching evaluations: " + ex);
  }
}
export async function getInspectionEvaluationdetailsbyinspection() {
  try {
    return await http.post(apiDetailss,{ inspectionid });
  } catch (ex) {
    return toast.error("Error while fetching evaluations: " + ex);
  }
}

// =====================
// ✅ Get evaluations by contract
// =====================
export async function getEvaluationsByContract(contractid) {
  try {
    return await http.post(`${apiBase}/bycontract`, { contractid });
  } catch (ex) {
    return toast.error("Error while fetching evaluations by contract: " + ex);
  }
}

// =====================
// ✅ Get evaluations by inspection plan
// =====================
export async function getEvaluationsByPlan(planid) {
  try {
    return await http.post(`${apiBase}/byplan`, { planid });
  } catch (ex) {
    return toast.error("Error while fetching evaluations by plan: " + ex);
  }
}
///
export async function getEvaluationsByPlanserviceorder(planid) {
  try {
    return await http.post(`${apiBase}/byplanserviceorder`, { planid });
  } catch (ex) {
    return toast.error("Error while fetching evaluations by plan: " + ex);
  }
}
// =====================
// ✅ Get evaluation summary
// =====================
export async function getEvaluationSummary(planid) {
  try {
    return await http.post(apiSummary, { planid });
  } catch (ex) {
    return toast.error("Error while fetching evaluation summary: " + ex);
  }
}

// =====================
// ✅ Insert evaluation
// details = [{descriptorid: Number, obtainedMax: Number}, ...]
// =====================
export async function createEvaluation(inspectionplanId, details) {
  try {
    return await http.post(`${apiBase}/save`, {
      inspectionplanId,
      details
    });
  } catch (ex) {
    return toast.error("Error while creating evaluation: " + ex);
  }
}
//
export async function createEvaluationserviceorder(inspectionplanId, details) {
  try {
    return await http.post(`${apiBase}/saveserviceorder`, {
      inspectionplanId,
      details
    });
  } catch (ex) {
    return toast.error("Error while creating evaluation: " + ex);
  }
}
export async function approvEvaluation(inspectionid, contractid, comment, status) {
  try {
    return await http.post(`${apiDetails}/approv`, {
      inspectionid, 
      contractid, 
      comment, 
      status
    });
  } catch (ex) {
    return toast.error("Error while creating evaluation: " + ex);
  }
}
//approvserviceorder
export async function approvEvaluationserviceorder(inspectionid, contractid, comment, status) {
  try {
    return await http.post(`${apiDetails}/approvserviceorder`, {
      inspectionid, 
      contractid, 
      comment, 
      status
    });
  } catch (ex) {
    return toast.error("Error while creating evaluation: " + ex);
  }
}
// =====================
// ✅ Delete evaluation
// =====================
export async function deleteEvaluation(inspectionplanId) {
  try {
    return await http.delete(apiBase, {
      data: { inspectionplanId }
    });
  } catch (ex) {
    return toast.error("Error while deleting evaluation: " + ex);
  }
}

// =====================
// ✅ Get all evaluation details
// =====================
export async function getEvaluationDetails() {
  try {
    return await http.get(apiDetails);
  } catch (ex) {
    return toast.error("Error while fetching evaluation details: " + ex);
  }
}

// =====================
// ✅ Get evaluation details by inspection ID
// =====================
export async function getEvaluationDetailsByInspection(inspectionid) {
  try {
    return await http.post(`${apiDetails}/byinspection`, { inspectionid });
  } catch (ex) {
    return toast.error("Error while fetching evaluation details by inspection: " + ex);
  }
}
///details/byinspectionserviceorder
export async function getEvaluationDetailserviceorderByInspection(inspectionid) {
  try {
    return await http.post(`${apiDetails}/byinspectionserviceorder`, { inspectionid });
  } catch (ex) {
    return toast.error("Error while fetching evaluation details by inspection: " + ex);
  }
}
// =====================
// ✅ Get evaluation details by activity type
// =====================
export async function getEvaluationDetailsByActivity(activitytypeid) {
  try {
    return await http.post(`${apiDetails}/byactivity`, { activitytypeid });
  } catch (ex) {
    return toast.error("Error while fetching evaluation details by activity type: " + ex);
  }
}
