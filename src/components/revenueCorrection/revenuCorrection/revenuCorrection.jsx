import React, { Component } from 'react';
//import Modal from './modal';
import AddModal from './addroleModal';

import { toast } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import * as Source from '../../../services/RevenuRessources/revenuCorrectionService';
import * as RevProdData from '../../../services/RevenuRessources/revenuPaymentServices';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import { FcCurrencyExchange } from 'react-icons/fc';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../../searchBox';
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';
import './collection.css';
import ListGroup from './../../common/listGroup';
import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import './model.css';

class RevenuCorrection extends Component {
    constructor(props) {
        super(props);

        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
        this.state = {
            fiscalyearname: this.props.fiscalyearname,

            revenuproductid: 0,
            revenuproductname: '',
            totaldeposit: 0,
            currencyid: 0,
            currencyname: '',
            activeon: '',
            sources: [],
            services: [],
            revprod: [],
            revprods: [],
            data: null,
            fiscalyearsid: 0,
            fiscalyear: [],
            currentPage: 1,
            pageSize: 4,
            requiredItem: 0,
            brochure: [],
            searchQuery: '',
            selectedrole: null,
            showModaladd: false,
            search: [],
            sortColumn: { path: 'title', order: 'asc' },
        };
    }
    toggleModaladd = () => {
        this.setState((prevState) => ({ showModaladd: !prevState.showModaladd }));
    };
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
                const { data: revenupaymentByFiscalyear } = await RevProdData.getrevenupaymentByFiscalyear(this.state.fiscalyearsid);

                const revprods = [{ revenuepaymentid: 0, revenueproductname: 'All Products' }, ...revenupaymentByFiscalyear];

                this.setState({ revprods });

                const { data: sources } = await Source.getrevenucorrectionByFiscalYearID(this.state.fiscalyearsid);
                this.setState({ sources });

                const deposit = [];
                const amount = 0;
                const deplist = sources.map((sources) => {
                    deposit.push(sources.deposit);
                });

