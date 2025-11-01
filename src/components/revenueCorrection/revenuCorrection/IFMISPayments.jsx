import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Col, Card, CardHeader, CardBody, ListGroup, Button } from 'reactstrap';
import { FcCurrencyExchange, FcPlus } from 'react-icons/fc';
import {  FcLock, FcCheckmark} from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import withNavigation from '../../revenueCorrection/revenuCorrection/withNavigation'; 

import { HiOutlineDocumentText } from 'react-icons/hi';
import { MdOutlineEditNote } from 'react-icons/md';
import { FaBalanceScale } from 'react-icons/fa';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as BankStatement from '../../../services/RevenuRessources/ifmisPaymentServices';
import * as RevProdData from '../../../services/RevenuRessources/revenuPaymentServices';
import * as Revcor from '../../../services/RevenuRessources/revenuCorrectionService';
import AddModal from './AddIFIMSPayment';
import './collection.css'; // Import your CSS file for styling
import _ from 'lodash';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import SearchBox from '../../searchBox';
//import 'bootstrap/dist/css/bootstrap.min.css';

class IFMISPayments extends React.Component {
    constructor(props) {
        super(props);
    this.state = {
        count: 1,
        countproduct: '1',
        totalCount: 10,

        fiscalyearname: this.props.fiscalyearname,

        revenuproductid: 0,
        revenuproductname: '',
        totaldeposit: 0,
        totalrev: 0,
        difference:0,
        currencyid: 0,
        currencyname: '',
        activeon: '',
        sources: [],
        revenue: [],
        services: [],
        revprod: [],
        revprods: [],
        data: null,
        fiscalyearsid: 0,
        fiscalyear: [],
        currentPage: 1,
        pageSize: 30,
        requiredItem: 0,
        brochure: [],
        selectedrole: null,
        showModaladd: false,
        search: [],
        sortColumn: { path: 'title', order: 'asc' },
    }
    };
    toggleModaladd = () => {
        this.setState((prevState) => ({ showModaladd: !prevState.showModaladd }));
    };
    replaceModalItemUpdate(revenuproductid, revenuproductname, currencyid, currencyname, activeon) {
        this.setState({
            revenuproductid: revenuproductid,
            revenuproductname: revenuproductname,
            currencyid: currencyid,
            currencyname: currencyname,
            activeon: activeon,
        });
        this.setState((prevState) => ({ showModaladd: !prevState.showModaladd }));

       // toast.info(`revenuproductid: ${revenuproductid},revenuproductname: ${revenuproductname}, currencyid: ${currencyid},currencyname: ${currencyname},activeon: ${activeon}`);
    }
    async populateBanks() {
        try {
            try {
                const { data: fiscalyear } = await FiscalYear.getFiscalyears();
                const response = await FiscalYear.getFiscalyears();
                if (response) {
                    const fiscalYears = response.data;
                    this.setState({ data: response });
                    const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
                    const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                    //this.setState({ fiscalyearid, fiscalyear });
                    this.setState({ fiscalyearsid, fiscalyear });
                } else {
                    toast.error('No Fiscal year find......' + fiscalyear);
                }
            } catch (ex) {
                toast.error('current user data Loading issues......' + ex);
            }
        } catch (ex) {
            toast.error('current user data Loading issues......' + ex);
        }
    }

