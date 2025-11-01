import React, { Component } from 'react';
import { FaBalanceScale } from 'react-icons/fa'; // or another icon of your choice
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Col, Card, CardHeader, CardBody, ListGroup, Button } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { FcCurrencyExchange, FcPlus, FcDownload } from 'react-icons/fc';
import { MdSend, MdAttachMoney } from 'react-icons/md';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as BankStatement from '../../../services/RevenuRessources/Bankstatementservice';
import * as Advices from '../../../services/RevenuRessources/nfradviceservices';
import * as RevProdData from '../../../services/RevenuRessources/revenuPaymentServices';
import AddBankStatment from './addBankStatment';
import AddnewBankStatment from './AddnewbankstatementModal';
import { AiOutlineEye } from 'react-icons/ai';
import DiscrepancyModal from './discrepancyModal';
import './collection.css'; // Import your CSS file for styling
//import './model.css'
import _ from 'lodash';
import { AiFillEdit, AiFillDelete, AiOutlineWeibo, AiOutlineShop } from 'react-icons/ai';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import SearchBox from '../../searchBox';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

  const DepositOverage = () => {
        const [sources, setSources] = useState([]);
        const [fiscalyearid, setFiscalyearid] = useState(0);
        const [totaldeposits, settotaldeposits] = useState(0);
        const [recordNumber, setrecordNumber] = useState(0);
        const [loading, setLoading] = useState(true);
        const [searchQuery, setSearchQuery] = useState('');
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize] = useState(5);
        const [showModal, setShowModal] = useState(false);
        const [showNewModal, setShowNewModal] = useState(false);
        const [downloadingPDF, setDownloadingPDF] = useState(false);
        const [downloadingExcel, setDownloadingExcel] = useState(false);

        // ─── Fetch Data ────────────────────────────────────────────────
        useEffect(() => {
            fetchVarianceData();
        }, []);

        const fetchVarianceData = async () => {
            try {
                setLoading(true);
                const response = await FiscalYear.getFiscalyears();
                const fiscalYears = response?.data ?? [];

                if (fiscalYears.length === 0) {
                    toast.error('No Fiscal year found.');
                    setSources([]);
                    return;
                }

                const id = fiscalYears[0].fiscalyearid;
                setFiscalyearid(id);

                //const { data: result } = await BankStatement.getDepositOveragebyfiscalyear(id);
                const [{ data: result },{data:sourcesummary}] = await Promise.all([BankStatement.getDepositOveragebyfiscalyear(id),BankStatement.getsummarydepositoveragebyfiscalyear(id)]);
                // toast.info(`....................${JSON.stringify(sourcesummary)}`)
                 {/**
                    [{"totaldepositamount":"9688983.00","numberofrecords":"34334"}]
                    */}           
                settotaldeposits(sourcesummary?.[0]?.totaldepositamount ?? 0);
                setrecordNumber(sourcesummary?.[0]?.numberofrecords ?? 0);
                if (!result || !Array.isArray(result)) {
                    toast.error('Error fetching deposit overage data.');
                    setSources([]);
                    return;
                }

                // Add computed variance
                const enhancedData = result.map((item) => {
                    const variance = parseFloat(item.paymentreceipt || 0) - parseFloat(item.actualdeposit || 0);
                    let variancetype = 'No Variance';
                    if (variance > 0) variancetype = 'Deposit Deficit Variance';
                    else if (variance < 0) variancetype = 'Over-deposit Variance';

                    return { ...item, variance, variancetype };
                     
        
                });

                setSources(enhancedData);
            } catch (error) {
                toast.error('Error loading data: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        // ─── File Downloads ───────────────────────────────────────────
        const handleDownloadPDF = async () => {
            try {
                setDownloadingPDF(true);
                await BankStatement.exportDepositOverageToPDF(fiscalyearid);
                toast.success('PDF downloaded successfully.');
            } catch (error) {
                toast.error('PDF download failed: ' + error.message);
            } finally {
                setDownloadingPDF(false);
            }
        };

        const handleDownloadExcel = async () => {
            try {
                setDownloadingExcel(true);
                await BankStatement.exportDepositOverageToExcel(fiscalyearid);
                toast.success('Excel downloaded successfully.');
            } catch (error) {
                toast.error('Excel download failed: ' + error.message);
            } finally {
                setDownloadingExcel(false);
            }
        };

        // ─── Filtering, Sorting, and Pagination ───────────────────────
        const filtered = searchQuery
            ? sources.filter(
                  (m) =>
                      m.revenueproductname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      m.account?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      m.bankname?.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : sources;

        const sorted = _.orderBy(filtered, ['revenueproductname'], ['asc']);
        const paginatedsources = paginate(sorted, currentPage, pageSize);

        // ─── Pagination & Search ──────────────────────────────────────
        const handlePageChange = (page) => setCurrentPage(page);
        const handleSearch = (e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
        };

        // ─── Toggle Modals ────────────────────────────────────────────
        const toggleModal = () => setShowModal((prev) => !prev);
        const toggleNewModal = () => setShowNewModal((prev) => !prev);

        // ─── Render ──────────────────────────────────────────────────
        if (loading) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        const totalCount = sources.length;
        const totalDeposit = _.sumBy(sources, (s) => parseFloat(s.creditamount || 0));
        const highestBalance = _.maxBy(sources, (s) => parseFloat(s.value || 0))?.value || 0;

        return (
            <div className="container-fluid py-3">
                <Col className="text-center">
                    <Card className="shadow border-0">
                        <CardHeader className="bg-white d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <div>
                                <h2 className="text-primary mb-1">Data From Commercial Banks</h2>
                                <small className="text-muted">Fiscal Year ID: {fiscalyearid}</small>
                            </div>
                            <div className="text-end">
                                <p className="text-muted mb-0">Total Deposit</p>
                                <h3 className="text-success fw-bold">{new Intl.NumberFormat().format(totaldeposits)} USD</h3>
                                <br />
                                <p className="text-muted mb-0">Number of records</p>
                                <h3 className="text-success fw-bold">{new Intl.NumberFormat().format(recordNumber)} USD</h3>
                            </div>
                        </CardHeader>

                        <CardBody className="bg-light">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
                                <input type="text" className="form-control w-50" placeholder="🔍 Search by product, account, or bank..." value={searchQuery} onChange={handleSearch} />

                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="downloadDropdown" disabled={downloadingPDF || downloadingExcel}>
                                        {downloadingPDF || downloadingExcel ? <span className="spinner-border spinner-border-sm me-2"></span> : '📥 Download'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleDownloadPDF} disabled={downloadingPDF}>
                                            {downloadingPDF ? 'Downloading PDF...' : 'Download PDF'}
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleDownloadExcel} disabled={downloadingExcel}>
                                            {downloadingExcel ? 'Downloading Excel...' : 'Download Excel'}
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            {sources.length === 0 ? (
                                <div className="alert alert-warning text-center">No bank data found for this fiscal year.</div>
                            ) : (
                                <div className="table-responsive shadow-sm rounded">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-primary text-dark">
                                            <tr>
                                                <th>Product</th>
                                                <th>Account</th>
                                                <th>Payment Date</th>
                                                <th>Debit Amount</th>
                                                <th>Credit Amount</th>
                                                <th>Balance</th>
                                                <th>Bank</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedsources.map((s, index) => (
                                                <tr key={index}>
                                                    <td>{s.revenueproductname}</td>
                                                    <td>{s.account}</td>
                                                    <td style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                        {new Date(s.paymentdate).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </td>
                                                    <td className="fw-semibold text-end">{new Intl.NumberFormat().format(s.debitamount)}</td>
                                                    <td className="fw-semibold text-end">{new Intl.NumberFormat().format(s.creditamount)}</td>
                                                    <td className="fw-semibold text-end">{new Intl.NumberFormat().format(s.value)}</td>
                                                    <td>{s.bankname}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="d-flex justify-content-center mt-3">
                                <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    };
   export default DepositOverage;