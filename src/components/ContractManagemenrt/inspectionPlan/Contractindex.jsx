import { useState, useEffect } from 'react';

import AddContractModal from './AddInspectionPlanModal';
import { ClipboardList, Menu } from 'lucide-react';
//---------------------------------------
import SearchBox from '../../../components/searchBox';
import { MdOutlineVisibility } from 'react-icons/md';
import Pagination from '../../../components/common/pagination';
import { paginate } from '../../../utils/paginate';
import { useLocation } from 'react-router-dom';
import React, { Component } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link, NavLink } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';
import { FcPlanner, FcTimeline, FcTodoList, FcNeutralTrading, FcParallelTasks, FcComboChart } from 'react-icons/fc';

import { GiTimeBomb } from 'react-icons/gi';
import { FcApproval } from 'react-icons/fc';
import { FaPeopleCarry, FaRoad } from 'react-icons/fa';
import { FcFeedIn, FcMoneyTransfer, FcSalesPerformance, FcConferenceCall, FcServices, FcDebt, FcCurrencyExchange } from 'react-icons/fc';
import { FcBusinessman, FcPodiumWithSpeaker, FcBiotech, FcUnlock } from 'react-icons/fc';
import { BiSolidShoppingBag } from 'react-icons/bi';

import * as FisclaYearData from '../../../services/RMFPlanning/fiscalYearService';
import { MdPermContactCalendar, MdManageAccounts, MdOutlineAddRoad, MdMergeType } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, DropdownButton } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ExpendableButton } from '../ContractSettings/contractor/ExpendableButton';

import { FcPlus, FcSynchronize } from 'react-icons/fc';
import { AiFillEdit, AiFillDelete, AiOutlineWeibo, AiOutlineShop } from 'react-icons/ai';
import { GiPayMoney } from 'react-icons/gi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//--------------
import useOpenController from './../ContractSettings/contractor/Hooks/useOpenController';

import { BiSubdirectoryRight } from 'react-icons/bi';
import { DiSqllite } from 'react-icons/di';
import { FaHandPointRight, FaCoins } from 'react-icons/fa';
import { GiLookAt, GiRoad } from 'react-icons/gi';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Input } from 'reactstrap';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';

//------------
import UpdateProjectModal from './InspectionPlanRejectedModal';
import ViewProjectModal from './contractviewModal';

import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import _ from 'lodash';
import AddServiceOrderModal from './UpdateInspectionPlanModal';
import UpdateServiceOrderModal from './InspectionPlanDetailModal';
import * as ServiceOrderService from '../../../services/ContractManagement/ContractSetting/serviceOrdersServices';
import * as FiscalYearContractType from '../../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice';
import * as Projectdata from '../../../services/ContractManagement/ContractSetting/projectservice';
import * as ServiceOrderdata from '../../../services/ContractManagement/ContractSetting/serviceOrdersServices';
import AddInspectionPlanModal from './AddInspectionPlanModal';
import UpdateInspectionPlanModal from './UpdateInspectionPlanModal';
import InspectionPlanDetailModal from './InspectionPlanDetailModal';
import InspectionPlanRejectedModal from './InspectionPlanRejectedModal';
//-----------------------------------------
import AddInspectionPlanserviceorderModal from './AddInspectionPlanserviceorderModal';
import UpdateInspectionPlanserviceorderModal from './UpdateInspectionPlanServiceOrderModal';
import InspectionPlanDetailserviceorderModal from './InspectionPlanDetailserviceorderModal';
import InspectionPlanRejectedserviceorderModal from './InspectionPlanRejectedServiceOrderModal';

//----------------------------------------
import { getInspectionPlans, deleteInspectionPlan, updateInspectionPlan, getInspectionPlansbycontract } from '../../../services/ContractManagement/ContractSetting/inspectionplanServices';
import {
    getInspectionPlansServiceorderbyserviceorder,
    getInspectionPlansServiceorder,
    saveInspectionPlanServiceorder,
    getInspectionPlanDetailsByPlan,
    saveInspectionPlanDetailServiceorder,
    deleteInspectionPlanServiceorder,
    deleteInspectionPlanDetailServiceorder,
    exportInspectionPlanPDF,
} from '../../../services/ContractManagement/ContractSetting/inspectionplanServiceOrderServices';
import { getInspectionPlanPDF, getInspectionPlanserviceorderPDF } from '../../../services/ContractManagement/ContractSetting/inspectionplanDetailServices';
import { Table } from 'reactstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ContractForm.css';

