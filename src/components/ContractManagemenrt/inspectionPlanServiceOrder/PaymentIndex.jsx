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
import * as ServiceOrderData from "../../services/ContractManagement/ContractSetting/serviceOrdersService";


import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import _ from 'lodash';

//--------------------------
const PaymentIndex = () => {
    const location = useLocation();
    const [state, setState] = useState({
        sources: [],
        business: [],
        banks: [],
        currentPage: 1,
        pageSize: 4,
        requiredItem: 0,
        brochure: [],
        searchQuery: '',
        selectedrole: null,
        search: [],
        sortColumn: { path: 'title', order: 'asc' },
    });

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
            if (node.type=="fiscalYear"){ 
                setfYid(node.id);  
            }else  if (node.type=="contractType"){
                setcontractType(node.id)
                
            }else  if (node.type=="contractMode"){
             setcontractType(node.id)
            }else  if (node.type=="projectMode"){
                setcontractMode(node.id)
            }else  if (node.type=="serviceorder"){
                setcontract(node.id)
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
                    <br/>
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
                                Contract Payment
                            </button>
                        </div>

                        <div>
                            <TreeView data={transformedData} fetchChildren={fetchChildren} />
                            <ToastContainer />
                        </div>
                    </div>
                </div>

                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                     
                
                </div>
            </div>
        </div>
    );
};

export default PaymentIndex;
