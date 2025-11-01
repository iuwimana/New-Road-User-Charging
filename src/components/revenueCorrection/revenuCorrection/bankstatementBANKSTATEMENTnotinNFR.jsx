import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardBody, Col, Spinner, Button } from 'reactstrap';
import { AiFillDelete } from 'react-icons/ai';
import _ from 'lodash';

import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as BankStatement from '../../../services/RevenuRessources/Bankstatementservice';

import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import ViewUnReconcilledModal from './viewUnReconcilled';

const BankstatementBANKSTATEMENTnotinNFR = () => {
    // --- State management ---
    const [fiscalYearId, setFiscalYearId] = useState(0);
    const [sources, setSources] = useState([]);
    const [recordNumber, setRecordNumber] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(30);
    const [sortColumn, setSortColumn] = useState({ path: 'revenueproductname', order: 'asc' });
    const [loading, setLoading] = useState(true);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedStatement, setSelectedStatement] = useState(null);

    // --- Fetch data ---
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            const { data: fiscalYears } = await FiscalYear.getFiscalyears();
            if (!fiscalYears?.length) {
                toast.error('No Fiscal Year found.');
                return;
            }

            const selectedFiscalYearId = fiscalYears[0].fiscalyearid;
            setFiscalYearId(selectedFiscalYearId);

            const [{ data: sources }, { data: recordData }, { data: totalData }] = await Promise.all([
                BankStatement.getbankstatementnotinnfrbyfiscalyear(selectedFiscalYearId),
                BankStatement.getpaymentnumber(selectedFiscalYearId),
                BankStatement.getpaymentamount(selectedFiscalYearId),
            ]);

            setSources(sources || []);
            setRecordNumber(recordData?.[0]?.recordnumber || 0);
            setTotalPayment(totalData?.[0]?.totalpayment || 0);
        } catch (error) {
            toast.error('Error fetching data. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- Handlers ---
    const handlePageChange = (page) => setCurrentPage(page);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleView = (bankstatementid) => {
        const selectedItem = sources.find((item) => item.bankstatementid === bankstatementid);
        if (!selectedItem) return toast.info('Bank statement not found.');

        setSelectedStatement(selectedItem); // store the selected row
        setViewModalOpen(true); // open the modal
    };

    const handleDelete = async (bankstatementid) => {
        try {
            if (!bankstatementid) return toast.info('The selected statement does not exist.');

            await BankStatement.deletebankstatement(bankstatementid);
            toast.success('Bank statement deleted successfully.');
            setSources(sources.filter((item) => item.bankstatementid !== bankstatementid));
        } catch (ex) {
            const message = ex.response?.data || 'An error occurred while deleting bank statement. Please try again later.';
            toast.error(`Error: ${message}`);
        }
    };

    // --- Filter, sort, paginate ---
    const getPagedData = () => {
        let filtered = sources;

        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = sources.filter(
                (m) =>
                    m.revenueproductname?.toLowerCase().includes(lowerQuery) ||
                    m.paymentmodename?.toLowerCase().includes(lowerQuery) ||
                    m.sourceoffundname?.toLowerCase().includes(lowerQuery) ||
                    m.accountnumber?.toLowerCase().includes(lowerQuery) ||
                    m.name?.toLowerCase().includes(lowerQuery) ||
                    m.advice?.toLowerCase().includes(lowerQuery) ||
                    m.taxcenter?.toLowerCase().includes(lowerQuery) ||
                    m.bankname?.toLowerCase().includes(lowerQuery) ||
                    m.paymentdate?.toLowerCase().includes(lowerQuery)
            );
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const paginatedSources = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: paginatedSources };
    };

    const { totalCount, data: paginatedSources } = getPagedData();

    // --- Render ---
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center py-5">
                <Spinner color="primary" />
                <span className="ms-2 text-primary">Loading bank statements...</span>
            </div>
        );
    }

    return (
        <div className="container-fluid py-3">
            <Col>
                <Card className="shadow border-0">
                    <CardHeader className="d-flex justify-content-between align-items-center bg-light">
                        <h5 className="text-start">Record count: {recordNumber}</h5>
                        <h4 className="text-center text-primary">Bank Statements Not in NFR</h4>
                        <h5 className="text-end">Total Payment: {totalPayment.toLocaleString()} USD</h5>
                    </CardHeader>

                    <CardBody>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Search..." value={searchQuery} onChange={handleSearch} />
                        </div>

                        {sources.length === 0 ? (
                            <div className="text-center text-muted py-5">
                                <p>No bank statements found for this fiscal year.</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover align-middle">
                                    <thead className="table-primary">
                                        <tr>
                                            <th rowSpan="2">Product</th>
                                            <th rowSpan="2">Advice</th>
                                            <th rowSpan="2">Tax Center</th>
                                            <th rowSpan="2">Name</th>
                                            <th rowSpan="2">Payment Date</th>
                                            <th rowSpan="2">Amount</th>
                                            <th colSpan="2" className="text-center" style={{ width: '80px' }}>
                                                Action
                                            </th>{' '}
                                            {/* Split header */}
                                        </tr>
                                        <tr>
                                            <th>View</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedSources.map((item) => (
                                            <tr key={item.bankstatementid}>
                                                <td>{item.revenueproductname}</td>
                                                <td>{item.advice}</td>
                                                <td>{item.taxcenter}</td>
                                                <td>{item.name}</td>

                                                <td>
                                                    {item.paymentdate
                                                        ? new Intl.DateTimeFormat('fr-FR', {
                                                              day: '2-digit',
                                                              month: '2-digit',
                                                              year: 'numeric',
                                                          }).format(new Date(item.paymentdate))
                                                        : '-'}
                                                </td>

                                                <td>{item.amount?.toLocaleString()}</td>
                                                <td>
                                                    <Button color="danger" size="sm" onClick={() => handleDelete(item.bankstatementid)}>
                                                        <AiFillDelete /> Delete
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button color="primary" size="sm" className="me-2" onClick={() => handleView(item.bankstatementid)}>
                                                        View
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <ViewUnReconcilledModal isOpen={viewModalOpen} toggle={() => setViewModalOpen(false)} statement={selectedStatement} />

                        <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
};

export default BankstatementBANKSTATEMENTnotinNFR;
