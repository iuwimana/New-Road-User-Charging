import React, { Component } from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import * as CurrencyData from '../../../services/RevenuRessources/currencyServices';
import * as FisclaYearData from '../../../services/RMFPlanning/fiscalYearService';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyid: 0,
            fiscalyearid: 0,
            fiscalyear: '',
            islocked: true,
            isselected: true,
            user: {},
            errors: {},
            banks: [],
            paternerStatuses: [],
        };
    }
    schema = {
        fiscalyearid: Joi.number().required(),
        fiscalyear: Joi.string().required().label('currencyname'),
        islocked: Joi.boolean().required().label('countryname'),
        isselected: Joi.boolean().required(),
    };

    async componentDidMount() {
        const user = auth.getJwt();
        this.setState({ user });

        if (this.props.selectedfiscalyear) {
            const { fiscalyearid, fiscalyear, islocked, isselected } = this.props.selectedfiscalyear;
            this.setState({
                fiscalyearid: fiscalyearid || '',
                fiscalyear: fiscalyear || '',
                islocked: islocked || false,
                isselected: isselected || false,
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedfiscalyear && this.props.selectedfiscalyear.fiscalyearid !== prevProps.selectedfiscalyear?.fiscalyearid) {
            const { fiscalyearid, fiscalyear, islocked, isselected } = this.props.selectedfiscalyear;
            this.setState({
                fiscalyearid: fiscalyearid || '',
                fiscalyear: fiscalyear || '',
                islocked: islocked || false,
                isselected: isselected || false,
            });
        }
    }

    currencyidHandler(e) {
        this.setState({ fiscalyearid: e.target.value });
    }

    currencynameHandler(e) {
        this.setState({ fiscalyear: e.target.value });
    }

    async handleSave() {
        // const { user } = this.state;

        try {
            const item = this.state;
           // const islocked = false;
           // const isselected = false;
           //fiscalyearid, fiscalyear, islocked, isselected
            await FisclaYearData.addFiscalyear(this.state.fiscalyearid, this.state.fiscalyear, this.state.islocked, this.state.isselected);
            toast.success(
                `Business Paterner with   has been updated successful:
          `
            );

            if (this.props.refreshData) this.props.refreshData();

    // Close modal
         this.props.handleClose();
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
        if (!this.props.show) return null; // ntirere modal niba show = false
        
        return (
            <div className={`modal ${this.props.show ? 'd-block' : 'd-none'}`}>
                <div
                    className="modal-dialog"
                    role="document"
                    style={{
                        maxWidth: '370px',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                RMF Revenu Collection-Update Fiscal year
                            </h5>
                            <button type="button" className="btn btn-secondary" onClick={this.props.handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <input type="hidden" className="form-control" value={this.state.fiscalyearid} onChange={(e) => this.currencyidHandler(e)} placeholder="fiscalyearid" />
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">
                                            Fiscalyear
                                        </label>
                                        <input type="text" className="form-control" value={this.state.fiscalyear} onChange={(e) => this.currencynameHandler(e)} placeholder="fiscalyear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.props.handleClose}>
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => {
                                    this.handleSave();
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
