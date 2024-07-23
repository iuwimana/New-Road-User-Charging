import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col } from 'reactstrap';

import { toast } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import * as Source from '../../../services/RevenuRessources/revenuCorrectionService';
import * as RevProdData from '../../../services/RevenuRessources/revenuPaymentServices';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as Contractpayment from '../../../services/contractpayment/contractpaymentservice';
import * as FiscalYearContractTypeData from '../../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice';

import { FcCurrencyExchange } from 'react-icons/fc';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../../searchBox';
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';

import ListGroup from './../../common/listGroup';
import ContractpaymentModal from './../../ContractManagemenrt/ContractSettings/contractpayment/contractpaymentModal';
import ContractType from './../../Menu/menusavedata';

class Expenduture extends Component {
    constructor(props) {
        super(props);

        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
        this.state = {
            fiscalyearsid: 0,
            fiscalyearid: 0,
            revenuproductid: 0,
            revenuproductname: '',
            projecttypeid: 0,
            projecttypename: '',
            totaldeposit: 0,
            fiscalyearcontracttypeid: 0,
            contracttypename: '',
            sources: [],
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
                // const fiscalyearsid = fiscalYears.map(year => year.fiscalyearid);
                //const fiscalyear = fiscalYears.map(year => year.fiscalyear);
                const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
                const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                //this.setState({ fiscalyearid, fiscalyear });
                this.setState({ fiscalyearsid, fiscalyear });
                const { data } = await FiscalYearContractTypeData.getfiscalyearcontracttypeByfiscalyearId(this.state.fiscalyearsid);
                const revprods = [{ fiscalyearcontracttypeid: 0, contracttypename: 'All Types' }, ...data];
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

            const { data: sources } = await Contractpayment.getcontractpaymentByFiscalyear(this.state.fiscalyearsid);
            this.setState({ sources });
        } catch (ex) {
            return toast.error('An Error Occured, while fetching role data Please try again later' + ex);
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
        const revenuproduct = JSON.stringify(revprod.fiscalyearcontracttypeid);
        const revenuproducts = JSON.stringify(revprod.contracttypename);
        this.setState({
            fiscalyearcontracttypeid: revenuproduct,
            contracttypename: revenuproducts,
        });
    };
    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, searchQuery, selectedrole, sources: allsources } = this.state;

        let filtered = allsources;
        if (searchQuery)
            filtered = allsources.filter(
                (m) =>
                    m.contracttypename.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
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
        else if (selectedrole && selectedrole.fiscalyearcontracttypeid) filtered = allsources.filter((m) => m.fiscalyearcontracttypeid === selectedrole.fiscalyearcontracttypeid);
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

    saveModalDetails(sources) {
        const requiredItem = this.state.requiredItem;
        let tempbrochure = this.state.sources;
        tempbrochure[requiredItem] = sources;
        this.setState({ sources: tempbrochure });
    }

    render() {
        const { length: count } = this.state.sources;
        const { pageSize, currentPage, selectedrole, searchQuery, sources: allsources } = this.state;

        const { totalCount, data: sources } = this.getPagedData();
        const countproduct = this.state.revenuproductid;
        const brochure = sources.map((sources, index) => {
            return (
                <tr key={sources.contractid}>
                    <td>{sources.refnumber}</td>
                    
                        <td>{sources.status}</td>
                   
                    <td>{sources.contractbudget}</td>
                    <td>{sources.contractorstartdate}</td>
                    <td>{sources.contractorenddate}</td>
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
                            <div className="btn-wrapper text-center"></div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div>
                                <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
                                    <div className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden  ''}`}></div>
                                    <div
                                        className={`panel xl:block p-4 dark:gray-50 w-[250px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden ${''}`}
                                    >
                                        <div className="flex flex-col h-full pb-16">
                                            <div className="pb-2">
                                                <br />
                                                <br />
                                                <br />
                                                <small>
                                                    <ListGroup
                                                        items={this.state.revprods}
                                                        className={`panel xl:block p-4 dark:gray-50 w-[150px] max-w-full flex-none space-y-3 xl:relative absolute z-10 xl:h-auto h-full hidden ltr:xl:rounded-r-md ltr:rounded-r-none rtl:xl:rounded-l-md rtl:rounded-l-none overflow-hidden ${''}`}
                                                        textProperty="contracttypename"
                                                        valueProperty="fiscalyearcontracttypeid"
                                                        selectedItem={this.state.selectedrole}
                                                        onItemSelect={this.handleselect}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </small>
                                            </div>

                                            
                                        </div>
                                    </div>

                                    <div className="panel p-0 flex-1 overflow-x-hidden h-full">
                                    {count === 0 && (
                                                    <>
                                                        {countproduct && countproduct !== '0' && (
                                                            <Link to="/revenu/upload" className="btn btn-success">
                                                                <FcPlus /> AddExpenduture
                                                            </Link>
                                                        )}
                                                        <p>There are revenu correction Payment in Database.</p>
                                                    </>
                                                )}
                                        {count !== 0 && (
                                            <>
                                                {countproduct && countproduct !== '0' && (
                                                    <NavLink
                                                        to={{
                                                            pathname: '/revenu/upload',
                                                            state: {
                                                                revenuproductid: this.state.revenuproductid,
                                                                revenuproductname: this.state.revenuproductname,
                                                            },
                                                        }}
                                                        className="btn btn-success"
                                                    >
                                                        <FcPlus />
                                                        AddExpenduture
                                                    </NavLink>
                                                )}

                                                <div style={{ textAlign: 'center' }}>
                                                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                                                </div>
                                                <div className="table-responsive mb-3">
                                                    <table className="table" style={{ widows: 25 }}>
                                                        <thead>
                                                            <tr>
                                                                <th>RefNumber</th>
                                                                <th>Status</th>
                                                                <th>Amount</th>
                                                                <th>Start date</th>
                                                                <th>End Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>{brochure}</tbody>
                                                    </table>
                                                </div>
                                            </>
                                        )}
                                        <Pagination  itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange}  />
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

export default Expenduture;