    async componentDidMount() {
        try {
            await this.populateBanks();

            if (this.state.fiscalyearsid === 0) {
                await this.populateBanks();

                const [sourcesResponse, revenueResponse] = await Promise.all([
                    BankStatement.getifmispaymentbyfiscalyear(this.state.fiscalyearsid),
                    Revcor.getrevenucorrectionByFiscalYearID(this.state.fiscalyearsid)
                  ]);
                  
                  // Extract data from responses
                  const sources = sourcesResponse.data || [];
                  const revenue = revenueResponse.data || [];
                  
                  // Calculate totals more efficiently
                  const totaldeposit = sources.reduce((sum, item) => sum + (item.totalamount || 0), 0);
                  const totalrev = revenue.reduce((sum, item) => sum + (item.deposit || 0), 0);
                  
                  // Single state update with all data
                  this.setState({
                    sources,
                    revenue,
                    totaldeposit,
                    totalrev,
                    difference: totalrev - totaldeposit  // Added difference calculation
                  });
            } else {
                const [sourcesResponse, revenueResponse] = await Promise.all([
                    BankStatement.getifmispaymentbyfiscalyear(this.state.fiscalyearsid),
                    Revcor.getrevenucorrectionByFiscalYearID(this.state.fiscalyearsid)
                  ]);
                  
                  // Extract data from responses
                  const sources = sourcesResponse.data || [];
                  const revenue = revenueResponse.data || [];
                  
                  // Calculate totals more efficiently
                  const totaldeposit = sources.reduce((sum, item) => sum + (item.totalamount || 0), 0);
                  const totalrev = revenue.reduce((sum, item) => sum + (item.deposit || 0), 0);
                  
                  // Single state update with all data
                  this.setState({
                    sources,
                    revenue,
                    totaldeposit,
                    totalrev,
                    difference: totalrev - totaldeposit  // Added difference calculation
                  });

                if (!Array.isArray(sources)) {
                    throw new Error('Invalid data format received from the server.');
                }
            }
        } catch (ex) {
            return toast.error('An Error 1 Occured, while fetching role data Please try again later' + ex);
        }
    }
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };
    handleSearch = (query) => {
        //const { search } = await Role.getRolesearched(query);

        this.setState({ searchQuery: query, currentPage: 1 });
    };
    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };
    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, searchQuery, selectedrole, sources: allsources } = this.state;

        let filtered = allsources;
        if (searchQuery)
            filtered = allsources.filter(
                (m) =>
                    m.revenueproductname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.paymentmodename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.sourceoffundname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.bankacountnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.bankname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.status.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.batchid.toLowerCase().startsWith(searchQuery.toLowerCase())
                // m.DocId.toLowerCase().startsWith(searchQuery.toLowerCase())
                //m.refnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                //m.correctiondate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                // m.poref.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedrole && selectedrole.ifmispaymentid) filtered = allsources.filter((m) => m.ifmispaymentid === selectedrole.ifmispaymentid);
        ///////////////////////////////////////////
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const sources = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: sources };
    };
    async fiscalyearidHandler(e) {
        this.setState({ fiscalyearid: e.target.value });
        await this.componentDidMount();

        this.setState({ fiscalyearname: ' ' });
    }

    saveModalDetails(sources) {
        const requiredItem = this.state.requiredItem;
        let tempbrochure = this.state.sources;
        tempbrochure[requiredItem] = sources;
        this.setState({ sources: tempbrochure });
    }

    async deleteItem(ifmispaymentid) {
        //const { user } = this.state;

        try {
            if (!ifmispaymentid) {
                toast.info(`the Revenue Correction you selected  doesnot exist`);
            } else {
                await BankStatement.deleteifmispayment(ifmispaymentid);
                toast.success(`this revenu ifmispayment has been deleted successful`);
            }
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
                toast.error('An Error Occured, while deleting ifmispayment Please try again later');
            }
        }
    }
    handlecall() {
        const revenuproductid = this.state.revenuproductid;
        const revenuproductname = this.state.revenuproductname;
        const currencyid = this.state.currencyid;
        const currencyname = this.state.currencyname;
        const activeon = this.state.activeon;
        navigate('/revenu/Revupload', { state: { revenuproductid, revenuproductname, currencyid, currencyname, activeon } });
    }
    replaceModalItemUpdate(revenuproductid, revenuproductname, currencyid, currencyname, activeon) {
        this.setState({
            revenuproductid: revenuproductid,
            revenuproductname: revenuproductname,
            currencyid: currencyid,
            currencyname: currencyname,
            activeon: activeon,
        });
        this.setState((prevState) => ({ showModaladd: !prevState.showModaladd }));
    }
    render() {
        if (!this.state.sources) {
            this.props.navigate('/pages/maintenence');
            return null; // Return null or loading spinner while redirecting
          }
        const { revenuproductname, totaldeposit, revprods,totalrev,difference } = this.state;
        //const difference = totalrev - totaldeposit;
       // const formattedDifference = new Intl.NumberFormat().format(difference);
        const items = ['NFR Advices', 'Diplications'];
        const { length: count } = this.state.sources;

        const { pageSize, currentPage, selectedrole, searchQuery, sources: allsources } = this.state;

        const { totalCount, data: sources } = this.getPagedData();
        const countproduct = this.state.ifmispaymentid;
        const fiscalyear = this.state.fiscalyear;

        const brochure = sources.map((sources, index) => {
            return (
                <tr key={sources.ifmispaymentid}>
                    <td>{sources.batchid}</td>
                    <td>{sources.revenueproductname}</td>
                    <td>{sources.totalamount}</td>
                    <td>{sources.localamount}</td>
                    <td>{sources.exchangerate}</td>
                    <td>{sources.startdate}</td>
                    <td>{sources.enddate}</td>
                    <td>{sources.status}</td>
                </tr>
            );
        });
        return (
            <div className="revenue-collection-container">
                <Col className="text-center">
                    <Card className="shadow border-0 revenue-card">
                        <CardHeader className="bg-transparent ">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center', // Center the whole row
                                    alignItems: 'center',
                                    gap: '30px', // This adds space between the cards
                                }}
                            >
                                {/* Right-aligned card (now on the left visually) */}
                                <div style={{ flex: 1, textAlign: 'right' }}>
                                    <Card>
                                        <div className="revenue-info">
                                            <div className="revenue-title">
                                                <h1 style={{ textAlign: 'center' }}>Revenue corrected in <small>{fiscalyear}</small></h1>
                                                <h4 style={{ textAlign: 'center' }}><p>Total Revenue Transfered</p></h4> 
                                                
                                            </div>
                                            <div className="revenue-summary">
                                                
                                                <h2 style={{ textAlign: 'center' }}>{new Intl.NumberFormat().format(totalrev)} Rwf</h2>
                                            </div>
                                        </div>
                                        <div className="currency-icon">
                                            {
                                                /**
                                                 * 
                                                 *  <MdOutlineEditNote size={44} color="#ffc107" />
                                            <FcCheckmark size={40} />
                                                 */
                                            }
                                       
                                            
                                        </div>
                                    </Card>
                                </div>

                                {/* Center card */}
                                <div style={{ flex: 1, textAlign: 'center' }}>
                                    <Card>
                                        <div className="revenue-info">
                                            <div className="revenue-title">
                                                <h1 style={{ textAlign: 'center' }}>Revenu on Account in <small>{fiscalyear}</small> </h1>
                                               
                                            </div>
                                            <div className="revenue-summary">
                                                <p style={{ textAlign: 'center' }}>Total Revenue received</p>
                                                <h2 style={{ textAlign: 'center' }}>{new Intl.NumberFormat().format(totaldeposit)} Rwf</h2>
                                            </div>
                                        </div> 
                                        <div className="currency-icon">
                                            {
                                                /**
                                                 *    
                                        <HiOutlineDocumentText size={44} color="#007bff" />
                                        <FcCurrencyExchange size={40} />
                                                 * 
                                                 */}
                                         
                                        </div>
                                    </Card>
                                </div>

                                {/* Left-aligned card (now on the right visually) */}
                                <div style={{ flex: 1, textAlign: 'left' }}>
                                    <Card>
                                        <div className="revenue-info">
                                            <div className="revenue-title">
                                                <h1 style={{ textAlign: 'center' }}>Budget balance in <small>{fiscalyear}</small></h1>
                                                
                                            </div>
                                            <div className="revenue-summary">
                                                <p style={{ textAlign: 'center' }}>balance</p>
                                                <h2 style={{ textAlign: 'center' }}>{new Intl.NumberFormat().format(difference)} Rwf</h2>
                                            </div>
                                        </div>
                                        <div className="currency-icon">
                                            {
                                                /**
                                                 * <FaBalanceScale size={44} color="#28a745" />
                                            <FcCurrencyExchange size={40} />
                                                 * 
                                                 */
                                            }
                                        
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </CardHeader>

                        <CardBody className="px-lg-6 py-lg-6">
                            <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                                <div className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden  ''}`}></div>
                               {/** <div
                                    className={`panel xl:block p-4 dark:gray-50 w-[250px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden ${''}`}
                                >
                                     
                                    <div className="flex flex-col h-full pb-8">
                                        <div>
                                            <ul>
                                                {items.map((item, index) => (
                                                    <li
                                                        key={index}
                                                        onClick={() => handleClick(item)}
                                                        className="cursor-pointer bg-gradient-to-r from-blue-200 to-white  text-black py-1 px-2 my-1 rounded"
                                                    >
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    
                                </div>*/}

                                <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                                    <div className="row">
                                        <div className="col">
                                            <div className="revenue-actions">
                                                {count === 0 && (
                                                    <>

                                                     
                                                        <Button
                                                            className="btn btn-primary"
                                                            onClick={() =>
                                                                this.replaceModalItemUpdate(
                                                                    this.state.revenuproductid,
                                                                    this.state.revenuproductname,
                                                                    this.state.currencyid,
                                                                    this.state.currencyname,
                                                                    this.state.activeon
                                                                )
                                                            }
                                                        >
                                                            <FcPlus /> Add NFR Advices
                                                        </Button>
                                                        
                                                        
                                                        <p>There are no Bank Statement in Database.</p>
                                                    </>
                                                )}
                                                {count !== 0 && (
                                                    <>

                                                   
                                                        <Button
                                                            className="btn btn-primary"
                                                            onClick={() =>
                                                                this.replaceModalItemUpdate(
                                                                    this.state.revenuproductid,
                                                                    this.state.revenuproductname,
                                                                    this.state.currencyid,
                                                                    this.state.currencyname,
                                                                    this.state.activeon
                                                                )
                                                            }
                                                        >
                                                            <FcPlus /> Add Bank Statements
                                                        </Button>
                                                        
                                                        

                                                        <div className="search-box">
                                                            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => this.handleSearch(e.target.value)} />
                                                        </div>
                                                        <div className="table-responsive">
                                                            <table className="revenue-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>batchNumber</th>
                                                                        <th>Revenue product</th>
                                                                        <th>Amount</th>
                                                                        <th>Local amount</th>
                                                                        <th>exchangerate</th>
                                                                        <th>Startdate</th>
                                                                        <th>Enddate</th>
                                                                        <th>status</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>{brochure}</tbody>
                                                            </table>
                                                        </div>
                                                    </>
                                                )}
                                                <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                                                <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default withNavigation(IFMISPayments);
