import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconAccident from '../Icon/IconAccident';
import IconInsurance from '../Icon/IconInsurance';
import IconInfrastructure from '../Icon/IconInfrastructure';
import IconAccidentDeclaration from '../Icon/IconAccidentDeclaration';
import Icondamagedinfrastructure from '../Icon/IconDamagedInfrastructure';
import Iconreceipt from '../Icon/iconbankstatement';
import IconCaretDown from '../Icon/IconCaretDown';
import IconBankStatement from '../Icon/IconBankStatement1';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuChat from '../Icon/Menu/IconMenuChat';
import IconSiteInspection from '../Icon/IconAccidentInspection';
import IconPaymentSetting from '../Icon/IconSettings';

import Iconcontractsetting from '../Icon/Iconcontractsetting';
import IconInspectionsetting from '../Icon/IconInspectionSetting';
import IconPaymentsetting from '../Icon/Menu/IconPayment';

import IconMenuMailbox from '../Icon/Menu/IconMenuMailbox';
import IconMenuTodo from '../Icon/Menu/IconMenuTodo';
import IconMenuNotes from '../Icon/Menu/IconMenuNotes';
import IconMenuScrumboard from '../Icon/Menu/IconMenuScrumboard';
import IconMenuContacts from '../Icon/Menu/IconMenuContacts';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import IconMenuCalendar from '../Icon/Menu/IconMenuCalendar';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconMenuFontIcons from '../Icon/Menu/IconMenuFontIcons';
import IconMenuDragAndDrop from '../Icon/Menu/IconMenuDragAndDrop';
import IconMenuTables from '../Icon/Menu/IconMenuTables';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuUsers from '../Icon/Menu/IconMenuUsers';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuAuthentication from '../Icon/Menu/IconMenuAuthentication';
import IconMenuDocumentation from '../Icon/Menu/IconMenuDocumentation';
import IconMenuMore from '../Icon/Menu/IconMenuMore';

