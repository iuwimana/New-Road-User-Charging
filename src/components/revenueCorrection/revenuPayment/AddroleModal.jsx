import React from 'react';
import * as Product from '../../../services/RevenuRessources/productServices';
import * as Payment from '../../../services/RevenuRessources/revenuPaymentServices';
import * as Source from '../../../services/RevenuRessources/sourceofFundsServices';
import * as FiscalYear from "../../../services/RMFPlanning/fiscalYearService";
import Joi from 'joi-browser';
import * as PaymentModes from '../../../services/RevenuRessources/paymentModeservices';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import Form from '../../common/form';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';

class AddroleModal extends Form {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                RevenuePaymentId: 0,
                paymentmodeid: 0,
                revenueproductid: 0,
                Value: 0,
            },
            fiscalyearsid: 0,
            fiscalyear: '',
            user: {},
            products: [],
            sources: [],
            payments: [],
            paymentModes: [],
            errors: {},
        };
    }
    async populateBanks() {
        try {
          const { data: products } = await Product.getrevenuproducts();
            const { data: paymentModes } = await PaymentModes.getpaymentModes();
            const { data: sources } = await Source.getSource();
            this.setState({ products, paymentModes, sources });
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
            RevenuePaymentId: nextProps.RevenuePaymentId,
            RevenueProductname: nextProps.RevenueProductname,
            PaymentModename: nextProps.PaymentModename,
            RevenueProductId: nextProps.RevenueProductId,
            PaymentModeId: nextProps.PaymentModeId,
            SourceofFundname: nextProps.SourceofFundname,
            AccountNumber: nextProps.AccountNumber,
            Bankname: nextProps.Bankname,
            RevenueTypename: nextProps.RevenueTypename,
            Value: nextProps.Value,
            fiscalyearid: nextProps.fiscalyearid,
        });
    }
    schema = {
        RevenuePaymentId: Joi.number().required(),
        paymentmodeid: Joi.number().required(),
        revenueproductid: Joi.number().required(),
        Value: Joi.number().required(),
    };

    handleClick = async (e) => {
        try {
            const { data } = this.state;
            const RevenuePaymentId = 0;
            await Payment.addRevenuepayment(RevenuePaymentId, data.paymentmodeid, data.revenueproductid, data.Value, this.state.fiscalyearsid);

            toast.success(`Revenuepayment data   has been updated successful paymentmodeid:
      ${data.paymentmodeid}, 
      revenueproductid:${data.revenueproductid} 
      Value: ${data.Value}
      fiscalyearid:${data.fiscalyearid}`);
      window.location = "/revenu/revenupayment";
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
        return (
            <div className="modal-backdrop" onClick={this.props.onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2>Add Collection unit rate</h2>
                    <Card className=" shadow border-0">
                        <form onSubmit={this.handleSubmit}>
                            {this.renderSelectPaymentMode('paymentmodeid', 'Payment Mode', this.state.paymentModes)}
                            {this.renderSelectRevenuProduct('revenueproductid', 'collection', this.state.products)}
                            {this.renderInput('Value', 'Value')}

                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleClick}>
                                    AddNew
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                    Close
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        );
    }
}
AddroleModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddroleModal;
