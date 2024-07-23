import React, { Component } from 'react';
import * as Source from '../../../services/RevenuRessources/sourceofFundsServices';
import * as Product from '../../../services/RevenuRessources/productServices';
import * as Payment from '../../../services/RevenuRessources/revenuPaymentServices';
import * as PaymentModes from '../../../services/RevenuRessources/paymentModeservices';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            data: { RevenuePaymentId: 0, paymentmodeid: 0, RevenueProductId: 0, Value: 0, fiscalyearid: this.props.fiscalyearid },
            RevenuePaymentId: 0,
            paymentmodeid: 0,
            revenueProductname:"",
            RevenueProductId: 0,
            paymentmodename: '',
            Value: 0,
            fiscalyearid: this.props.fiscalyearid,
            user: {},
            sources: [],
            errors: {},
            banks: [],
            payments: [],
            paymentModes: [],
            revenues: [],
            products: [],
        };
    }
    schema = {
        RevenuePaymentId: Joi.number().required(),
        paymentmodeid: Joi.number().required(),
        RevenueProductId: Joi.number().required(),
        Value: Joi.number().required(),
    };
    async populateBanks() {
        try {
            const { data: products } = await Product.getrevenuproducts();
            const { data: paymentModes } = await PaymentModes.getpaymentModes();
            const { data: sources } = await Source.getSource();
            this.setState({ products, paymentModes, sources });
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
            RevenuePaymentId: nextProps.RevenuePaymentId,
            revenueProductname: nextProps.RevenueProductname,
            PaymentModename: nextProps.PaymentModename,
            RevenueProductId: nextProps.RevenueProductId,
            paymentmodeid: nextProps.paymentmodeid,
            SourceofFundname: nextProps.SourceofFundname,
            AccountNumber: nextProps.AccountNumber,
            Bankname: nextProps.Bankname,
            RevenueTypename: nextProps.RevenueTypename,
            Value: nextProps.Value,
        });
    }

    RevenuePaymentIdHandler(e) {
        this.setState({ RevenuePaymentId: e.target.value });
    }
    PaymentModeIdHandler(e) {
        this.setState({ paymentmodeid: e.target.value });
    }
    RevenueProductIdHandler(e) {
        this.setState({ RevenueProductId: e.target.value });
    }
    valueHandler(e) {
        this.setState({ Value: e.target.value });
    }

    handleSave = async (e) => {
        // const { user } = this.state;
        //RevenuePaymentId,paymentmodeid,RevenueProductId,Value,fiscalyearid
        try {
            const data = this.state;
            await Payment.addRevenuepayment(data.RevenuePaymentId, data.paymentmodeid, data.RevenueProductId, data.Value, data.fiscalyearid);
            toast.success(
                `Revenuepayment data ${data.RevenuePaymentId} and${data.paymentmodeid} and${data.RevenueProductId} and${data.Value}  fiscalyearid:${data.fiscalyearid} and  has been updated successful`
            );
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
        if (!this.props.show) {
            return null;
        }
        const paymentModes = this.state.paymentModes;
        const products = this.state.products;
        return (
            <>
                <div className="modal-backdrop" onClick={this.props.onClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Update Collection unit rate</h2>
                        <Card className=" shadow border-0">
                        <div className="mb-3">
                                    <input
                                        type="hidden"
                                        className="form-control"
                                        value={this.state.RevenuePaymentId}
                                        onChange={(e) => this.RevenuePaymentIdHandler(e)}
                                        placeholder="RevenueProductId"
                                    />
                                </div>

                                <div className="mb-3">
                                    <div className="col-auto">
                                        <label htmlFor="exampleFormControlInput1">Payment Mode</label>
                                    </div>
                                    <div className="col-auto">
                                        <select name="paymentmodeid" id="paymentmodeid" className="form-control" onChange={(e) => this.PaymentModeIdHandler(e)}>
                                            <option value={this.state.paymentmodeid}>{this.state.paymentmodename}</option>
                                            {paymentModes.map((paymentModes) => (
                                                <option key={paymentModes.paymentmodeid} value={paymentModes.paymentmodeid}>
                                                    {paymentModes.paymentmodename}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="col-auto">
                                        <label htmlFor="exampleFormControlInput1">Collection</label>
                                    </div>
                                    <div className="col-auto">
                                        <select name="RevenueProductId" id="RevenueProductId" className="form-control" onChange={(e) => this.RevenueProductIdHandler(e)}>
                                            <option value={this.state.RevenueProductId}>{this.state.revenueProductname}</option>
                                            {products.map((products) => (
                                                <option key={products.revenueproductid} value={products.revenueproductid}>
                                                    {products.revenueproductname}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">
                                        Value
                                    </label>
                                    <input type="text" className="form-control" value={this.state.Value} onChange={(e) => this.valueHandler(e)} placeholder="amount to be payed" />
                                </div>

                                <CardFooter>
                            <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleSave}>
                                    Update
                                </button>
                        </CardFooter>


                        </Card>
                    </div>
                </div>
                
            </>
        );
    }
}
Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};


export default Modal;
