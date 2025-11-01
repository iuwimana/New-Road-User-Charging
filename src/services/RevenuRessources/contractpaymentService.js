import http from "../httpService";
import apiUrl from "../../config.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const apiBase = apiUrl.apiUrl + "/api/contractpaymentsetting"; // your backend route prefix

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate("/error503");
};

// ====================== PAYMENT SETTINGS =======================

// Get all settings
export async function getAllPaymentSettings() {
  try {
    const response = await http.get(`${apiBase}/settings`);
    return response.data;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable();
    } else {
      toast.error("Error fetching payment settings", { autoClose: 5000 });
    }
    return null;
  }
}

// Get setting by ID
export async function getPaymentSettingById(id) {
  try {
    const response = await http.post(`${apiBase}/settings/get`, { id });
    return response.data;
  } catch (ex) {
    toast.error("Failed to fetch payment setting", { autoClose: 5000 });
    return null;
  }
}

// Save (insert or update) payment setting
export async function savePaymentSetting(settingData) {
  try {
    const payload = {
      id: settingData.id || 0,
      contract_id: settingData.contract_id,
      service_order_id: settingData.service_order_id,
      source_type: settingData.source_type,
      tax_type: settingData.tax_type,
      has_advance_payment: settingData.has_advance_payment,
      advance_payment_percent: settingData.advance_payment_percent,
      number_of_installments: settingData.number_of_installments,
    };

    const response = await http.post(`${apiBase}/settings`, payload);

    toast.success(
      `Payment setting ${payload.id > 0 ? "updated" : "created"} successfully!`,
      { autoClose: 3000 }
    );

    return response.data;
  } catch (ex) {
    toast.error("Failed to save payment setting", { autoClose: 5000 });
    throw ex;
  }
}

// Delete payment setting
export async function deletePaymentSetting(id) {
  try {
    await http.delete(`${apiBase}/settings`, { data: { id } });
    toast.success("Payment setting deleted successfully!", { autoClose: 3000 });
    return true;
  } catch (ex) {
    toast.error("Failed to delete payment setting", { autoClose: 5000 });
    return false;
  }
}

// ====================== PAYMENT INSTALLMENTS =======================

// Get installments by payment_setting_id
export async function getInstallmentsBySettingId(payment_setting_id) {
  try {
    const response = await http.post(`${apiBase}/installments`, {
      payment_setting_id,
    });
    return response.data;
  } catch (ex) {
    toast.error("Failed to fetch installments", { autoClose: 5000 });
    return null;
  }
}

// Get all installments with details
export async function getAllInstallments() {
  try {
    const response = await http.get(`${apiBase}/installment`);
    return response.data;
  } catch (ex) {
    toast.error("Failed to fetch installments", { autoClose: 5000 });
    return null;
  }
}

// Get installment summary (aggregates)
export async function getInstallmentSummary() {
  try {
    const response = await http.get(`${apiBase}/installment/summary`);
    return response.data;
  } catch (ex) {
    toast.error("Failed to fetch installment summary", { autoClose: 5000 });
    return null;
  }
}

// Save (insert/update) installment
export async function saveInstallment(installmentData) {
  try {
    const payload = {
      id: installmentData.id || 0,
      payment_setting_id: installmentData.payment_setting_id,
      installment_number: installmentData.installment_number,
      percent_amount: installmentData.percent_amount,
      due_days: installmentData.due_days,
    };

    const response = await http.post(`${apiBase}/installments/add`, payload);

    toast.success(
      `Installment ${payload.id > 0 ? "updated" : "created"} successfully!`,
      { autoClose: 3000 }
    );

    return response.data;
  } catch (ex) {
    toast.error("Failed to save installment", { autoClose: 5000 });
    throw ex;
  }
}

// Delete installment
export async function deleteInstallment(id) {
  try {
    await http.delete(`${apiBase}/installments`, { data: { id } });
    toast.success("Installment deleted successfully!", { autoClose: 3000 });
    return true;
  } catch (ex) {
    toast.error("Failed to delete installment", { autoClose: 5000 });
    return false;
  }
}

export default {
  getAllPaymentSettings,
  getPaymentSettingById,
  savePaymentSetting,
  deletePaymentSetting,
  getInstallmentsBySettingId,
  getAllInstallments,
  getInstallmentSummary,
  saveInstallment,
  deleteInstallment,
};
