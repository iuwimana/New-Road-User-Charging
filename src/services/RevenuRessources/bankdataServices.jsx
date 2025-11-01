import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";

const apiEndpoint = apiUrl.apiUrl + "/bankdata/banksdata";
const apiByYear = apiUrl.apiUrl + "/bankdata/banksdatabyyear";
const apiByYearsummary = apiUrl.apiUrl + "/bankdata/banksdatabyyearsummary";
const apiInsertOrUpdate = apiUrl.apiUrl + "/bankdata/bankdata";
const apiExportPDF = apiUrl.apiUrl + "/bankdata/banksdata/export/pdf";
const apiExportExcel = apiUrl.apiUrl + "/bankdata/banksdata/export/excel";

/**
 * Handle service unavailable
 */
const handleServiceUnavailable = () => {
  window.location.href = "/pages/Pages/Error503"; // redirect to error page
};

/**
 * GET all BankData
 */
export async function getBanksData() {
  try {
    const response = await http.get(apiEndpoint);
    return response;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) handleServiceUnavailable();
    toast.error("Error fetching BankData: " + ex.message);
    return null;
  }
}

/**
 * GET BankData by fiscal year
 * @param {number} fiscalyearid
 */
export async function getBanksDataByFiscalYear(fiscalyearid) {
  try {
    const response = await http.post(apiByYear, { fiscalyearid });
    return response;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) handleServiceUnavailable();
    toast.error("Error fetching BankData by fiscal year: " + ex.message);
    return null;
  }
}
export async function getBanksDataByFiscalYearsummary(fiscalyearid) {
  try {
    const response = await http.post(apiByYearsummary, { fiscalyearid });
    return response;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) handleServiceUnavailable();
    toast.error("Error fetching BankData by fiscal year: " + ex.message);
    return null;
  }
}


/**
 * Insert or update BankData
 * @param {object} bankData { BankDataId, RevenueProductId, RevenuePaymentId, loadData }
 */
export async function saveBankData({ BankDataId, RevenueProductId, RevenuePaymentId, loadData }) {
  try {
    const response = await http.post(apiInsertOrUpdate, { BankDataId, RevenueProductId, RevenuePaymentId, loadData });
    return response;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) handleServiceUnavailable();
    toast.error("Error saving BankData: " + ex.message);
    return null;
  }
}

/**
 * DELETE BankData
 * @param {number} Bankdataid
 */
export async function deleteBankData(Bankdataid) {
  try {
    const response = await http.delete(apiEndpoint, { data: { Bankdataid } });
    return response;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) handleServiceUnavailable();
    toast.error("Error deleting BankData: " + ex.message);
    return null;
  }
}

/**
 * Export BankData PDF by fiscal year
 * @param {number} fiscalyearid
 */
export async function exportBankDataPDF(fiscalyearid) {
  try {
    const response = await http.post(apiExportPDF, { fiscalyearid }, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `BankData_${fiscalyearid}.pdf`);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);
    return true;
  } catch (ex) {
    toast.error("PDF Export Failed: " + ex.message);
    return false;
  }
}

/**
 * Export BankData Excel by fiscal year
 * @param {number} fiscalyearid
 */
export async function exportBankDataExcel(fiscalyearid) {
  try {
    const response = await http.post(apiExportExcel, { fiscalyearid }, { responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `BankData_${fiscalyearid}.xlsx`);
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);
    return true;
  } catch (ex) {
    toast.error("Excel Export Failed: " + ex.message);
    return false;
  }
}
