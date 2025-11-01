import React, { useState, useEffect } from 'react';
//---------------------------------------
import SearchBox from '../../components/searchBox';
import Pagination from '../../components/common/pagination';
import * as Source from '../../services/RevenuRessources/sourceofFundsServices';
import { paginate } from '../../utils/paginate';
import { useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Link, NavLink } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';
import { FcPlanner, FcTimeline, FcTodoList, FcNeutralTrading, FcParallelTasks, FcComboChart } from 'react-icons/fc';

import { GiTimeBomb } from 'react-icons/gi';
import { FcApproval } from 'react-icons/fc';
import { FaPeopleCarry, FaRoad } from 'react-icons/fa';
import { FcFeedIn, FcMoneyTransfer, FcSalesPerformance, FcConferenceCall, FcServices, FcDebt, FcCurrencyExchange } from 'react-icons/fc';
import { FcBusinessman, FcPodiumWithSpeaker, FcBiotech, FcUnlock } from 'react-icons/fc';
import { BiSolidShoppingBag } from 'react-icons/bi';

import * as FisclaYearData from '../../services/RMFPlanning/fiscalYearService';
import { MdPermContactCalendar, MdManageAccounts, MdOutlineAddRoad, MdMergeType } from 'react-icons/md';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, DropdownButton } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ExpendableButton } from './ContractSettings/contractor/ExpendableButton';

import { FcPlus, FcSynchronize } from 'react-icons/fc';
import { AiFillEdit, AiFillDelete, AiOutlineWeibo, AiOutlineShop } from 'react-icons/ai';
import { GiPayMoney } from 'react-icons/gi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//--------------
import ProjectMenu from '../../components/Menu/projector';
import useOpenController from './ContractSettings/contractor/Hooks/useOpenController';

import * as Contract from '../../services/ContractManagement/ContractSetting/contractservice';

import * as UserAccessData from '../../services/security/securableService';
import * as UserHeadData from '../../services/security/userServices';
import { Card, CardHeader, CardBody, Col } from "reactstrap";
import { BiSubdirectoryRight } from 'react-icons/bi';
import * as ContractType from '../../services/ContractManagement/ContractSetting/contractTypeService';
import { DiSqllite } from 'react-icons/di';
import { FaHandPointRight, FaCoins } from 'react-icons/fa';
import { GiLookAt, GiRoad } from 'react-icons/gi';
import auth from '../../services/authService';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as FiscalYear from '../../services/RMFPlanning/fiscalYearService';
import * as FiscalYearContractType from '../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice';
import * as Projectdata from '../../services/ContractManagement/ContractSetting/projectservice';
import * as Contracttype from '../../components/ContractManagemenrt/ContractSettings/contracttype/contracttype';

import ContractTypeMenu from '../Menu/contracttype';
import ContractTypeMenuinspection from '../MenuInspection/contracttype';
import ContractTypeMenupayment from '../MenuPayment/contracttype';
import * as ContractModeData from "../../services/ContractManagement/ContractSetting/contractmodeservices";
import * as ContractData from "../../services/ContractManagement/ContractSetting/contractservice";

import _ from "lodash";

const BusinessPaterner = () => {
    const location = useLocation();
    const [fiscalyearid, setFiscalyearid] = useState(0);
    const [fiscalyearids, setFiscalyearids] = useState(0);
    const [sources, setSources] = useState([]);
    const [business, setBusiness] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(4);
    const [requiredItem, setRequiredItem] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedrole, setSelectedrole] = useState(null);
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { state } = location;

                if (!state.fiscalyearid) {
                    toast.error(`Error while loading Fiscal year: ${state.fiscalyearid}`);
                } else {
                    const response = await FiscalYear.getFiscalyears();
                    if (response) {
                        const fiscalYears = response.data;
                        const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null;
                        const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                        setFiscalyearids(fiscalyearsid);
                        setFiscalyearid(fiscalyear);
                    } else {
                        toast.error('No Fiscal year found.');
                    }

                    const sourcesResponse = await Source.getSource();
                    const businessResponse = await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(state.fiscalyearid);

                    if (!businessResponse.data || !sourcesResponse.data) {
                        return toast.error('An Error Occurred, data fetching ...');
                    } else {
                        setSources(sourcesResponse.data);
                        setBusiness(businessResponse.data);
                    }
                }
            } catch (ex) {
                toast.error('An Error Occurred, while fetching business data. Please try again later.' + ex);
            }
        };

        fetchData();
    }, [location]);

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

    const getPagedData = () => {
        let filtered = business;
        if (searchQuery) {
            filtered = business.filter((m) => m.fiscalyear.toLowerCase().startsWith(searchQuery.toLowerCase()) || m.contracttypename.toLowerCase().startsWith(searchQuery.toLowerCase()));
        } else if (selectedrole && selectedrole.fiscalyearcontracttypeid) {
            filtered = business.filter((m) => m.Business.fiscalyearcontracttypeid === selectedrole.fiscalyearcontracttypeid);
        }
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const paginatedBusiness = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: paginatedBusiness };
    };

    const replaceModalItem = (index) => {
        setRequiredItem(index);
    };

    const handleshow = (fiscalyearids) => {
        setFiscalyearids(fiscalyearids);
    };

    const saveModalDetails = (business) => {
        const tempBusiness = [...business];
        tempBusiness[requiredItem] = business;
        setBusiness(tempBusiness);
    };

    const deleteItem = async (fiscalyearcontracttypeid) => {
        try {
            if (!fiscalyearcontracttypeid) {
                toast.info('The Institution Partner you selected does not exist');
            } else {
                await FiscalYearContractType.deletefiscalyearcontracttype(fiscalyearcontracttypeid);
                toast.success('This fiscal year contract type has been deleted successfully');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('Error: ' + ex.response.data);
            } else if (ex.response && ex.response.status === 409) {
                toast.error('Error: ' + ex.response.data);
            } else {
                toast.error('An Error Occurred, while saving Institution Partner. Please try again later.');
            }
        }
    };

    const { totalCount, data: paginatedBusiness } = getPagedData();

    return (
        <div style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Col style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Card className="shadow border-0">
                    <CardHeader className="bg-transparent ">
                        <div className="text-muted text-center mt-2 mb-3">
                            <h1>
                                <div style={{ textAlign: 'center' }}>
                                    <small>Contract management - Contract Type</small>
                                </div>
                            </h1>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        {totalCount === 0 && (
                            <>
                                <button className="btn btn-success" data-toggle="modal" data-target="#exampleAddModal" onClick={() => handleshow(fiscalyearids)}>
                                    <FcPlus /> AddNew
                                </button>
                                <p>There are no Business Partners in the database.</p>
                               
                            </>
                        )}
                        {totalCount !== 0 && (
                            <>
                                <button className="btn btn-success" data-toggle="modal" data-target="#exampleAddModal" onClick={() => handleshow(fiscalyearids)}>
                                    <FcPlus /> AddNew
                                </button>
                                <div style={{ textAlign: 'center' }}>
                                    <SearchBox value={searchQuery} onChange={handleSearch} />
                                </div>
                                <div className="table-responsive mb-5">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>fiscalyear</th>
                                                <th>isAcive</th>
                                                <th>contracttypename</th>
                                                <th>cancreateserviceorder</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                
                            </>
                        )}
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
};
export default BusinessPaterner;