//-----------------------------------------
import IconAirplay from '../Icon/IconAirplay';
import IconArchive from '../Icon/IconArchive';
import IconArrowBackward from '../Icon/IconArrowBackward';
import IconArrowForward from '../Icon/IconArrowForward';
import IconArrowLeft from '../Icon/IconArrowLeft';
import IconAt from '../Icon/IconAt';
import IconAward from '../Icon/IconAward';
import IconBarChart from '../Icon/IconBarChart';
import IconBellBing from '../Icon/IconBellBing';
import IconBolt from '../Icon/IconBolt';
import IconBook from '../Icon/IconBook';
import IconBookmark from '../Icon/IconBookmark';
import IconBox from '../Icon/IconBox';
import IconCalendar from '../Icon/IconCalendar';
import IconCamera from '../Icon/IconCamera';
import IconCashBanknotes from '../Icon/IconCashBanknotes';
import IconChartSquare from '../Icon/IconChartSquare';
import IconChatDot from '../Icon/IconChatDot';
import IconChatDots from '../Icon/IconChatDots';
import IconChatNotification from '../Icon/IconChatNotification';
import IconChecks from '../Icon/IconChecks';
import IconChrome from '../Icon/IconChrome';
import IconCircleCheck from '../Icon/IconCircleCheck';
import IconClipboardText from '../Icon/IconClipboardText';
import IconClock from '../Icon/IconClock';
import IconCloudDownload from '../Icon/IconCloudDownload';
import IconCode from '../Icon/IconCode';
import IconCoffee from '../Icon/IconCoffee';
import IconCopy from '../Icon/IconCopy';
import IconCpuBolt from '../Icon/IconCpuBolt';
import IconCreditCard from '../Icon/IconCreditCard';
import IconDesktop from '../Icon/IconDesktop';
import IconDollarSign from '../Icon/IconDollarSign';
import IconDollarSignCircle from '../Icon/IconDollarSignCircle';
import IconDownload from '../Icon/IconDownload';
import IconDribbble from '../Icon/IconDribbble';
import IconDroplet from '../Icon/IconDroplet';
import IconEdit from '../Icon/IconEdit';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconEye from '../Icon/IconEye';
import IconFacebook from '../Icon/IconFacebook';
import IconFile from '../Icon/IconFile';
import IconFolder from '../Icon/IconFolder';
import IconFolderMinus from '../Icon/IconFolderMinus';
import IconFolderPlus from '../Icon/IconFolderPlus';
import IconGallery from '../Icon/IconGallery';
import IconGithub from '../Icon/IconGithub';
import IconGlobe from '../Icon/IconGlobe';
import IconHeart from '../Icon/IconHeart';
import IconHelpCircle from '../Icon/IconHelpCircle';
import IconHome from '../Icon/IconHome';
import IconHorizontalDots from '../Icon/IconHorizontalDots';
import IconInbox from '../Icon/IconInbox';
import IconInfoHexagon from '../Icon/IconInfoHexagon';
import IconInfoTriangle from '../Icon/IconInfoTriangle';
import IconInstagram from '../Icon/IconInstagram';
import IconLaptop from '../Icon/IconLaptop';
import IconLayout from '../Icon/IconLayout';
import IconLayoutGrid from '../Icon/IconLayoutGrid';
import IconLink from '../Icon/IconLink';
import IconTarget from '../Icon/IconAnnualTarget';
import IconLinkedin from '../Icon/IconLinkedin';
import IconListCheck from '../Icon/IconListCheck';
import IconLoader from '../Icon/IconLoader';
import IconLock from '../Icon/IconLock';
import IconLockDots from '../Icon/IconLockDots';
import IconLogin from '../Icon/IconLogin';
import IconLogout from '../Icon/IconLogout';
import IconMail from '../Icon/IconMail';
import IconMailDot from '../Icon/IconMailDot';
import IconMapPin from '../Icon/IconMapPin';
import IconMenu from '../Icon/IconMenu';
import IconMessage from '../Icon/IconMessage';
import IconMessage2 from '../Icon/IconMessage2';
import IconMessageDots from '../Icon/IconMessageDots';
import IconMessagesDot from '../Icon/IconMessagesDot';
import IconMicrophoneOff from '../Icon/IconMicrophoneOff';
import IconMinusCircle from '../Icon/IconMinusCircle';
import IconMoodSmile from '../Icon/IconMoodSmile';
import IconMoon from '../Icon/IconMoon';
import IconMultipleForwardRight from '../Icon/IconMultipleForwardRight';
import IconNotes from '../Icon/IconNotes';
import IconNotesEdit from '../Icon/IconNotesEdit';
import IconOpenBook from '../Icon/IconOpenBook';
import IconPaperclip from '../Icon/IconPaperclip';
import IconPencil from '../Icon/IconPencil';
import IconPencilPaper from '../Icon/IconPencilPaper';
import IconPhone from '../Icon/IconPhone';
import IconPhoneCall from '../Icon/IconPhoneCall';
import IconPlayCircle from '../Icon/IconPlayCircle';
import IconPlus from '../Icon/IconPlus';
import IconPlusCircle from '../Icon/IconPlusCircle';
import IconPrinter from '../Icon/IconPrinter';
import IconRefresh from '../Icon/IconRefresh';
import IconRestore from '../Icon/IconRestore';
import IconRouter from '../Icon/IconRouter';
import IconSafari from '../Icon/IconSafari';
import IconSave from '../Icon/IconSave';
import IconSearch from '../Icon/IconSearch';
import IconSend from '../Icon/IconSend';
import IconServer from '../Icon/IconServer';
import IconSettings from '../Icon/IconSettings';
import IconShare from '../Icon/IconShare';
import IconShoppingBag from '../Icon/IconShoppingBag';
import IconShoppingCart from '../Icon/IconShoppingCart';
import IconSquareCheck from '../Icon/IconSquareCheck';
import IconSquareRotated from '../Icon/IconSquareRotated';
import IconStar from '../Icon/IconStar';
import IconSun from '../Icon/IconSun';
import IconTag from '../Icon/IconTag';
import IconThumbUp from '../Icon/IconThumbUp';
import IconTrash from '../Icon/IconTrash';
import IconTrashLines from '../Icon/IconTrashLines';
import IconTrendingUp from '../Icon/IconTrendingUp';
import IconTwitter from '../Icon/IconTwitter';
import IconUser from '../Icon/IconUser';
import IconUserPlus from '../Icon/IconUserPlus';
import IconUsers from '../Icon/IconUsers';
import IconUsersGroup from '../Icon/IconUsersGroup';
import IconRoadType from '../Icon/IconRoadType';
import IconRevenue from '../Icon/IconRevenue';
import IconBank from '../Icon/bank';
import IconCollection from '../Icon/IconCollection';
import Iconpayment from '../Icon/Menu/IconPayment';
import IconRevenueCollection from '../Icon/IconRevenueCollection';
import IconApprovEmargency from '../Icon/IconApprovEmargency';
import IconApprovFramework from '../Icon/IconApprovFramework';
import IconApprovEmargencyInspection from '../Icon/IconApprovEmargencyInspection';
import IconApprovFrameworkInspection from '../Icon/IconApprovFrameworkInspection';
import IconExpendure from '../Icon/IconExpendure';
import IconRoad from '../Icon/IconRoad';
import IconVideo from '../Icon/IconVideo';
import IconWheel from '../Icon/IconWheel';
import IconX from '../Icon/IconX';
import IconXCircle from '../Icon/IconXCircle';
import IconZipFile from '../Icon/IconZipFile';
import IconMenuApps from '../Icon/Menu/IconMenuApps';
import * as auth from '../../services/authService';
import IconBell from '../Icon/IconBell';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import * as UserAccessData from '../../services/security/securableService';
import * as UserHeadData from '../../services/security/userServices';

