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
import AddContractModal from './addContractModal';
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

import * as FisclaYearData from '../../services/RMFPlanning/fiscalYearService';
import { MdPermContactCalendar, MdManageAccounts, MdOutlineAddRoad, MdMergeType } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa';
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
import UpdateProjectModal from './updateContractModal';
import ViewProjectModal from './contractviewModal';
import * as UpdateFiscalYearModal from '../../components/ContractManagemenrt/ContractSettings/contracttype/modal';
import * as AddRoadModal from '../../components/ContractManagemenrt/ContractSettings/project/addroleModal';
import * as UpdateRoadModal from '../../components/ContractManagemenrt/ContractSettings/project/updateModal';
import * as ViewRoadModal from '../../components/ContractManagemenrt/ContractSettings/project/modal';
//import * as AddContractModal from '../../components/ContractManagemenrt/ContractSettings/contract/addroleModal';
import * as UpdateContractModal from '../../components/ContractManagemenrt/ContractSettings/contract/addroleModal';
import * as AddServiceorderModal from '../../components/ContractManagemenrt/ContractSettings/contract/addroleModal';
import * as UpdateServiceorderModal from '../../components/ContractManagemenrt/ContractSettings/contract/addroleModal';

import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import _ from 'lodash';
import AddServiceOrderModal from './addServiceOrderModal';
import UpdateServiceOrderModal from './UpdateServiceOrderModal';
import * as ServiceOrderService from '../../services/ContractManagement/ContractSetting/serviceOrdersServices';

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
            } else if (node.type == 'contractType') {
                setcontractType(node.id);
            } else if (node.type == 'contractMode') {
                setcontractType(node.id);
            } else if (node.type == 'projectMode') {
                setcontractMode(node.id);
            } else if (node.type == 'serviceorder') {
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
            const response = await Projectdata.getprojectsbyfiscalyearcontracttypem(node.ids);
            {
                /** 
            return response.data.map((item) => ({
                id: item.projectid,
                name: 'Road : ' + item.roadname,
                type: 'contractMode',
            }));
            */
            }
            return response.data
                .filter((item) => item.cancreateserviceorder === true)
                .map((item) => ({
                    id: item.contractid,
                    name: 'Service Order for - Contract RefNo ' + item.contractrefnumber + '(' + item.contractmode + ')',
                    type: 'serviceorder',
                }));
            //------------------------------------------------------------------------------------------------END Fetch Project
        }
        {
            /** 
         else if (node.type === 'contractType') {
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
        }*/
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

    //------------------------------------------------------------------------------------------------------------------------

    //------------------------------------------------------------------------------------------------Main Content

    const BusinessPaterners = () => {
        const location = useLocation();
        const [fiscalyearid, setFiscalyearid] = useState(0);
        const [fiscalyearids, setFiscalyearids] = useState(0);
        const [sources, setSources] = useState([]);
        const [business, setBusiness] = useState([]);
        const [contracttypes, setcontracttypes] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize] = useState(4);
        const [requiredItem, setRequiredItem] = useState(0);
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedrole, setSelectedrole] = useState(null);
        const [fiscalyearcontracttypesid, setFiscalyearcontracttypeid] = useState(0);
        const [fiscalyear, setFiscalyear] = useState('');
        const [contracttypename, setContracttypename] = useState('');

        const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

        //------------------------------------Modals

        const [showModalAddFiscalyear, setshowModalAddFiscalyear] = useState(false);
        const [showModalUpdateFiscalyear, setshowModalUpdateFiscalyear] = useState(false);
        const toggleModalAddFiscalyear = () => {
            //this.setState(prevState => ({ showModalAddFiscalyear: !prevState.showModalAddFiscalyear }));
            setshowModalAddFiscalyear(!showModalAddFiscalyear);
        };
        const toggleModalUpdateFiscalyear = () => {
            //this.setState(prevState => ({ showModalAddFiscalyear: !prevState.showModalAddFiscalyear }));
            setshowModalUpdateFiscalyear(!showModalUpdateFiscalyear);
        };
        const handleShowModalAddFiscalyear = () => setshowModalAddFiscalyear(!showModalAddFiscalyear);
        const handleCloseModalAddFiscalyear = () => setshowModalAddFiscalyear(!showModalAddFiscalyear);

        const handleShowModalUpdateFiscalyear = (fiscalyearcontracttypeid, fiscalyear, contracttypename) => {
            setFiscalyearcontracttypeid(fiscalyearcontracttypeid);
            setFiscalyear(fiscalyear);
            setContracttypename(contracttypename);
            setshowModalUpdateFiscalyear(!showModalUpdateFiscalyear);
        };
        const handleCloseModalUpdateFiscalyear = () => setshowModalUpdateFiscalyear(!showModalUpdateFiscalyear);
        {
            /** 
        const replaceModalItem = (index) => {
            setRequiredItem(index);
        };
        */
        }
        //-------------------------------------------------------------------------------------------------------------------------------------
        const refreshData = async () => {
            fetchData();
        };

        const deleteItem = async (fiscalyearcontracttypeid) => {
            try {
                if (!fiscalyearcontracttypeid) {
                    toast.info('The Institution Partner you selected does not exist');
                } else {
                    await FiscalYearContractType.deletefiscalyearcontracttype(fiscalyearcontracttypeid);
                    toast.success('This fiscal year contract type has been deleted successfully');
                    await fetchData();
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('Error: ' + ex.response.data);
                } else if (ex.response && ex.response.status === 409) {
                    toast.error('Error: ' + ex.response.data);
                } else {
                    toast.error('An Error Occurred, while saving Institution Partner. Please try again later.' + ex);
                }
            }
        };
        const handleSaveUpdate = async () => {
            try {
                //await FiscalYearContractType.addfiscalyearcontracttype(fiscalyearcontracttypesid, fiscalYearid, contracttypeid);

                toast.success(
                    `Business Paterner with   has been updated successful:fiscalyearcontracttypeid:${fiscalyearcontracttypesid} ,fiscalyearids: ${fiscalYearid},contracttypeid: ${contracttypeid} `
                );

                setshowModalUpdateFiscalyear(!showModalUpdateFiscalyear);
                await refreshData();

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
                    toast.error('An Error Occured, while saving role Please try again later' + ex);
                }
            }
        };
        const handleSave = async () => {
            try {
                await FiscalYearContractType.addfiscalyearcontracttype(fiscalyearcontracttypesid, fiscalYearid, contracttypeid);
                toast.success(
                    `Business Paterner with   has been updated successful:fiscalyearcontracttypeid:${fiscalyearcontracttypeid} ,fiscalyearids: ${fiscalYearid},contracttypeid: ${contracttypeid} `
                );
                setshowModalAddFiscalyear(!showModalAddFiscalyear);
                await refreshData();
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
                    toast.error('An Error Occured, while saving role Please try again later' + ex);
                }
            }
        };

        //---------------------------------------------------------------------------------------------------------------------------------------
        const fetchData = async () => {
            try {
                const businessResponse = await FiscalYearContractType.getfiscalyearcontracttypeByfiscalyearId(fYid);

                if (!businessResponse.data) {
                    return toast.error('An Error Occurred, data fetching ...');
                } else {
                    setBusiness(businessResponse.data);
                }
                const { data: contracttypes } = await ContractType.getcontracttypes();
                if (!contracttypes) {
                    return toast.error('An Error Occurred, contracttypes data fetching ... ');
                } else {
                    setcontracttypes(contracttypes);
                }
            } catch (ex) {
                toast.error('An Error Occurred, while fetching fiscalYear data. Please try again later.' + ex);
            }
        };
        useEffect(() => {
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
                filtered = business.filter(
                    (m) =>
                        m.fiscalyear.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.contracttypename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.cancreateserviceorder.toString().toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.islocked.toString().toLowerCase().startsWith(searchQuery.toLowerCase())
                );
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

        const [contracttypeid, setcontracttypeid] = useState(0);
        const [fiscalyearcontracttypeid, setfiscalyearcontracttypeid] = useState(0);

        return (
            <div className="table-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Col style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Card className="shadow border-0">
                        <CardHeader className="bg-transparent card-header ">
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
                                    {' '}
                                    <div className="table-controls">
                                        <button className="btn btn-success" onClick={handleShowModalAddFiscalyear}>
                                            <FcPlus /> AddNew
                                        </button>
                                    </div>
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
                                                            <input type="hidden" className="form-control" name="fiscalyearid" id="fiscalyearid" value={fiscalyearid} />
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
                                                                            <option value={contracttypeid}>{contracttypename}</option>
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
                                                    handleSave();
                                                }}
                                            >
                                                Save
                                            </button>{' '}
                                            <Button variant="secondary" onClick={handleShowModalAddFiscalyear}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    <p className="no-data-message">There are no Contract Type in the database.</p>
                                </>
                            )}
                            {totalCount !== 0 && (
                                <>
                                    {' '}
                                    <div className="table-controls">
                                        <button className="btn btn-success" onClick={handleShowModalAddFiscalyear}>
                                            <FcPlus /> AddNew
                                        </button>
                                    </div>
                                    <Modal show={showModalAddFiscalyear} onHide={handleCloseModalAddFiscalyear}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Add Contract Types </Modal.Title>
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
                                                            <input type="hidden" className="form-control" name="fiscalyearid" id="fiscalyearid" value={fiscalyearid} />
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
                                                    handleSave();
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
                                    <div className="responsive-table mb-5">
                                        <table className="styled-table">
                                            <thead>
                                                <tr>
                                                    <th>Fiscalyear</th>
                                                    <th>IsAcive</th>
                                                    <th>Contracttypename</th>
                                                    <th>Cancreateserviceorder</th>
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
                                                            <button
                                                                className="btn btn-primary"
                                                                data-toggle="modal"
                                                                data-target="#exampleModal"
                                                                onClick={() => handleShowModalUpdateFiscalyear(business.fiscalyearcontracttypeid, business.fiscalyear, business.contracttypename)}
                                                            >
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

                                        <Modal show={showModalUpdateFiscalyear} onHide={handleCloseModalUpdateFiscalyear}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Update Contract Type </Modal.Title>
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
                                                                    value={fiscalyearcontracttypesid}
                                                                    onChange={(e) => setfiscalyearcontracttypeid(e.target.value)}
                                                                />
                                                                <input type="hidden" className="form-control" name="fiscalyearid" id="fiscalyearid" value={fiscalyearid} />
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
                                                                            <select
                                                                                name="contracttypeid "
                                                                                id="contracttypeid"
                                                                                className="form-control"
                                                                                onChange={(e) => setcontracttypeid(e.target.value)}
                                                                            >
                                                                                <option value={contracttypeid}>{contracttypename}</option>
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
                                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleSaveUpdate()}>
                                                    Save
                                                </button>{' '}
                                                <Button variant="secondary" onClick={handleShowModalUpdateFiscalyear}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
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
        const [modalOpen, setModalOpen] = useState(false);

        const handleViewClick = (project) => {
            setSelectedProject(project);
            setModalOpen(true);
            //console.log(`${JSON.stringify(project)}`)
        };

        const toggleModal = () => {
            setModalOpen(!modalOpen);
        };
        const [fiscalyearcontracttypeid, setFiscalyearcontracttypeid] = useState(0);
        const [business, setBusiness] = useState([]);
        const [aggreg, setAggreg] = useState([]);
        const [sources, setSources] = useState([]);
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize] = useState(6);
        const [requiredItem, setRequiredItem] = useState(0);
        const [searchQuery, setSearchQuery] = useState('');
        const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });

        //--------------------------------------------------------------------------------------
        const [showModalAddContract, setshowModalAddContract] = useState(false);
        const [showModalUpdateContract, setshowModalUpdateContract] = useState(false);
        const [showUpdateModal, setShowUpdateModal] = useState(false);
        const [selectedProject, setSelectedProject] = useState(null);
        //--------------------------------------------------------------------------------------
        const handleUpdateProject = async (updatedData) => {
            try {
                // await Projectdata.updateproject(updatedData);
                // Refresh the data
                const { data: business } = await Projectdata.getprojectsbyfiscalyearcontracttypeid(contractType);
                setBusiness(business);
                toast.success('Project updated successfully');
                setShowUpdateModal(false);
            } catch (ex) {
                toast.error('Error updating project: ' + ex.message);
            }
        };
        // Modify your Update button click handler
        const handleUpdateClick = (project) => {
            setSelectedProject(project);
            setShowUpdateModal(true);
            //toast.info(`${JSON.stringify(project)}`)
            //console.log(`${JSON.stringify(project)}`)
        };
        //--------------------------------------------------------------------------------------

        const toggleModalAddContract = () => {
            //this.setState(prevState => ({ showModalAddFiscalyear: !prevState.showModalAddFiscalyear }));
            setshowModalAddContract(!showModalAddContract);
        };
        const toggleModalUpdateContract = () => {
            //this.setState(prevState => ({ showModalAddFiscalyear: !prevState.showModalAddFiscalyear }));
            setshowModalUpdateContract(!showModalUpdateContract);
        };
        const handleShowModalAddContract = () => setshowModalAddContract(!showModalAddContract);
        const handleCloseModalAddContract = () => setshowModalAddContract(!showModalAddContract);

        const handleShowModalUpdateContract = () => {};
        const handleCloseModalUpdateContract = () => setshowModalUpdateContract(!showModalUpdateContract);
        ////------------------------------------------------------------------------------------

        //---------------------------modal fx
        // Main contract form state
        const [formData, setFormData] = useState({
            title: '',
            amount: '0.00',
            status: 'Pending',
            startDate: null,
            endDate: null,
            description: '',
            contractor: '',
            supervisionContracts: [],
        });

        // Supervision contract state
        const [showSupervisionForm, setShowSupervisionForm] = useState(false);
        const [currentSupervisionContract, setCurrentSupervisionContract] = useState({
            company: '',
            amount: '',
            startDate: null,
            endDate: null,
            description: '',
            teamMembers: [],
        });

        // Team member state
        const [newTeamMember, setNewTeamMember] = useState({
            name: '',
            role: 'Inspector',
        });
        const [showAddTeamForm, setShowAddTeamForm] = useState(false);

        // Handle main form changes
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        // Handle supervision form changes
        const handleSupervisionChange = (e) => {
            const { name, value } = e.target;
            setCurrentSupervisionContract((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        // Handle date changes
        const handleDateChange = (date, field) => {
            setFormData((prev) => ({
                ...prev,
                [field]: date,
            }));
        };

        const handleSupervisionDateChange = (date, field) => {
            setCurrentSupervisionContract((prev) => ({
                ...prev,
                [field]: date,
            }));
        };

        // Handle team member changes
        const handleTeamMemberChange = (e) => {
            const { name, value } = e.target;
            setNewTeamMember((prev) => ({
                ...prev,
                [name]: value,
            }));
        };

        // Add a new supervision contract
        const handleAddSupervisionContract = () => {
            if (currentSupervisionContract.company.trim()) {
                setFormData((prev) => ({
                    ...prev,
                    supervisionContracts: [...prev.supervisionContracts, currentSupervisionContract],
                }));
                setCurrentSupervisionContract({
                    company: '',
                    amount: '',
                    startDate: null,
                    endDate: null,
                    description: '',
                    teamMembers: [],
                });
                setShowSupervisionForm(false);
            }
        };

        // Remove a supervision contract
        const handleRemoveSupervisionContract = (index) => {
            setFormData((prev) => ({
                ...prev,
                supervisionContracts: prev.supervisionContracts.filter((_, i) => i !== index),
            }));
        };

        // Add a new team member
        const handleAddTeamMember = () => {
            if (newTeamMember.name.trim()) {
                setCurrentSupervisionContract((prev) => ({
                    ...prev,
                    teamMembers: [
                        ...prev.teamMembers,
                        {
                            id: Date.now(),
                            name: newTeamMember.name,
                            role: newTeamMember.role,
                        },
                    ],
                }));
                setNewTeamMember({ name: '', role: 'Inspector' });
                setShowAddTeamForm(false);
            }
        };

        // Remove a team member
        const handleRemoveTeamMember = (id) => {
            setCurrentSupervisionContract((prev) => ({
                ...prev,
                teamMembers: prev.teamMembers.filter((member) => member.id !== id),
            }));
        };

        // Form submission
        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
            onHide();
        };

        //-------------------------------------
        useEffect(() => {
            const fetchData = async () => {
                try {
                    //const [aggreg, setAggreg] = useState([]);
                    const { data: business } = await Projectdata.getprojectsbyfiscalyearcontracttypeid(contractType);
                    const { data: aggreg } = await Projectdata.getprojectsAggregates(contractType);

                    //return toast.error('An Error Occurred, data fetching ...' +JSON.stringify(aggreg));
                    if (!business) {
                        return toast.error('An Error Occurred, data fetching ...');
                    } else {
                        setBusiness(business);
                        setAggreg(aggreg[0]);
                        //return toast.info(`....${JSON.stringify(business) }`);
                    }
                    refreshProjects();
                } catch (ex) {
                    return toast.error('An Error Occurred while fetching business data. Please try again later.' + ex);
                }
            };

            fetchData();
        }, []);

        const refreshProjects = async () => {
            try {
                const { data: business } = await Projectdata.getprojectsbyfiscalyearcontracttypeid(contractType);
                setBusiness(business);
            } catch (ex) {
                toast.error('Error refreshing projects: ' + ex.message);
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

        const deleteItem = async (contractid) => {
            try {
                if (!contractid) {
                    toast.info(`The project you selected does not exist.`);
                } else {
                    await Projectdata.deleteproject(contractid);
                    toast.success(`This project has been deleted successfully.`);
                    setBusiness(business.filter((b) => b.contractid !== contractid));
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
        const [showAddcontractModal, setShowAddcontractModal] = useState(false);
        const [modalProductData, setModalProductData] = useState({
            revenuproductid: 0,
            fiscalyearcontracttypeid: 0,
            revenuproductname: '',
            currencyid: 0,
            currencyname: '',
            activeon: '',
        });

        // Handler to open the modal
        const handleOpenAddroleModal = () => {
            setShowAddcontractModal(true);
        };

        // Handler to close the modal
        const handleCloseAddroleModal = () => {
            setShowAddcontractModal(false);
        };

        const { totalCount, data: paginatedBusiness } = getPagedData();
        const requiredItemData = business[requiredItem];

        return (
            <div className="d-flex justify-content-center align-items-center align-items-start">
                <Col className="text-center" style={{ maxWidth: '800px', width: '100%' }}>
                    <Card className="shadow border-0">
                        <CardHeader className="card-header bg-transparent">
                            <div className="text-center">
                                <h1>Contract Settings - Road Contract</h1>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {/* Aggregates dashboard */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-3 ">
                                    <div className="card text-center shadow-sm mx-2 " style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Contract Type</h6>
                                            <p className="card-text">{aggreg.projecttypename || ''}</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm  mx-2 " style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Execution Contracts </h6>
                                            <p className="card-text">{aggreg.total_contracts || 0}</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm  mx-2 " style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Supervision contract</h6>
                                            <p className="card-text">{aggreg.total_supervision_contracts || 0}</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm  mx-2 " style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Budget for Execution</h6>
                                            <p className="card-text">{aggreg.total_budget || 0}%</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm  mx-2 " style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Budget for supervision</h6>
                                            <p className="card-text">{aggreg.total_evaluation_budget || 0}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {totalCount === 0 ? (
                                <>
                                    <div className="table-controls">
                                        <button
                                            className="btn btn-info"
                                            onClick={() => {
                                                setModalProductData({
                                                    projectid: business.projectid,
                                                    fiscalyearcontracttypeid: contractType,
                                                    revenuproductname: business.roadname,
                                                    currencyid: 1,
                                                    currencyname: 'USD',
                                                    activeon: new Date().toISOString(),
                                                });
                                                handleOpenAddroleModal();
                                            }}
                                        >
                                            <FcPlus /> Add New
                                        </button>
                                        <AddContractModal
                                            show={showAddcontractModal}
                                            onClose={handleCloseAddroleModal}
                                            revenuproductid={modalProductData.revenuproductid}
                                            revenuproductname={modalProductData.revenuproductname}
                                            currencyid={modalProductData.currencyid}
                                            currencyname={modalProductData.currencyname}
                                            fiscalyearcontracttypeid={contractType}
                                            activeon={modalProductData.activeon}
                                            onSave={() => {
                                                refreshProjects();
                                                handleCloseAddroleModal();
                                                toast.success('Contract added successfully');
                                            }}
                                        />
                                    </div>
                                    <p>There are no Business Partners in the database.</p>
                                </>
                            ) : (
                                <>
                                    <div className="table-controls">
                                        <button
                                            className="btn btn-info"
                                            onClick={() => {
                                                setModalProductData({
                                                    projectid: business.projectid,
                                                    fiscalyearcontracttypeid: contractType,
                                                    revenuproductname: business.roadname,
                                                    currencyid: 1,
                                                    currencyname: 'USD',
                                                    activeon: new Date().toISOString(),
                                                });
                                                handleOpenAddroleModal();
                                            }}
                                        >
                                            <FcPlus /> Add New
                                        </button>
                                        <SearchBox value={searchQuery} onChange={handleSearch} />
                                    </div>

                                    <AddContractModal
                                        show={showAddcontractModal}
                                        onClose={handleCloseAddroleModal}
                                        revenuproductid={modalProductData.revenuproductid}
                                        revenuproductname={modalProductData.revenuproductname}
                                        currencyid={modalProductData.currencyid}
                                        currencyname={modalProductData.currencyname}
                                        fiscalyearcontracttypeid={contractType}
                                        activeon={modalProductData.activeon}
                                        onSave={() => {
                                            refreshProjects();
                                            handleCloseAddroleModal();
                                            toast.success('Contract added successfully');
                                        }}
                                    />

                                    <div className="table-container">
                                        <div className="responsive-table">
                                            <table className="styled-table">
                                                <thead>
                                                    <tr>
                                                        <th>Road Name</th>
                                                        <th>Contract Amount</th>
                                                        <th>Project Length</th>
                                                        <th>Status</th>
                                                        <th>Update</th>
                                                        <th>Delete</th>
                                                        <th>Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {paginatedBusiness.map((business, index) => (
                                                        <tr key={business.contractid}>
                                                            <td>{business.roadname}</td>
                                                            <td>{business.contractbudget}</td>
                                                            <td>{business.contractlength + ' ' + business.measurementname}</td>
                                                            <td>{business.status}</td>
                                                            <td>
                                                                <button className="btn btn-primary" onClick={() => handleUpdateClick(business)}>
                                                                    <AiFillEdit /> Update
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button className="btn btn-danger" onClick={() => deleteItem(business.contractid)}>
                                                                    <AiFillDelete /> Delete
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <td>
                                                                    <button className="btn btn-info" onClick={() => handleViewClick(business)} title="View Details">
                                                                        <MdOutlineVisibility /> View
                                                                    </button>
                                                                </td>
                                                            </td>
                                                            {/** 
                                                            { business.cancreateserviceorder && (
                                                                <td>
                                                                <button className="btn btn-info" onClick={() => handleViewClick(business)} title="Service Order">
                                                                    <FaClipboardList style={{ marginRight: '5px' }} />
                                                                    Service Order
                                                                </button>
                                                            </td>

                                                            ) } */}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <ViewProjectModal isOpen={modalOpen} toggle={toggleModal} projectData={selectedProject} />
                                        {/* Add Pagination Here */}
                                        <div className="pagination-container mt-3 d-flex justify-content-center">
                                            <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardBody>
                    </Card>
                </Col>
                {selectedProject && (
                    <UpdateProjectModal
                        show={showUpdateModal}
                        onClose={() => setShowUpdateModal(false)}
                        projectData={selectedProject}
                        onUpdate={() => {
                            refreshProjects();
                            setShowUpdateModal(false);
                            toast.success('Contract updated successfully');
                        }}
                    />
                )}
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
            pageSize: 15,
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
                                                <table className="styled-table">
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
        const [serviceorders, setServiceOrders] = useState([]);
        const [aggregates, setAggregates] = useState({});
        const [currentPage, setCurrentPage] = useState(1);
        const [pageSize] = useState(5);
        const [searchQuery, setSearchQuery] = useState('');
        const [sortColumn, setSortColumn] = useState({ path: 'description', order: 'asc' });
        const [showModalAdd, setShowModalAdd] = useState(false);
        const [showModalUpdate, setShowModalUpdate] = useState(false);
        const [selectedOrder, setSelectedOrder] = useState(null);

        // Fetch data on mount
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const results = await ServiceOrderService.getServiceOrders(contractType);
                    const result = await ServiceOrderService.getServiceOrdersWithAggregates(contractType);
                    //toast.error('........service' + JSON.stringify(contractType));
                    if (results) {
                        setServiceOrders(results || []);
                        setAggregates(result || {});
                    } else {
                        toast.error('No service orders found.');
                    }
                } catch (ex) {
                    toast.error('Failed to load service orders.' + ex);
                }
            };

            fetchData();
        }, []);

        const populateServiceOrders = async () => {
            try {
                const contractfiscalyearid = 71;
                const result = await ServiceOrderService.getServiceOrdersWithAggregates(contractfiscalyearid);
                const results = await ServiceOrderService.getServiceOrders(contractfiscalyearid);

                if (results) {
                    setServiceOrders(results || []);
                    setAggregates(result || {});
                } else {
                    toast.error('No service orders found.');
                }
            } catch (ex) {
                toast.error('Failed to load service orders.' + ex);
            }
        };

        const toggleModalAdd = () => setShowModalAdd(!showModalAdd);

        const toggleModalUpdateOpen = (order) => {
            setShowModalUpdate(true);
            setSelectedOrder(order);
        };

        const toggleModalUpdateClose = () => {
            setShowModalUpdate(false);
            setSelectedOrder(null);
        };

        const handlePageChange = (page) => setCurrentPage(page);

        const handleSearch = (query) => {
            setSearchQuery(query);
            setCurrentPage(1);
        };

        const getPagedData = () => {
            let filtered = serviceorders;

            if (searchQuery) {
                filtered = serviceorders.filter((o) => o.description.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
            const paginated = paginate(sorted, currentPage, pageSize);

            return { totalCount: filtered.length, data: paginated };
        };

        const replaceModalItem = (index) => {
            setRequiredItem(index);
        };
        const saveModalDetails = (serviceorders) => {
            const updatedBusiness = [...serviceorders];
            updatedBusiness[requiredItem] = serviceorders;
            setBusiness(updatedBusiness);
        };

        const handleDelete = async (serviceorderid) => {
            try {
                await ServiceOrderService.deleteServiceOrder(serviceorderid);
                toast.success('Service order deleted successfully.');
                await populateServiceOrders();
            } catch (ex) {
                toast.error('Error deleting service order.');
            }
        };
        const { totalCount, data: paginatedOrders } = getPagedData();

        const { length: count } = serviceorders;
        return (
            <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Col style={{ textAlign: 'center' }}>
                    <Card className="shadow border-0">
                        <CardHeader className="bg-transparent">
                            <Button color="success" onClick={toggleModalAdd}>
                                <FcPlus /> Add Service Order
                            </Button>
                        </CardHeader>

                        <CardBody className="px-lg-5 py-lg-5">
                            {/* Aggregates dashboard */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="card text-center shadow-sm p-2 mx-2" style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Total Orders</h6>
                                            <p className="card-text fs-4">{aggregates.serviceordercount || 0}</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm p-2 mx-2" style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Planned Budget</h6>
                                            <p className="card-text fs-4">{aggregates.totalplannedbudget || 0}</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm p-2 mx-2" style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Actual Cost</h6>
                                            <p className="card-text fs-4">{aggregates.totalactualcost || 0}</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm p-2 mx-2" style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Avg Progress</h6>
                                            <p className="card-text fs-4">{aggregates.avgprogress || 0}%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Search */}
                            <div style={{ textAlign: 'center' }}>
                                <SearchBox value={searchQuery} onChange={handleSearch} />
                            </div>

                            {/* Table */}
                            <div className="table-responsive mb-5">
                                <table className="table table-striped table-hover align-middle">
                                    <thead className="table-dark text-center">
                                        <tr>
                                            <th>ID</th>
                                            <th>Description</th>
                                            <th>Contract</th>
                                            <th>Budget</th>
                                            <th>Cost</th>
                                            <th>Progress</th>
                                            <th>Status</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {paginatedOrders.map((o) => (
                                            <tr key={o.serviceorderid}>
                                                <td>{o.serviceorderid}</td>
                                                <td className="text-start">{o.description}</td>
                                                <td>{o.roadname}</td>
                                                <td>{o.plannedbudget}</td>
                                                <td>{o.actualcost}</td>
                                                <td>{o.progresspercent}%</td>
                                                <td>{o.status}</td>
                                                <td>
                                                    <Button color="primary" size="sm" onClick={() => toggleModalUpdateOpen(o)} className="d-flex align-items-center">
                                                        <AiFillEdit className="me-1" /> Update
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button color="danger" size="sm" onClick={() => handleDelete(o.serviceorderid)} className="d-flex align-items-center">
                                                        <AiFillDelete className="me-1" /> Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {showModalAdd && (
                                    <AddServiceOrderModal
                                        isOpen={showModalAdd}
                                        toggle={toggleModalAdd}
                                        refresh={populateServiceOrders}
                                        contractType={contractType} // 👈 pass contractType down
                                    />
                                )}

                                {showModalUpdate && selectedOrder && (
                                    <UpdateServiceOrderModal isOpen={showModalUpdate} toggle={toggleModalUpdateClose} refresh={populateServiceOrders} selectedOrder={selectedOrder} />
                                )}
                            </div>

                            {/* Pagination */}
                            <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    };

    //------------------------------------------------------------------------------------------------END Main Content
    return (
        <div className="mailbox-container h-screen flex flex-col">
            <div className="mailbox-layout flex flex-1 overflow-hidden flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="sidebar-panel w-full md:w-64 bg-gray-100 border-r border-gray-200 flex flex-col h-full">
                    <div className="sidebar-header p-4 border-b border-gray-200">
                        <button className="btn btn-primary w-full text-sm">Contract Management</button>
                    </div>
                    <div className="sidebar-content overflow-y-auto p-4 flex-1">
                        <TreeView data={transformedData} fetchChildren={fetchChildren} />
                        <ToastContainer />
                    </div>
                </aside>

                {/* Content */}

                <main className="content-scrollable bg-white max-w-[1200px] w-full mx-auto overflow-x-auto">
                    <div className="responsive-table">
                        {typename === 'fiscalYear' && <BusinessPaterners />}
                        {typename === 'contractType' && <Project />}
                        {typename === 'contractMode' && <Project />}
                        {typename === 'projectMode' && <Contract />}
                        {typename === 'serviceorder' && <Serviceorder />}
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
    max-height: 80vh;
}

/* Ensure modal dialog size */
.custommodal .modal-dialog {
    max-width: 90%;  /* Adjust width */
    width: 80%;      /* Adjust width */
    margin: 30px auto; /* Optional: adds margin for centering */
}

/* Custom modal sizing */
.modal-90w {
  max-width: 9200px;
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
  width: 250px;
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
