import React, { Component } from 'react';
//import Modal from './modal';
//import AddModal from './addroleModal';
import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import auth from '../../../services/authService';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import withNavigation from '../../revenueCorrection/revenuCorrection/withNavigation';
import * as Source from '../../../services/RevenuRessources/revenuCorrectionService';
import * as RevProdData from '../../../services/RevenuRessources/revenuPaymentServices';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import { FcCurrencyExchange, FcPlus } from 'react-icons/fc';
import { MdDashboard } from 'react-icons/md';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../../searchBox';
import _ from 'lodash';
import ListGroup from './../../common/listGroup';
//import { async } from './../../../services/security/userServices';

class RevenuDashboard extends Component {
    constructor(props) {
        super(props);
        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
        this.state = {
            fiscalyearsid: 0,
            revenuproductid: 0,
            revenueproductid: 0,
            startdate: '1000-01-01 00:00:00',
            enddate: '1000-01-01 00:00:00',
            revenuproductname: '',
            totaldeposit: 0,
            currencyid: 0,
            currencyname: '',
            activeon: '',
            sources: [],
            narative: [],
            services: [],
            revprod: [],
            revprods: [],
            fiscalyear: [],
            currentPage: 1,
            pageSize: 4,
            requiredItem: 0,
            brochure: [],
            searchQuery: '',
            selectedrole: null,
            search: [],
            sortColumn: { path: 'title', order: 'asc' },
        };
    }

    async populateBanks() {
        try {
            const response = await FiscalYear.getFiscalyears();
            if (response) {
                const fiscalYears = response.data;
                this.setState({ data: response });
                const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null;
                const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                this.setState({ fiscalyearsid, fiscalyear });

                const { data } = await RevProdData.getrevenupaymentByFiscalyear(this.state.fiscalyearsid);
                const revprods = [{ revenuproductid: 0, revenuepaymentid: 0, revenueproductname: 'All Products' }, ...data];
                this.setState({ revprods });
            } else {
                toast.error('No Fiscal year find......' + this.state.fiscalyearsid);
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
            }

            const { data: sources } = await Source.getrevenucorrectionByFiscalYearID(this.state.fiscalyearsid);
            const { data: narative } = await Source.getnarativedashboardrevenuecorrection(this.state.revenueproductid, this.state.startdate, this.state.enddate, this.state.fiscalyearsid);
            this.setState({ sources, narative });

            const deposit = [];
            sources.map((s) => deposit.push(s.deposit));
            this.setState({
                totaldeposit: deposit.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
            });
        } catch (ex) {
            return toast.error('An Error Occured, while fetching role data Please try again later' + ex);
        }
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    handleselect = async (revprod) => {
        this.setState({ selectedrole: revprod, searchQuery: '', currentPage: 1 });

        const revenuproduct = JSON.stringify(revprod.revenuepaymentid);
        const revenuproductID = JSON.stringify(revprod.revenueproductid);
        const revenuproducts = JSON.stringify(revprod.revenueproductname);
        const currencyid = JSON.stringify(revprod.currencyid);
        const currencyname = JSON.stringify(revprod.currencyname);
        const activeon = JSON.stringify(revprod.activeon);

        this.setState({
            revenuproductname: revenuproducts,
            currencyid: currencyid,
            currencyname: currencyname,
            activeon: activeon,
            revenueproductid: revenuproduct,
        });

        await this.componentDidMount();
    };

    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, searchQuery, selectedrole, sources: allsources } = this.state;
        let filtered = allsources;

        if (searchQuery) {
            filtered = allsources.filter(
                (m) =>
                    m.revenueproductname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.paymentmodename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.sourceoffundname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.accountnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.bankname.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.correctiondate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.transactiondetails.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.refnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.poref.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        } else if (selectedrole && selectedrole.revenuepaymentid) {
            filtered = allsources.filter((m) => m.revenuepaymentid === selectedrole.revenuepaymentid);
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const sources = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: sources };
    };

    replaceModalItem(index) {
        this.setState({ requiredItem: index });
    }

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

    async startdateHandler(e) {
        this.setState({ startdate: e.target.value });
        await this.componentDidMount();
    }

    async enddateHandler(e) {
        this.setState({ enddate: e.target.value });
        await this.componentDidMount();
    }

