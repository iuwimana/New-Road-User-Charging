import http from "../../httpService";
import apiUrl from "../../../config.json";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const apiBase = apiUrl.apiUrl + "/payments";

const handleServiceUnavailable = () => {
  const navigate = useNavigate();
  navigate("/error503");
};

// ====================== PAYMENTS =======================

// Get payments by fiscal year
export async function getPaymentsByFiscalYear(fiscalyearid) {
  try {
    const response = await http.post(`${apiBase}/payments`, { fiscalyearid });
    return response.data;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable();
    } else {
      toast.error("Error fetching payments", { autoClose: 5000 });
    }
    return null;
  }
}

// Get payments by fiscal year
export async function getPaymentsByFiscalYearrevenues(fiscalyearid) {
  try {
    const response = await http.post(`${apiBase}/payments/revenues`, { fiscalyearid });
    return response.data;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable();
    } else {
      toast.error("Error fetching payments", { autoClose: 5000 });
    }
    return null;
  }
}


// Update payment status (using your procedure)
export async function updatePaymentStatus(paymentid) {
  try {
    const response = await http.post(`${apiBase}/payment`, { paymentid });
    toast.success("Payment status updated successfully", { autoClose: 3000 });
    return response.data;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable();
    } else {
      toast.error("Failed to update payment status", { autoClose: 5000 });
    }
    return null;
  }
}
//invoice
export async function getinvoicepdf(paymentid) {
  try {
    const response = await http.post(
      `${apiBase}/payments/pdf`,  // <-- define iyi constant yawe nk’uko wabikoze kuri apiExportPDF
      { paymentid },
      { responseType: "blob" } // Important for binary PDF
    );
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Invoice_${paymentid}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);

    return true;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable();
    } else {
      toast.error("Failed to download Invoice"+ex, { autoClose: 5000 });
    }
    return null;
  }
}

export async function getevaluationreportpdf(evaluation,descriptors) {
  try {
    const response = await http.post(
      `${apiBase}/payments/evaluationreport/pdf`,  // <-- define iyi constant yawe nk’uko wabikoze kuri apiExportPDF
      { evaluation,descriptors },
      { responseType: "blob" } // Important for binary PDF
    );
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `EvaluationReport_${evaluation.inspectionid}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      link.remove();
    }, 100);

    return true;
  } catch (ex) {
    if (ex.response && ex.response.status === 503) {
      handleServiceUnavailable();
    } else {
      toast.error("Failed to download Invoice"+ex, { autoClose: 5000 });
    }
    return null;
  }
}

// Optional: fetch a single payment by ID
export async function getPaymentById(paymentid) {
  try {
    const response = await http.post(`${apiBase}/get`, { paymentid });
    return response.data;
  } catch (ex) {
    toast.error("Failed to fetch payment", { autoClose: 5000 });
    return null;
  }
}

export default {
  getPaymentsByFiscalYear,
  updatePaymentStatus,
  getPaymentById,
};
