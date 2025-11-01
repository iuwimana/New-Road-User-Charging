import React, { Component } from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as auth from '../../../../services/authService';
import * as bank from '../../../../services/RevenuRessources/bankservices';
import * as PaternerStatuses from '../../../../services/RevenuRessources/paternerStatusServices';
import * as BusinessPaterner from '../../../../services/RevenuRessources/businessPaternerServices';
import * as ContractType from '../../../../services/ContractManagement/ContractSetting/contractTypeService';
import * as FiscalYearContractType from '../../../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';

class AddroleModal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            data: { fiscalyearcontracttypeid: 0, contracttypeid: 0, contracttypename: '', fiscalyearid: 0 },

            fiscalyearcontracttypeid: 0,
            contracttypeid: 0,
            fiscalyearid: 0,
            contracttypename: '',
            fiscalyearids: 0,

            Bankname: '',
            user: {},
            errors: {},
            banks: [],
            contracttypes: [],
            paternerStatuses: [],
        };
    }
    schema = {
        fiscalyearcontracttypeid: Joi.number().required(),
        contracttypeid: Joi.number().required(),
        fiscalyearid: Joi.number().required(),
        contracttypename: Joi.string().required().label('contracttypename'),
    };
    async populateBanks() {
        try {
            const { data: contracttypes } = await ContractType.getcontracttypes();
            const { data: banks } = await bank.getbanks();
            const { data: paternerStatuses } = await PaternerStatuses.getpaternerstatuses();
            this.setState({ banks, paternerStatuses, contracttypes });
        } catch (ex) {
            toast.error('Loading issues......');
        }
    }
    async componentDidMount() {
        await this.populateBanks();
        const user = auth.getJwt();
        this.setState({ user });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            fiscalyearids: nextProps.fiscalyearid,
            fiscalyearid: nextProps.fiscalyearid,
            contracttypename: nextProps.contracttypename,
            contracttypeid: nextProps.contracttypeid,
            fiscalyearcontracttypeid: nextProps.fiscalyearcontracttypeid,
        });
    }

    titleHandler(e) {
        this.setState({ title: e.target.value });
    }

    msgHandler(e) {
        this.setState({ msg: e.target.value });
    }

    contracttypenamedHandler(e) {
        this.setState({ contracttypename: e.target.value });
    }
    contracttypeidHandler(e) {
        this.setState({ contracttypeid: e.target.value });
    }
    fiscalyearidHandler(e) {
        this.setState({ fiscalyearid: e.target.value });
    }
    fiscalyearcontracttypeidHandler(e) {
        this.setState({ fiscalyearcontracttypeid: e.target.value });
    }

    async handleSave() {
        // const { user } = this.state;

        try {
            const item = this.state;
            const fiscalyearcontracttypeid = 0;

            await FiscalYearContractType.addfiscalyearcontracttype(fiscalyearcontracttypeid, item.fiscalyearid, item.contracttypeid);
            toast.success(
                `Business Paterner with   has been updated successful:fiscalyearcontracttypeid:${fiscalyearcontracttypeid} ,fiscalyearids: ${item.fiscalyearids},contracttypeid: ${item.contracttypeid} `
            );
            //const { state } = this.props.location;
            //window.location = state ? state.from.pathname : "/security/role";
            //this.props.history.push("/security/role");

            //this.props.saveModalDetails(item);
            //(myString.toLowerCase() === 'true');
            //toast.info(` ${item.roleid} and ${item.rolename} and ${item.isSystemRole} and ${item.description}`);
            // const item = this.state;
            //this.props.saveModalDetails(item);
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
                toast.error('An Error Occured, while saving role Please try again later');
            }
        }
    }

    render() {
        const contracttypes = this.state.contracttypes;
        return (
            <>
                <div >
                    <div >
                        <h2>Add Contract Type</h2>
                        <Card className=" shadow border-0">
                            <div className="text-muted text-right mt-2 mb-3">
                                <h1>
                                    <CardHeader className="bg-transparent ">
                                        <div style={{ textAlign: 'center' }}>
                                            <small>
                                                <small>
                                                    {' '}
                                                    <small>
                                                        <b>
                                                            <small>Add Contract Type</small>
                                                        </b>
                                                    </small>
                                                </small>
                                            </small>
                                        </div>
                                    </CardHeader>
                                </h1>
                            </div>
                            <div className="btn-wrapper text-start">
                                <br></br>
                            </div>

                            <div className="mb-3">
                                <div className="mb-3">
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        name="fiscalyearcontracttypeid"
                                        id="fiscalyearcontracttypeid"
                                        value={this.state.fiscalyearcontracttypeid}
                                        onChange={(e) => this.fiscalyearcontracttypeidHandler(e)}
                                    />
                                    <input type="hidden" className="form-control" name="fiscalyearid" id="fiscalyearid" value={this.state.fiscalyearid} onChange={(e) => this.fiscalyearidHandler(e)} />
                                    <div className="row">
                                        <div className="col">
                                            <div className="col-auto">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">
                                                    Contract Type
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="col-auto">
                                                <select name="contracttypeid" id="contracttypeid" className="form-control" onChange={(e) => this.contracttypeidHandler(e)}>
                                                    <option value={this.state.contracttypeid}></option>
                                                    {contracttypes.map((contracttypes) => (
                                                        <option key={contracttypes.contracttypeid} value={contracttypes.contracttypeid}>
                                                            {contracttypes.contracttypename}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/**----------------------------------------------------------------- */}
                                </div>
                            </div>
                            <CardFooter>
                                <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                    Close
                                </button>{' '}
                                
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={() => {
                                        this.handleSave();
                                    }}
                                >
                                    Save
                                </button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                
            </>
        );
    }
}

export default AddroleModal;
