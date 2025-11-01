import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'; // React-Bootstrap
import * as source from '../../../services/RevenuRessources/sourceofFundsServices';
import { toast } from 'react-toastify';
import * as bank from '../../../services/RevenuRessources/bankservices';
import * as RevenuType from '../../../services/RevenuRessources/revenuTypeServices';
import * as CurrencyData from '../../../services/RevenuRessources/currencyServices';
import Form from '../../common/form'; // assuming you have Form component

class UpdateSourceModal extends Form {
    state = {
        data: {
            SourceofFundId: 0,
            SourceofFundname: '',
            AccountNumber: '',
            bankid: 0,
            revenuetypeid: 0,
            currencyid: 0,
            StartDate: '',
            EndDate: '',
        },
        banks: [],
        revenues: [],
        currencies: [],
        errors: {},
    };

    schema = {
        SourceofFundId: '',
        SourceofFundname: 'string|required',
        AccountNumber: 'string|required',
        bankid: 'number|required',
        revenuetypeid: 'number|required',
        currencyid: 'number|required',
        StartDate: 'date',
        EndDate: 'date',
    };

    async populateDropdowns() {
        try {
            const { data: banks } = await bank.getbanks();
            const { data: revenues } = await RevenuType.getrevenuTypes();
            const { data: currencies } = await CurrencyData.getcurrencies();
            this.setState({ banks, revenues, currencies });
        } catch (ex) {
            toast.error('Error loading dropdown data');
        }
    }

    componentDidMount() {
        this.populateDropdowns();
        this.populateData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.source && prevProps.source?.SourceofFundId !== this.props.source.SourceofFundId) {
            this.populateData();
        }
    }

    populateData() {
        const { source } = this.props;
        if (!source) return;

        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const data = {
            SourceofFundId: source.sourceoffundid,
            SourceofFundname: source.sourceoffundname,
            AccountNumber: source.accountnumber,
            bankid: source.bankid,
            revenuetypeid: source.revenuetypeid,
            currencyid: source.currencyid,
            StartDate: formatDate(source.startdate) || '',
            EndDate: formatDate(source.enddate) || '',
        };
        this.setState({ data });
    }

    doSubmit = async () => {
        try {
            const { data } = this.state;
            await source.addsource(data.SourceofFundId, data.SourceofFundname, data.AccountNumber, data.bankid, data.revenuetypeid, data.currencyid, data.StartDate, data.EndDate);
            toast.success(`Source "${data.SourceofFundname}" updated successfully`);
            if (this.props.refreshData) this.props.refreshData();
            if (this.props.handleClose) this.props.handleClose();
        } catch (ex) {
            toast.error('Error saving source: ' + ex.message);
        }
    };

    render() {
        const { show, handleClose } = this.props;
        const { banks, revenues, currencies } = this.state;

        return (
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Update Source of Fund</Modal.Title>
                </Modal.Header>
                <form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        {this.renderInput('SourceofFundname', 'Source Name')}
                        {this.renderInput('AccountNumber', 'Account Number')}
                        <div className="row">
                            <div className="col">{this.renderSelect('bankid', 'Bank', banks, 'bankid', 'bankname')}</div>
                            <div className="col">{this.rendernewSelect('revenuetypeid', 'Revenue Type', revenues, 'revenuetypeid', 'revenuetypename')}</div>
                            <div className="col">{this.rendernewSelect('currencyid', 'Currency', currencies, 'currencyid', 'currencyname')}</div>
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
                        <Button variant="primary" onClick={this.doSubmit}>
                            Update
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default UpdateSourceModal;