//--------------------------
const Mailbox = () => {
    const location = useLocation();
    const [state, setState] = useState({
        sources: [],
        business: [],
        banks: [],
        currentPage: 1,
        showModalAddFiscalyear: false,
        showModalUpdateFiscalyear: false,
        showModalAddRoad: false,
        showModalUpdateRoad: false,
        showModalAddContract: false,
        showModalUpdateContract: false,
        showModalAddServiceOreder: false,
        showModalUpdateServiceOreder: false,
        pageSize: 4,
        requiredItem: 0,
        brochure: [],
        searchQuery: '',
        selectedrole: null,
        search: [],
        sortColumn: { path: 'title', order: 'asc' },
    });

    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [viewModalData, setViewModalData] = useState(null);

    const toggleModalUpdateFiscalyear = () => {
        this.setState((prevState) => ({ showModalUpdateFiscalyear: !prevState.showModalUpdateFiscalyear }));
    };
    const toggleModalAddRoad = () => {
        this.setState((prevState) => ({ showModalAddRoad: !prevState.showModalAddRoad }));
    };
    const toggleModalUpdateRoad = () => {
        this.setState((prevState) => ({ showModalUpdateRoad: !prevState.showModalUpdateRoad }));
    };
    const toggleModalAddContract = () => {
        this.setState((prevState) => ({ showModalAddContract: !prevState.showModalAddContract }));
    };
    const toggleModalUpdateContract = () => {
        this.setState((prevState) => ({ showModalUpdateContract: !prevState.showModalUpdateContract }));
    };
    const toggleModalAddServiceOreder = () => {
        this.setState((prevState) => ({ showModalAddServiceOreder: !prevState.showModalAddServiceOreder }));
    };
    const toggleModalUpdateServiceOreder = () => {
        this.setState((prevState) => ({ showModalUpdateServiceOreder: !prevState.showModalUpdateServiceOreder }));
    };

    const [canaccessDashboard, setCanaccessDashboard] = useState();
    const [canaccessRevenue, setCanaccessRevenue] = useState();
    const [canaccessSecurity, setCanaccessSecurity] = useState();
    const [canaccessPlanning, setCanaccessPlanning] = useState();
    const [canaccesscontract, setCanaccesscontract] = useState();
    const [canaccesslookup, setCanaccesslookup] = useState();
    const [isHeadofUnit, setisHeadofUnit] = useState();
    const [useraccess, setuseraccess] = useState([]);
    const [emails, setemails] = useState([]);
    //const [email, setemail] = useState(user.username);---------------------------------------------------
    const [email, setemail] = useState('uwinno05@gmail.com');
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    //-----------------------------------------------------------------------------------
    const [canaccessRevenusCollection, setcanaccessRevenusCollection] = useState(false);
    const [canaccessRevenusPayment, setcanaccessRevenusPayment] = useState(false);
    const [canaccessRevenuDashBoard, setcanaccessRevenuDashBoard] = useState(false);
    const [canaccessExpenditure, setcanaccessExpenditure] = useState(false);
    const [canaccessViewSAP, setcanaccessViewSAP] = useState(false);
    const [canaccessPlaningProcess, setcanaccessPlaningProcess] = useState(false);
    const [canaccessPayment, setcanaccessPayment] = useState(false);
    const [canaccessInspection, setcanaccessInspection] = useState(false);
    const [canaccesscontracts, setcanaccesscontracts] = useState(false);
    const [canaccesscontractapproval, setcanaccesscontractapproval] = useState(false);

    //toast.error(useraccess.canaccess);
    //-----------------------------------------------------------------------------------
    const { isOpen, toggle } = useOpenController(false);
    const { isOpenrec, togglerec } = useOpenController(false);
    const { isOpenplan, toggleplan } = useOpenController(false);
    const { isOpencont, toggleCont } = useOpenController(false);
    const { isOpenfiscalyear, togglefiscalyear } = useOpenController(false);
    const { isOpenapprovalcontract, toggleapprovalcontract } = useOpenController(false);
    const { isOpenapprovalinspection, toggleapprovalinspection } = useOpenController(false);
    const { isOpenapproval, toggleapproval } = useOpenController(false);
    const { isOpencontracttype, togglecontracttype } = useOpenController(false);
    const { isOpenproject, toggleproject } = useOpenController(false);
    const { isOpenwaitingapproval, togglewaitingapproval } = useOpenController(false);
    const { isOpenlookup, togglelookup } = useOpenController(false);
    const { isOpensecurity, togglesecurity } = useOpenController(false);
    const { isOpenlookcoll, togglelookcoll } = useOpenController(false);
    const { isOpenlookplan, togglelookplan } = useOpenController(false);
    const { isOpenlookcontr, togglelookcontr } = useOpenController(false);
    const [isopen, setOpenState] = useState(false);
    const [isopenrec, setOpenrecState] = useState(false);
    const [isopenplan, setOpenplanState] = useState(false);
    const [isopenapproval, setOpenapproval] = useState(false);
    const [isopenapprovalcontract, setOpenapprovalcontract] = useState(false);
    const [isopencont, setOpencontState] = useState(false);
    const [isopenfiscalyear, setOpenfiscalyearState] = useState(false);
    const [isopencontracttype, setOpencontracttypeState] = useState(false);
    const [isopenproject, setOpenprojectState] = useState(false);
    const [isopenwaitingapproval, setOpenwaitingapproval] = useState(false);
    const [isopenlookup, setOpenlookupState] = useState(false);
    const [isopensecurity, setOpensecurityState] = useState(false);
    const [isopenlookcoll, setOpenlookcollState] = useState(false);
    const [isopenlookplan, setOpenlookplanState] = useState(false);
    const [isopenlookcontr, setOpenlookcontrState] = useState(false);
    const [isopenapprovalinspection, setOpenapprovalinspection] = useState(false);
    //------------------------------------------------------------------------

    const [fiscalYear, setFiscalYear] = useState([]);
    const [fYid, setfYid] = useState(0);
    const [typename, settypename] = useState('');
    const [contractType, setcontractType] = useState(0);

    const [contractMode, setcontractMode] = useState(0);
    const [contract, setcontract] = useState(0);
    const [cancreateserviceorder, setcancreateserviceorder] = useState(false);

    const [fiscalYearid, setFiscalYearid] = useState(0);
    const [fiscalYearname, setFiscalYearname] = useState('');
    const [fiscalyearcontracttypeid, setfiscalyearcontracttypeid] = useState(0);
    const [fiscalYearcontracttype, setFiscalYearcontracttype] = useState([]);
    const [project, setproject] = useState([]);

    //----------------------------------------------------------
    const [contracttypeid, setcontracttypeid] = useState(0);
    const [projectid, setprojectid] = useState(0);
    const [fiscalYears, setFiscalYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Data, setData] = useState({});
    const [Datacontracttype, setDatacontracttype] = useState({});
    const [Datacontractmode, setDatacontractmode] = useState({});

    const [canfiscalyear, setcanfiscalyear] = useState(false);
    const [cancontracttype, setcancontracttype] = useState(false);
    const [canRoad, setcanRoad] = useState(false);
    const [canServiceorder, setcanServiceorder] = useState(false);
    //------------------------------------------------------------------------------------------------sidebar Menu

    //------------------------------------------------------------------------------------------------Set Tree View

    const handleViewClick = (project) => {
        setViewModalData(project);
        setShowViewModal(true);
    };
    const TreeNode = ({ node, level, fetchChildren }) => {
        const [expanded, setExpanded] = useState(false);
        const [children, setChildren] = useState([]);
        const [loading, setLoading] = useState(false);
        //
        //
        const handleClick = async () => {
            if (children.length === 0 && !loading) {
                setLoading(true);
                try {
                    const childData = await fetchChildren(node);
                    setChildren(childData);
                } catch (error) {
                    toast.error(`An error occurred while fetching data: ${error.message}`);
                }
                setLoading(false);
            }

            setExpanded(!expanded);
        };
        const handledisplay = () => {
            //toast.info(`hello there ${node.type} and ${node.id}`);
            settypename(node.type);
            if (node.type == 'fiscalYear') {
                setfYid(node.id);
                setcancreateserviceorder(node.cancreateserviceorder);
            } else if (node.type == 'contractType') {
                setcontractType(node.id);
                setcancreateserviceorder(node.cancreateserviceorder);
            } else if (node.type == 'contractMode') {
                setcontractType(node.id);
                setcancreateserviceorder(node.cancreateserviceorder);
            } else if (node.type == 'projectMode') {
                setcontractType(node.id);
                setcancreateserviceorder(node.cancreateserviceorder);
            } else if (node.type == 'serviceorder') {
                setcontractType(node.id);
                setcancreateserviceorder(node.cancreateserviceorder);
            } else if (node.type == 'inspection') {
                setcontractType(node.id);
            }
        };

        return (
            <li className="tree-node">
                <div className="tree-node-container" onClick={handleClick}>
                    <div className="d-flex align-items-center">
                        <span className="tree-toggle">{expanded ? '▾' : '▸'}</span>
                        <span onClick={handledisplay} className="tree-label">
                            {node.name}
                        </span>
                    </div>
                </div>

                {expanded && children.length > 0 && (
                    <ul className="tree-children">
                        {children.map((childNode) => (
                            <TreeNode key={childNode.id} node={childNode} level={level + 1} fetchChildren={fetchChildren} />
                        ))}
                    </ul>
                )}

                {expanded && loading && <div className="tree-loading">Loading...</div>}
            </li>
        );
    };

    const TreeView = ({ data, fetchChildren }) => {
        return (
            <ul>
                {data.map((node) => (
                    <TreeNode key={node.id} node={node} level={0} fetchChildren={fetchChildren} />
                ))}
            </ul>
        );
    };

    //------------------------------------------------------------------------------------------------END set Tree View
    //------------------------------------------------------------------------------------------------Fetch Fiscal Year

    useEffect(() => {
        const fetchFiscalYears = async () => {
            try {
                const response = await FiscalYear.getFiscalyears();
                setFiscalYears(response.data);
                setLoading(false);
                if (response) {
                    const fiscalYears = response.data;
                    setData(response);
                    const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
                    const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                    setFiscalYearid(fiscalyearsid);
                    //setfYid(node.id);
                    setFiscalYearname(fiscalyear);
                }
            } catch (error) {
                toast.error('An error occurred while fetching fiscal years: ' + error.message);
                setLoading(false);
            }
        };

        fetchFiscalYears();
    }, []);

    //------------------------------------------------------------------------------------------------END Fetch Fiscal Year

    const fetchChildren = async (node) => {
        try {
            // ------------------ Fiscal Year → Contract Type ------------------
            if (node.type === 'fiscalYear') {
                const response = await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(fiscalYearid);
                setfYid(node.id);

                return response.data.map((item) => ({
                    cancreateserviceorder: item.cancreateserviceorder || false,
                    ids: item.fiscalyearcontracttypeid,
                    id: item.fiscalyearcontracttypeid,
                    name: (
                        <div className="flex items-center border-l-4 border-blue-500 bg-blue-50 p-2 rounded-md shadow-sm hover:bg-blue-100 transition-all">
                            <span className="font-semibold text-blue-800 text-lg">{item.contracttypename}</span>
                            {item.cancreateserviceorder && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"></span>}
                        </div>
                    ),
                    type: 'contractType',
                }));
            }

            // ------------------ Contract Type → Project (Road + Contract Mode) ------------------
            else if (node.type === 'contractType') {
                const response = await Projectdata.getprojectsbyfiscalyearcontracttypem(node.ids);

                return response.data.map((item) => ({
                    cancreateserviceorder: item.cancreateserviceorder || false,
                    ids: item.contractid,
                    id: item.contractid,
                    name: (
                        <div className="flex items-center border-l-4 border-amber-500 bg-amber-50 p-2 rounded-md shadow-sm hover:bg-amber-100 transition-all">
                            <span className="text-amber-800 font-medium">{item.roodname || 'Unnamed Road'}</span>
                            <span className="text-sm text-gray-600 ml-2">({item.contractmode})</span>
                            {item.cancreateserviceorder && <span className="ml-3 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Active</span>}
                        </div>
                    ),
                    type: 'serviceorder',
                }));
            }

            // ------------------ Service Order → Inspection ------------------
            else if (node.type === 'serviceorder') {
                const response = await ServiceOrderdata.getServiceOrders(node.ids);

                return response.map((item) => ({
                    cancreateserviceorder: item.cancreateserviceorder || false,
                    id: item.serviceorderid,
                    name: (
                        <div className="flex items-center border-l-4 border-teal-500 bg-teal-50 p-2 rounded-md shadow-sm hover:bg-teal-100 transition-all">
                            <span className="text-teal-800 font-medium">{item.expectedoutput || item.description || 'No description'}</span>
                        </div>
                    ),
                    type: 'inspection',
                }));
            }

            // ------------------ Default ------------------
            return [];
        } catch (error) {
            toast.error('An error occurred while fetching data: ' + error.message);
            return [];
        }
    };

    {
        /** 
        const fetchChildren = async (node) => {
        //------------------------------------------------------------------------------------------------END Fetch Contract Type
        if (node.type === 'fiscalYear') {
            const response = await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(fiscalYearid);
            //toast.error('Application test: roadname ' + JSON.stringify(response.data));
            const contracttypes = response.data;
            setfYid(node.id);
            return response.data.map((item) => ({
                cancreateserviceorder: item.cancreateserviceorder || false,
                ids: item.fiscalyearcontracttypeid,
                id: item.fiscalyearcontracttypeid,
                name: item.contracttypename,
                type: 'contractType',
            }));

            //------------------------------------------------------------------------------------------------END Fetch Contract Type
        } else if (node.type === 'contractType') {
            //------------------------------------------------------------------------------------------------Fetch Project
            const response = await Projectdata.getprojectsbyfiscalyearcontracttypem(node.ids);

            return (
                response.data
                    //.filter((item) => item.cancreateserviceorder === true)
                    .map((item) => ({
                        cancreateserviceorder: item.cancreateserviceorder || false,
                        ids: item.contractid,
                        id: item.contractid,
                        name: item.roodname + '(' + item.contractmode + ')',
                        type: 'serviceorder',
                    }))
            );
            //------------------------------------------------------------------------------------------------END Fetch Project
        } else if (node.type === 'serviceorder') {
            try {
                const response = await ServiceOrderdata.getServiceOrders(node.ids);

                return response.map((item) => ({
                    cancreateserviceorder: item.cancreateserviceorder || false,
                    id: item.serviceorderid,
                    name: item.expectedoutput || item.description,
                    type: 'inspection',
                }));
            } catch (error) {
                toast.error('An error occurred while fetching service orders:', +error);
                return []; // fail gracefully
            }

            
        }
        return [];
    };*/
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (fiscalYears.length === 0) {
        return <div>No fiscal years found.</div>;
    }

    const transformedData = fiscalYears.map((year) => ({
        cancreateserviceorder: false,
        id: year.fiscalyearid,
        name: '..>' + year.fiscalyear,
        type: 'fiscalYear',
    }));
    //------------------------------------------------------------------------------------------------ENDsidebar Menu
    //--------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------CRUD-----------------------------------------------------

    //------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------Main Content

    const InspectionPlans = () => {
        const [plans, setPlans] = useState([]);
        const [loading, setLoading] = useState(true);
        const [searchQuery, setSearchQuery] = useState('');
        const [sortColumn, setSortColumn] = useState({ path: 'inspectiondate', order: 'asc' });

        // pagination states
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize] = useState(6);

        // selected plan for modals
        const [selectedPlan, setSelectedPlan] = useState(null);

        // modals state
        const [showAddModal, setShowAddModal] = useState(false);
        const [showUpdateModal, setShowUpdateModal] = useState(false);
        const [showDetailModal, setShowDetailModal] = useState(false);
        const [showRejectModal, setShowRejectModal] = useState(false);

        const fetchPlans = async () => {
            setLoading(true);
            try {
                const res = await getInspectionPlansbycontract(contractType);

                if (res && res.data) {
                    setPlans(res.data);
                } else {
                    setPlans([]);
                }
            } catch (err) {
                toast.error('Error fetching inspection plans');
                setPlans([]);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchPlans();
        }, []);

        // search + pagination + sort
        const getPagedData = () => {
            let filtered = plans;
            if (searchQuery) {
                const lower = searchQuery.toLowerCase();
                filtered = plans.filter(
                    (plan) =>
                        plan.expectedoutput?.toLowerCase().includes(lower) ||
                        plan.startfrom_location?.toLowerCase().includes(lower) ||
                        plan.endat_location?.toLowerCase().includes(lower) ||
                        plan.status?.toLowerCase().includes(lower) ||
                        plan.inspectiondate?.toLowerCase().includes(lower)
                );
            }

            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
            const paginatedPlans = paginate(sorted, currentPage, pageSize);

            return { totalCount: filtered.length, data: paginatedPlans };
        };

        const handleDelete = async (inspectionplanid) => {
            if (!window.confirm('Are you sure you want to delete this plan?')) return;
            try {
                await deleteInspectionPlan(inspectionplanid);
                toast.success('Plan deleted successfully');
                fetchPlans();
            } catch (err) {
                toast.error('Delete failed');
            }
        };

        const handleApprovals = async (inspectionplanid, contractid, startfrom_location, endat_location, expectedoutput, inspectiondate, status) => {
            if (!window.confirm('Are you sure you want to Approv this plan?')) return;
            try {
                if (status === 'planned with Activities') {
                    status = 'Viewed';
                } else if (status === 'Viewed') {
                    status = 'Approved';
                }
                await updateInspectionPlan(inspectionplanid, contractType, startfrom_location, endat_location, expectedoutput, inspectiondate, status);
                toast.success(`Plan ${status} successfully`);
                fetchPlans();
            } catch (err) {
                toast.error('Delete failed');
            }
        };

        const handleDownload = async (inspectionplanid, contractid, startfrom_location, endat_location, expectedoutput, inspectiondate, status) => {
            try {
                await getInspectionPlanPDF(inspectionplanid, contractType, startfrom_location, endat_location, expectedoutput, inspectiondate, status);
                toast.success(`download  successfully`);
                fetchPlans();
            } catch (err) {
                toast.error('Delete failed');
            }
        };

        const handlePageChange = (page) => {
            setCurrentPage(page);
        };

        const handleSearch = (query) => {
            setSearchQuery(query);
            setCurrentPage(1); // reset pagination
        };

        const { totalCount, data: paginatedPlans } = getPagedData();

        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Inspection Plans</h4>
                    <Button color="primary" onClick={() => setShowAddModal(true)}>
                        + Add New
                    </Button>
                </div>

                {/* 🔍 Search Box */}
                <div className="mb-3">
                    <Input type="text" placeholder="Search by output, location, status, or date..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : totalCount === 0 ? (
                    <p className="text-center">No inspection plans found</p>
                ) : (
                    <>
                        <Table bordered hover className="custom-thead">
                            <thead>
                                <tr>
                                    <th className="table-primary">#</th>
                                    <th className="table-primary">Expected Output</th>
                                    <th className="table-primary">Start</th>
                                    <th className="table-primary">End</th>
                                    <th className="table-primary">Date</th>
                                    <th className="table-primary">Status</th>
                                    <th className="table-primary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPlans.map((plan, idx) => (
                                    <tr key={plan.inspectionplanid}>
                                        <td>{idx + 1 + (currentPage - 1) * pageSize}</td>
                                        <td>{plan.expectedoutput}</td>
                                        <td>{plan.startfrom_location}</td>
                                        <td>{plan.endat_location}</td>
                                        <td>{plan.inspectiondate}</td>
                                        <td>{plan.status}</td>
                                        <td>
                                            {plan.status === 'planned' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="info"
                                                        className="me-2"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowUpdateModal(true);
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button size="sm" color="danger" className="me-2" onClick={() => handleDelete(plan.inspectionplanid)}>
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowDetailModal(true);
                                                        }}
                                                    >
                                                        + Activities
                                                    </Button>
                                                </>
                                            )}

                                            {plan.status === 'planned with Activities' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowDetailModal(true);
                                                        }}
                                                    >
                                                        + Activities
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        color="success"
                                                        className="ms-2"
                                                        onClick={() =>
                                                            handleApprovals(
                                                                plan.inspectionplanid,
                                                                plan.contractid,
                                                                plan.startfrom_location,
                                                                plan.endat_location,
                                                                plan.expectedoutput,
                                                                plan.inspectiondate,
                                                                plan.status
                                                            )
                                                        }
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="warning"
                                                        className="ms-2"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowRejectModal(true);
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                            {plan.status === 'Viewed' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="success"
                                                        className="ms-2"
                                                        onClick={() =>
                                                            handleApprovals(
                                                                plan.inspectionplanid,
                                                                plan.contractid,
                                                                plan.startfrom_location,
                                                                plan.endat_location,
                                                                plan.expectedoutput,
                                                                plan.inspectiondate,
                                                                plan.status
                                                            )
                                                        }
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="warning"
                                                        className="ms-2"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowRejectModal(true);
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                            {plan.status === 'Approved' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="success"
                                                        className="ms-2"
                                                        onClick={() =>
                                                            handleDownload(
                                                                plan.inspectionplanid,
                                                                plan.contractid,
                                                                plan.startfrom_location,
                                                                plan.endat_location,
                                                                plan.expectedoutput,
                                                                plan.inspectiondate,
                                                                plan.status
                                                            )
                                                        }
                                                    >
                                                        Download Inspection Form
                                                    </Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Pagination */}
                        <div className="pagination-container mt-3 d-flex justify-content-center">
                            <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                        </div>
                    </>
                )}

                {/* Modals */}
                <AddInspectionPlanModal isOpen={showAddModal} toggle={() => setShowAddModal(false)} refresh={fetchPlans} contractId={contractType} />
                <UpdateInspectionPlanModal isOpen={showUpdateModal} toggle={() => setShowUpdateModal(false)} plan={selectedPlan || {}} refresh={fetchPlans} contractId={contractType} />
                <InspectionPlanDetailModal isOpen={showDetailModal} toggle={() => setShowDetailModal(false)} plan={selectedPlan || {}} refresh={fetchPlans} contractId={contractType} />
                <InspectionPlanRejectedModal isOpen={showRejectModal} toggle={() => setShowRejectModal(false)} plan={selectedPlan || {}} refresh={fetchPlans} contractId={contractType} />
            </div>
        );
    };

    //-------------------------------------------------------------------------------------------------------
    const InspectionPlanServiceOrder = () => {
        const [plans, setPlans] = useState([]);
        const [loading, setLoading] = useState(true);
        const [searchQuery, setSearchQuery] = useState('');
        const [sortColumn, setSortColumn] = useState({ path: 'inspectiondate', order: 'asc' });

        // pagination states
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize] = useState(6);

        // selected plan for modals
        const [selectedPlan, setSelectedPlan] = useState(null);

        // modals state
        const [showAddModal, setShowAddModal] = useState(false);
        const [showUpdateModal, setShowUpdateModal] = useState(false);
        const [showDetailModal, setShowDetailModal] = useState(false);
        const [showRejectModal, setShowRejectModal] = useState(false);

        const fetchPlans = async () => {
            setLoading(true);
            try {
                const res = await getInspectionPlansServiceorderbyserviceorder(contractType);
                // toast.error('Error fetching inspection plans'+contractType);
                if (res && res.data) {
                    setPlans(res.data);
                } else {
                    setPlans([]);
                }
            } catch (err) {
                toast.error('Error fetching inspection plans' + contractType);
                setPlans([]);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchPlans();
        }, []);

        // search + pagination + sort
        const getPagedData = () => {
            let filtered = plans;
            if (searchQuery) {
                const lower = searchQuery.toLowerCase();
                filtered = plans.filter(
                    (plan) =>
                        plan.expectedoutput?.toLowerCase().includes(lower) ||
                        plan.startfrom_location?.toLowerCase().includes(lower) ||
                        plan.endat_location?.toLowerCase().includes(lower) ||
                        plan.status?.toLowerCase().includes(lower) ||
                        plan.inspectiondate?.toLowerCase().includes(lower)
                );
            }

            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
            const paginatedPlans = paginate(sorted, currentPage, pageSize);

            return { totalCount: filtered.length, data: paginatedPlans };
        };

        const handleDelete = async (inspectionplanid) => {
            if (!window.confirm('Are you sure you want to delete this plan?')) return;
            try {
                await deleteInspectionPlan(inspectionplanid);
                toast.success('Plan deleted successfully');
                fetchPlans();
            } catch (err) {
                toast.error('Delete failed');
            }
        };

        const handleApprovals = async (planData) => {
            if (!window.confirm('Are you sure you want to Approv this plan?')) return;
            try {
                if (planData.status === 'planned with Activities') {
                    const planDataupdate = {
                        inspectionplanid: planData.inspectionplanid,
                        serviceorderid: contractType,
                        startfrom_location: planData.startfrom_location,
                        endat_location: planData.endat_location,
                        expectedoutput: planData.expectedoutput,
                        inspectiondate: planData.inspectiondate,
                        status: 'Viewed',
                    };
                    await saveInspectionPlanServiceorder(planDataupdate);
                    toast.success(`Plan  successfully`);
                    fetchPlans();
                } else if (planData.status === 'Viewed') {
                    const planDataupdate = {
                        inspectionplanid: planData.inspectionplanid,
                        serviceorderid: contractType,
                        startfrom_location: planData.startfrom_location,
                        endat_location: planData.endat_location,
                        expectedoutput: planData.expectedoutput,
                        inspectiondate: planData.inspectiondate,
                        status: 'Approved',
                    };
                    await saveInspectionPlanServiceorder(planDataupdate);
                    toast.success(`Plan  successfully`);
                    fetchPlans();
                }
            } catch (err) {
                toast.error('Approval failed');
            }
        };

        const handleDownload = async (inspectionplanid, contractid, startfrom_location, endat_location, expectedoutput, inspectiondate, status) => {
            try {
                //toast.success(`........${inspectionplanid}`);
                await getInspectionPlanserviceorderPDF(inspectionplanid, contractType, startfrom_location, endat_location, expectedoutput, inspectiondate, status);
                toast.success(`download  successfully`);
                fetchPlans();
            } catch (err) {
                toast.error('download  successfully' + err);
            }
        };

        const handlePageChange = (page) => {
            setCurrentPage(page);
        };

        const handleSearch = (query) => {
            setSearchQuery(query);
            setCurrentPage(1); // reset pagination
        };

        const { totalCount, data: paginatedPlans } = getPagedData();

        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4>Inspection Plans for Service order</h4>
                    <Button color="primary" onClick={() => setShowAddModal(true)}>
                        + Add New
                    </Button>
                </div>

                {/* 🔍 Search Box */}
                <div className="mb-3">
                    <Input type="text" placeholder="Search by output, location, status, or date..." value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : totalCount === 0 ? (
                    <p className="text-center">No inspection plans for service order found</p>
                ) : (
                    <>
                        <Table bordered hover className="custom-thead">
                            <thead>
                                <tr>
                                    <th className="table-primary">#</th>
                                    <th className="table-primary">Expected Output</th>
                                    <th className="table-primary">Start</th>
                                    <th className="table-primary">End</th>
                                    <th className="table-primary">Date</th>
                                    <th className="table-primary">Status</th>
                                    <th className="table-primary">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPlans.map((plan, idx) => (
                                    <tr key={plan.inspectionplanid}>
                                        <td>{idx + 1 + (currentPage - 1) * pageSize}</td>
                                        <td>{plan.expectedoutput}</td>
                                        <td>{plan.startfrom_location}</td>
                                        <td>{plan.endat_location}</td>
                                        <td>{plan.inspectiondate}</td>
                                        <td>{plan.status}</td>
                                        <td>
                                            {plan.status === 'planned' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="info"
                                                        className="me-2"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowUpdateModal(true);
                                                        }}
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button size="sm" color="danger" className="me-2" onClick={() => handleDelete(plan.inspectionplanid)}>
                                                        Delete
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowDetailModal(true);
                                                        }}
                                                    >
                                                        + Activities
                                                    </Button>
                                                </>
                                            )}

                                            {plan.status === 'planned with Activities' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="secondary"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowDetailModal(true);
                                                        }}
                                                    >
                                                        + Activities
                                                    </Button>

                                                    <Button size="sm" color="success" className="ms-2" onClick={() => handleApprovals(plan)}>
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="warning"
                                                        className="ms-2"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowRejectModal(true);
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                            {plan.status === 'Viewed' && (
                                                <>
                                                    <Button size="sm" color="success" className="ms-2" onClick={() => handleApprovals(plan)}>
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        color="warning"
                                                        className="ms-2"
                                                        onClick={() => {
                                                            setSelectedPlan(plan);
                                                            setShowRejectModal(true);
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                </>
                                            )}
                                            {plan.status === 'Approved' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        color="success"
                                                        className="ms-2"
                                                        onClick={() =>
                                                            handleDownload(
                                                                plan.inspectionplanid,
                                                                plan.contractid,
                                                                plan.startfrom_location,
                                                                plan.endat_location,
                                                                plan.expectedoutput,
                                                                plan.inspectiondate,
                                                                plan.status
                                                            )
                                                        }
                                                    >
                                                        Download Inspection Form
                                                    </Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Pagination */}
                        <div className="pagination-container mt-3 d-flex justify-content-center">
                            <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                        </div>
                    </>
                )}

                {/* Modals */}
                <AddInspectionPlanserviceorderModal isOpen={showAddModal} toggle={() => setShowAddModal(false)} refresh={fetchPlans} serviceorderId={contractType} />
                <UpdateInspectionPlanserviceorderModal isOpen={showUpdateModal} toggle={() => setShowUpdateModal(false)} plan={selectedPlan || {}} refresh={fetchPlans} contractId={contractType} />
                <InspectionPlanDetailserviceorderModal isOpen={showDetailModal} toggle={() => setShowDetailModal(false)} plan={selectedPlan || {}} refresh={fetchPlans} contractId={contractType} />
                <InspectionPlanRejectedserviceorderModal isOpen={showRejectModal} toggle={() => setShowRejectModal(false)} plan={selectedPlan || {}} refresh={fetchPlans} contractId={contractType} />
            </div>
        );
    };

    //------------------------------------------------------------------------------------------------END Main Content
    return (
        <div className="mailbox-container h-screen flex flex-col">
            <div className="mailbox-layout flex max-w-[3200px] flex-1 overflow-hidden flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="sidebar-panel w-full md:w-96 bg-white shadow-md border-r border-gray-200 flex flex-col h-full rounded-r-2xl">
                    {/* Header */}
                    <div className="sidebar-header flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                        <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-blue-600" />
                            Inspection Planning
                        </h2>
                        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="sidebar-content overflow-y-auto p-4 flex-1">
                        <TreeView data={transformedData} fetchChildren={fetchChildren} />
                    </div>

                    {/* Footer (optional actions) */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50"></div>

                    <ToastContainer position="bottom-right" autoClose={3000} />
                </aside>

                {/* Content */}

                <main className="content-scrollable bg-white max-w-[1200px] w-full mx-auto overflow-x-auto">
                    <div className="responsive-table">
                        {typename === 'serviceorder' && (cancreateserviceorder ? '' : <InspectionPlans />)}
                        {typename === 'inspection' && <InspectionPlanServiceOrder />}
                        {/**{typename === 'contractMode' && <Project />} 
                        {typename === 'projectMode' && <Contract />}
                        {typename === 'serviceorder' && <Serviceorder />} 
                        {typename + ''+ cancreateserviceorder}*/}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Mailbox;
// CSS Styles
const styles = `
/* Enhanced Table Styles */
/* CSS Variables for consistent theming */
:root {
  --primary-color: #2c3e50;
  --secondary-color: #f8f9fa;
  --accent-color: #4a90e2;
  --danger-color: #dc3545;
  --success-color: #28a745;
  --border-color: #dee2e6;
  --text-color: #333;
  --text-light: #6c757d;
  --hover-bg: #e9ecef;
  --card-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Base Layout Structure */
.mailbox-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
  .custom-thead tr {
    background-color: #1a73e8 !important;
    color: white !important;
}
table.custom-thead th {
    background-color: #a3c1e9ff !important;
    color: white !important;
}


.mailbox-layout {
  display: flex;
  flex: 1;
  min-height: 0; /* Crucial for proper flex behavior */
}

/* Sidebar Styles */
.sidebar-panel {
  width: 250px;
  background-color: var(--secondary-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 1rem;
  flex-shrink: 0;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem 1rem;
  min-height: 0;
}

/* Main Content Area */
.content-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: auto;
}

.content-scrollable {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* Project Component Specific Styles */
.table-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0;
    width: 100%;
  overflow-x: auto;
}

.responsive-table {
  flex: 1;
  min-height: 0;
  overflow: auto;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  background: white;
  overflow-x: auto;
  min-width: 100%;
}

.styled-table {
 min-width: 900px; /* or more depending on your column count */
  width: 100%;
  border-collapse: collapse;
}

.styled-table thead tr {
  background-color: var(--primary-color);
  color: white;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  text-align: left;
}

.styled-table tbody tr {
  transition: background-color 0.2s;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f8f8f8;
}

.styled-table tbody tr:hover {
  background-color: #e9f7fe;
}

/* Card Styles */
.card {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.card-header {
  padding: 0.75rem 1.25rem;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  padding: 1.25rem;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  transition: all 0.15s ease-in-out;
  gap: 0.5rem;
}

.btn-primary {
  color: white;
  background-color: var(--accent-color);
  border-color: var(--accent-color);
}

.btn-primary:hover {
  background-color: #3a80d2;
  border-color: #3a80d2;
}

.btn-success {
  color: white;
  background-color: var(--success-color);
  border-color: var(--success-color);
}

.btn-danger {
  color: white;
  background-color: var(--danger-color);
  border-color: var(--danger-color);
}

.btn-secondary {
  color: white;
  background-color: #6c757d;
  border-color: #6c757d;
}

/* Table Controls */
.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}


/* Table Styles */
.table-responsive {
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th, .table td {
    padding: 0.75rem;
    vertical-align: top;
    border-top: 1px solid #dee2e6;
}

.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid rgb(13, 13, 14);
    background-color:rgb(18, 18, 19);
}

.table-container {
    padding: 1rem;
    max-width: 100%;
    overflow: hidden;
}

.responsive-table {
    overflow-x: auto;
    margin-top: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.styled-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.9rem;
    min-width: 600px;
}

.styled-table thead tr {
    background-color: #2c3e50;
    color: blue;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr {
    transition: all 0.2s ease;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f8f9fa;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #2c3e50;
}

.styled-table tbody tr:hover {
    background-color: #e9f7fe;
    transform: translateX(2px);
}


/* Status Badges */
.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  display: inline-block;
  min-width: 60px;
  text-align: center;
}

.status-badge.active {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.inactive {
  background-color: #f8d7da;
  color: #721c24;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Scrollbar Styles */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive Adjustments */
@media (max-width: 992px) {
  .mailbox-layout {
    flex-direction: column;
  }
  
  .sidebar-panel {
    width: 100%;
    height: auto;
    max-height: 40vh;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
}

@media (max-width: 768px) {
  .styled-table {
    font-size: 0.8rem;
    min-width: 100%;
  }
  
  .styled-table th,
  .styled-table td {
    padding: 8px 12px;
  }
  
  .btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }
  
  .table-controls {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 526px) {
  .content-scrollable {
    padding: 0.5rem;
    overflow-x: auto;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }
  
  .btn {
    width: 100%;
  }
}

/* Empty State Styles */
.no-data-message {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  font-style: italic;
}
/* In your CSS file */
.modal-dialog {
    max-width: 90%; /* Adjust this to fit your needs */
}

.modal-content {
    min-height: 500px; /* You can set a custom minimum height */
}
   /* Custom CSS for modal */
.custommodal .modal-content {
    background-color: #ffffff; /* Change to your desired background color */
    max-height: 90vh;
}

/* Ensure modal dialog size */
.custommodal .modal-dialog {
    max-width: 100%;  /* Adjust width */
    width: 90%;      /* Adjust width */
    margin: 30px auto; /* Optional: adds margin for centering */
}

/* Custom modal sizing */
.modal-90w {
  max-width: 9900px;
}

/* Better scrolling for modal body */
.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

/* Improved footer spacing */
.modal-footer {
  padding: 1rem 1.5rem;
}
  .mailbox-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.mailbox-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

.sidebar-panel {
  width: 270px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.content-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.content-scrollable {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  min-height: 0;
}
@media (max-width: 768px) {
  .mailbox-layout {
    flex-direction: column;
  }
  
  .sidebar-panel {
    width: 100%;
    height: 300px;
    border-right: none;
    border-bottom: 1px solid #dee2e6;
  }
}
`;

// Add styles to the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
