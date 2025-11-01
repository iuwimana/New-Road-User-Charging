import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import * as Product from '../../../services/RevenuRessources/productServices';
import * as Payment from '../../../services/RevenuRessources/revenuPaymentServices';
import * as BorderData from '../../../services/RevenuRessources/nationalborderservices';
import * as Correction from '../../../services/RevenuRessources/Bankstatementservice';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { format } from 'date-fns';

const AddBankStatement = ({ show, onClose, revenuproductid: propProductId, revenuproductname: propProductName, currencyid: propCurrencyId, currencyname: propCurrencyName, activeon: propActiveOn, onDataUploaded }) => {
    const [loading, setLoading] = useState(false);
    const [ParsedData, setParsedData] = useState([]);
    const [TableRows, setTableRows] = useState([]);
    const [Values, setValues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [payment, setPayment] = useState([]);
    const [product, setProduct] = useState([]);
    const [borders, setBorders] = useState([]);
    const [revenuepaymentid, setRevenuePaymentId] = useState('');
    const [fiscalyearsid, setFiscalyearId] = useState(null);
    const [fiscalyear, setFiscalYear] = useState([]);
    const [CurrentDate, setCurrentDate] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        if (show) {
            populateData();
            const currentUser = auth.getJwt();
            setUser(currentUser);
        }
    }, [show]);

    const populateData = async () => {
        try {
            const { data: productData } = await Product.getrevenuproducts();
            const { data: paymentData } = await Payment.getrevenupayments();
            const { data: borderData } = await BorderData.getnationalborders();
            setProduct(productData);
            setBorders(borderData);

            const fiscalResponse = await FiscalYear.getFiscalyears();
            if (fiscalResponse && fiscalResponse.data.length > 0) {
                setFiscalYear(fiscalResponse.data.map(y => y.fiscalyear));
                setFiscalyearId(fiscalResponse.data[0].fiscalyearid);
                const { data: paymentByYear } = await Payment.getrevenupaymentByFiscalyear(fiscalResponse.data[0].fiscalyearid);
                setPayment(paymentByYear);
            } else {
                toast.error('No Fiscal year found');
            }

            setRevenuePaymentId(propProductId || '');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            setCurrentDate(format(today, 'yyyy-MM-dd'));
        } catch (ex) {
            toast.error('Error loading data: ' + ex);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return toast.error('No file selected.');

        const fileType = file.name.split('.').pop().toLowerCase();

        if (fileType === 'csv') {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => handleParsedData(results.data),
                error: (error) => toast.error('Error parsing CSV: ' + error.message),
            });
        } else if (['xls', 'xlsx'].includes(fileType)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
                const headers = jsonData[0] || [];
                const rows = jsonData.slice(1).map(row => headers.map((h, i) => row[i] || ''));
                const parsed = rows.map(row => Object.fromEntries(headers.map((h, i) => [h, row[i]])));
                handleParsedData(parsed, headers, rows);
            };
            reader.readAsArrayBuffer(file);
        } else {
            toast.error('Unsupported file type. Please upload CSV or Excel.');
        }
    };

    const handleParsedData = (data, headers = null, values = null) => {
        setParsedData(data);
        setTableRows(headers || Object.keys(data[0] || {}));
        setValues(values || data.map(Object.values));
    };

    const handleSave = async () => {
        try {
            const bankstatementid = 0;
            const RevenueProductId = propProductId || 2;
            const currencyid = propCurrencyId || 1;
            setLoading(true);

            if (RevenueProductId && revenuepaymentid && ParsedData.length) {
                await Correction.addbankstatement(bankstatementid, RevenueProductId, revenuepaymentid, ParsedData, currencyid);
                await Correction.creatediscrepancy();
                toast.success('Bank Statement file upload successful');
                
            } else {
                toast.error('All fields are required');
            }

            onClose();
            if (onDataUploaded) {
                onDataUploaded();
            }
        } catch (ex) {
            toast.error('Error uploading bank statement: ' + ex);
        } finally {
            setLoading(false);
        }
    };

    const paginatedValues = paginate(Values, currentPage, pageSize);

    if (!show) return null;

    return (
        <div className="modal-backdrop" onClick={onClose} style={{ overflowY: 'auto' }}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px', margin: '2rem auto' }}>
                <Col>
                    <Card className="shadow border-0">
                        <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
                            <h4 className="m-0">Upload Bank Statement</h4>
                            <Button color="secondary" onClick={onClose}>Close</Button>
                        </CardHeader>
                        <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="RevenuePaymentId" sm={3}>Revenue Payment</Label>
                                    <Col sm={9}>
                                        <Input type="select" value={revenuepaymentid} onChange={e => setRevenuePaymentId(e.target.value)} id="RevenuePaymentId">
                                            <option value="">Select Revenue Payment</option>
                                            {payment.map(p => (
                                                <option key={p.revenuepaymentid} value={p.revenuepaymentid}>
                                                    {p.revenueproductname} {'--->'} {p.value}
                                                </option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="fileUpload" sm={3}>Choose file</Label>
                                    <Col sm={9}>
                                        <Input type="file" accept=".csv, .xls, .xlsx" onChange={handleFileChange} />
                                        <small className="text-muted">Supported formats: CSV, XLS, XLSX</small>
                                    </Col>
                                </FormGroup>

                                <div className="text-start mt-3">
                                    <Button color="primary" onClick={handleSave} disabled={loading}>
                                        {loading ? <span><i className="spinner-border spinner-border-sm me-2"></i> Loading...</span> : 'Load Data'}
                                    </Button>
                                </div>

                                {loading && <Spinner />}

                                {Values.length > 0 && (
                                    <div className="table-responsive mb-3">
                                        <table className="table table-bordered table-striped table-hover">
                                            <thead>
                                                <tr>{TableRows.map((header, idx) => <th key={idx}>{header}</th>)}</tr>
                                            </thead>
                                            <tbody>
                                                {paginatedValues.map((row, idx) => (
                                                    <tr key={idx}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                <div className="d-flex justify-content-center mt-3">
                                    <Pagination itemsCount={Values.length} pageSize={pageSize} currentPage={currentPage} onPageChange={setCurrentPage} />
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        </div>
    );
};

AddBankStatement.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    revenuproductid: PropTypes.number,
    revenuproductname: PropTypes.string,
    currencyid: PropTypes.number,
    currencyname: PropTypes.string,
    activeon: PropTypes.string,
};

export default AddBankStatement;