    render() {
        if (!this.state.sources) {
            this.props.navigate('/pages/maintenence');
            return null; // Return null or loading spinner while redirecting
        }

        const { pageSize, currentPage, selectedrole, searchQuery, sources: allsources } = this.state;
        const narative = this.state.narative;
        const { totalCount, data: sources } = this.getPagedData();
        const fiscalyear = this.state.fiscalyear;
        const brochure = sources.map((sources, index) => {
            return (
                <tr key={sources.revenuecorrectionid}>
                    <td>{sources.revenueproductname}</td>
                    {/*<td>{sources.bordername}</td>*/}
                    <td>{sources.sourceoffundname}</td>
                    <td>{sources.accountnumber}</td>
                    <td>{sources.bankname}</td>
                    <td>{sources.correctiondate}</td>
                    <td>{sources.deposit}</td>
                </tr>
            );
        });

        const requiredItem = this.state.requiredItem;
        let modalData = this.state.sources[requiredItem];
        const currentUser = auth.getCurrentUser();

        return (
            <div className="container mx-auto p-4">
                <Card className="shadow-lg border-0 rounded-2xl">
                    {/*<CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white flex items-center justify-between rounded-t-2xl">
                          <div className="flex items-center gap-2">
                            <MdDashboard size={28} />
                            <h3 className="text-lg font-semibold">Narative Dashbord for revenu collection</h3>
                          </div>
                          <span className="text-sm italic">Fiscal Year: <small>{this.state.fiscalyear + " "}</small></span>

                          
                        </CardHeader>*/}
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white flex flex-col md:flex-row items-center justify-between rounded-t-2xl gap-2 md:gap-0">
                        <div className="flex items-center gap-2">
                            <MdDashboard size={28} />
                            <h3 className="text-lg font-semibold">Narative Dashboard for Revenue Collection</h3>
                        </div>
                        <span className="text-sm italic mt-2 md:mt-0">
                            Fiscal Year: <small>{this.state.fiscalyear + ' '}</small>
                        </span>
                    </CardHeader>

                    <CardBody className="p-6 bg-gray-50">
                        <div className="rectangle9">
                            <div className="revPr">
                                <div className="row">
                                    {this.state.revenuproductname} {'Fiscal Year - '}
                                    <small>{this.state.fiscalyear + ' '}</small>
                                    <br />
                                </div>
                            </div>
                            {/** 
                            <div className="revsum">
                                Total revenu collected <big style={{ fontSize: 28 }}>{new Intl.NumberFormat().format(this.state.totaldeposit) + ' ' + 'Rwf'}</big>
                            </div>*/}
                            <div className="revsum text-center text-gray-700 mt-4">
                                <span className="block text-sm">Total Revenue Collected</span>
                                <span className="block text-2xl md:text-3xl font-bold">{new Intl.NumberFormat().format(this.state.totaldeposit)} Rwf</span>
                            </div>
                        </div>
                        <div className="row">
                            {/** 
                            <div className="col-3">
                                <div className="rectangle1">
                                    collections:{this.state.revenuproductname}
                                    <svg data-layer="011e3a76-3eb0-4c45-9c29-b97247d10934" preserveAspectRatio="none" viewBox="-0.75 -0.75 83.5 84.5" className="ellipse2">
                                        <path d="M 41 0 C 63.6436767578125 0 82 18.58018493652344 82 41.5 C 82 64.41981506347656 63.6436767578125 83 41 83 C 18.35632514953613 83 0 64.41981506347656 0 41.5 C 0 18.58018493652344 18.35632514953613 0 41 0 Z" />
                                    </svg>
                                    <div className="ellipse1">2</div>
                                </div>
                                <div className="rectangle9">
                                    <ListGroup
                                        items={this.state.revprods}
                                        textProperty="revenueproductname"
                                        valueProperty="revenuepaymentid"
                                        selectedItem={this.state.selectedrole}
                                        onItemSelect={this.handleselect}
                                    />
                                </div>
                            </div>*/}
                            <div className="col-3 md:col-3 mb-4 md:mb-0">
                                <div className="bg-white p-4 rounded-lg shadow text-center mb-4">
                                    <span className="font-semibold">Collections:</span>
                                    <p className="text-blue-600">{this.state.revenuproductname}</p>
                                </div>
                                {/* CSS iguma muri component */}
                                <style>
                                    {`
            .scrollbar-hidden::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Edge */
            }
            .scrollbar-hidden {
              -ms-overflow-style: none;  /* IE, Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}
                                </style>{' '}
                                <div className="bg-white p-2 rounded-lg shadow w-full text-right-start flex flex-col">
                                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
                                        <ListGroup
                                            className="w-full h-full"
                                            items={this.state.revprods}
                                            textProperty="revenueproductname"
                                            valueProperty="revenuepaymentid"
                                            selectedItem={this.state.selectedrole}
                                            onItemSelect={this.handleselect}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-sm font-medium">From</label>
                                        <input type="date" className="form-control text-sm" value={this.state.Value} onChange={(e) => this.startdateHandler(e)} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">To</label>
                                        <input type="date" className="form-control text-sm" value={this.state.Value} onChange={(e) => this.enddateHandler(e)} />
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow p-4 mt-4">
                                    {narative.map((n, index) => (
                                        <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                                            <span className="font-medium">Total Collected</span>
                                            <span>{new Intl.NumberFormat().format(n.totalamount)} USD</span>

                                            <span className="font-medium">Account Number</span>
                                            <span>{n.accountnumber}</span>

                                            <span className="font-medium">Bank</span>
                                            <span>{n.bankname}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                     <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white flex flex-col md:flex-row items-center justify-between rounded-t-2xl gap-2 md:gap-0">
                        <div className="flex items-center gap-2">
                            
                            <h3 className="text-lg font-semibold">Narative Dashboard for Contract Managementr</h3>
                        </div>
                        <span className="text-sm italic mt-2 md:mt-0">
                            Fiscal Year: <small>{this.state.fiscalyear + ' '}</small>
                        </span>
                    </CardHeader>
                    <CardBody className="p-6 bg-gray-50">
                        <div className="rectangle9">
                            <div className="revPr">
                                <div className="row">
                                    {this.state.revenuproductname} {'Fiscal Year - '}
                                    <small>{this.state.fiscalyear + ' '}</small>
                                    <br />
                                </div>
                            </div>
                            {/** 
                            <div className="revsum">
                                Total revenu collected <big style={{ fontSize: 28 }}>{new Intl.NumberFormat().format(this.state.totaldeposit) + ' ' + 'Rwf'}</big>
                            </div>*/}
                            <div className="revsum text-center text-gray-700 mt-4">
                                <span className="block text-sm">Total Revenue Collected</span>
                                <span className="block text-2xl md:text-3xl font-bold">{new Intl.NumberFormat().format(this.state.totaldeposit)} Rwf</span>
                            </div>
                        </div>
                        <div className="row">
                            {/** 
                            <div className="col-3">
                                <div className="rectangle1">
                                    collections:{this.state.revenuproductname}
                                    <svg data-layer="011e3a76-3eb0-4c45-9c29-b97247d10934" preserveAspectRatio="none" viewBox="-0.75 -0.75 83.5 84.5" className="ellipse2">
                                        <path d="M 41 0 C 63.6436767578125 0 82 18.58018493652344 82 41.5 C 82 64.41981506347656 63.6436767578125 83 41 83 C 18.35632514953613 83 0 64.41981506347656 0 41.5 C 0 18.58018493652344 18.35632514953613 0 41 0 Z" />
                                    </svg>
                                    <div className="ellipse1">2</div>
                                </div>
                                <div className="rectangle9">
                                    <ListGroup
                                        items={this.state.revprods}
                                        textProperty="revenueproductname"
                                        valueProperty="revenuepaymentid"
                                        selectedItem={this.state.selectedrole}
                                        onItemSelect={this.handleselect}
                                    />
                                </div>
                            </div>*/}
                            <div className="col-3 md:col-3 mb-4 md:mb-0">
                                <div className="bg-white p-4 rounded-lg shadow text-center mb-4">
                                    <span className="font-semibold">Collections:</span>
                                    <p className="text-blue-600">{this.state.revenuproductname}</p>
                                </div>
                                {/* CSS iguma muri component */}
                                <style>
                                    {`
            .scrollbar-hidden::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Edge */
            }
            .scrollbar-hidden {
              -ms-overflow-style: none;  /* IE, Edge */
              scrollbar-width: none;  /* Firefox */
            }
          `}
                                </style>{' '}
                                <div className="bg-white p-2 rounded-lg shadow w-full text-right-start flex flex-col">
                                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hidden">
                                        <ListGroup
                                            className="w-full h-full"
                                            items={this.state.revprods}
                                            textProperty="revenueproductname"
                                            valueProperty="revenuepaymentid"
                                            selectedItem={this.state.selectedrole}
                                            onItemSelect={this.handleselect}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-sm font-medium">From</label>
                                        <input type="date" className="form-control text-sm" value={this.state.Value} onChange={(e) => this.startdateHandler(e)} />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">To</label>
                                        <input type="date" className="form-control text-sm" value={this.state.Value} onChange={(e) => this.enddateHandler(e)} />
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow p-4 mt-4">
                                    {narative.map((n, index) => (
                                        <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                                            <span className="font-medium">Total Collected</span>
                                            <span>{new Intl.NumberFormat().format(n.totalamount)} Rwf</span>

                                            <span className="font-medium">Account Number</span>
                                            <span>{n.accountnumber}</span>

                                            <span className="font-medium">Bank</span>
                                            <span>{n.bankname}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default withNavigation(RevenuDashboard);
