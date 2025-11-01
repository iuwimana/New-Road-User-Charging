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

const DepositVariance = () => {
        const [sources, setSources] = useState([]);
        const [fiscalyearsid, setFiscalyearsid] = useState(0);
        const [loading, setLoading] = useState(true);
        const [searchQuery, setSearchQuery] = useState('');
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(5);
        const [showModal, setShowModal] = useState(false);
        const [showNewModal, setShowNewModal] = useState(false);
        const [downloadingPDF, setDownloadingPDF] = useState(false);
        const [downloadingExcel, setDownloadingExcel] = useState(false);
        const [totaldeposits, settotaldeposits ]= useState(0);
         const [recordNumber, setrecordNumber ]= useState(0);
        

        // ✅ Fetch data when component mounts
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
                    return;
                }

                const fiscalyearsid = fiscalYears[0].fiscalyearid;
                setFiscalyearsid(fiscalyearsid);

                //const { data: result } = await BankStatement.getDepositVariancebyfiscalyear(fiscalyearsid);
                const [{ data: result },{data:sourcesummary}] = await Promise.all([BankStatement.getDepositVariancebyfiscalyear(fiscalyearsid),BankStatement.getsummarydepositvariancebyfiscalyear(fiscalyearsid)]);
                            
                //toast.info(`....................${JSON.stringify(sourcesummary)}`)
                if (!result) {
                    toast.error('Error fetching deposit variance data.');
                    return;
                }
                settotaldeposits(sourcesummary?.[0]?.totalamount ?? 0);
                setrecordNumber(sourcesummary?.[0]?.recordnumber ?? 0)
                //const [totaldeposits, settotaldeposits ]= useState(0);
                //const [recordNumber, setrecordNumber ]= useState(0);
                {/**
                    [{"totalamount":"3197948","recordnumber":"23482"}]
                    */}
 
                // ✅ Add variance classification
                const enhancedData = result.map((item) => {
                    const variance = parseFloat(item.paymentreceipt) - parseFloat(item.actualdeposit);
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

        // ✅ Handle file downloads
        const handleDownloadPDF = async () => {
            try {
                setDownloadingPDF(true);
                await BankStatement.exportDepositvarianceToPDF(fiscalyearsid);
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
                await BankStatement.exportDepositvarianceToExcel(fiscalyearsid);
                toast.success('Excel downloaded successfully.');
            } catch (error) {
                toast.error('Excel download failed: ' + error.message);
            } finally {
                setDownloadingExcel(false);
            }
        };

        // ✅ Filtering, sorting, and pagination
        const filtered = searchQuery
            ? sources.filter(
                  (m) =>
                      m.revenueproductname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      m.advice?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      m.taxcenter?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      m.amount?.toString().includes(searchQuery)||
                      m.bankname?.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : sources;

        const sorted = _.orderBy(filtered, ['revenueproductname'], ['asc']);
        const paginatedsources = paginate(sorted, currentPage, pageSize);

        const handlePageChange = (page) => setCurrentPage(page);

        if (loading) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Col style={{ textAlign: 'center' }}>
                    <Card className="shadow border-0">
                        <CardHeader className="bg-white d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <div>
                                <h2 className="text-primary mb-1">Deposit Variance</h2>
                                <small className="text-muted">Fiscal Year ID: {fiscalyearsid}</small>
                            </div>
                            <div className="text-end">
                                <p className="text-muted mb-0">Total Deposit</p>
                                <h3 className="text-success fw-bold">{new Intl.NumberFormat().format(totaldeposits)} USD</h3>
                                <br />
                                <p className="text-muted mb-0">Number of records</p>
                                <h3 className="text-success fw-bold">{new Intl.NumberFormat().format(recordNumber)} USD</h3>
                            </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            {sources.length === 0 ? (
                                <p>No Deposit Variance data available.</p>
                            ) : (
                                <>
                                    <div className="d-flex justify-content-between mb-3">
                                        <input
                                            type="text"
                                            className="form-control w-50"
                                            placeholder="🔍 Search by product, account, or name..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />

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

                                    <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                        <table className="table table-striped table-bordered">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Advice</th>
                                                    <th>Bank</th>
                                                    <th>Name</th>
                                                    <th>Tax center</th>
                                                    <th>Actual Deposit</th>
                                                    <th>paymentdate </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedsources.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.revenueproductname}</td>
                                                        <td>{item.advice}</td>
                                                        <td>{item.bankname}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.taxcenter}</td>
                                                        <td>{item.amount.toFixed(2)}</td>
                                                        <td>{item.paymentdate}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <Pagination itemsCount={filtered.length} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                                </>
                            )}
                            {showModal && <AddBankStatment show={showModal} onClose={() => setShowModal(false)} onDataUploaded={fetchVarianceData} />}
                            {showNewModal && <AddnewBankStatment show={showNewModal} onClose={() => setShowNewModal(false)} />}
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    };
       export default DepositVariance;
