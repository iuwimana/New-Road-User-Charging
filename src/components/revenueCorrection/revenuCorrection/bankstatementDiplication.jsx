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

  const BankstatementDiplication = () => {
        const [sources, setSources] = useState([]);
        const [loading, setLoading] = useState(true);
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(30);
        const [searchQuery, setSearchQuery] = useState('');
        const [sortColumn, setSortColumn] = useState({ path: 'duplicate_group_id', order: 'asc' });
        const [selectedGroupId, setSelectedGroupId] = useState(null);
        const [modalOpen, setModalOpen] = useState(false);
        const [totaldeposit, settotaldeposit] = useState(0);
        const [totaldepositpending, settotaldepositpending] = useState(0);
        const [totaldepositUnReconciled, settotaldepositUnReconciled] = useState(0);
        const [exportType, setExportType] = useState(null);
        const [isOpen, setIsOpen] = useState(false);
        const [fiscalyearsid, setFiscalYearId] = useState(0);

        useEffect(() => {
            async function fetchData() {
                try {
                    setLoading(true);
                    const { data: fiscalYears } = await FiscalYear.getFiscalyears();
                          if (!fiscalYears?.length) {
                            toast.error("No Fiscal Year found.");
                            return;
                          }
                    
                          const selectedFiscalYearId = fiscalYears[0].fiscalyearid;
                          setFiscalYearId(selectedFiscalYearId);
                    //const { data: sources } = await BankStatement.getDiscrepancy();
                    const [{ data: sources }, { data: responses }, { data: responsepending }, { data: responseunreconcille }] = await Promise.all([
                        BankStatement.getDiscrepancy(),
                        BankStatement.getDiscrepancysum(),
                        BankStatement.getdeclarationaount(fiscalyearsid),
                        BankStatement.getpaymentamount(fiscalyearsid),
                    ]);
                    const totaldeposits = responses?.[0]?.discrepancyamount ?? 0;
                    const totaldepositdending = responsepending?.[0]?.totalpayment ?? 0;
                    const totaldepositunreconcille = responseunreconcille?.[0]?.totalpayment ?? 0;

                    setSources(sources || []);
                    settotaldeposit(totaldeposits);
                    settotaldepositpending(totaldepositdending);
                    settotaldepositUnReconciled(totaldepositunreconcille);
                } catch (error) {
                    toast.error('An error occurred while fetching discrepancy data: ' + error);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }, []);

        const handlePageChange = (page) => setCurrentPage(page);
        const handleSearch = (query) => {
            setSearchQuery(query);
            setCurrentPage(1);
        };

        const getPagedData = () => {
            let filtered = sources;
            if (searchQuery) {
                filtered = sources.filter((s) => Object.values(s).join(' ').toLowerCase().includes(searchQuery.toLowerCase()));
            }

            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
            const startIndex = (currentPage - 1) * pageSize;
            const paginated = sorted.slice(startIndex, startIndex + pageSize);

            return { totalCount: filtered.length, data: paginated };
        };
        const getdownload = async (type) => {
            toast.info(`exporting with ${type}`);
            setExportType(type);

            setLoading(true);
            try {
                if (type === 'pdf') {
                    const { data: sources } = await BankStatement.exportdiscrepancyToPDF(fiscalyearsid);

                    if (!sources) {
                        toast.error(`Failed to export ${exportType.toUpperCase()}`);
                    }
                } else {
                    const { data: sources } = await BankStatement.exportdiscrepancyToExcel(fiscalyearsid);

                    if (!sources) {
                        toast.error(`Failed to export ${exportType.toUpperCase()}`);
                    }
                }
            } catch (error) {
                console.error('Export failed:', error);
            } finally {
                setLoading(false);
                setIsOpen(false);
            }
        };

        const { totalCount, data: paginatedSources } = getPagedData();

        const handleView = (duplicate_group_id) => {
            setSelectedGroupId(duplicate_group_id);
            setModalOpen(true);
        };

        return (
            <div>
                <Col>
                    <Card className="shadow border-0">
                        <CardHeader className="bg-light shadow-sm rounded-2 py-3">
                            <div className="row align-items-center">
                                {/* Left Section - Pending NFR Advice */}
                                <div className="col-md-4 text-start border-end">
                                    <h5 className="text-primary fw-bold mb-1">
                                        <i className="bi bi-hourglass-split me-2 text-warning"></i>
                                        Pending NFR Advice
                                    </h5>
                                    <h4 className="text-dark fw-semibold">
                                        {new Intl.NumberFormat().format(totaldepositpending)} <span className="text-secondary fs-6">USD</span>
                                    </h4>
                                </div>

                                {/* Center Section - Bank Statement Discrepancies */}
                                <div className="col-md-4 text-center">
                                    <h5 className="text-uppercase text-muted mb-1">Bank Statement Discrepancies</h5>
                                    <div className="d-flex justify-content-center align-items-center gap-2">
                                        <i className="bi bi-exclamation-triangle text-warning fs-4"></i>
                                        <span className="fw-semibold text-dark">Reconciliation In Progress</span>
                                    </div>
                                </div>

                                {/* Right Section - UnReconciled Payment */}
                                <div className="col-md-4 text-end border-start">
                                    <h5 className="text-primary fw-bold mb-1">
                                        <i className="bi bi-bank2 me-2 text-success"></i>
                                        UnReconciled Payment
                                    </h5>
                                    <h4 className="text-dark fw-semibold">
                                        {new Intl.NumberFormat().format(totaldepositUnReconciled)} <span className="text-secondary fs-6">USD</span>
                                    </h4>
                                </div>
                            </div>
                        </CardHeader>

                        <CardBody>
                            <div className="search-box mb-3">
                                <input type="text" placeholder="Search..." className="form-control" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                            </div>

                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <div className="dropdown text-end border-start">
                                        <button className="btn btn-info dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
                                            <FcDownload className="me-2" />
                                            {setLoading && exportType ? `Exporting ${exportType.toUpperCase()}...` : 'Download'}
                                        </button>

                                        {isOpen && (
                                            <div
                                                className="dropdown-menu show"
                                                style={{
                                                    maxHeight: '200px',
                                                    overflowY: 'auto',
                                                    width: '200px',
                                                }}
                                            >
                                                <button className="dropdown-item" onClick={() => getdownload('excel')}>
                                                    Export to Excel
                                                </button>
                                                <button className="dropdown-item" onClick={() => getdownload('pdf')}>
                                                    Export to PDF
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <table className="table table-bordered table-striped">
                                        <thead className="table-primary">
                                            <tr>
                                                <th>Duplicate Group</th>
                                                <th>Product</th>
                                                <th>Total NFR Amount</th>
                                                <th>Total Bankstatement Amount</th>
                                                <th>Discrepancy Amount {new Intl.NumberFormat().format(totaldeposit)} USD</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedSources.map((item) => (
                                                <tr key={item.duplicate_group_id}>
                                                    <td>{item.duplicate_group_id}</td>
                                                    <td>{item.revenueproductname}</td>
                                                    <td>{item.totalnframount}</td>
                                                    <td>{item.totalbankstatementamount}</td>
                                                    <td>{item.discrepancyamount}</td>
                                                    <td>
                                                        <Button color="info" size="sm" onClick={() => handleView(item.duplicate_group_id)}>
                                                            <AiOutlineEye /> View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="pagination mt-3">
                                <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>

                {modalOpen && <DiscrepancyModal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)} duplicateGroupId={selectedGroupId} />}
            </div>
        );
    };
       export default BankstatementDiplication;
