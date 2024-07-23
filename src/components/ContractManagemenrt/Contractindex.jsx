import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from '../Dropdown';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';

import { setPageTitle } from '../../store/themeConfigSlice';
import IconMail from '../Icon/IconMail';
import IconStar from '../Icon/IconStar';
import IconSend from '../Icon/IconSend';
import IconInfoHexagon from '../Icon/IconInfoHexagon';
import IconFile from '../Icon/IconFile';
import IconTrashLines from '../Icon/IconTrashLines';
import IconCaretDown from '../Icon/IconCaretDown';
import IconArchive from '../Icon/IconArchive';
import IconBookmark from '../Icon/IconBookmark';
import IconVideo from '../Icon/IconVideo';
import IconChartSquare from '../Icon/IconChartSquare';
import IconUserPlus from '../Icon/IconUserPlus';
import IconPlus from '../Icon/IconPlus';
import IconRefresh from '../Icon/IconRefresh';
import IconWheel from '../Icon/IconWheel';
import IconHorizontalDots from '../Icon/IconHorizontalDots';
import IconOpenBook from '../Icon/IconOpenBook';
import IconBook from '../Icon/IconBook';
import IconTrash from '../Icon/IconTrash';
import IconRestore from '../Icon/IconRestore';
import IconMenu from '../Icon/IconMenu';
import IconSearch from '../Icon/IconSearch';
import IconSettings from '../Icon/IconSettings';
import IconHelpCircle from '../Icon/IconHelpCircle';
import IconUser from '../Icon/IconUser';
import IconMessage2 from '../Icon/IconMessage2';
import IconUsers from '../Icon/IconUsers';
import IconTag from '../Icon/IconTag';
import IconPaperclip from '../Icon/IconPaperclip';
import IconArrowLeft from '../Icon/IconArrowLeft';
import IconPrinter from '../Icon/IconPrinter';
import IconArrowBackward from '../Icon/IconArrowBackward';
import IconArrowForward from '../Icon/IconArrowForward';
import IconGallery from '../Icon/IconGallery';
import IconFolder from '../Icon/IconFolder';
import IconZipFile from '../Icon/IconZipFile';
import IconDownload from '../Icon/IconDownload';
import IconTxtFile from '../Icon/IconTxtFile';
//---------------------------------------
import SearchBox from '../../components/searchBox';
import { MdOutlineVisibility } from 'react-icons/md';
import Pagination from '../../components/common/pagination';
import * as Source from '../../services/RevenuRessources/sourceofFundsServices';
import { paginate } from '../../utils/paginate';
import { useLocation } from 'react-router-dom';
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
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
import * as ContractModeData from '../../services/ContractManagement/ContractSetting/contractmodeservices';
import * as ContractData from '../../services/ContractManagement/ContractSetting/contractservice';

//------------
import * as ServiceOrderData from '../../services/ContractManagement/ContractSetting/serviceOrdersService';
//-------------------Import Modals
import * as AddroleModal from '../../components/ContractManagemenrt/ContractSettings/contracttype/addroleModal';
import * as UpdateFiscalYearModal from '../../components/ContractManagemenrt/ContractSettings/contracttype/modal';
import * as AddRoadModal from '../../components/ContractManagemenrt/ContractSettings/project/addroleModal';
import * as UpdateRoadModal from '../../components/ContractManagemenrt/ContractSettings/project/updateModal';
import * as ViewRoadModal from '../../components/ContractManagemenrt/ContractSettings/project/modal';
import * as AddContractModal from '../../components/ContractManagemenrt/ContractSettings/contract/addroleModal';
import * as UpdateContractModal from '../../components/ContractManagemenrt/ContractSettings/contract/addroleModal';
import * as AddServiceorderModal from '../../components/ContractManagemenrt/ContractSettings/contract/addroleModal';
import * as UpdateServiceorderModal from '../../components/ContractManagemenrt/ContractSettings/contract/addroleModal';

