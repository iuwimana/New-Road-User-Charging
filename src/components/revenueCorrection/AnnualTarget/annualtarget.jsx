import React, { Component, useLocation } from 'react';
import Modal from './updateannualtargetModal';
import AddModal from './addannualtargetModal';
import { toast } from 'react-toastify';
import * as AnnualTargets from '../../../services/RevenuRessources/targetservice';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBox from '../../searchBox';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';
import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import './modal.css';

class AnnualTarget extends Component {
    constructor(props) {
        super(props);

        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.saveModalDetails = this.saveModalDetails.bind(this);
        this.state = {
            AnnualTargetid: 0,
            fiscalyear: '',
            paymentmodename: '',
            fiscalyearid: 0,
            AnnualTargetdiscription: '',
            AmountTargeted: 0,
            revenueproductname:'',
            revenueproductid:0,
            

            data: null,
            fiscalyearsid: 0,
            value: 0,
            products: [],
            annualTargets: [],
            fiscalyears: [],
            currentPage: 1,
            pageSize: 4,
            requiredItem: 0,
            brochure: [],
            searchQuery: '',
            selectedrole: null,
            showModalupdate: false,
            showModaladd: false,
            search: [],
            sortColumn: { path: 'title', order: 'asc' },
        };
    }
    toggleModalupdate = () => {
        this.setState((prevState) => ({ showModalupdate: !prevState.showModalupdate }));
    };
    toggleModaladd = () => {
        this.setState((prevState) => ({ showModaladd: !prevState.showModaladd }));
    };
    async populateBanks() {
        try {
            //const { data: fiscalyear } = await FiscalYear.getFiscalyears();
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
                
                const { data: annualTargets } = await AnnualTargets.getannualtargetByFiscalyear(this.state.fiscalyearsid);
                if (annualTargets) {
                    this.setState({ annualTargets });
                } else toast.error('no product fund' + this.state.fiscalyearsid);
            } else {
                const { data: annualTargets } = await AnnualTargets.getannualtargetByFiscalyear(this.state.fiscalyearsid);
                if (annualTargets) {
                    this.setState({ annualTargets });
                } else toast.error('no product fund' + this.state.fiscalyearsid);
            }
        } catch (ex) {
            return toast.error('An Error Occured, while fetching annual target data Please try again later' + ex);
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
        const { pageSize, currentPage, sortColumn, searchQuery, selectedrole, annualTargets: allproducts } = this.state;

        let filtered = allproducts;
        if (searchQuery)
            filtered = allproducts.filter(
                (m) =>
                    m.fiscalyear.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.annualtargetdiscription.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                    m.amounttargeted.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        else if (selectedrole && selectedrole.annualtargetid) filtered = allproducts.filter((m) => m.product.annualtargetid === selectedrole.annualtargetid);
        ///////////////////////////////////////////
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const annualTargets = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: annualTargets };
    };
    replaceModalItem(AnnualTargetid, fiscalyearid, fiscalyear, AnnualTargetdiscription, AmountTargeted,revenueproductid,revenueproductname) {
        this.setState({
            AnnualTargetid: AnnualTargetid,
            fiscalyearid: fiscalyearid,
            fiscalyear: fiscalyear,
            AnnualTargetdiscription: AnnualTargetdiscription,
            AmountTargeted: AmountTargeted,
            revenueproductid:revenueproductid,
            revenueproductname:revenueproductname,
            showModalupdate: true, // Make sure to show the modal
        });
    }

    async fiscalyearidHandler(e) {
        this.setState({ fiscalyearid: e.target.value });
        await this.componentDidMount();
    }

    saveModalDetails(products) {
        const requiredItem = this.state.requiredItem;
        let tempbrochure = this.state.products;
        tempbrochure[requiredItem] = products;
        this.setState({ products: tempbrochure });
    }

