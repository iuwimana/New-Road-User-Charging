import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropdown from '../../Dropdown';
import Swal from 'sweetalert2';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { FaSearch, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { setPageTitle } from '../../../store/themeConfigSlice';
import IconMail from '../../Icon/IconMail';
import IconStar from '../../Icon/IconStar';
import IconSend from '../../Icon/IconSend';
import IconInfoHexagon from '../../Icon/IconInfoHexagon';
import IconFile from '../../Icon/IconFile';
import IconTrashLines from '../../Icon/IconTrashLines';
import IconCaretDown from '../../Icon/IconCaretDown';
import IconArchive from '../../Icon/IconArchive';
import IconBookmark from '../../Icon/IconBookmark';
import IconVideo from '../../Icon/IconVideo';
import IconChartSquare from '../../Icon/IconChartSquare';
import IconUserPlus from '../../Icon/IconUserPlus';
import IconPlus from '../../Icon/IconPlus';
import IconRefresh from '../../Icon/IconRefresh';
import IconWheel from '../../Icon/IconWheel';
import IconHorizontalDots from '../../Icon/IconHorizontalDots';
import IconOpenBook from '../../Icon/IconOpenBook';
import IconBook from '../../Icon/IconBook';
import IconTrash from '../../Icon/IconTrash';
import IconRestore from '../../Icon/IconRestore';
import IconMenu from '../../Icon/IconMenu';
import IconSearch from '../../Icon/IconSearch';
import IconSettings from '../../Icon/IconSettings';
import IconHelpCircle from '../../Icon/IconHelpCircle';
import IconUser from '../../Icon/IconUser';
import IconMessage2 from '../../Icon/IconMessage2';
import IconUsers from '../../Icon/IconUsers';
import IconTag from '../../Icon/IconTag';
import IconPaperclip from '../../Icon/IconPaperclip';
import IconArrowLeft from '../../Icon/IconArrowLeft';
import IconPrinter from '../../Icon/IconPrinter';
import IconArrowBackward from '../../Icon/IconArrowBackward';
import IconArrowForward from '../../Icon/IconArrowForward';
import IconGallery from '../../Icon/IconGallery';
import IconFolder from '../../Icon/IconFolder';
import IconZipFile from '../../Icon/IconZipFile';
import IconDownload from '../../Icon/IconDownload';
import IconTxtFile from '../../Icon/IconTxtFile';
//---------------------------------------
import SearchBox from '../../../components/searchBox';
import { MdOutlineVisibility } from 'react-icons/md';
import Pagination from '../../../components/common/pagination';
import * as Source from '../../../services/RevenuRessources/sourceofFundsServices';
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
import ProjectMenu from '../../../components/Menu/projector';
import useOpenController from '../ContractSettings/contractor/Hooks/useOpenController';

import * as Contract from '../../../services/ContractManagement/ContractSetting/contractservice';

import * as UserAccessData from '../../../services/security/securableService';
import * as UserHeadData from '../../../services/security/userServices';

import { BiSubdirectoryRight } from 'react-icons/bi';
import * as ContractType from '../../../services/ContractManagement/ContractSetting/contractTypeService';
import { DiSqllite } from 'react-icons/di';
import { FaHandPointRight, FaCoins } from 'react-icons/fa';
import { GiLookAt, GiRoad } from 'react-icons/gi';
import auth from '../../../services/authService';
import { Modal, Button, OverlayTrigger, Tooltip, Row,Form } from 'react-bootstrap';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as FiscalYearContractType from '../../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice';
import * as Program from '../../../services/RMFPlanning/programServices';
import * as SubProgram from '../../../services/RMFPlanning/subProgramService';

import * as Outcome from '../../../services/RMFPlanning/outcomeService';
import * as OutputData from '../../../services/RMFPlanning/outputService';
import * as BaselineData from '../../../services/RMFPlanning/baselineServices';
import * as IndicatorData from '../../../services/RMFPlanning/indicatorService';
import * as TargetData from '../../../services/RMFPlanning/targetService';
import * as ActivityData from '../../../services/RMFPlanning/activityServices';
import * as SourceData from '../../../services/RMFPlanning/sourceoffundService';
import * as StakeholderData from '../../../services/RMFPlanning/stakeholderService';
import * as Projectdata from '../../../services/ContractManagement/ContractSetting/projectservice';
import * as Contracttype from '../../../components/ContractManagemenrt/ContractSettings/contracttype/contracttype';

import ContractTypeMenu from '../../Menu/contracttype';
import ContractTypeMenuinspection from '../../MenuInspection/contracttype';
import ContractTypeMenupayment from '../../MenuPayment/contracttype';
import * as ContractModeData from '../../../services/ContractManagement/ContractSetting/contractmodeservices';
import * as ContractData from '../../../services/ContractManagement/ContractSetting/contractservice';

//------------
import * as ServiceOrderData from '../../../services/ContractManagement/ContractSetting/serviceOrdersService';

import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import _ from 'lodash';
import { motion, AnimatePresence } from "framer-motion";
import { FcInspection } from "react-icons/fc";
import AddProgramModal from './addProgramModal';
import ViewProgramModal from './viewProgramModal';
import UpdateProgramModal from './UpdateprogramModal';
import AddSubProgramModal from './AddSubProgramModal';
import ViewSubProgramModal from './ViewSubProgramModal';
import UpdateSubProgramModal from './UpdateSubProgramModal';
import AddOutcomeModal from './AddOutcomeModal';
import ViewOutcomeModal from './ViewOutcomeModal';
import UpdateOutcomeModal from './UpdateOutcomeModal';
import AddOutputModal from './AddOutputModal ';
import ViewOutputModal from './ViewOutputModal';
import UpdateOutputModal from './UpdateOutputModal';
//import Output from '../Program/output';
import Output from './outputModal';
import OutputModalEnhanced from "./outputModal";
import "./OutputTable.css"; // optional styling file
import "./ContractForm.css"
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
    const [programid, setprogramid] = useState(0);
    const [outcomeid, setoutcomeid] = useState(0);
    const [outputid, setoutputid] = useState(0);
    const [activityid, setactivityid] = useState(0);
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
            settypename(node.type);
            // toast.info(`hello there ${node.type} and ${node.id}`);
            if (node.type == 'fiscalYear') {
                setfYid(node.id);
            } else if (node.type == 'program') {
                setprogramid(node.id);
            } else if (node.type == 'Subprogram') {
                setoutcomeid(node.id);
            } else if (node.type == 'outcome') {
                setoutputid(node.id);
            } else if (node.type == 'output') {
                setactivityid(node.id);
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
                    //toast.info(`.......${fiscalyear}`)
                    setFiscalYearid(fiscalyearsid);
                    //setfYid(node.id);
                    setFiscalYearname(fiscalyear);
                    setFiscalYear(fiscalyear);
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
        if (node.type === 'fiscalYear') {
            const response = await Program.getprogramByfiscalyearId(fiscalYearid);
            setfYid(node.id);
            return response.data.map((item) => ({
                ids: item.programid,
                id: item.programid,
                name: (
                    <div className="border-l-4 border-blue-500 bg-blue-50 p-2 rounded-md shadow-sm hover:bg-blue-100 transition-all">
                        <strong className="text-blue-700 text-lg">Program:</strong> <span className="font-medium text-gray-800">{item.programname}</span>
                    </div>
                ),
                type: 'program',
            }));
        } else if (node.type === 'program') {
            const response = await SubProgram.getsubprogramById(node.ids);
            return response.data.map((item) => ({
                id: item.subprogramid,
                name: (
                    <div className="border-l-4 border-green-500 bg-green-50 p-2 rounded-md shadow-sm hover:bg-green-100 transition-all">
                        <strong className="text-green-700 text-lg">Subprogram:</strong> <span className="font-medium text-gray-800">{item.subprogramname}</span>
                    </div>
                ),
                type: 'Subprogram',
            }));
        } else if (node.type === 'Subprogram') {
            const response = await Outcome.getoutcomeById(node.id);
            return response.data.map((item) => ({
                ids: item.outcomeid,
                id: item.outcomeid,
                name: (
                    <div className="border-l-4 border-yellow-500 bg-yellow-50 p-2 rounded-md shadow-sm hover:bg-yellow-100 transition-all">
                        <strong className="text-yellow-700 text-lg">Outcome:</strong> <span className="font-medium text-gray-800">{item.outcomename}</span>
                    </div>
                ),
                type: 'outcome',
            }));
        }
        {
            /** 
        else if (node.type === 'outcome') {
            const response = await OutputData.getoutputById(node.id);
            return response.data.map((item) => ({
                id: item.outputid,
                name: (
                    <div className="border-l-4 border-purple-500 bg-purple-50 p-2 rounded-md shadow-sm hover:bg-purple-100 transition-all">
                        <strong className="text-purple-700 text-lg">Output:</strong> <span className="font-medium text-gray-800">{item.outputname}</span>
                    </div>
                ),
                type: 'output',
            }));
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
        name: 'Programs for: ' + year.fiscalyear,
        type: 'fiscalYear',
    }));
    //------------------------------------------------------------------------------------------------ENDsidebar Menu
    //--------------------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------CRUD-----------------------------------------------------
    const Programs = () => {
        const [programs, setPrograms] = useState([]);
        const [filteredPrograms, setFilteredPrograms] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');

        // Modal control states
        const [showAdd, setShowAdd] = useState(false);
        const [showView, setShowView] = useState(false);
        const [showEdit, setShowEdit] = useState(false);
        const [selectedProgram, setSelectedProgram] = useState(null);

        useEffect(() => {
            fetchPrograms();
        }, []);

        const fetchPrograms = async () => {
            try {
                setIsLoading(true);
                const response = await Program.getprogramByfiscalyearId(fiscalYearid);
                setPrograms(response.data);
                setFilteredPrograms(response.data);
            } catch (err) {
                setError('Failed to fetch programs. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        // Search
        const handleSearch = (e) => {
            const value = e.target.value.toLowerCase();
            setSearchTerm(value);
            const filtered = programs.filter((p) => Object.values(p).some((val) => val && val.toString().toLowerCase().includes(value)));
            setFilteredPrograms(filtered);
        };

        // Modal handlers
        const handleView = (program) => {
            setSelectedProgram(program);
            setShowView(true);
        };

        const handleEdit = (program) => {
            setSelectedProgram(program);
            setShowEdit(true);
        };

        const handleDelete = async (id) => {
            if (window.confirm('Are you sure you want to delete this program?')) {
                try {
                    await Program.deleteprogram(id);
                    toast.success('Program deleted successfully!');
                    fetchPrograms();
                } catch {
                    toast.error('Failed to delete program.');
                }
            }
        };

        return (
            <div className="p-4 bg-white rounded-3 shadow-lg mt-4 border border-light">
                {/* Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-primary mb-2 mb-sm-0">
                        <i className="bi bi-kanban-fill me-2"></i>Programs List
                    </h5>

                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control form-control-sm shadow-sm"
                            style={{ width: '250px' }}
                            placeholder="🔍 Search program..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Button variant="primary" size="sm" className="shadow-sm" onClick={() => setShowAdd(true)}>
                            <i className="bi bi-plus-circle me-2"></i>Add Program
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle text-center shadow-sm">
                        <thead className="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Program Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="text-muted py-3">
                                        Loading programs...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="4" className="text-danger py-3">
                                        {error}
                                    </td>
                                </tr>
                            ) : filteredPrograms.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-muted py-3">
                                        No programs found.
                                    </td>
                                </tr>
                            ) : (
                                filteredPrograms.map((p, i) => (
                                    <tr key={p.programid}>
                                        <td>{i + 1}</td>
                                        <td className="fw-semibold">{p.programname}</td>
                                        <td>{p.description}</td>
                                        <td>
                                            <Button size="sm" variant="outline-success" className="me-1" onClick={() => handleView(p)}>
                                                <i className="bi bi-eye"></i>
                                            </Button>
                                            <Button size="sm" variant="outline-primary" className="me-1" onClick={() => handleEdit(p)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.programid)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <AddProgramModal show={showAdd} onHide={() => setShowAdd(false)} refresh={fetchPrograms} fiscalYearid={fiscalYearid} />
                <ViewProgramModal show={showView} onHide={() => setShowView(false)} program={selectedProgram} />
                <UpdateProgramModal show={showEdit} onHide={() => setShowEdit(false)} program={selectedProgram} refresh={fetchPrograms} fiscalYearid={fiscalYearid} />

                <ToastContainer position="bottom-right" autoClose={2500} />
            </div>
        );
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
    //------------------------------------------------------------------------------------------------------------------------

    const SubPrograms = ({ fiscalYearid }) => {
        const [subPrograms, setSubPrograms] = useState([]);
        const [filteredSubPrograms, setFilteredSubPrograms] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');

        // Modal control states
        const [showAdd, setShowAdd] = useState(false);
        const [showView, setShowView] = useState(false);
        const [showEdit, setShowEdit] = useState(false);
        const [selectedSubProgram, setSelectedSubProgram] = useState(null);

        useEffect(() => {
            fetchSubPrograms();
        }, []);

        const fetchSubPrograms = async () => {
            try {
                setIsLoading(true);
                const response = await SubProgram.getsubprogramById(programid);
                setSubPrograms(response.data);
                setFilteredSubPrograms(response.data);
            } catch (err) {
                setError('Failed to fetch subprograms. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        // Search
        const handleSearch = (e) => {
            const value = e.target.value.toLowerCase();
            setSearchTerm(value);
            const filtered = subPrograms.filter((sp) => Object.values(sp).some((val) => val && val.toString().toLowerCase().includes(value)));
            setFilteredSubPrograms(filtered);
        };

        // Modal handlers
        const handleView = (subProgram) => {
            setSelectedSubProgram(subProgram);
            setShowView(true);
        };

        const handleEdit = (subProgram) => {
            setSelectedSubProgram(subProgram);
            setShowEdit(true);
        };

        const handleDelete = async (id) => {
            if (window.confirm('Are you sure you want to delete this subprogram?')) {
                try {
                    await SubProgram.deletesubprogram(id);
                    toast.success('Subprogram deleted successfully!');
                    fetchSubPrograms();
                } catch {
                    toast.error('Failed to delete subprogram.');
                }
            }
        };

        return (
            <div className="p-4 bg-white rounded-3 shadow-lg mt-4 border border-light">
                {/* Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-primary mb-2 mb-sm-0">
                        <i className="bi bi-kanban-fill me-2"></i>SubPrograms List
                    </h5>

                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control form-control-sm shadow-sm"
                            style={{ width: '250px' }}
                            placeholder="🔍 Search subprogram..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Button variant="primary" size="sm" className="shadow-sm" onClick={() => setShowAdd(true)}>
                            <i className="bi bi-plus-circle me-2"></i>Add SubProgram
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle text-center shadow-sm">
                        <thead className="table-primary">
                            <tr>
                                <th></th>
                                <th>#</th>
                                <th>SubProgram Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="text-muted py-3">
                                        Loading subprograms...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="4" className="text-danger py-3">
                                        {error}
                                    </td>
                                </tr>
                            ) : filteredSubPrograms.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-muted py-3">
                                        No subprograms found.
                                    </td>
                                </tr>
                            ) : (
                                filteredSubPrograms.map((sp, i) => (
                                    <tr key={sp.subprogramid} className="table-row-subprogram">
                                        <td colSpan="2">
                                            <b className="text-primary">
                                                <FaHandPointRight className="me-2" />
                                                Subprogram #{i + 1}
                                            </b>
                                        </td>
                                        <td>{sp.subprogramname}</td>
                                        <td>{sp.subprogramdescription}</td>
                                        <td>
                                            <Button size="sm" variant="outline-success" className="me-1" onClick={() => handleView(sp)}>
                                                <i className="bi bi-eye"></i>
                                            </Button>
                                            <Button size="sm" variant="outline-primary" className="me-1" onClick={() => handleEdit(sp)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(sp.subprogramid)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Modals */}
                <AddSubProgramModal show={showAdd} onHide={() => setShowAdd(false)} refresh={fetchSubPrograms} fiscalYearid={programid} />
                <ViewSubProgramModal show={showView} onHide={() => setShowView(false)} subProgram={selectedSubProgram} />
                <UpdateSubProgramModal show={showEdit} onHide={() => setShowEdit(false)} subProgram={selectedSubProgram} refresh={fetchSubPrograms} fiscalYearid={programid} />

                <ToastContainer position="bottom-right" autoClose={2500} />
            </div>
        );
    };

    //------------------------------------------------------------------------------------------------------------------------

    const Outcomes = ({ fiscalYearId }) => {
        const [outcomes, setOutcomes] = useState([]);
        const [filteredOutcomes, setFilteredOutcomes] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');

        // Modal control
        const [showAdd, setShowAdd] = useState(false);
        const [showView, setShowView] = useState(false);
        const [showEdit, setShowEdit] = useState(false);
        const [selectedOutcome, setSelectedOutcome] = useState(null);

        useEffect(() => {
            fetchOutcomes();
        }, [fiscalYearId]);

        const fetchOutcomes = async () => {
            try {
                setIsLoading(true);
                const response = await Outcome.getoutcomeById(outcomeid);
                setOutcomes(response.data);
                setFilteredOutcomes(response.data);
            } catch (err) {
                setError('Failed to fetch outcomes. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        const handleSearch = (e) => {
            const value = e.target.value.toLowerCase();
            setSearchTerm(value);
            const filtered = outcomes.filter((o) => Object.values(o).some((val) => val && val.toString().toLowerCase().includes(value)));
            setFilteredOutcomes(filtered);
        };

        const handleView = (outcome) => {
            setSelectedOutcome(outcome);
            setShowView(true);
        };

        const handleEdit = (outcome) => {
            setSelectedOutcome(outcome);
            setShowEdit(true);
        };
        const handleShowAdd = () => setShowAdd(true);
        const handleCloseAdd = () => setShowAdd(false);

        const handleDelete = async (id) => {
            if (window.confirm('Are you sure you want to delete this outcome?')) {
                try {
                    await Outcome.deleteoutcome(id);
                    toast.success('Outcome deleted successfully!');
                    fetchOutcomes();
                } catch {
                    toast.error('Failed to delete outcome.');
                }
            }
        };

        return (
            <div className="p-4 bg-white rounded-3 shadow-sm mt-4 border border-light">
                {/* Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold text-primary mb-2 mb-sm-0">
                        <i className="bi bi-kanban-fill me-2"></i>Outcomes List
                    </h5>
                    <div className="d-flex gap-2">
                        <input
                            type="text"
                            className="form-control form-control-sm shadow-sm"
                            style={{ width: '250px' }}
                            placeholder="🔍 Search outcome..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}>
                            <i className="bi bi-plus-circle me-2"></i>Add Outcome
                        </Button>
                    </div>
                </div>
                {/* Table */}
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle text-center shadow-sm">
                        <thead className="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Outcome Name</th>
                                <th>Fiscal Year</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="text-muted py-3">
                                        Loading outcomes...
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan="5" className="text-danger py-3">
                                        {error}
                                    </td>
                                </tr>
                            ) : filteredOutcomes.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-muted py-3">
                                        No outcomes found.
                                    </td>
                                </tr>
                            ) : (
                                filteredOutcomes.map((o, index) => (
                                    <tr key={o.outcomeId} className="outcome-row">
                                        <td>{index + 1}</td>
                                        <td>
                                            <b className="text-primary">
                                                <FaHandPointRight className="me-2" />
                                                outcome
                                            </b>
                                        </td>
                                        <td>{o.outcomename}</td>
                                        <td>{o.outcomedescription}</td>
                                        <td>
                                            <Button size="sm" variant="outline-success" className="me-1" onClick={() => handleView(o)}>
                                                <i className="bi bi-eye"></i>
                                            </Button>
                                            <Button size="sm" variant="outline-primary" className="me-1" onClick={() => handleEdit(o)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            <Button size="sm" variant="outline-danger" onClick={() => handleDelete(o.outcomeId)}>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Modals */}
                <AddOutcomeModal show={showAdd} onHide={() => setShowAdd(false)} refresh={fetchOutcomes} subprogramid={outcomeid} fiscalYearId={fiscalYearid} />
                <ViewOutcomeModal show={showView} onHide={() => setShowView(false)} outcome={selectedOutcome} />
                fiscalYearid={fiscalYearid}
                <UpdateOutcomeModal show={showEdit} onHide={() => setShowEdit(false)} outcome={selectedOutcome} refresh={fetchOutcomes} subprogramid={outcomeid} fiscalYearId={fiscalYearid} />
                <ToastContainer position="bottom-right" autoClose={2500} />
            </div>
        );
    };

    //------------------------------------------------------------------------------------------------------------------------
    const OutputTable = () => {
    const [outputs, setOutputs] = useState([]);
    const [filteredOutputs, setFilteredOutputs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [showAdd, setShowAdd] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [selectedOutput, setSelectedOutput] = useState(null);

    const [showActivityModal, setShowActivityModal] = useState(false);
    const [selectedOutputForActivity, setSelectedOutputForActivity] = useState(null);

    // Make sure outputid is properly defined
// Replace with actual ID source

    // 🟢 Fetch Outputs with error handling
    const fetchOutputs = async () => {
        setLoading(true);
        try {
            const response = await OutputData.getoutputById(outputid);
            // Ensure we always set an array, even if response.data is undefined
            const outputsData = response?.data || [];
            setOutputs(outputsData);
            setFilteredOutputs(outputsData);
        } catch (error) {
            console.error('Error fetching outputs:', error);
            setOutputs([]);
            setFilteredOutputs([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOutputs();
    }, []);

    // 🔍 Handle Search with null checks
    useEffect(() => {
        if (!outputs || !Array.isArray(outputs)) {
            setFilteredOutputs([]);
            return;
        }

        const filtered = outputs.filter((o) => {
            if (!o) return false;
            return Object.values(o).some((val) => 
                val !== null && 
                val !== undefined && 
                String(val).toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setFilteredOutputs(filtered);
    }, [searchTerm, outputs]);

    // ❌ Handle Delete with error handling
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this output?')) {
            try {
                await OutputData.deleteoutput(id);
                await fetchOutputs(); // Refresh after delete
            } catch (error) {
                console.error('Error deleting output:', error);
                alert('Failed to delete output. Please try again.');
            }
        }
    };

    // Stable handlers
    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    if (loading) {
        return (
            <div className="text-center p-5">
                <Spinner animation="border" /> <p>Loading Outputs...</p>
            </div>
        );
    }

    // Safe render - ensure filteredOutputs is always an array
    const displayOutputs = Array.isArray(filteredOutputs) ? filteredOutputs : [];

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold text-primary">Output Management{outputid}</h4>
                <Button variant="primary" onClick={handleShowAdd}>
                    + Add New Output
                </Button>
            </div>

            {/* 🔍 Search Box */}
            <div className="input-group mb-3 shadow-sm">
                <span className="input-group-text bg-primary text-white">
                    <FaSearch />
                </span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search outputs..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>

            {/* 📋 Table */}
            <table className="table table-bordered table-striped align-middle shadow-sm">
                <thead className="table-dark text-center">
                    <tr>
                        <th>#</th>
                        <th>Output Name</th>
                        <th>Outcome Name</th>
                        <th>Fiscal Year</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayOutputs.length > 0 ? (
                        displayOutputs.map((output, index) => (
                            <tr key={output?.outputid || index}>
                                <td>{index + 1}</td>
                                <td>
                                    <b>
                                        <FaHandPointRight /> {output?.outputname || 'N/A'}
                                    </b>
                                </td>
                                <td>{output?.outcomename || 'N/A'}</td>
                                <td>{output?.fiscalyear || 'N/A'}</td>
                                <td>{output?.outcomedescription || 'N/A'}</td>
                                <td className="text-center">
                                    <Button
                                        size="sm"
                                        variant="info"
                                        onClick={() => {
                                            setSelectedOutput(output);
                                            setShowView(true);
                                        }}
                                        disabled={!output}
                                    >
                                        <FaEye />
                                    </Button>{' '}
                                    <Button
                                        size="sm"
                                        variant="warning"
                                        onClick={() => {
                                            setSelectedOutput(output);
                                            setShowUpdate(true);
                                        }}
                                        disabled={!output}
                                    >
                                        <FaEdit />
                                    </Button>{' '}
                                    <Button 
                                        size="sm" 
                                        variant="danger" 
                                        onClick={() => handleDelete(output?.outputid)}
                                        disabled={!output?.outputid}
                                    >
                                        <FaTrash />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="success"
                                        onClick={() => {
                                            setSelectedOutputForActivity(output);
                                            setShowActivityModal(true);
                                        }}
                                        disabled={!output}
                                    >
                                        Activities
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">
                                {Array.isArray(outputs) && outputs.length === 0 
                                    ? 'No outputs available' 
                                    : 'No outputs match your search'
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* ➕ Add Modal */}
            <AddOutputModal
                show={showAdd}
                handleClose={handleCloseAdd}
                OutComeId={outputid}
                onSaved={fetchOutputs}
            />

            {/* 👁️ & ✏️ Modals */}
            {selectedOutput && (
                <>
                    <ViewOutputModal 
                        show={showView} 
                        handleClose={() => setShowView(false)} 
                        data={selectedOutput} 
                    />
                    <UpdateOutputModal
                        show={showUpdate}
                        handleClose={() => setShowUpdate(false)}
                        data={selectedOutput}
                        OutComeId={outputid}
                        onUpdated={fetchOutputs}
                    />
                </>
            )}
            
            {/* 🆕 Output Modal */}
      <Modal  
    show={showActivityModal} 
    onHide={() => setShowActivityModal(false)} 
    fullscreen={true}
    scrollable={true}
    dialogClassName="custom-fullscreen-modal"
>
    <Modal.Header closeButton className="bg-primary text-white py-3">
        <Modal.Title className="fw-bold fs-4">
            {selectedOutputForActivity 
                ? `Output Details: ${selectedOutputForActivity.outputname}` 
                : 'Output Details'}
        </Modal.Title>
    </Modal.Header>

    <Modal.Body className="p-0 m-0">
        {selectedOutputForActivity && (
            <Output
                OutComeId={selectedOutputForActivity.outcomeid}
                OutPutName={selectedOutputForActivity.outputname}
                OutComeName={selectedOutputForActivity.outcomename}
                FiscalYear={selectedOutputForActivity.fiscalyear}
                index={selectedOutputForActivity.outputid}
            />
        )}
    </Modal.Body>

    <Modal.Footer className="bg-light py-3">
        <Button variant="secondary" onClick={() => setShowActivityModal(false)} size="lg">
            Close
        </Button>
    </Modal.Footer>
</Modal>
        </div>
    );
};
    //------------------------------------------------------------------------------------------------Main Content

    //------------------------------------------------------------------------------------------------END Main Content
    return (
        <div>
            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                <div className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden  ''}`}></div>
                <div
                    className={`panel xl:block p-4 dark:gray-50 w-[350px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden ${''}`}
                >
                    <div className="flex flex-col h-full pb-16 bg-gray-50">
                        {/* Header Section */}
                        <div className="pb-4">
                            <div className="text-center">
                                <button type="button" className="btn btn-primary shadow-lg w-full sm:w-auto px-5 py-2  text-white fw-bold transition-all duration-200 hover:scale-[1.02]">
                                    📅 Planning Process — <span className="text-warning">{fiscalYear}</span>
                                </button>
                            </div>
                        </div>

                        {/* Card Section */}
                        <div className="flex-grow bg-white rounded-3 shadow-sm border p-4 overflow-y-auto">
                            <div className="mb-2">
                                <h5 className="text-secondary fw-semibold border-bottom pb-2 mb-3">📂 Strategic Planning Tree</h5>
                            </div>

                            {/* TreeView */}
                            <div className="p-2">
                                <TreeView data={transformedData} fetchChildren={fetchChildren} />
                            </div>
                        </div>

                        {/* Toast Notifications */}
                        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnHover />
                    </div>
                </div>

                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                    <main className="content-scrollable bg-white max-w-[1200px] w-full mx-auto overflow-x-auto">
                        <div className="responsive-table">
                            {typename === 'fiscalYear' && <Programs />}
                            {typename === 'program' && <SubPrograms />}
                            {typename === 'Subprogram' && <Outcomes />}
                            {typename === 'outcome' && <OutputTable />}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PaymentIndex;
