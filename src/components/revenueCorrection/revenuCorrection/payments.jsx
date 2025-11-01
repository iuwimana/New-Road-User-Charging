import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Col, Card, CardHeader, CardBody, ListGroup, Button } from 'reactstrap';
import { FcCurrencyExchange, FcPlus } from 'react-icons/fc';

import { useNavigate } from 'react-router-dom';
import withNavigation from '../../revenueCorrection/revenuCorrection/withNavigation';
import * as AnnualTargets from '../../../services/RevenuRessources/targetservice';
import { FcLock, FcCheckmark } from 'react-icons/fc';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { MdOutlineEditNote } from 'react-icons/md';
import { FaBalanceScale } from 'react-icons/fa';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as BankStatement from '../../../services/RevenuRessources/ifmisPaymentServices';
import * as payments from '../../../services/RevenuRessources/Bankstatementservice';
import * as RevProdData from '../../../services/RevenuRessources/revenuPaymentServices';
import * as Revcor from '../../../services/RevenuRessources/revenuCorrectionService';
import AddModal from './AddIFIMSPayment';
import RevenueCorrectionDetailsModal from './RevenueCorrectionDetailsModal';
import './collection.css'; // Import your CSS file for styling
import _ from 'lodash';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import SearchBox from '../../searchBox';
import 'bootstrap/dist/css/bootstrap.min.css';