    async deleteItem(annualtargetid) {
        //const { user } = this.state;

        try {
            if (!annualtargetid) {
                toast.info(`the revenu Payment you selected  doesnot exist ${annualtargetid}`);
            } else {
                await AnnualTargets.deleteannualtarget(annualtargetid);
                toast.success(`this annual Target has been deleted successful`);
                window.location = '/revenu/annualtarget';
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
                toast.error('An Error Occured, while saving revenu Payment Please try again later');
            }
        }
    }

    render() {
        const { length: count } = this.state.annualTargets;
        const { pageSize, currentPage, searchQuery } = this.state;
        const { totalCount, data: annualTargets } = this.getPagedData();

        const brochure = annualTargets.map((annualTargets, index) => {
            return (
                <tr key={annualTargets.annualtargetid}>
                    <td>{annualTargets.fiscalyear}</td>
                    <td>{annualTargets.revenueproductname}</td>
                    <td>{annualTargets.annualtargetdiscription}</td>
                    <td>{annualTargets.amounttargeted}</td>

                    <td>
                        <button
                            className="btn btn-primary"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() =>
                                this.replaceModalItem(
                                    annualTargets.annualtargetid, // was AnnualTargetid
                                    annualTargets.fiscalyearid,
                                    annualTargets.fiscalyear,
                                    annualTargets.annualtargetdiscription, // was AnnualTargetdiscription
                                    annualTargets.amounttargeted, // was AmountTargeted
                                    annualTargets.revenueproductid,
                                    annualTargets.revenueproductname
                                )
                            }
                        >
                            <AiFillEdit />
                            Update
                        </button>{' '}
                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={() => this.deleteItem(annualTargets.annualtargetid)}>
                            <AiFillDelete />
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });

        const requiredItem = this.state.requiredItem;
        let modalData = this.state.products[requiredItem];
        const fiscalyear = this.state.fiscalyear;
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
                    {/** 
          <select
            name="fiscalyearid"
            id="fiscalyearid"
            className="form-control"
            onChange={(e) => this.fiscalyearidHandler(e)}
            onClick={(e) => this.fiscalyearidHandler(e)}
          >
            {fiscalyear.map((fiscalyear) => (
              <option
                key={fiscalyear.fiscalyearid}
                value={fiscalyear.fiscalyearid}
              >
                {fiscalyear.fiscalyear}
              </option>
            ))}
          </select>
          */}
                    <Col />
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
                                <div>
                                    {count === 0 && (
                                        <>
                                            <button className="btn btn-success" onClick={this.toggleModaladd}>
                                                <FcPlus />
                                                AddTarget
                                            </button>
                                            <p>There are no Annual Target in Database.</p>
                                            <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                                        </>
                                    )}
                                    {count !== 0 && (
                                        <>
                                            <button className="btn btn-success" onClick={this.toggleModaladd}>
                                                <FcPlus />
                                                AddTarget
                                            </button>
                                            <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                                            <div style={{ textAlign: 'center' }}>
                                                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                                            </div>
                                            <div className="table-responsive mb-5">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Fiscal year</th>
                                                            <th>Revenue productname</th>
                                                            <th>Annual target discription</th>
                                                            <th>Amount targeted</th>

                                                            <th>Update</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>{brochure}</tbody>
                                                </table>
                                            </div>

                                            {this.state.showModalupdate && (
                                                <Modal
                                                    show={this.state.showModalupdate}
                                                    onClose={this.toggleModalupdate}
                                                    AnnualTargetid={this.state.AnnualTargetid}
                                                    fiscalyearid={this.state.fiscalyearid}
                                                    fiscalyear={this.state.fiscalyear}
                                                    AnnualTargetdiscription={this.state.AnnualTargetdiscription}
                                                    AmountTargeted={this.state.AmountTargeted}
                                                    revenueproductid={this.state.revenueproductid}
                                                    revenueproductname={this.state.revenueproductname}
                                                />
                                            )}
                                        </>
                                    )}

                                    <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default AnnualTarget;
