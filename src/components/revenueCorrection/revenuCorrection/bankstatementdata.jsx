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

const Bankstatementdata = () => {
    const [data, setData] = useState({
        count: 1,
        countproduct: '1',
        totalCount: 10,
        revenuproductid: 0,
        NFRAdvices: [],
        showModaladd: false,
        showNewaddModal: false,
        revenuproductname: '',
        totaldeposit: 0,
        nfradviceid: 0,
        currencyid: 0,
        currencyname: '',
        activeon: '',
        sources: [],
        advices: [],
        services: [],
        revprod: [],
        revprods: [],
        data: null,
        fiscalyearsid: 0,
        fiscalyear: [],
    });

    const [fiscalyearsid, setfiscalyearsid] = useState(0);
    const [fiscalyear, setfiscalyear] = useState([]);
    const [contractid, setContractId] = useState(0);
    const [sources, setSources] = useState([]);
    const [business, setBusiness] = useState([]);
    const [banks, setBanks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [requiredItem, setRequiredItem] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedrole, setSelectedRole] = useState(null);
    const [search, setSearch] = useState([]);
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });
    const [loading, setLoading] = useState(true); // Loading state

    const [showModal, setShowModal] = useState(false);
    const [showNewModal, setShowNewModal] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true); // Start loading
                const response = await FiscalYear.getFiscalyears();
                if (response) {
                    const fiscalYears = response.data;
                    const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null;
                    const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                    setfiscalyearsid(fiscalyearsid);
                    if (fiscalyearsid === 0) {
                        toast.error('No Fiscal year found......');
                    } else {
                        const { data: sources } = await BankStatement.getbankstatementbyfiscalyear(fiscalyearsid);
                        //toast.error('No Fiscal year found......'+ JSON.stringify(sources));
                        if (!sources) {
                            toast.error('An error occurred, data fetching...');
                        } else {
                            setSources(sources);
                        }
                    }
                } else {
                    toast.error('No Fiscal year found......');
                }
            } catch (ex) {
                toast.error('An error occurred while fetching bankstatement data. Please try again later' + ex);
            } finally {
                setLoading(false); // Stop loading
            }
        }
        fetchData();
    }, []);

    const handleDataUpload = async () => {
        try {
            toast.info('Refreshing data...');
            setLoading(true); // Start loading
            const response = await FiscalYear.getFiscalyears();
            if (response) {
                const fiscalYears = response.data;
                const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null;
                const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                setfiscalyearsid(fiscalyearsid);
                if (fiscalyearsid === 0) {
                    toast.error('No Fiscal year found......');
                } else {
                    const { data: sources } = await BankStatement.getbankstatementbyfiscalyear(fiscalyearsid);

                    if (!sources) {
                        toast.error('An error occurred, data fetching...');
                    } else {
                        setSources(sources);
                    }
                }
            } else {
                toast.error('No Fiscal year found......');
            } // <-- Replace with your actual data loading function
        } catch (error) {
            toast.error('Failed to refresh data: ' + error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleSort = (sortColumn) => {
        setSortColumn(sortColumn);
    };
    const handlesend = async () => {
        try {
            setLoading(true); // Sta
            //toast.info(`fiscal year ii : ${fiscalyearsid}`)
            await BankStatement.sendbankstatement(fiscalyearsid);
            toast.success(`Sending Bank Statement to revenu collection is successfull `);
        } catch (ex) {
            toast.error('An Error Occured, while uploading revenu correction file:' + ex);
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const getPagedData = () => {
        let filtered = sources;
        if (searchQuery)
            filtered = sources.filter(
                (m) =>
                    m.revenueproductname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.advice.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.paymentmodename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.sourceoffundname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.accountnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.bankname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.paymentdate.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedrole && selectedrole.serviceorderid) filtered = sources.filter((m) => m.sources.serviceorderid === selectedrole.serviceorderid);

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const paginatedsources = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: paginatedsources };
    };

    const { length: count } = sources;
    const { totalCount, data: paginatedsources } = getPagedData();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    const brochure = paginatedsources.map((sources, index) => (
        <tr key={sources.bankstatementid}>
            <td>{sources.revenueproductname}</td>
            <td>{sources.advice}</td>
            <td>{sources.name}</td>
            <td>{sources.taxcenter}</td>
            <td>
                {sources.paymentdate
                    ? new Intl.DateTimeFormat('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                      }).format(new Date(sources.paymentdate))
                    : '-'}
            </td>

            <td>{sources.amount}</td>
        </tr>
    ));

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Col style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Card className="shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="row">
                            <div className="col">
                                <div className="revenue-actions">
                                    {count === 0 && (
                                        <>
                                            <div style={{ textAlign: 'left', flex: 1 }}>
                                                <Dropdown>
                                                    <Dropdown.Toggle
                                                        variant="primary"
                                                        id="nfrAdviceDropdown"
                                                        className="!rounded-full !px-4 !py-2 flex items-center gap-2 shadow hover:scale-[1.03] transition-all duration-200"
                                                        style={{ height: '50px', width: '90px', borderRadius: '20%' }}
                                                    >
                                                        Action <FcPlus size={40} />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setShowModal(true);
                                                            }}
                                                        >
                                                            Load Data
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setShowNewModal(true);
                                                            }}
                                                        >
                                                            Add New
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>

                                                {/** 
                                                <div className="dropdown">
                                                    <button className="btn btn-primary dropdown-toggle" type="button" id="nfrAdviceDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <FcPlus /> BankStatement Actions
                                                    </button>
                                                    <ul className="dropdown-menu" aria-labelledby="nfrAdviceDropdown">
                                                        <li>
                                                            <a
                                                                className="dropdown-item"
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setShowModal(true);
                                                                }}
                                                            >
                                                                Load Data
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                className="dropdown-item"
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setShowNewModal(true)
                                                                }}
                                                            >
                                                                Add New
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>*/}
                                            </div>{' '}
                                            <p>There are no Bank Statements in the Database.</p>
                                        </>
                                    )}
                                    {count !== 0 && (
                                        <>
                                            {/** FcCurrencyExchange, FcPlus, FcDownload 
 MdSend, MdAttachMoney  */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ textAlign: 'left', flex: 1 }}>
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                            variant="primary"
                                                            id="nfrAdviceDropdown"
                                                            className="!rounded-full !px-4 !py-2 flex items-center gap-2 shadow hover:scale-[1.03] transition-all duration-200"
                                                            style={{ height: '50px', width: '90px', borderRadius: '20%' }}
                                                        >
                                                            Action <FcPlus size={40} />
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setShowModal(true);
                                                                }}
                                                            >
                                                                Load Data
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setShowNewModal(true);
                                                                }}
                                                            >
                                                                Add New
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>

                                                    {/** 
                                                        <div className="dropdown">
                                                            <button className="btn btn-primary dropdown-toggle" type="button" id="nfrAdviceDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <FcPlus /> BankStatement Actions
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="nfrAdviceDropdown">
                                                                <li>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setShowModal(true);
                                                                        }}
                                                                    >
                                                                        Load Data
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setShowNewModal(true);
                                                                        }}
                                                                    >
                                                                        Add New
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>*/}
                                                </div>

                                                <div style={{ justifyContent: 'flex-end', display: 'flex', flex: 1 }}>
                                                    <Button
                                                        color="primary"
                                                        onClick={handlesend}
                                                        disabled={loading}
                                                        className="!rounded-full !px-4 !py-2 flex items-center gap-2 shadow hover:scale-[1.03] transition-all duration-200"
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <Spinner size="sm" color="light" /> Sending...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <MdSend /> Send
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                            <br />

                                            <div className="search-box">
                                                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                                            </div>
                                            <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                <table className="revenue-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Product</th>
                                                            <th>advice</th>
                                                            <th>Name</th>
                                                            <th>Tax center</th>
                                                            <th>Service Period</th>
                                                            <th>Deposit</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>{brochure}</tbody>
                                                </table>
                                            </div>
                                        </>
                                    )}
                                    {showModal && <AddBankStatment show={showModal} onClose={() => setShowModal(false)} onDataUploaded={handleDataUpload} />}
                                    {showNewModal && <AddnewBankStatment show={showNewModal} onClose={() => setShowNewModal(false)} />}
                                    <div className="pagination">
                                        <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
};
export default Bankstatementdata;
