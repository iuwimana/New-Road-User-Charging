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
import Bankstatementdata  from './bankstatementdata';
import DepositVariance  from './depositVariance';
import DepositOverage from './depositOverage';
import BankstatementDiplication from './bankstatementDiplication';
import NFRAdvicenotinPaymentReceipt from './nfrAdvicenotinPaymentReceipt';
import BankstatementBANKSTATEMENTnotinNFR from './bankstatementBANKSTATEMENTnotinNFR';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import SearchBox from '../../searchBox';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

//import 'bootstrap/dist/js/bootstrap.bundle.min';
const Bankstatement = () => {
    const location = useLocation();
    const [state, setState] = useState({
        count: 1,
        countproduct: '1',
        totalCount: 10,

        revenuproductid: 0,
        menulist: '',
        NFRAdvices: [],
        revenuproductname: '',
        totaldeposit: 0,
        nfradviceid: 0,
        currencyid: 0,
        currencyname: '',
        activeon: '',
        sources: [],
        dsources: [],
        advices: [],
        services: [],
        revprod: [],
        revprods: [],
        data: null,
        fiscalyearsid: 0,
        fiscalyear: [],
        currentPage: 1,
        pageSize: 10,
        requiredItem: 0,
        brochure: [],
        downloadingPDF: false,
        downloadingExcel: false,
        searchQuery: '',
        selectedrole: null,
        showModaladd: false,
        search: [],
        sortColumn: { path: 'title', order: 'asc' },
    });
    const [menulist, setmenulist] = useState('payment Receipt');

    const items = ['payment Receipt', 'Pending Advice', 'UnReconcilled Payments', 'Discrepancy', 'Deposit Variance', 'Deposit Overage'];

    const handleClick = (item) => {
        //toast.info(`Thank you for selecting ${item}`);
        //this.setState({ menulist: item });
        setmenulist(item);
    };

    const [fiscalyearsid, setfiscalyearsid] = useState(0);
    const [fiscalyear, setfiscalyear] = useState('');
    const [response, setresponse] = useState([]);
    const [fiscalYears, setfiscalYears] = useState([]);
    const [bankStatement, setbankStatement] = useState([]);
    const [nfradvice, setnfradvice] = useState([]);
    const [totaldeposit, settotaldeposit] = useState(0);
    const [Difference, setDifference] = useState(0);
    const [totaldepositNFR, settotaldepositNFR] = useState(0);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await FiscalYear.getFiscalyears();
                if (!response || !response.data || response.data.length === 0) {
                    toast.error('No fiscal year found.');
                    return;
                }

                const fiscalYears = response.data;
                const fiscalyearsid = fiscalYears[0].fiscalyearid;
                const fiscalyear = fiscalYears.map((year) => year.fiscalyear);

                setresponse({ data: response });
                setfiscalyearsid(fiscalyearsid);
                setfiscalyear(fiscalyear);

                if (!fiscalyearsid) return;

                // Fetch NFR advice and total deposit sum in parallel
                const [{ data: sources }, { data: responses }, { data: bankSources }] = await Promise.all([
                    Advices.getnfradvicebyfiscalyear(fiscalyearsid),
                    Advices.getsumnfradvice(fiscalyearsid),
                    BankStatement.getsumbankstatement(fiscalyearsid),
                ]);

                setnfradvice(sources);

                // Use your suggested approach for total deposit
                const totaldepositNFR = responses?.[0]?.totaldeposit ?? 0;
                const totaldepositBankstatement = bankSources?.[0]?.totaldeposit ?? 0;
                settotaldepositNFR(totaldepositNFR);
                setbankStatement(totaldepositBankstatement);
                setDifference(totaldepositNFR - totaldepositBankstatement);
                // Similarly, if you have a bank statement sum service, you can do the same
                // Example:
                // const [{ data: bankSources }, { data: bankResponses }] = await Promise.all([
                //   BankStatement.getbankstatementbyfiscalyear(fiscalyearsid),
                //   BankStatement.getsumbyfiscalyear(fiscalyearsid),
                // ]);
                // setbankStatement(bankSources);
                // settotaldeposit(bankResponses?.[0]?.totaldeposit ?? 0);
            } catch (ex) {
                console.error(ex);
                toast.error('An error occurred while fetching NFR advice data. Please try again later.');
            }
        }

        fetchData();
    }, []);

        return (
        <div className="container-fluid py-3">
            <Col className="text-center">
                <Card className="shadow border-0">
                    <CardHeader className="bg-white d-flex flex-column flex-md-row justify-content-between align-items-center">
                        {/* First Column (Left-aligned) */}
                        <div className="col text-start">
                            <h2 className="text-primary mb-1">NFR Payment Receipt</h2>
                            <small className="text-muted">
                                <p>Fiscal Year - {fiscalyear}</p>
                            </small>

                            <p className="text-primary mb-1">Total Amount Deposit</p>
                            <small className="text-muted">
                                {' '}
                                <h2>{new Intl.NumberFormat().format(bankStatement)} USD</h2>
                            </small>
                        </div>
                        {/*Difference*/}
                        <div className="col text-start">
                            <h2 className="text-primary mb-1">Discrepancy</h2>
                            <small className="text-muted"> </small>

                            <p className="text-primary mb-1"></p>

                            <small className="text-muted">
                                <h2 className="d-flex align-items-center">
                                    <FaBalanceScale className="me-2 text-success" size={32} />
                                    {new Intl.NumberFormat().format(Difference)} USD
                                </h2>
                            </small>
                        </div>

                        {/* Second Column (Right-aligned) */}
                        <div className="col text-end">
                            <h2 className="text-primary mb-1">NFR Advice collected</h2>
                            <small className="text-muted">
                                {' '}
                                <p>Fiscal Year - {fiscalyear}</p>
                            </small>

                            <p className="text-primary mb-1">Total Amount Deposit</p>
                            <small className="text-muted">
                                <h2>{new Intl.NumberFormat().format(totaldepositNFR)} USD</h2>
                            </small>
                        </div>

                        {/* Currency Icon */}
                        <div className="currency-icon">
                            <FcCurrencyExchange size={20} />
                        </div>
                    </CardHeader>
                    <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                        <div className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden  ''}`}></div>
                        <div
                            className={`panel xl:block p-2 dark:gray-50 w-[220px] max-w-full flex-none space-y-2 xl:relative absolute z-10 xl:h-auto h-full hidden 
  ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden shadow-sm bg-white/90`}
                        >
                            <div className="flex flex-col h-full pb-10">
                                <ul className="space-y-1">
                                    {items.map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleClick(item)}
                                            className={`cursor-pointer flex items-center justify-between py-2 px-3 rounded transition-all duration-200 
              ${menulist === item ? 'bg-blue-500 text-white shadow-md scale-[1.02] border-blue-600' : 'bg-gradient-to-r from-blue-100 to-white text-gray-800 hover:bg-blue-200 hover:scale-[1.01]'}`}
                                        >
                                            <span>{item}</span>

                                            {/* Show check icon if selected */}
                                            {menulist === item && <FaCheckCircle className="text-white text-lg" />}
                                        </li>
                                    ))}
                                </ul>

                                <div className="overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden"></div>
                            </div>
                        </div>

                        <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                            <div className="pb-3 cursor-pointer bg-gradient-to-r from-blue-200 to-white  text-black py-1 px-2 my-1 rounded">
                                {menulist === 'Bank statements' && (
                                    <h1>
                                        <div style={{ textAlign: 'center' }}>
                                            <h1>{menulist}</h1>
                                        </div>
                                    </h1>
                                )}

                                {menulist === 'payment Receipt' && <Bankstatementdata />}
                                {menulist === 'Deposit Variance' && <DepositVariance />}
                                {menulist === 'Deposit Overage' && <DepositOverage />}
                                {menulist === 'Discrepancy' && <BankstatementDiplication />}
                                {menulist === 'Pending Advice' && <NFRAdvicenotinPaymentReceipt />}
                                {menulist === 'UnReconcilled Payments' && <BankstatementBANKSTATEMENTnotinNFR />}
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
        </div>
    );
};

export default Bankstatement;