                this.setState({
                    totaldeposit: deposit.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
                });
            } else {
                const { data: revenupaymentByFiscalyear } = await RevProdData.getrevenupaymentByFiscalyear(this.state.fiscalyearsid);

                const revprods = [{ revenuepaymentid: 0, revenueproductname: 'All Products' }, ...revenupaymentByFiscalyear];

                this.setState({ revprods });

                const { data: sources } = await Source.getrevenucorrectionByFiscalYearID(this.state.fiscalyearsid);
                this.setState({ sources });

                const deposit = [];
                const amount = 0;
                const deplist = sources.map((sources) => {
                    deposit.push(sources.deposit);
                });

                this.setState({
                    totaldeposit: deposit.reduce((accumulator, currentValue) => accumulator + currentValue, 0),
                });
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
    handleselect = (revprod) => {
        this.setState({ selectedrole: revprod, searchQuery: '', currentPage: 1 });
        const revenuproduct = JSON.stringify(revprod.revenuepaymentid);
        const revenuproducts = JSON.stringify(revprod.revenueproductname);
        const currencyid = JSON.stringify(revprod.currencyid);
        const currencyname = JSON.stringify(revprod.currencyname);
        const activeon = JSON.stringify(revprod.activeon);
        this.setState({
            revenuproductid: revenuproduct,
            revenuproductname: revenuproducts,
            currencyid: currencyid,
            currencyname: currencyname,
            activeon: activeon,
        });
        
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
                    m.correctiondate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.transactiondetails.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    // m.DocId.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.refnumber.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.correctiondate.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.poref.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedrole && selectedrole.revenuepaymentid) filtered = allsources.filter((m) => m.revenuepaymentid === selectedrole.revenuepaymentid);
        ///////////////////////////////////////////
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const sources = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: sources };
    };
    replaceModalItem(index) {
        this.setState({
            requiredItem: index,
        });
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
        const countproduct = this.state.revenuproductid;
        const fiscalyear = this.state.fiscalyear;
        const brochure = sources.map((sources, index) => {
            return (
                <tr key={sources.revenuecorrectionid}>
                    <td>{sources.revenueproductname}</td>
                    {/*<td>{sources.bordername}</td>*/}
                    {/* <td>{sources.sourceoffundname}</td>*/}
                    <td>{sources.accountnumber}</td>
                    <td>{sources.bankname}</td>
                    <td>{sources.correctiondate}</td>
                    <td>{sources.deposit}</td>
                </tr>
            );
        });

        const requiredItem = this.state.requiredItem;
        let modalData = this.state.sources[requiredItem];
        return (
            <div
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Col
                    style={{
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Col
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    ></Col>
                    <Card className=" shadow border-0">
                        <CardHeader className="bg-transparent ">
                            <div data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb" className="rectangle9">
                                <div data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb" className="revPr">
                                    <div className="row">
                                        <big style={{ fontSize: 28 }}>revenu collection</big>
                                    </div>
                                    <div className="row">
                                        @{this.state.revenuproductname}
                                        {'- on fiscay Year - ' + this.state.fiscalyear}
                                    </div>
                                </div>
                                <div data-layer="20c15a3f-13e0-4171-8397-666e3afce4eb" className="revsum">
                                    Total revenu collected <big style={{ fontSize: 28 }}> {new Intl.NumberFormat().format(this.state.totaldeposit) + ' ' + 'Rwf'}</big>
                                </div>
                            </div>
                            <svg data-layer="503cdd18-2d99-4021-824e-3d8e0cce609d" preserveAspectRatio="none" viewBox="0 0 82 83" className="ellipse3">
                                <FcCurrencyExchange />
                            </svg>
                            <div className="btn-wrapper text-center"></div>
                        </CardHeader>
                        <CardBody className="px-lg-6 py-lg-6">
                            <div className="row">
                                <div className="col-5">
                                    <div style={{ height: 380, width: 10 }}>
                                        <ListGroup
                                            items={this.state.revprods}
                                            textProperty="revenueproductname"
                                            valueProperty="revenuepaymentid"
                                            selectedItem={this.state.selectedrole}
                                            onItemSelect={this.handleselect}
                                        />
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div>
                                        <div>
                                            {count === 0 && (
                                                <>
                                                    {countproduct && countproduct !== '0' && (
                                                        <>
                                                            <button
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
                                                                <FcPlus /> AddRevenus
                                                            </button>{' '}
                                                            {/** 
                                                            <NavLink
                                                                to={{
                                                                    pathname: '/revenu/Revupload',
                                                                    state: {
                                                                        revenuproductid: this.state.revenuproductid,
                                                                        revenuproductname: this.state.revenuproductname,
                                                                        currencyid: this.state.currencyid,
                                                                        currencyname: this.state.currencyname,
                                                                        activeon: this.state.activeon,
                                                                    },
                                                                }}
                                                                exact
                                                                className="btn btn-success"
                                                            >
                                                                <FcPlus />
                                                                AddRevenus
                                                            </NavLink>
                                                            */}
                                                        </>
                                                    )}
                                                    <p>There are revenu correction Payment in Database.</p>
                                                </>
                                            )}
                                            {count !== 0 && (
                                                <>
                                                    {countproduct && countproduct !== '0' && (
                                                        <>
                                                            <button
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
                                                                <FcPlus /> AddRevenus
                                                            </button>{' '}
                                                            {/** 
                                                            <NavLink
                                                                to={{
                                                                    pathname: '/revenu/Revupload',
                                                                    state: {
                                                                        revenuproductid: this.state.revenuproductid,
                                                                        revenuproductname: this.state.revenuproductname,
                                                                        currencyid: this.state.currencyid,
                                                                        currencyname: this.state.currencyname,
                                                                        activeon: this.state.activeon,
                                                                    },
                                                                }}
                                                                className="btn btn-success"
                                                            >
                                                                <FcPlus />
                                                                AddRevenu
                                                            </NavLink>
                                                            */}
                                                        </>
                                                    )}

                                                    <div style={{ textAlign: 'center' }}>
                                                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
                                                    </div>
                                                    <div className="table-responsive mb-5">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Product</th>
                                                                    <th>Account </th>
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
                                            <AddModal
                                                revenuproductid={this.state.revenuproductid}
                                                revenuproductname={this.state.revenuproductname}
                                                currencyid={this.state.currencyid}
                                                activeon={this.state.activeon}
                                                currencyname={this.state.currencyname}
                                                saveModalDetails={this.saveModalDetails}
                                                show={this.state.showModaladd}
                                                onClose={this.toggleModaladd}
                                            />
                                            <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
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

export default RevenuCorrection;
