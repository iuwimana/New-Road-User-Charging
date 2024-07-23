import React, { Component } from 'react';
import Joi from 'joi-browser';
import { MdNotificationsActive } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import * as Outcome from '../../../services/RMFPlanning/outcomeService';
import * as bank from '../../../services/RevenuRessources/bankservices';
import * as PaternerStatuses from '../../../services/RevenuRessources/paternerStatusServices';
import * as BusinessPaterner from '../../../services/RevenuRessources/businessPaternerServices';
import './Modal.css';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';
class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            data: {
                OutcomeId: 2,
                OutComeName: '',
                FiscalYear: '',
                statuses: '',
                OutcomeDescription: '',
                SubProgramName: '',
                ProgramName: '',
            },
            OutcomeId: 2,
            OutComeName: '',
            FiscalYear: '',
            statuses: '',
            OutcomeDescription: '',
            SubProgramName: '',
            ProgramName: '',
            user: {},
            errors: {},
            banks: [],
            outcomes: [],
            paternerStatuses: [],
        };
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({
            OutcomeId: nextProps.OutcomeId,
            OutComeName: nextProps.OutComeName,
            FiscalYear: nextProps.FiscalYear,
            statuses: nextProps.statuses,
            OutcomeDescription: nextProps.OutcomeDescription,
            SubProgramName: nextProps.SubProgramName,
            ProgramName: nextProps.ProgramName,
        });
        const { data: outcomes } = await Outcome.getoutcomeforSAP(nextProps.OutcomeId);
        this.setState({ outcomes });
    }
    async populateBanks() {
        try {
            const item = this.state;
            const { data: banks } = await bank.getbanks();

            const { data: paternerStatuses } = await PaternerStatuses.getpaternerstatuses();
            this.setState({ banks, paternerStatuses });
        } catch (ex) {
            toast.error('Loading issues......');
        }
    }
    async componentDidMount() {
        await this.populateBanks();
        const user = auth.getJwt();
        this.setState({ user });
    }

    titleHandler(e) {
        this.setState({ title: e.target.value });
    }

    msgHandler(e) {
        this.setState({ msg: e.target.value });
    }

    PartenerStatusIdHandler(e) {
        this.setState({ PartenerStatusId: e.target.value });
    }
    BankIdHandler(e) {
        this.setState({ BankId: e.target.value });
    }
    InstitutionPartenerIdHandler(e) {
        this.setState({ InstitutionPartenerId: e.target.value });
    }
    InstitutionPartenerNameHandler(e) {
        this.setState({ InstitutionPartenerName: e.target.value });
    }

    AccountNumberHandler(e) {
        this.setState({ AccountNumber: e.target.value });
    }
    async handleSave() {}

    render() {
        if (!this.props.show) {
            return null;
        }
        const paternerStatuses = this.state.paternerStatuses;
        const outcomes = this.state.outcomes;
        const OutComeName = this.setState.OutComeName;
        const SubProgramName = this.state.SubProgramName;
        const ProgramName = this.state.ProgramName;
        const brochure = outcomes.map((outcomes, index) => {
            return (
                <tr key={outcomes.OutcomeId} border={1}>
                    <td>{outcomes.outputname}</td>
                    <td>{outcomes.indicatorname}</td>
                    <td>{outcomes.baselinename}</td>
                    <td>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {outcomes.startingquarter}
                    </td>
                    <td>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        {outcomes.endingquarter}
                    </td>
                    <td>{outcomes.targetname}</td>
                    <td>{outcomes.activityname}</td>
                    <td>{outcomes.stakeholdername}</td>
                    <td>{outcomes.estimatedbudget}</td>
                    <td>{outcomes.sourceoffundname}</td>
                </tr>
            );
        });
        return (
            <div className="modal-backdrop" onClick={this.props.onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <CardHeader>
                        <h5 className="modal-title" id="exampleModalLabel">
                            <div style={{ alignItems: 'left' }}>
                                RMFPlanning-View SAP
                                <br />
                                Program:{this.state.ProgramName}
                                <br />
                                Sub Program:{this.state.SubProgramName}
                            </div>
                        </h5>
                        <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                    Close
                                </button>
                    </CardHeader>

                    <Card className=" shadow border-0">
                        <div className="table-responsive mb-5">
                            <table className="table" cellpadding="0" cellspacing="0" border={1}>
                                <tr class="heading" border={1}>
                                    <td>Output</td>
                                    <td>Indicators </td>
                                    <td>Baseline</td>
                                    <td colspan="3">
                                        <table>
                                            <tr>
                                                <td colspan="3"> Targets/ Milestones</td>
                                            </tr>
                                            <tr>
                                                {' '}
                                                <td>From Quarter</td> <td>To Quarter</td> <td>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Target</td>{' '}
                                            </tr>{' '}
                                        </table>
                                    </td>
                                    <td>Activities to Deliver output </td>
                                    <td>Stakeholders</td>
                                    <td>Estimated budget in Rwf</td>
                                    <td> Source of Fund</td>
                                </tr>

                                <tr>
                                    <td colspan="10">
                                        <b>Outcome:{this.state.OutComeName}</b>
                                    </td>
                                    <br />
                                    <br />
                                </tr>
                                <tr></tr>

                                {brochure}
                            </table>

                           
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Modal;