class Payments extends React.Component {
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
            totalTarget: 0,
            balance: 0,
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
            pageSize: 20,
            requiredItem: 0,
            brochure: [],
            selectedrole: null,
            showModaladd: false,
            search: [],
            sortColumn: { path: 'title', order: 'asc' },
        };
    }
    toggleModaladd = () => {
        this.setState((prevState) => ({ showModaladd: !prevState.showModaladd }));
    };
    toggleDetailsModal = (summaryId = null) => {
        this.setState((prev) => ({
            showDetailsModal: !prev.showDetailsModal,
            selectedSummaryId: summaryId,
        }));
    };
    handlerollback = async (revenuecorrectionsummaryid) => {
        try {
            if (!revenuecorrectionsummaryid) {
                toast.info(`the payment receipt you selected  doesnot exist`);
            } else {
                await payments.rollbackbankstatement(revenuecorrectionsummaryid);
                toast.success(`this payment receipt has been rolled back successful`);
                this.componentDidMount();
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

        toast.info(`revenuproductid: ${revenuproductid},revenuproductname: ${revenuproductname}, currencyid: ${currencyid},currencyname: ${currencyname},activeon: ${activeon}`);
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
                //const { data: sources } = await BankStatement.getifmispaymentbyfiscalyear(this.state.fiscalyearsid);
                const { data: sources } = await Revcor.getrevenucorrectionsummaryByFiscalYearID(this.state.fiscalyearsid);
                const { data: revenue } = await AnnualTargets.getannualtargetByFiscalyears(this.state.fiscalyearsid);
                this.setState({ sources });
                //toast.info(`...${JSON.stringify(sources)}`);
                if (!Array.isArray(sources)) {
                    throw new Error('Invalid data format received from the server.');
                }
                if (!Array.isArray(revenue)) {
                    throw new Error('Invalid data format received from the server.');
                }

                //const { data: annualTargets } = await AnnualTargets.getannualtargetByFiscalyear(this.state.fiscalyearsid);

                const deposit = [];
                const amount = 0;
                const deplist = sources.map((sources) => {
                    deposit.push(sources.depositamount);
                });

                const targets = revenue[0].sum;
                const totalTarget = revenue[0].sum;
                const balance = totalTarget - deposit.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                this.setState({
                    totaldeposit: deposit.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
                    totalTarget: totalTarget,
                    balance: balance,
                });
            } else {
                const { data: sources } = await Revcor.getrevenucorrectionsummaryByFiscalYearID(this.state.fiscalyearsid);
                this.setState({ sources });

                const deposit = [];
                const amount = 0;
                const deplist = sources.map((sources) => {
                    deposit.push(sources.depositamount);
                });

                this.setState({
                    totaldeposit: deposit.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
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
                    // m.depositamount.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.accountnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.currencyname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    //m.bankname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.status.toLowerCase().startsWith(searchQuery.toLowerCase())
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
        {
            /**
             if (!this.state.sources) {
            this.props.navigate('/pages/maintenence');
            return null; // Return null or loading spinner while redirecting
          }
            
            */
        }

        const { revenuproductname, totaldeposit, revprods, totalTarget, balance } = this.state;
        const items = ['NFR Advices', 'Diplications'];
        const { length: count } = this.state.sources;

        const { pageSize, currentPage, selectedrole, searchQuery, sources: allsources } = this.state;

        const { totalCount, data: sources } = this.getPagedData();
        const countproduct = this.state.ifmispaymentid;
        const fiscalyear = this.state.fiscalyear;

        const brochure = sources.map((sources, index) => {
            return (
                <tr key={sources.revenuecorrectionsummaryid}>
                    <td>{sources.revenueproductname}</td>
                    <td>
                        {new Intl.NumberFormat().format(sources.depositamount)} {sources.currencyname}
                    </td>
                    <td>{new Date(sources.correctioninitiationdate).toLocaleDateString()}</td>
                    <td>{sources.status}</td>
                    <td>{sources.revenueperiod}</td>
                    <td>{sources.accountnumber}</td>
                    <td>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <Button color="primary" size="sm" className="py-0 px-1" style={{ fontSize: '1rem' }} onClick={() => this.toggleDetailsModal(sources.revenuecorrectionsummaryid)}>
                                View Details
                            </Button>
                            <Button color="secondary" size="sm" className="py-0 px-1" style={{ fontSize: '1rem' }} onClick={() => this.handlerollback(sources.revenuecorrectionsummaryid)}>
                                Roll Back
                            </Button>
                        </div>
                    </td>
                </tr>
            );
        });
        return (
            <div className="container-fluid py-3">
                <Col className="text-center">
                    <Card className="shadow border-0">
                        <CardHeader className="bg-white d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                            {[
                                {
                                    title: 'Annual Target',
                                    subtitle: `Fiscal Year - ${fiscalyear}`,
                                    value: totalTarget,
                                    icon: <MdOutlineEditNote size={44} color="#ffc107" />,
                                    color: '#f0f8ff',
                                },
                                {
                                    title: 'Revenue Correct',
                                    subtitle: `Fiscal Year - ${fiscalyear}`,
                                    value: totaldeposit,
                                    icon: <HiOutlineDocumentText size={44} color="#007bff" />,
                                    color: '#fff7e6',
                                },
                                {
                                    title: 'Budget Balance',
                                    subtitle: `Fiscal Year - ${fiscalyear}`,
                                    value: balance,
                                    icon: <FaBalanceScale size={44} color="#28a745" />,
                                    color: '#e6ffed',
                                },
                            ].map((card, i) => (
                                <Card key={i} className="p-3 flex-fill" style={{ background: card.color, minWidth: 200 }}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="text-primary mb-2">{card.title}</h5>
                                            <p className="text-muted mb-1">{card.subtitle}</p>
                                            <h3 className="fw-bold">{new Intl.NumberFormat().format(card.value)} USD</h3>
                                        </div>
                                        <div>{card.icon}</div>
                                    </div>
                                </Card>
                            ))}
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
                                                        <p>There are no Bank Statement in Database.</p>
                                                    </>
                                                )}
                                                {count !== 0 && (
                                                    <>
                                                        <div className="search-box">
                                                            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => this.handleSearch(e.target.value)} />
                                                        </div>
                                                        <div className="table-responsive">
                                                            <table className="revenue-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Revenue product</th>
                                                                        <th>Amount</th>
                                                                        <th>Correction date</th>
                                                                        <th>Status</th>
                                                                        <th>Period</th>
                                                                        <th>AccountNumber</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>{brochure}</tbody>
                                                            </table>
                                                        </div>
                                                    </>
                                                )}
                                                <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                                                <RevenueCorrectionDetailsModal isOpen={this.state.showDetailsModal} toggle={this.toggleDetailsModal} summaryId={this.state.selectedSummaryId} />
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

export default withNavigation(Payments);
