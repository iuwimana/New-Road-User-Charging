import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import * as Product from '../../../services/RevenuRessources/productServices';
import * as Payment from '../../../services/RevenuRessources/revenuPaymentServices';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as BankData from '../../../services/RevenuRessources/bankdataServices';
//***** */


import { format } from 'date-fns';
//***** */
import { toast } from 'react-toastify';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import { Card, CardHeader, CardBody, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

const AddBankDataModal = ({ show, onClose, onDataUploaded }) => {
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [values, setValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [revenueProductId, setRevenueProductId] = useState('');
  const [revenuePaymentId, setRevenuePaymentId] = useState('');
  const [fiscalyearsid, setFiscalyearId] = useState(null);
  const [fiscalYears, setFiscalYears] = useState([]);
  const [products, setProducts] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (show) populateData();
  }, [show]);

  const populateData = async () => {
    try {
      const [{ data: productData }, { data: fiscalData }] = await Promise.all([
        Product.getrevenuproducts(),
        FiscalYear.getFiscalyears(),
      ]);

      setProducts(productData || []);

      if (fiscalData?.length > 0) {
        setFiscalYears(fiscalData);
        setFiscalyearId(fiscalData[0].fiscalyearid);

        const { data: paymentData } = await Payment.getrevenupaymentByFiscalyear(fiscalData[0].fiscalyearid);
        setPayments(paymentData || []);
      } else {
        toast.warning('No Fiscal Year found.');
      }
    } catch (error) {
      toast.error('Error loading initial data: ' + error.message);
    }
  };

  /** Handle File Selection & Parsing */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return toast.error('No file selected.');

    const fileType = file.name.split('.').pop().toLowerCase();

    if (fileType === 'csv') {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => handleParsedData(results.data),
        error: (err) => toast.error('Error parsing CSV: ' + err.message),
      });
    } else if (['xls', 'xlsx'].includes(fileType)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
        const headers = jsonData[0] || [];
        const rows = jsonData.slice(1).map((r) => headers.map((h, i) => r[i] || ''));
        const parsed = rows.map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i]])));
        handleParsedData(parsed, headers, rows);
      };
      reader.readAsArrayBuffer(file);
    } else {
      toast.error('Unsupported file type. Please upload CSV or Excel.');
    }
  };

  /** Process Parsed Data */
  const handleParsedData = (data, headers = null, rows = null) => {
    setParsedData(data);
    setTableHeaders(headers || Object.keys(data[0] || {}));
    setValues(rows || data.map(Object.values));
  };

  /** Save to backend */
  const handleSave = async () => {
  const revenueProductId = 4;

  if (!revenuePaymentId) {
    toast.error('All fields are required.');
    return;
  }

  if (parsedData.length === 0) {
    toast.warning('No data to save. Please upload a valid file.');
    return;
  }

  try {
    setLoading(true);

    // --- Function to clean numeric fields ---
    const cleanParsedData = (data) => {
  const toNumber = (val) => {
    if (val === null || val === undefined || val === "") return 0;
    try {
      const str = String(val); // convert anything to string safely
      const num = parseFloat(str.replace(/[^0-9.-]/g, ""));
      return isNaN(num) ? 0 : num;
    } catch {
      return 0;
    }
  };

  return data.map(item => ({
    ...item,
    Credit: toNumber(item.Credit),
    Debit: toNumber(item.Debit),
    Balance: toNumber(item.Balance),
  }));
};

    // --- Clean your parsed data before sending ---
  

    const cleanedData = cleanParsedData(parsedData);

    const payload = {
      BankDataId: 0, // insert new
      RevenueProductId: Number(revenueProductId),
      RevenuePaymentId: Number(revenuePaymentId),
      loadData: cleanedData,
    };

   // toast.info(`Cleaned Data: ${JSON.stringify(cleanedDatas)}`);

    
   const response = await BankData.saveBankData(payload);

    if (response && response.status === 200) {
      toast.success('Bank Data uploaded successfully!');
      if (onDataUploaded) {
        onDataUploaded();
      }
      onClose();
    } else {
      toast.error('Failed to upload Bank Data.');
    }
    

  } catch (error) {
    toast.error('Error uploading Bank Data: ' + error.message);
  } finally {
    setLoading(false);
  }
};


  const paginatedValues = paginate(values, currentPage, pageSize);
  if (!show) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ overflowY: 'auto' }}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', margin: '2rem auto' }}>
        <Col>
          <Card className="shadow border-0">
            <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
              <h4 className="m-0 text-primary">Upload Bank Data</h4>
              <Button color="secondary" onClick={onClose}>
                Close
              </Button>
            </CardHeader>

            <CardBody>
              <Form>
                {/**
                <FormGroup row>
                  <Label for="FiscalYear" sm={3}>
                    Fiscal Year{fiscalyearsid}
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      value={fiscalyearsid}
                      onChange={(e) => setFiscalyearId(e.target.value)}
                      id="FiscalYear"
                    >
                      <option value="">Select Fiscal Year</option>
                      {fiscalYears.map((fy) => (
                        <option key={fy.fiscalyearid} value={fy.fiscalyearid}>
                          {fy.fiscalyear}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                 

                <FormGroup row>
                  <Label for="RevenueProduct" sm={3}>
                    Revenue Product
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      value={revenueProductId}
                      onChange={(e) => setRevenueProductId(e.target.value)}
                      id="RevenueProduct"
                    >
                      <option value="">Select Revenue Product</option>
                      {products.map((p) => (
                        <option key={p.revenueproductid} value={p.revenueproductid}>
                          {p.revenueproductname}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>
                */}

                <FormGroup row>
                  <Label for="RevenuePayment" sm={3}>
                    Revenue Payment
                  </Label>
                  <Col sm={9}>
                    <Input
                      type="select"
                      value={revenuePaymentId}
                      onChange={(e) => setRevenuePaymentId(e.target.value)}
                      id="RevenuePayment"
                    >
                      <option value="">Select Revenue Payment</option>
                      {payments.map((p) => (
                        <option key={p.revenuepaymentid} value={p.revenuepaymentid}>
                          {p.revenueproductname} — {p.value}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label for="fileUpload" sm={3}>
                    Choose File
                  </Label>
                  <Col sm={9}>
                    <Input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
                    <small className="text-muted">Supported formats: CSV, XLS, XLSX</small>
                  </Col>
                </FormGroup>

                <div className="text-start mt-3">
                  <Button color="primary" onClick={handleSave} disabled={loading}>
                    {loading ? (
                      <span>
                        <i className="spinner-border spinner-border-sm me-2"></i> Saving...
                      </span>
                    ) : (
                      'Load Data'
                    )}
                  </Button>
                </div>

                {loading && <Spinner />}

                {values.length > 0 && (
                  <>
                    <div className="table-responsive mt-3">
                      <table className="table table-bordered table-striped table-hover">
                        <thead className="table-primary">
                          <tr>
                            {tableHeaders.map((header, idx) => (
                              <th key={idx}>{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedValues.map((row, idx) => (
                            <tr key={idx}>
                              {row.map((cell, i) => (
                                <td key={i}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                      <Pagination
                        itemsCount={values.length}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  </>
                )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    </div>
  );
};

AddBankDataModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDataUploaded: PropTypes.func,
};

export default AddBankDataModal;
