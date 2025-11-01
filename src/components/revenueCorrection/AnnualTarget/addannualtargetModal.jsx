import React from 'react';
import * as Product from '../../../services/RevenuRessources/productServices';
import * as AnnualTarget from '../../../services/RevenuRessources/targetservice';
import * as Source from '../../../services/RevenuRessources/sourceofFundsServices';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import Joi from 'joi-browser';
import * as PaymentModes from '../../../services/RevenuRessources/paymentModeservices';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import Form from '../../common/form';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';

class AddAnnualTargetModal extends Form {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                AnnualTargetid: 0,
                fiscalyear: '',
                paymentmodename: '',
                fiscalyearid: 0,
                AnnualTargetdiscription: '',
                AmountTargeted: 0,
                revenueproductname:'',
                revenueproductid:0
            },
            AnnualTargetid: 0,
                fiscalyear: '',
                paymentmodename: '',
                fiscalyearid: 0,
                AnnualTargetdiscription: '',
                AmountTargeted: 0,
                revenueproductid:0,
                revenueproductname:'',
            user: {},
            products: [],
            fiscalyears: [],
            sources: [],
            payments: [],
            paymentModes: [],
            errors: {},
        };
    }
    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
      
        const data = { ...this.state.data };
        data[input.name] = input.value;
      
        this.setState({ data, errors });
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
        fiscalyearid: Joi.number().required().label('Fiscal Year'),
        AnnualTargetdiscription: Joi.string().required().label('Annual Target Description'),
        AmountTargeted: Joi.number().required().min(1).label('Amount Targeted'),
        revenueproductid: Joi.number().required().label('Revenue product'),
    };

    handleClick = async (e) => {
        try {
            const { data } = this.state;
            const AnnualTargetid = 0;
            await AnnualTarget.addannualtarget(AnnualTargetid, this.state.data.fiscalyearid, this.state.data.AnnualTargetdiscription, this.state.data.AmountTargeted,this.state.data.revenueproductid);
            toast.success(`AnnualTarget data has been Added successfully`);
            
              window.location = '/revenu/annualtarget';
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
                    <h2>Add New Annual Target</h2>
                    <Card className=" shadow border-0">
                        <form onSubmit={this.handleSubmit}>
                            {this.renderSelectany('fiscalyearid', 'Fiscal Year', this.state.fiscalyears, 'fiscalyearid', 'fiscalyear')}
                            {this.renderInput('AnnualTargetdiscription', 'Annual Target discription', this.state.data.AnnualTargetdiscription, this.handleChange)}
        
                            {this.renderSelectany('revenueproductid', 'Revenue product', this.state.products, 'revenueproductid','revenueproductname')}
                           
                            {this.renderInput('AmountTargeted', 'Amount Targeted')}

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
AddAnnualTargetModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddAnnualTargetModal;