//--------------------------------------
interface SidebarProps {
    className?: string; // shyiramo optional className
}

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [subcurrentMenu, setsubCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);

    //---------------------------------------------------------------------------
    const [canaccessDashboard, setCanaccessDashboard] = useState();
    const [canaccessRevenue, setCanaccessRevenue] = useState();
    const [canaccessSecurity, setCanaccessSecurity] = useState();
    const [canaccessPlanning, setCanaccessPlanning] = useState();
    const [canaccesscontract, setCanaccesscontract] = useState();
    const [canaccesslookup, setCanaccesslookup] = useState();
    const [canaccessAccident, setCanaccessAccident] = useState();
    const [isHeadofUnit, setisHeadofUnit] = useState();
    const [useraccess, setuseraccess] = useState([]);
    const [emails, setemails] = useState([]);
    //const [email, setemail] = useState(user.username);
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
    //----------------------------------------------------------------------------------
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const togglesubMenu = (value: string) => {
        setsubCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };
    const currentUser = auth.getCurrentUser();
    const username = auth.getJwt();
    //const jwt = jwtDecode(username);
    //toast.info(`,${JSON.stringify(jwt.rows[0].email) }`)

    //------------------------------------end canaccessRevenusCollection
    //------------------------------------canaccessRevenusPayment

    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getrevenucollectionusersecurables(5, jwt.username);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;
                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setcanaccessRevenusPayment(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }

    //------------------------------------end canaccessRevenusPayment
    //------------------------------------canaccessRevenuDashBoard

    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getrevenucollectionusersecurables(10, jwt.username);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setcanaccessRevenuDashBoard(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }

    //------------------------------------end canaccessRevenuDashBoard
    //------------------------------------canaccessExpenditure

    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getrevenucollectionusersecurables(29, jwt.username);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setcanaccessExpenditure(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }

    //------------------------------------end canaccessExpenditure
    //------------------------------------canaccessViewSAP

    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getPlanningusersecurables(13, jwt.username);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setcanaccessViewSAP(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }

    //------------------------------------end canaccessViewSAP
    //------------------------------------canaccessPlaningProcess

    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getPlanningusersecurables(12, jwt.username);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setcanaccessPlaningProcess(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }

    //------------------------------------end canaccessPlaningProcess
    //------------------------------------canaccessPayment

    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.contractusersecurables(24, jwt.username);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setcanaccessPayment(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }

    //------------------------------------end canaccessPayment
    //------------------------------------canaccessInspection

    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.contractusersecurables(23, jwt.username);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setcanaccessInspection(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }
    //-------------------------------

    //------------------------------------end canaccessInspection
    //-------------------------------------setcanaccesscontractapproval
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.contractusersecurables(30, jwt.username);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setcanaccesscontractapproval(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }

    //-------------------------------------setcanaccesscontractapproval
    //------------------------------------canaccesscontracts

    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.contractusersecurables(22, jwt.username);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setcanaccesscontracts(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }
    //------------------------------------end canaccesscontracts

    //------------------------------------accessadministration
    {
        /**-------------------head of Unit 
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const  response = await UserHeadData.getUserheads(jwt.username);
                 // Handle null/undefined response
                if (!response ) {
                    throw new Error('API returned no data');
                }
                
                // Extract data from Axios response
                const responseData = response.data;

                data.forEach((object: any, index: number) => {
                    setisHeadofUnit(object.user_isheadofunit);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }
        */
    }

    //accessdashboard
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getsecurableaccess(jwt.username, 27);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setCanaccessDashboard(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }
    //---Accident
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getsecurableaccess(jwt.username, 31);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setCanaccessAccident(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }
    //---revenu
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getsecurableaccess(jwt.username, 25);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setCanaccessRevenue(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    } //--security
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getsecurableaccess(jwt.username, 16);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setCanaccessSecurity(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    }
    //--planing
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getsecurableaccess(jwt.username, 11);
                // Handle null/undefined response
                // toast.info(`....${jwt.username}`)
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setCanaccessPlanning(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    } //--contract management
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getsecurableaccess(jwt.username, 21);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setCanaccesscontract(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    } //--admin portal
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getsecurableaccess(jwt.username, 16);
                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setCanaccessSecurity(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    } //-- lookup
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                const username = auth.getJwt();
                if (!username) {
                    toast.error('Authentication token is missing. Please log in.');

                    return;
                }
                const jwt = jwtDecode<{ username: string }>(username);

                const response = await UserAccessData.getsecurableaccess(jwt.username, 28);

                // Handle null/undefined response
                if (!response?.data) {
                    throw new Error('API returned no data');
                }

                const { data } = response;

                setuseraccess(data);

                data.forEach((object: any, index: number) => {
                    setCanaccesslookup(object.canaccess);
                });
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('An Error Occured, while Loading Fiscal Year Contract Type data..........' + ex);
    } //--

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[300px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/analytics" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/rwanda.png" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{t('RUCS')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            {canaccessDashboard && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                        <div className="flex items-center">
                                            <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                            <span className="ltr:pl-3 uppercase rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                        </div>

                                        <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                            <IconCaretDown />
                                        </div>
                                    </button>

                                    <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                        <ul className="sub-menu text-gray-500">
                                            {/** 
                                        <li>
                                            <NavLink to="/crypto">{t('Revenuie Collection')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/analytics">{t('Planing Management')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/finance">{t('Contract Management')}</NavLink>
                                        </li>
                                        */}
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}
                            {(canaccessRevenue || canaccessAccident) && (
                                <>
                                    {/*{toast.info(`username:,${canaccessPlanning}`)}*/}

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'Revenue' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Revenue')}>
                                            <div className="flex items-center">
                                                <IconRevenue className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 uppercase rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Revenue')}</span>
                                            </div>

                                            <div className={currentMenu !== 'Revenue' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <IconCaretDown />
                                            </div>
                                        </button>
                                        {/**----------------------------------------------------------- */}

                                        {/**--------------------------------------------------------------- */}
                                        <AnimateHeight duration={300} height={currentMenu === 'Revenue' ? 'auto' : 0}>
                                            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                                {!canaccessAccident && (
                                                    <>
                                                        <li className="menu nav-item">
                                                            <NavLink to="/revenu/annualtarget" className="group">
                                                                <div className="flex items-center">
                                                                    <IconExpendure className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                                        {t(`Annual Target ${canaccessPlanning}`)}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>

                                                        <li className="menu nav-item">
                                                            <NavLink to="/revenu/revenupayment" className="group">
                                                                <div className="flex items-center">
                                                                    <IconMenuContacts className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
                                                                        {t('Collections unit rate')}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>

                                                        <li className="menu nav-item">
                                                            <NavLink to="/revenu/revenucollection" className="group">
                                                                <div className="flex items-center">
                                                                    <IconRevenueCollection className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('NFR Advice')}</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li className="menu nav-item">
                                                            <NavLink to="/revenu/ifmispayments" className="group">
                                                                <div className="flex items-center">
                                                                    <IconBank className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Data from IFMIS')}</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li className="menu nav-item">
                                                            <NavLink to="/revenu/frombank" className="group">
                                                                <div className="flex items-center">
                                                                    <IconBankStatement
                                                                        className="shrink-0 text-gray-700 dark:text-gray-200 group-hover:text-blue-600 transition-transform duration-150 group-hover:scale-105"
                                                                        fill={false}
                                                                    />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#cfd4dc] dark:group-hover:text-white whitespace-normal text-sm">
                                                                        {t('bank statement')}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li className="menu nav-item">
                                                            <NavLink to="/revenu/bankstatement" className="group">
                                                                <div className="flex items-center">
                                                                    <Iconreceipt className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payment Receipt')}</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li className="menu nav-item">
                                                            <NavLink to="/revenu/payments" className="group">
                                                                <div className="flex items-center">
                                                                    <Iconpayment className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Revenus Collection')}</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li className="menu nav-item">
                                                            <NavLink to="/revenu/contractpayment" className="group">
                                                                <div className="flex items-center">
                                                                    <IconExpendure className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Contract Payment')}</span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                    </>
                                                )}
                                                {/**----------------------------------------------------------- */}

                                                {canaccessAccident && (
                                                    <li className="menu nav-item">
                                                        <button
                                                            type="button"
                                                            className={`${subcurrentMenu === 'Accident' ? 'active' : ''} nav-link group w-full`}
                                                            onClick={() => togglesubMenu('Accident')}
                                                        >
                                                            <div className="flex items-center">
                                                                <IconAccident className="group-hover:!text-primary shrink-0" />

                                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                    {t('Accident Compensation')}
                                                                </span>
                                                            </div>

                                                            <div className={subcurrentMenu !== 'Accident' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                                <IconCaretDown />
                                                            </div>
                                                        </button>
                                                        <AnimateHeight duration={300} height={subcurrentMenu === 'Accident' ? 'auto' : 0}>
                                                            <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                                                <li className="menu nav-item">
                                                                    <NavLink to="/revenu/accident/roaditem" className="group">
                                                                        <div className="flex items-center">
                                                                            <IconInfrastructure className="group-hover:!text-primary shrink-0" />
                                                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                                {t('Road Infrastructure')}
                                                                            </span>
                                                                        </div>
                                                                    </NavLink>
                                                                </li>

                                                                <li className="menu nav-item">
                                                                    <NavLink to="/revenu/accident/accidentdeclaration" className="group">
                                                                        <div className="flex items-center">
                                                                            <IconAccidentDeclaration className="group-hover:!text-primary shrink-0" />
                                                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                                {t('compasation')}
                                                                            </span>
                                                                        </div>
                                                                    </NavLink>
                                                                </li>
                                                                {/** <li className="menu nav-item">
                                                                <NavLink to="/revenu/accident/siteinspection" className="group">
                                                                    <div className="flex items-center">
                                                                        <IconSiteInspection className="group-hover:!text-primary shrink-0" />
                                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                            {t('Site Inspection')}
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </li>
                                                            
                                                     
                                                     <li className="menu nav-item">
                                                        <NavLink to="/planing/sap" className="group">
                                                            <div className="flex items-center">
                                                                <Icondamagedinfrastructure className="group-hover:!text-primary shrink-0" />
                                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                    {t('Damaged Infrastructure')}
                                                                </span>
                                                            </div>
                                                        </NavLink>
                                                    </li>

                                                     

                                                            <li className="menu nav-item">
                                                                <NavLink to="/revenu/accident/claimedpayment" className="group">
                                                                    <div className="flex items-center">
                                                                        <Icondamagedinfrastructure className="group-hover:!text-primary shrink-0" />
                                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                            {t('Claim Payment')}
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </li>*/}
                                                            </ul>
                                                        </AnimateHeight>
                                                    </li>
                                                )}

                                                {/**--------------------------------------------------------------- */}

                                                {/** 
                                        <li className="menu nav-item">
                                            <NavLink to="/revenu/expenduture" className="group">
                                                <div className="flex items-center">
                                                    <IconExpendure className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Revenus Expenduture')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        */}
                                                {/** 
                                              {!canaccessAccident && (
                                                
                                                <li className="menu nav-item">
                                                    <NavLink to="/revenu/revenucollectionadministration" className="group">
                                                        <div className="flex items-center">
                                                            <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Revenu Administration')}</span>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                              )}*/}

                                                {/**
                                         <li className="menu nav-item">
                                            <NavLink to="/revenu/RevDashboard" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Revenu DashBoard')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                         
                                         */}
                                                {!canaccessAccident && (
                                                    <li className="menu nav-item">
                                                        <NavLink to="/revenu/revenuanalytics" className="group">
                                                            <div className="flex items-center">
                                                                <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Revenu DashBoard')}</span>
                                                            </div>
                                                        </NavLink>
                                                    </li>
                                                )}
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                </>
                            )}
                            {canaccessPlanning && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'Planing' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Planing')}>
                                        <div className="flex items-center">
                                            <IconMenuCalendar className="group-hover:!text-primary shrink-0" />

                                            <span className="ltr:pl-3 uppercase rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Planing')}</span>
                                        </div>

                                        <div className={currentMenu !== 'Planing' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'Planing' ? 'auto' : 0}>
                                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                            <li className="menu nav-item">
                                                <NavLink to="/planing/programtable" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Planing Process')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>

                                            <li className="menu nav-item">
                                                <NavLink to="/planing/administration" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Administration')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>
                                            {/** 

                                            <li className="menu nav-item">
                                                <NavLink to="/planing/sap" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuFontIcons className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('View SAP')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>
                                            */}
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}

                            {canaccesscontract && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'Contract' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Contract')}>
                                        <div className="flex items-center">
                                            <IconMenuDatatables className="group-hover:!text-primary shrink-0" />

                                            <span className="ltr:pl-3 rtl:pr-3 uppercase text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Contract')}</span>
                                        </div>

                                        <div className={currentMenu !== 'Contract' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'Contract' ? 'auto' : 0}>
                                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                            {/*<li className="menu nav-item">
                                                <NavLink to="/contract/administration" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t(' Administration')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>

                                            
                                          */}
                                            <li className="menu nav-item">
                                                <button type="button" className={`${subcurrentMenu === 'contract' ? 'active' : ''} nav-link group w-full`} onClick={() => togglesubMenu('contract')}>
                                                    <div className="flex items-center">
                                                        <Iconcontractsetting className="group-hover:!text-primary shrink-0" />

                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                            {t('contract setting')}
                                                        </span>
                                                    </div>

                                                    <div className={subcurrentMenu !== 'contract' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                        <IconCaretDown />
                                                    </div>
                                                </button>
                                                <AnimateHeight duration={300} height={subcurrentMenu === 'contract' ? 'auto' : 0}>
                                                    <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                                        <li className="menu nav-item">
                                                            <NavLink to="/contract/contracts" className="group">
                                                                <div className="flex items-center">
                                                                    <IconInfrastructure className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                        {t('create new contract')}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        <li className="menu nav-item">
                                                            <NavLink to="/contract/contracts/inspectionplan" className="group">
                                                                <div className="flex items-center">
                                                                    <IconSiteInspection className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                        {t('Inspection Plan')}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>

                                                        <li className="menu nav-item">
                                                            <NavLink to="/contract/inspectionevaluation" className="group">
                                                                <div className="flex items-center">
                                                                    <IconAccidentDeclaration className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                        {t('Inspection evaluation')}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>

                                                        {/**
                                                     
                                                     <li className="menu nav-item">
                                                        <NavLink to="/planing/sap" className="group">
                                                            <div className="flex items-center">
                                                                <Icondamagedinfrastructure className="group-hover:!text-primary shrink-0" />
                                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                    {t('Damaged Infrastructure')}
                                                                </span>
                                                            </div>
                                                        </NavLink>
                                                    </li>

                                                     */}

                                                        <li className="menu nav-item">
                                                            <NavLink to="/contract/payment/contractpayments" className="group">
                                                                <div className="flex items-center">
                                                                    <Icondamagedinfrastructure className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                        {t('Claim Payment')}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </AnimateHeight>
                                            </li>
                                            {/**--------------------Inspection------ */}
                                            <li className="menu nav-item">
                                                <button
                                                    type="button"
                                                    className={`${subcurrentMenu === 'Inspection' ? 'active' : ''} nav-link group w-full`}
                                                    onClick={() => togglesubMenu('Inspection')}
                                                >
                                                    <div className="flex items-center">
                                                        <IconInspectionsetting className="group-hover:!text-primary shrink-0" />

                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                            {t('Inspection setting')}
                                                        </span>
                                                    </div>

                                                    <div className={subcurrentMenu !== 'Inspection' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                        <IconCaretDown />
                                                    </div>
                                                </button>
                                                <AnimateHeight duration={300} height={subcurrentMenu === 'Inspection' ? 'auto' : 0}>
                                                    <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                                        <li className="menu nav-item">
                                                            <NavLink to="/contract/inspectionseting/activitytype" className="group">
                                                                <div className="flex items-center">
                                                                    <IconInfrastructure className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                        {t('Type of contract activities')}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>

                                                        <li className="menu nav-item">
                                                            <NavLink to="/contract/contracts/descriptors" className="group">
                                                                <div className="flex items-center">
                                                                    <IconAccidentDeclaration className="group-hover:!text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                        {t('Evaluation Descriptors')}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        {/** 
                                                            <li className="menu nav-item">
                                                                <NavLink to="/revenu/accident/siteinspection" className="group">
                                                                    <div className="flex items-center">
                                                                        <IconSiteInspection className="group-hover:!text-primary shrink-0" />
                                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                            {t('Site Inspection')}
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </li>
                                                            {/**
                                                     
                                                     <li className="menu nav-item">
                                                        <NavLink to="/planing/sap" className="group">
                                                            <div className="flex items-center">
                                                                <Icondamagedinfrastructure className="group-hover:!text-primary shrink-0" />
                                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                    {t('Damaged Infrastructure')}
                                                                </span>
                                                            </div>
                                                        </NavLink>
                                                    </li>

                                                     

                                                            <li className="menu nav-item">
                                                                <NavLink to="/revenu/accident/claimedpayment" className="group">
                                                                    <div className="flex items-center">
                                                                        <Icondamagedinfrastructure className="group-hover:!text-primary shrink-0" />
                                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                            {t('Claim Payment')}
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </li>*/}
                                                    </ul>
                                                </AnimateHeight>
                                            </li>

                                            {/**--------------------payment------ */}
                                            <li className="menu nav-item">
                                                <button type="button" className={`${subcurrentMenu === 'payment' ? 'active' : ''} nav-link group w-full`} onClick={() => togglesubMenu('payment')}>
                                                    <div className="flex items-center">
                                                        <IconPaymentsetting className="group-hover:!text-primary shrink-0" />

                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                            {t('payment setting')}
                                                        </span>
                                                    </div>

                                                    <div className={subcurrentMenu !== 'payment' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                        <IconCaretDown />
                                                    </div>
                                                </button>
                                                <AnimateHeight duration={300} height={subcurrentMenu === 'payment' ? 'auto' : 0}>
                                                    <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                                        <li className="menu nav-item">
                                                            <NavLink to="/contract/payment/setting" className="group">
                                                                <div className="flex items-center">
                                                                    <IconPaymentSetting className="w-[200px] h-[200px] text-primary shrink-0" />
                                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                        {t('Payment Setting')}
                                                                    </span>
                                                                </div>
                                                            </NavLink>
                                                        </li>
                                                        {/** 

                                                            <li className="menu nav-item">
                                                                <NavLink to="/revenu/accident/accidentdeclaration" className="group">
                                                                    <div className="flex items-center">
                                                                        <IconAccidentDeclaration className="group-hover:!text-primary shrink-0" />
                                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                            {t('Accident Declaration')}
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </li>
                                                            <li className="menu nav-item">
                                                                <NavLink to="/revenu/accident/siteinspection" className="group">
                                                                    <div className="flex items-center">
                                                                        <IconSiteInspection className="group-hover:!text-primary shrink-0" />
                                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                            {t('Site Inspection')}
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </li>*/}
                                                        {/**
                                                     
                                                     <li className="menu nav-item">
                                                        <NavLink to="/planing/sap" className="group">
                                                            <div className="flex items-center">
                                                                <Icondamagedinfrastructure className="group-hover:!text-primary shrink-0" />
                                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                    {t('Damaged Infrastructure')}
                                                                </span>
                                                            </div>
                                                        </NavLink>
                                                    </li>

                                                     */}
                                                        {/** 

                                                            <li className="menu nav-item">
                                                                <NavLink to="/revenu/accident/claimedpayment" className="group">
                                                                    <div className="flex items-center">
                                                                        <Icondamagedinfrastructure className="group-hover:!text-primary shrink-0" />
                                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark whitespace-normal text-sm">
                                                                            {t('Claim Payment')}
                                                                        </span>
                                                                    </div>
                                                                </NavLink>
                                                            </li>
                                                            */}
                                                    </ul>
                                                </AnimateHeight>
                                            </li>

                                            {/**--------------------------------------------------------------------------------- */}

                                            {/** 

                                            <li className="menu nav-item">
                                                <NavLink to="/contract/contracts" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuDatatables className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Contract')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>
                                           
                                        <li className="menu nav-item">
                                            <NavLink to="/contract/approval/emmargency" className="group">
                                                <div className="flex items-center">
                                                    <IconApprovEmargency className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Approv Emergency Contract')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <NavLink to="/contract/approval/framework" className="group">
                                                <div className="flex items-center">
                                                    <IconApprovFramework className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Approv Framework Contract')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <NavLink to="/contract/Inspections" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuForms className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Inspection')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <NavLink to="/inspection/approval/Emmargency" className="group">
                                                <div className="flex items-center">
                                                    <IconApprovFrameworkInspection className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Emergency Inspection')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <NavLink to="/inspection/approval/framework" className="group">
                                                <div className="flex items-center">
                                                    <IconApprovEmargencyInspection className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Framework Inspect')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <NavLink to="/contract/Payments" className="group">
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Payments')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        <li className="menu nav-item">
                                            <NavLink to="/payment/approval" className="group">
                                                <div className="flex items-center">
                                                    <IconApprovEmargencyInspection className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Approv Payments')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                        */}
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}

                            {canaccessSecurity && (
                                <li className="menu nav-item">
                                    <button type="button" className={`${currentMenu === 'Security' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Security')}>
                                        <div className="flex items-center">
                                            <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />

                                            <span className="ltr:pl-3 rtl:pr-3 uppercase text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Security')}</span>
                                        </div>

                                        <div className={currentMenu !== 'Security' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                            <IconCaretDown />
                                        </div>
                                    </button>
                                    <AnimateHeight duration={300} height={currentMenu === 'Security' ? 'auto' : 0}>
                                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                            <li className="menu nav-item">
                                                <NavLink to="/security/user" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuUsers className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('User')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>

                                            <li className="menu nav-item">
                                                <NavLink to="/security/role" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuAuthentication className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Roles')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>

                                            <li className="menu nav-item">
                                                <NavLink to="/security/securables" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuElements className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Securables')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>

                                            <li className="menu nav-item">
                                                <NavLink to="/security/userapproval" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuDragAndDrop className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('User Approvals')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>
                                            <li className="menu nav-item">
                                                <NavLink to="/security/audit" className="group">
                                                    <div className="flex items-center">
                                                        <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Audit Trails')}</span>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </AnimateHeight>
                                </li>
                            )}
                            {/** 
                            {canaccesslookup && (*/}
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'LookUp' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('LookUp')}>
                                    <div className="flex items-center">
                                        <IconEye className="group-hover:!text-primary shrink-0" />

                                        <span className="ltr:pl-3 rtl:pr-3 uppercase text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('LookUp')}</span>
                                    </div>

                                    <div className={currentMenu !== 'LookUp' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'LookUp' ? 'auto' : 0}>
                                    <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                        <h6 className="py-3 px-7 flex items-center font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                            <IconMinus className="w-4 h-5 flex-none hidden" />
                                            <span>{t('Revenu collection')}</span>
                                        </h6>

                                        <li className="menu nav-item">
                                            <NavLink to="/lookup/revenu/Currency" className="nav-link group">
                                                <div className="flex items-center">
                                                    <IconMenuInvoice className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Currency')}</span>
                                                </div>
                                            </NavLink>
                                            <NavLink to="/lookup/revenu/Fiscalyear" className="nav-link group">
                                                <div className="flex items-center">
                                                    <IconMenuCalendar className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Fiscal year')}</span>
                                                </div>
                                            </NavLink>

                                            <NavLink to="/lookup/revenu/Sources " className="nav-link group">
                                                <div className="flex items-center">
                                                    <IconMenuElements className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Source of Funds')}</span>
                                                </div>
                                            </NavLink>
                                            <NavLink to="/revenu/insurance" className="nav-link group">
                                                <div className="flex items-center">
                                                    <IconInsurance className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Insurance Companies')}</span>
                                                </div>
                                            </NavLink>
                                            <NavLink to="/lookup/revenu/Product " className="nav-link group">
                                                <div className="flex items-center">
                                                    <IconMenuDragAndDrop className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Collections')}</span>
                                                </div>
                                            </NavLink>

                                            {/** 
                                                
                                                <NavLink to="/lookup/revenu/Business " className="nav-link group">
                                                    <div className="flex items-center">
                                                        <IconMenuContacts className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Business Partener')}</span>
                                                    </div>
                                                </NavLink>
                                                <NavLink to="/lookup/revenu/Paterner " className="nav-link group">
                                                    <div className="flex items-center">
                                                        <IconSettings className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Partener Service')}</span>
                                                    </div>
                                                </NavLink>
                                                <NavLink to="/lookup/revenu/ServicePayment " className="nav-link group">
                                                    <div className="flex items-center">
                                                        <IconListCheck className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Service Payment')}</span>
                                                    </div>
                                                </NavLink>
                                                <NavLink to="/lookup/revenu/PaternerServicePayment" className="nav-link group">
                                                    <div className="flex items-center">
                                                        <IconLink className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Paterner Service Payment')}</span>
                                                    </div>
                                                </NavLink>
                                                */}
                                        </li>

                                        <h6 className="py-3 px-7 flex items-center font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                            <IconMinus className="w-4 h-5 flex-none hidden" />
                                            <span>{t('Contract Management')}</span>
                                        </h6>

                                        <li className="menu nav-item">
                                            {/** 
                                                <NavLink to="Lookup/roadrefference/road"  className="nav-link group">
                                                    <div className="flex items-center">
                                                        <IconUsersGroup className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Road Classification')}</span>
                                                    </div>
                                                </NavLink>
                                                <NavLink to="Lookup/roadrefference/road"  className="nav-link group">
                                                    <div className="flex items-center">
                                                        <IconZipFile className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Road Characteristics')}</span>
                                                    </div>
                                                </NavLink>
                                                <NavLink to="Lookup/roadrefference/road"  className="nav-link group">
                                                    <div className="flex items-center">
                                                        <IconRoadType className="group-hover:!text-primary shrink-0" />
                                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Rood Types')}</span>
                                                    </div>
                                                </NavLink>
                                                */}
                                            <NavLink to="/Lookup/roadrefference/road" className="nav-link group">
                                                <div className="flex items-center">
                                                    <IconRoad className="group-hover:!text-primary shrink-0" />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Road')}</span>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                            {/**
                            )} */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