import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import _ from 'lodash';

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

    const [fiscalYearid, setFiscalYearid] = useState(0);
    const [fiscalYearname, setFiscalYearname] = useState('');
    const [fiscalyearcontracttypeid, setfiscalyearcontracttypeid] = useState(0);
    const [fiscalYearcontracttype, setFiscalYearcontracttype] = useState([]);
    const [project, setproject] = useState([]);
    const [cancreateserviceorder, setcancreateserviceorder] = useState(false);

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
            toast.info(`hello there ${node.type} and ${node.id}`);
            settypename(node.type);
            if (node.type == 'fiscalYear') {
                setfYid(node.id);
            } else if (node.type == 'contractType') {
                setcontractType(node.id);
            } else if (node.type == 'contractMode') {
                setcontractType(node.id);
            } else if (node.type == 'projectMode') {
                setcontractMode(node.id);
            } else if (node.type == 'serviceorder') {
                setcontract(node.id);
            }
        };

        return (
            <li>
                <div class="container">
                    <div class="row">
                        <div class="col-md-1">
                            <div onClick={handleClick} style={{ cursor: 'pointer' }}>
                                {expanded ? '[-]' : '[+]'}
                            </div>
                        </div>
                        <div class="col-md-10 ">
                            <di onClick={handledisplay} style={{ cursor: 'pointer' }}>
                                {node.name}
                            </di>
                        </div>
                    </div>
                    <br />
                </div>

                {expanded && children.length > 0 && (
                    <ul>
                        {children.map((childNode) => (
                            <>
                                <TreeNode key={childNode.id} node={childNode} level={level + 1} fetchChildren={fetchChildren} />
                            </>
                        ))}
                    </ul>
                )}
                {expanded && loading && <div>Loading...</div>}
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
        //------------------------------------------------------------------------------------------------END Fetch Contract Type
        if (node.type === 'fiscalYear') {
            const response = await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(fiscalYearid);
            //toast.error('Application test: roadname ' + JSON.stringify(response.data));
            const contracttypes = response.data;
            setfYid(node.id);
            return response.data.map((item) => ({
                ids: item.fiscalyearcontracttypeid,
                id: item.fiscalyearcontracttypeid,
                name: 'Contract : ' + item.contracttypename,
                type: 'contractType',
            }));

            //------------------------------------------------------------------------------------------------END Fetch Contract Type
        } else if (node.type === 'contractType') {
            //------------------------------------------------------------------------------------------------Fetch Project
            const response = await Projectdata.getprojectsbyfiscalyearcontracttypeid(node.ids);

            return response.data.map((item) => ({
                id: item.projectid,
                name: 'Road : ' + item.roadname,
                type: 'contractMode',
            }));
            //------------------------------------------------------------------------------------------------END Fetch Project
        } else if (node.type === 'contractMode') {
            //------------------------------------------------------------------------------------------------Fetch Project
            const response = await ContractModeData.getcontractmodebyproject(node.id);

            return response.data.map((item) => ({
                ids: item.cancreateserviceorder,
                id: item.contractmodeid,
                name: item.contractmode,
                type: 'projectMode',
            }));
            //------------------------------------------------------------------------------------------------END Fetch Project
        } else if (node.type === 'projectMode') {
            //------------------------------------------------------------------------------------------------Fetch serviceorder
            const response = await ContractData.getcontractBycontractmode(node.id);

            return response.data
                .filter((item) => item.cancreateserviceorder === true)
                .map((item) => ({
                    id: item.contractid,
                    name: 'Service Order for -' + item.contractorname,
                    type: 'serviceorder',
                }));

            //------------------------------------------------------------------------------------------------END Fetch serviceorder
        }
        return [];
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (fiscalYears.length === 0) {
        return <div>No fiscal years found.</div>;
    }

    const transformedData = fiscalYears.map((year) => ({
        id: year.fiscalyearid,
        name: 'Fiscal Year : ' + year.fiscalyear,
        type: 'fiscalYear',
    }));
    //------------------------------------------------------------------------------------------------ENDsidebar Menu
    //--------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------CRUD-----------------------------------------------------

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
    //------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------Main Content

    const BusinessPaterners = () => {
        const location = useLocation();
        const [fiscalyearid, setFiscalyearid] = useState(0);
        const [fiscalyearids, setFiscalyearids] = useState(0);
        const [sources, setSources] = useState([]);
        const [business, setBusiness] = useState([]);
        const [contracttypes,setcontracttypes]= useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize] = useState(4);
        const [requiredItem, setRequiredItem] = useState(0);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedrole, setSelectedrole] = useState(null);
        const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

        //------------------------------------Modals

        const [showModalAddFiscalyear, setshowModalAddFiscalyear] = useState(false);
        const toggleModalAddFiscalyear = () => {
            //this.setState(prevState => ({ showModalAddFiscalyear: !prevState.showModalAddFiscalyear }));
            setshowModalAddFiscalyear(!showModalAddFiscalyear);
        };
        const handleShowModalAddFiscalyear = () => setshowModalAddFiscalyear(!showModalAddFiscalyear);
        const handleCloseModalAddFiscalyear = () => setshowModalAddFiscalyear(!showModalAddFiscalyear);
        //-------------------------------------------------------------------------------------------------------------------------------------
        
            const handleSave = async () => {
                try {
                    const item = this.state;
                    const fiscalyearcontracttypeid = 0;

                    await FiscalYearContractType.addfiscalyearcontracttype(fiscalyearcontracttypeid, item.fiscalyearid, item.contracttypeid);
                    toast.success(
                        `Business Paterner with   has been updated successful:fiscalyearcontracttypeid:${fiscalyearcontracttypeid} ,fiscalyearids: ${item.fiscalyearids},contracttypeid: ${item.contracttypeid} `
                    );
                    //const { state } = this.props.location;
                    //window.location = state ? state.from.pathname : "/security/role";
                    //this.props.history.push("/security/role");

                    //this.props.saveModalDetails(item);
                    //(myString.toLowerCase() === 'true');
                    //toast.info(` ${item.roleid} and ${item.rolename} and ${item.isSystemRole} and ${item.description}`);
                    // const item = this.state;
                    //this.props.saveModalDetails(item);
                } catch (ex) {
                    if (ex.response && ex.response.status === 400) {
                        const errors = { ...this.state.errors };
                        errors.rolename = ex.response.data;
                        toast.error('Error:' + errors.rolename);
                        this.setState({ errors });
                    } else if (ex.response && ex.response.status === 409) {
                        const errors = { ...this.state.errors };
                        errors.rolename = ex.response.data;
                        toast.error('Error:' + errors.rolename);
                        this.setState({ errors });
                    } else {
                        toast.error('An Error Occured, while saving role Please try again later');
                    }
                }
              }

        
        //---------------------------------------------------------------------------------------------------------------------------------------
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const businessResponse = await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(fYid);

                    if (!businessResponse.data) {
                        return toast.error('An Error Occurred, data fetching ...');
                    } else {
                        setBusiness(businessResponse.data);
                    }
                    const { data: contracttypes } = await ContractType.getcontracttypes();
                    if (!contracttypes.data) {
                      return toast.error('An Error Occurred, contracttypes data fetching ...');
                  } else {
                      setcontracttypes(contracttypes.data);
                  }
                } catch (ex) {
                    toast.error('An Error Occurred, while fetching fiscalYear data. Please try again later.' + ex);
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

        const { totalCount, data: paginatedBusiness } = getPagedData();

        const[contracttypeid, setcontracttypeid ] =useState(0);
        const[fiscalyearcontracttypeid, setfiscalyearcontracttypeid ] =useState(0);

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
                                    <p>There are no Contract Type in the database.</p>
                                </>
                            )}
                            {totalCount !== 0 && (
                                <>
                                    <button className="btn btn-success" onClick={handleShowModalAddFiscalyear}>
                                        <FcPlus /> AddNew
                                    </button>

                                    <Modal show={showModalAddFiscalyear} onHide={handleCloseModalAddFiscalyear}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add Contract Type </Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <div>
                                                <div>
                                                        
                                                        <div className="btn-wrapper text-start">
                                                            <br></br>
                                                        </div>

                                                        <div className="mb-3">
                                                            <div className="mb-3">
                                                                <input
                                                                    type="hidden"
                                                                    className="form-control"
                                                                    name="fiscalyearcontracttypeid"
                                                                    id="fiscalyearcontracttypeid"
                                                                    value={fiscalyearcontracttypeid}
                                                                    onChange={(e) => setfiscalyearcontracttypeid(e.target.value)}
                                                                />
                                                                <input
                                                                    type="hidden"
                                                                    className="form-control"
                                                                    name="fiscalyearid"
                                                                    id="fiscalyearid"
                                                                    value={fiscalyearid}
                                                                    
                                                                />
                                                                <div className="row">
                                                                    <div className="col">
                                                                        <div className="col-auto">
                                                                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                                                                Contract Type
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div className="col-auto">
                                                                            <select name="contracttypeid " id="contracttypeid" className="form-control" onChange={(e) => setcontracttypeid(e.target.value)}>
                                                                                <option value={contracttypeid}></option>
                                                                                {contracttypes.map((contracttypes) => (
                                                                                    <option key={contracttypes.contracttypeid} value={contracttypes.contracttypeid}>
                                                                                        {contracttypes.contracttypename}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/**----------------------------------------------------------------- */}
                                                            </div>
                                                        </div>
                                                   
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-dismiss="modal"
                                                onClick={() => {
                                                    this.handleSave();
                                                }}
                                            >
                                                Save
                                            </button>{' '}
                                            <Button variant="secondary" onClick={handleShowModalAddFiscalyear}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
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
                                            <tbody>
                                                {paginatedBusiness.map((business, index) => (
                                                    <tr key={business.fiscalyearcontracttypeid}>
                                                        <td>{business.fiscalyear}</td>
                                                        <td>{business.islocked.toString()}</td>
                                                        <td>{business.contracttypename}</td>
                                                        <td>{business.cancreateserviceorder.toString()}</td>
                                                        <td>
                                                            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => replaceModalItem(index)}>
                                                                <AiFillEdit /> Update
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => deleteItem(business.fiscalyearcontracttypeid)}>
                                                                <AiFillDelete /> Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
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

    const Project = () => {
        const [state, setState] = useState({
            projectid: 0,
            projectdescription: '',
            projecttypename: '',
            maintenancetypename: '',
            roadname: '',
            fiscalyear: '',
            roaddistance: '',
            maintenancetypeid: 0,
            roadid: 0,
            projecttypeid: 0,
        });
        const [fiscalyearcontracttypeid, setFiscalyearcontracttypeid] = useState(0);
        const [business, setBusiness] = useState([]);
        const [sources, setSources] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize] = useState(4);
        const [requiredItem, setRequiredItem] = useState(0);
        const [searchQuery, setSearchQuery] = useState('');
        const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const { data: business } = await Projectdata.getprojectsbyfiscalyearcontracttypeid(contractType);
                    if (!business) {
                        return toast.error('An Error Occurred, data fetching ...');
                    } else {
                        setBusiness(business);
                    }
                } catch (ex) {
                    return toast.error('An Error Occurred while fetching business data. Please try again later.' + ex);
                }
            };

            fetchData();
        }, []);

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
            if (searchQuery)
                filtered = business.filter(
                    (m) =>
                        m.maintenancetypename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.roadname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.roaddistance.toString().toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.targetname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.startquarter.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.endquarter.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.fiscalyear.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.projecttypename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.projectdescription.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.budget.toString().toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.startdate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.enddate.toLowerCase().startsWith(searchQuery.toLowerCase())
                );

            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
            const paginatedBusiness = paginate(sorted, currentPage, pageSize);

            return { totalCount: filtered.length, data: paginatedBusiness };
        };

        const replaceModalItem = (index) => {
            setRequiredItem(index);
        };

        const saveModalDetails = (updatedBusiness) => {
            const updatedBusinessList = [...business];
            updatedBusinessList[requiredItem] = updatedBusiness;
            setBusiness(updatedBusinessList);
        };

        const deleteItem = async (projectid) => {
            try {
                if (!projectid) {
                    toast.info(`The project you selected does not exist.`);
                } else {
                    await Projectdata.deleteproject(projectid);
                    toast.success(`This project has been deleted successfully.`);
                    setBusiness(business.filter((b) => b.projectid !== projectid));
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('Error: ' + ex.response.data);
                } else if (ex.response && ex.response.status === 409) {
                    toast.error('Error: ' + ex.response.data);
                } else {
                    toast.error('An Error Occurred while deleting the project. Please try again later.');
                }
            }
        };

        const { totalCount, data: paginatedBusiness } = getPagedData();
        const requiredItemData = business[requiredItem];

        return (
            <div className="d-flex justify-content-center align-items-center">
                <Col className="text-center">
                    <Card className="shadow border-0">
                        <CardHeader className="bg-transparent">
                            <h1>Contract Settings - Road To Maintain</h1>
                        </CardHeader>
                        <CardBody>
                            {totalCount === 0 ? (
                                <>
                                    <button className="btn btn-success" data-toggle="modal" data-target="#exampleAddModal" onClick={() => setFiscalyearcontracttypeid(fiscalyearcontracttypeid)}>
                                        <FcPlus /> Add New
                                    </button>
                                    <p>There are no Business Partners in the database.</p>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-success" data-toggle="modal" data-target="#exampleAddModal" onClick={() => setFiscalyearcontracttypeid(fiscalyearcontracttypeid)}>
                                        <FcPlus /> Add New
                                    </button>
                                    <SearchBox value={searchQuery} onChange={handleSearch} />
                                    <div className="table-responsive mb-3">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Road Name</th>
                                                    <th>Target</th>
                                                    <th>Project Length</th>
                                                    <th>Status</th>
                                                    <th>Update</th>
                                                    <th>Delete</th>
                                                    <th>Details</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paginatedBusiness.map((business, index) => (
                                                    <tr key={business.projectid}>
                                                        <td>{business.roadname}</td>
                                                        <td>{business.targetname}</td>
                                                        <td>{business.projectlength + ' ' + business.measurementname}</td>
                                                        <td>{business.status}</td>
                                                        <td>
                                                            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => replaceModalItem(index)}>
                                                                <AiFillEdit /> Update
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger" onClick={() => deleteItem(business.projectid)}>
                                                                <AiFillDelete /> Delete
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-secondary" data-toggle="modal" data-target="#exampleviewModal" onClick={() => replaceModalItem(index)}>
                                                                <MdOutlineVisibility /> View
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
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
    const Contract = (props) => {
        const [state, setState] = useState({
            contractmodeid: 0,
            contractmode: '',
            sources: [],
            business: [],
            currentPage: 1,
            pageSize: 4,
            requiredItem: 0,
            searchQuery: '',
            selectedrole: null,
            sortColumn: { path: 'title', order: 'asc' },
        });

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const { data: business } = await ContractData.getcontractBycontractmode(contractMode);

                    if (!business) {
                        toast.error('An Error Occured, data fetching ...');
                    } else {
                        setState((prevState) => ({
                            ...prevState,
                            business,
                        }));
                    }
                } catch (ex) {
                    toast.error('An Error Occured while fetching business data. Please try again later' + ex);
                }
            };
            fetchData();
        }, [props.location]);

        const handlePageChange = (page) => {
            setState((prevState) => ({ ...prevState, currentPage: page }));
        };

        const handleSearch = (query) => {
            setState((prevState) => ({ ...prevState, searchQuery: query, currentPage: 1 }));
        };

        const handleSort = (sortColumn) => {
            setState((prevState) => ({ ...prevState, sortColumn }));
        };

        const replaceModalItem = (index) => {
            setState((prevState) => ({ ...prevState, requiredItem: index }));
        };

        const handleshow = (contractmodeid) => {
            setState((prevState) => ({ ...prevState, contractmodeid }));
        };

        const saveModalDetails = (business) => {
            const requiredItem = state.requiredItem;
            let tempbrochure = [...state.business];
            tempbrochure[requiredItem] = business;
            setState((prevState) => ({ ...prevState, business: tempbrochure }));
        };

        const deleteItem = async (contractid) => {
            try {
                if (!contractid) {
                    toast.info('The contract you selected does not exist');
                } else {
                    await ContractData.deletecontract(contractid);
                    toast.success('This contract has been deleted successfully');
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('Error: ' + ex.response.data);
                } else if (ex.response && ex.response.status === 409) {
                    toast.error('Error: ' + ex.response.data);
                } else {
                    toast.error('An Error Occured while saving contract. Please try again later');
                }
            }
        };

        const getPagedData = () => {
            const { pageSize, currentPage, sortColumn, searchQuery, selectedrole, business: allSources } = state;

            let filtered = allSources;
            if (searchQuery) {
                filtered = allSources.filter(
                    (m) =>
                        m.contractdiscription.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.contractbudget.toString().toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.contractorname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.contractorstartdate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.contractorenddate.toLowerCase().startsWith(searchQuery.toLowerCase())
                );
            } else if (selectedrole && selectedrole.institutionpartenerid) {
                filtered = allSources.filter((m) => m.Business.institutionpartenerid === selectedrole.institutionpartenerid);
            }

            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
            const business = paginate(sorted, currentPage, pageSize);

            return { totalCount: filtered.length, data: business };
        };

        const { length: count } = state.business;
        const { pageSize, currentPage, searchQuery } = state;
        const { totalCount, data: business } = getPagedData();

        const brochure = business.map((business, index) => (
            <tr key={business.contractdiscription}>
                <td>{business.refnumber}</td>
                <td>{business.contractdiscription}</td>
                <td>{business.contractorname}</td>
                <td>{business.contractbudget}</td>
                <td>{business.contractorstartdate}</td>
                <td>{business.contractorenddate}</td>
                <td>
                    <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => replaceModalItem(index)}>
                        <AiFillEdit />
                        Update
                    </button>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => deleteItem(business.contractid)}>
                        <AiFillDelete />
                        Delete
                    </button>
                </td>
            </tr>
        ));

        const requiredItem = state.requiredItem;
        let modalData = state.business[requiredItem];
        const contractmodeid = state.contractmodeid;

        return (
            <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Col style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Card className="shadow border-0">
                        <CardHeader className="bg-transparent">
                            <div className="text-muted text-center mt-2 mb-3">
                                <h1>
                                    <div style={{ textAlign: 'center' }}>
                                        <h1>Contract Management - contractor</h1>
                                    </div>
                                </h1>
                            </div>
                            <div className="btn-wrapper text-center"></div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div>
                                <div>
                                    {count === 0 && (
                                        <>
                                            <button className="btn btn-success" data-toggle="modal" data-target="#exampleAddModal" onClick={() => handleshow(state.contractmodeid)}>
                                                <FcPlus />
                                                Add New
                                            </button>
                                            <p>There are no contractors in the database.</p>
                                        </>
                                    )}
                                    {count !== 0 && (
                                        <>
                                            <button className="btn btn-success" data-toggle="modal" data-target="#exampleAddModal" onClick={() => handleshow(state.contractmodeid)}>
                                                <FcPlus />
                                                Add New
                                            </button>
                                            <div style={{ textAlign: 'center' }}>
                                                <SearchBox value={searchQuery} onChange={handleSearch} />
                                            </div>
                                            <div className="table-responsive mb-5">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>RefNumber</th>
                                                            <th>Contract Description</th>
                                                            <th>Contractor</th>
                                                            <th>Contract Amount</th>
                                                            <th>Start Date</th>
                                                            <th>End Date</th>
                                                            <th>Update</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>{brochure}</tbody>
                                                </table>
                                            </div>
                                            <Modal
                                                contractmodeid={contractmodeid}
                                                contractid={modalData.contractid}
                                                contractdiscription={modalData.contractdiscription}
                                                budget={modalData.contractbudget}
                                                ContractModeid={modalData.ContractModeid}
                                                contractorid={modalData.contractorid}
                                                startdate={modalData.contractorstartdate}
                                                enddate={modalData.contractorenddate}
                                                contractorname={modalData.contractorname}
                                                saveModalDetails={saveModalDetails}
                                            />
                                        </>
                                    )}
                                    <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    };
    const Serviceorder = () => {
        const [data, setData] = useState({
            serviceorderid: 0,
            serviceorderdescription: '',
            damagedlevel: '',
            serviceorderstatus: '',
            contractid: 0,
            projectid: 0,
        });

        const [projectid, setProjectId] = useState(0);
        const [contractid, setContractId] = useState(0);
        const [sources, setSources] = useState([]);
        const [business, setBusiness] = useState([]);
        const [banks, setBanks] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize, setPageSize] = useState(4);
        const [requiredItem, setRequiredItem] = useState(0);
        const [brochure, setBrochure] = useState([]);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedrole, setSelectedRole] = useState(null);
        const [search, setSearch] = useState([]);
        const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

        useEffect(() => {
            async function fetchData() {
                try {
                    const { data: business } = await ServiceOrderData.getserviceorderBycontractId(contract);
                    if (!business) {
                        toast.error('An error occurred, data fetching...');
                    } else {
                        setBusiness(business);
                    }
                } catch (ex) {
                    toast.error('An error occurred while fetching business data. Please try again later' + ex);
                }
            }
            fetchData();
        }, []);

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
            if (searchQuery) filtered = business.filter((m) => m.serviceorderdescription.toLowerCase().startsWith(searchQuery.toLowerCase()));
            else if (selectedrole && selectedrole.serviceorderid) filtered = business.filter((m) => m.Business.serviceorderid === selectedrole.serviceorderid);

            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
            const paginatedBusiness = paginate(sorted, currentPage, pageSize);

            return { totalCount: filtered.length, data: paginatedBusiness };
        };

        const replaceModalItem = (index) => {
            setRequiredItem(index);
        };

        const saveModalDetails = (business) => {
            const updatedBusiness = [...business];
            updatedBusiness[requiredItem] = business;
            setBusiness(updatedBusiness);
        };

        const handleShow = (projectid, contractid) => {
            setProjectId(projectid);
            setContractId(contractid);
        };

        const deleteItem = async (serviceorderid) => {
            try {
                if (!serviceorderid) {
                    toast.info('The service order you selected does not exist');
                } else {
                    await ServiceOrderData.deleteserviceorder(serviceorderid);
                    toast.success('This service order has been deleted successfully');
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('Error: ' + ex.response.data);
                } else if (ex.response && ex.response.status === 409) {
                    toast.error('Error: ' + ex.response.data);
                } else {
                    toast.error('An error occurred while saving Institution Partner. Please try again later');
                }
            }
        };

        const { length: count } = business;
        const { totalCount, data: paginatedBusiness } = getPagedData();

        if (business == []) {
            toast.error('An error occurred, data fetching...');
        } else {
            const brochure = paginatedBusiness.map((business, index) => (
                <tr key={business.serviceorderid}>
                    <td>{business.serviceorderdescription}</td>
                    <td>{business.damagedlevel}</td>
                    <td>{business.amount}</td>
                    <td>{business.serviceorderstatus}</td>
                    <td>
                        <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => replaceModalItem(index)}>
                            <AiFillEdit />
                            Update
                        </button>
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={() => deleteItem(business.serviceorderid)}>
                            <AiFillDelete />
                            Delete
                        </button>
                    </td>
                </tr>
            ));

            const requiredItemData = business[requiredItem];
            return (
                <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Col style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <Col style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}></Col>
                        <Card className="shadow border-0">
                            <CardHeader className="bg-transparent">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <h1>
                                        <div style={{ textAlign: 'center' }}>
                                            <h1>Contract Management - Service Order</h1>
                                        </div>
                                    </h1>
                                </div>
                                <div className="btn-wrapper text-center"></div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <div>
                                    <div>
                                        {count === 0 ? (
                                            <>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#exampleAddModal" onClick={() => handleShow(projectid, contractid)}>
                                                    <FcPlus />
                                                    Add
                                                </button>
                                                <p>There are no business partners in the database.</p>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn btn-success" data-toggle="modal" data-target="#exampleAddModal" onClick={() => handleShow(projectid, contractid)}>
                                                    <FcPlus />
                                                    Add
                                                </button>
                                                <div style={{ textAlign: 'center' }}>
                                                    <SearchBox value={searchQuery} onChange={handleSearch} />
                                                </div>
                                                <div className="table-responsive mb-5">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Description</th>
                                                                <th>Level</th>
                                                                <th>Amount</th>
                                                                <th>Status</th>
                                                                <th>Update</th>
                                                                <th>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>{brochure}</tbody>
                                                    </table>
                                                </div>
                                                {/** 
                            <AddModal projectid={projectid} contractid={contractid} />
                            <Modal
                              serviceorderid={requiredItemData.serviceorderid}
                              damagedlevel={requiredItemData.damagedlevel}
                              serviceorderdescription={requiredItemData.serviceorderdescription}
                              projectid={requiredItemData.projectid}
                              contractid={requiredItemData.contractid}
                              amount={requiredItemData.amount}
                              saveModalDetails={saveModalDetails}
                            />
                            */}
                                            </>
                                        )}
                                        <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            );
        }
    };

    //------------------------------------------------------------------------------------------------END Main Content
    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden  ''}`}></div>
                <div
                    className={`panel xl:block p-4 dark:gray-50 w-[350px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden ${''}`}
                >
                    <div className="flex flex-col h-full pb-16">
                        <div className="pb-3">
                            <button className="btn btn-primary w-full" type="button">
                                <small>Contract Management</small>
                            </button>
                        </div>

                        <div>
                            <TreeView data={transformedData} fetchChildren={fetchChildren} />
                            <ToastContainer />
                        </div>
                    </div>
                </div>

                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    {typename === 'fiscalYear' && <BusinessPaterners />}
                    {typename === 'contractType' && <Project />}
                    {typename === 'contractMode' && <Project />}
                    {typename === 'projectMode' && <Contract />}
                    {typename === 'serviceorder' && <Serviceorder />}
                </div>
            </div>
        </div>
    );
};

export default Mailbox;
