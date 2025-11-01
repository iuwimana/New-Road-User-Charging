import React, { Component } from 'react';
import * as Source from '../../../services/RevenuRessources/sourceofFundsServices';
import * as Product from '../../../services/RevenuRessources/productServices';
import * as Payment from '../../../services/RevenuRessources/revenuPaymentServices';
import * as PaymentModes from '../../../services/RevenuRessources/paymentModeservices';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as AnnualTarget from '../../../services/RevenuRessources/targetservice';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';

class UpdateAnnualTargetModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            AnnualTargetid: props.AnnualTargetid || 0,
            fiscalyearid: props.fiscalyearid || 0,
            fiscalyear: props.fiscalyear || '',
            AnnualTargetdiscription: props.AnnualTargetdiscription || '',
            revenueproductname:props.revenueproductname || '',
            revenueproductid: props.revenueproductid || 0,
            AmountTargeted: props.AmountTargeted || 0,
            fiscalyears: [],

            user: {},
            products: [],
            sources: [],
            payments: [],
            paymentModes: [],
            errors: {},
        };
    }

    schema = {
        fiscalyearid: Joi.number().required().label('Fiscal Year'),
        AnnualTargetdiscription: Joi.string().required().label('Annual Target Description'),
        AmountTargeted: Joi.number().required().min(1).label('Amount Targeted'),
        revenueproductid: Joi.number().required().label('Revenue product'),
    };
    async populateBanks() {
        try {
            const { data: products } = await Product.getrevenuproducts();
            const { data: paymentModes } = await PaymentModes.getpaymentModes();
            const { data: sources } = await Source.getSource();
            const { data: fiscalyears } = await FiscalYear.getFiscalyears();
            this.setState({ products, paymentModes, sources, fiscalyears });
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
            AnnualTargetid: nextProps.AnnualTargetid,
            fiscalyear: nextProps.fiscalyear,
            fiscalyearid: nextProps.fiscalyearid,
            AnnualTargetdiscription: nextProps.AnnualTargetdiscription,
            AmountTargeted: nextProps.AmountTargeted,
            revenueproductid: nextProps.revenueproductid,
            revenueproductname: nextProps.revenueproductname,
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    AnnualTargetidHandler(e) {
        this.setState({ AnnualTargetid: e.target.value });
    }
    fiscalyearidHandler(e) {
        this.setState({ fiscalyearid: e.target.value });
    }
    AnnualTargetdiscriptionHandler(e) {
        this.setState({ AnnualTargetdiscription: e.target.value });
    }
    AmountTargetedHandler(e) {
        this.setState({ AmountTargeted: e.target.value });
    }

    handleSubmit = async (e) => {
        // const { user } = this.state;
        //RevenuePaymentId,paymentmodeid,RevenueProductId,Value,fiscalyearid
        try {
            const { AnnualTargetid, fiscalyearid, AnnualTargetdiscription, AmountTargeted,revenueproductid } = this.state;
            await AnnualTarget.addannualtarget(AnnualTargetid, fiscalyearid, AnnualTargetdiscription, AmountTargeted,revenueproductid);
            //toast.success('Annual target updated successfully!');
            //this.props.onClose(); 
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
                toast.error('An Error Occured, while saving Revenuepayment Please try again later');
            }
        }
    };

    render() {
        if (!this.props.show) return null;

        return (
            <div className="modal-backdrop" onClick={this.props.onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Update Annual Target</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="hidden" className="form-control" value={this.state.AnnualTargetid} readOnly />
                        </div>

                        <div className="form-group">
                            <label>Fiscal Year</label>
                            <select name="fiscalyearid" className="form-control" value={this.state.fiscalyearid} onChange={this.handleChange}>
                                {this.state.fiscalyears.map((year) => (
                                    <option key={year.fiscalyearid} value={year.fiscalyearid}>
                                        {year.fiscalyear}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <input type="text" name="AnnualTargetdiscription" className="form-control" value={this.state.AnnualTargetdiscription} onChange={this.handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Revenue product</label>
                            <select name="revenueproductid" className="form-control" value={this.state.revenueproductid} onChange={this.handleChange}>
                                {this.state.products.map((products) => (
                                    <option key={products.revenueproductid} value={products.revenueproductid}>
                                        {products.revenueproductname}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Amount Targeted</label>
                            <input type="number" name="AmountTargeted" className="form-control" value={this.state.AmountTargeted} onChange={this.handleChange} />
                        </div>

                        <div className="modal-footer">
                        <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                Close
                            </button>
                            
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

UpdateAnnualTargetModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    AnnualTargetid: PropTypes.number,
    fiscalyearid: PropTypes.number,
    fiscalyear: PropTypes.string,
    AnnualTargetdiscription: PropTypes.string,
    AmountTargeted: PropTypes.number,
};

export default UpdateAnnualTargetModal;
