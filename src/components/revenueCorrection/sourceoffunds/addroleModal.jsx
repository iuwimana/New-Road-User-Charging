import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as source from '../../../services/RevenuRessources/sourceofFundsServices';
import * as bank from '../../../services/RevenuRessources/bankservices';
import * as RevenuType from '../../../services/RevenuRessources/revenuTypeServices';
import * as CurrencyData from '../../../services/RevenuRessources/currencyServices';
import { toast } from 'react-toastify';

class AddSourceModal extends React.Component {
    state = {
        data: {
            SourceofFundId: 0,
            SourceofFundname: '',
            AccountNumber: '',
            bankid: '',
            revenuetypeid: '',
            currencyid: '',
            StartDate: '',
            EndDate: '',
        },
        banks: [],
        revenues: [],
        currencies: [],
        errors: {},
    };

    async componentDidMount() {
        await this.populateDropdowns();
    }

    populateDropdowns = async () => {
        try {
            const { data: banks } = await bank.getbanks();
            const { data: revenues } = await RevenuType.getrevenuTypes();
            const { data: currencies } = await CurrencyData.getcurrencies();
            toast.info(`..............${banks}..${JSON.stringify(revenues)}`);
            this.setState({ banks, revenues, currencies });
        } catch (ex) {
            toast.error('Error loading dropdown data');
        }
    };

    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = this.state;
            await source.addsource(data.SourceofFundId, data.SourceofFundname, data.AccountNumber, data.bankid, data.revenuetypeid, data.currencyid, data.StartDate, data.EndDate);
            toast.success(`Source "${data.SourceofFundname}" added successfully`);
            if (this.props.refreshData) this.props.refreshData();
            if (this.props.handleClose) this.props.handleClose();
            // reset form
            this.setState({
                data: {
                    SourceofFundId: 0,
                    SourceofFundname: '',
                    AccountNumber: '',
                    bankid: '',
                    revenuetypeid: '',
                    currencyid: '',
                    StartDate: '',
                    EndDate: '',
                },
            });
        } catch (ex) {
            toast.error('Error saving source of fund: ' + ex.message);
        }
    };

    renderInput(name, label, type = 'text') {
        const { data } = this.state;
        return (
            <div className="form-group">
                <label>{label}</label>
                <input name={name} value={data[name]} onChange={this.handleChange} type={type} className="form-control" />
            </div>
        );
    }

    renderSelect(name, label, options, valueKey = 'id', textKey = 'name') {
        const { data } = this.state;
        return (
            <div className="form-group">
                <label>{label}</label>
                <select name={name} value={data[name]} onChange={this.handleChange} className="form-control">
                    <option value="">Select {label}</option>
                    {options.map((opt) => (
                        <option key={opt[valueKey]} value={opt[valueKey]}>
                            {opt[textKey]}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    render() {
        const { show, handleClose } = this.props;
        const { banks, revenues, currencies } = this.state;

        return (
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Source of Fund</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.renderInput('SourceofFundname', 'Source Name')}
                    {this.renderInput('AccountNumber', 'Account Number')}
                    <div className="row">
                        <div className="col">{this.renderSelect('bankid', 'Bank', banks, 'bankid', 'bankname')}</div>
                        <div className="col">{this.renderSelect('revenuetypeid', 'Revenue Type', revenues, 'revenuetypeid', 'revenuetypename')}</div>
                        <div className="col">{this.renderSelect('currencyid', 'Currency', currencies, 'currencyid', 'currencyname')}</div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">{this.renderInput('StartDate', 'Start Date', 'date')}</div>
                        <div className="col">{this.renderInput('EndDate', 'End Date', 'date')}</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Add New
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddSourceModal;
