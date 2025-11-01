import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Col, Card, CardHeader, CardBody, ListGroup, Button } from 'reactstrap';
import { FcCurrencyExchange, FcPlus } from 'react-icons/fc';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as BankStatement from '../../../services/RevenuRessources/Bankstatementservice';
import * as Advices from '../../../services/RevenuRessources/nfradviceservices';
import * as RevProdData from '../../../services/RevenuRessources/revenuPaymentServices';
import AddModal from './addBankStatment';
import './collection.css'; // Import your CSS file for styling
import _ from 'lodash';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import SearchBox from '../../searchBox';
import 'bootstrap/dist/css/bootstrap.min.css';

class Bankstatement extends React.Component {

//const Bankstatement = () => {
    state = {
                count: 1,
                countproduct: '1',
                totalCount: 10,
    
                fiscalyearname: this.props.fiscalyearname,
    
                revenuproductid: 0,
                NFRAdvices: [],
                revenuproductname: '',
                totaldeposit: 0,
                nfradviceid: 0,
                currencyid: 0,
                currencyname: '',
                activeon: '',
                sources: [],
                advices:[],
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
                searchQuery: '',
                selectedrole: null,
                showModaladd: false,
                search: [],
                sortColumn: { path: 'title', order: 'asc' },
            };
        
        toggleModaladd = () => {
            this.setState((prevState) => ({ showModaladd: !prevState.showModaladd }));
        };
        replaceModalItemUpdate() {
            
            
            this.setState((prevState) => ({ showModaladd: !prevState.showModaladd }));
    
           
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
    
                    const { data: sources } = await BankStatement.getbankstatementbyfiscalyear(this.state.fiscalyearsid);
                    this.setState({ sources });
    
                    if (!Array.isArray(sources)) {
                        throw new Error("Invalid data format received from the server.");
                    }
    
                    const deposit = [];
                    const amount = 0;
                    const deplist = sources.map((sources) => {
                        deposit.push(sources.amount);
                    });
    
                    this.setState({
                        totaldeposit: deposit.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
                    });
                } else {
                    const { data: sources } = await BankStatement.getbankstatementbyfiscalyear(this.state.fiscalyearsid);
                    this.setState({ sources });
    
                    const deposit = [];
                    const amount = 0;
                    const deplist = sources.map((sources) => {
                        deposit.push(sources.amount);
                    });
    
                    this.setState({
                        totaldeposit: deposit.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
                    });
                    if (!Array.isArray(sources)) {
                        throw new Error("Invalid data format received from the server.");
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
                        m.accountnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.bankname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                        m.paymentdate.toLowerCase().startsWith(searchQuery.toLowerCase())
                    // m.amount.toLowerCase().startsWith(searchQuery.toLowerCase())
                    // m.DocId.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    //m.refnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    //m.correctiondate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    // m.poref.toLowerCase().startsWith(searchQuery.toLowerCase())
                );
            else if (selectedrole && selectedrole.nfradviceid) filtered = allsources.filter((m) => m.nfradviceid === selectedrole.nfradviceid);
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
    
        async deleteItem(RevenueCorrectionId) {
            //const { user } = this.state;
    
            try {
                if (!RevenueCorrectionId) {
                    toast.info(`the Revenue Correction you selected  doesnot exist`);
                } else {
                    await Source.deleterevenucorrection(RevenueCorrectionId);
                    toast.success(`this revenu Correction has been deleted successful`);
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
                    toast.error('An Error Occured, while saving revenu Correction Please try again later');
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
           
            const { length: count } = this.state.sources;
    
            const { pageSize, currentPage, selectedrole, searchQuery, sources: allsources } = this.state;
    
            const { totalCount, data: sources } = this.getPagedData();
            const countproduct = this.state.nfradviceid;
            const fiscalyear = this.state.fiscalyear;
    
            const brochure = sources.map((sources, index) => {
                return (
                    <tr key={sources.nfradviceid}>
                        <td>{sources.revenueproductname}</td>
                        {/*<td>{sources.bordername}</td>*/}
                        {/* <td>{sources.sourceoffundname}</td>*/}
                        <td>{sources.accountnumber}</td>
                        <td>{sources.bankname}</td>
                        <td>{sources.paymentdate}</td>
                        <td>{sources.amount}</td>
                    </tr>
                );
            });
    
            const requiredItem = this.state.requiredItem;
            let modalData = this.state.sources[requiredItem];
            //const { revenuproductname, fiscalyear, totaldeposit, revprods, selectedrole, searchQuery, count, countproduct, totalCount, pageSize, currentPage } = this.state;
            const items = ['Bank statements', 'Diplications', 'NFR Advices not in Bank Statement', 'Bank Statement not in NFR Advices'];
            return (
                <div className="revenue-collection-container">
                    <Col className="text-center">
                        <Card className="shadow border-0 revenue-card">
                            <CardHeader className="bg-transparent revenue-header">
                                <div className="revenue-info">
                                    <div className="revenue-title">
                                        <h1 style={{ textAlign: 'center' }}>Bank Statement collection</h1>
                                        <p>Fiscal Year - {fiscalyear}</p>
                                    </div>
                                    <div className="revenue-summary">
                                        <p>Total Amount Deposit</p>
                                        <h2>{new Intl.NumberFormat().format(this.state.totaldeposit)} USD</h2>
                                    </div>
                                </div>
                                <div className="currency-icon">
                                    <FcCurrencyExchange size={20} />
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-6 py-lg-6 ">
                                <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                                    <div className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden  ''}`}></div>
                                    <div
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
                                    </div>
    
                                    <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                                        <div className="row">
                                            <div className="col">
                                                <div className="revenue-actions">
                                                    {count === 0 && (
                                                        <>
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() =>
                                                                    this.replaceModalItemUpdate(
                                                                        
                                                                    )
                                                                }
                                                            >
                                                                <FcPlus /> Add BankStement
                                                            </button>{' '}
                                                            <p>There are no Bank Statement in Database.</p>
                                                        </>
                                                    )}
                                                    {count !== 0 && (
                                                        <>
                                                            <Button
                                                                className="btn btn-primary"
                                                                onClick={() =>
                                                                    this.replaceModalItemUpdate(
                                                                       
                                                                    )
                                                                }
                                                            >
                                                                <FcPlus /> Add BankStement
                                                            </Button>
    
                                                            <div className="search-box">
                                                                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => this.handleSearch(e.target.value)} />
                                                            </div>
                                                            <div className="table-responsive">
                                                                <table className="revenue-table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Product</th>
                                                                            <th>Account</th>
                                                                            <th>Bank</th>
                                                                            <th>Service Period</th>
                                                                            <th>Deposit</th>
                                                                        </tr>
                                                                    </thead>
    
                                                                    <tbody>{brochure}</tbody>
                                                                </table>
                                                            </div>
                                                        </>
                                                    )}
                                                    <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                                                    
                                                    <div className="pagination">
                                                        <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                                                    </div>
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

export default Bankstatement;
