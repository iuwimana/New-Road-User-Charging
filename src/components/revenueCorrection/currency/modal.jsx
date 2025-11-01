import React, { Component } from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import * as CurrencyData from '../../../services/RevenuRessources/currencyServices';

class UpdateCurrencyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyid: '',
            currencyname: '',
            countryname: '',
            buyrate: '',
            salerate: '',
            user: {},
            errors: {},
        };
    }

    schema = {
        currencyid: Joi.number().required(),
        currencyname: Joi.string().required().label('Currency Name'),
        countryname: Joi.string().required().label('Country Name'),
        buyrate: Joi.number().required().label('Buying Rate'),
        salerate: Joi.number().required().label('Selling Rate'),
    };

    async componentDidMount() {
        const user = auth.getJwt();
        this.setState({ user });
        if (this.props.selectedCurrency) {
            const { currencyid, currencyname, countryname, buyrate, salerate } = this.props.selectedCurrency;

            this.setState({
                currencyid: currencyid || '',
                currencyname: currencyname || '',
                countryname: countryname || '',
                buyrate: buyrate || '',
                salerate: salerate || '',
            });
        }
    }

    componentDidUpdate(prevProps) {
        // Igihe selectedCurrency ihindutse, update state
       
        if (this.props.selectedCurrency && this.props.selectedCurrency.currencyid !== prevProps.selectedCurrency?.currencyid) {
            const { currencyid, currencyname, countryname, buyrate, salerate } = this.props.selectedCurrency;
            this.setState({
                currencyid: currencyid || '',
                currencyname: currencyname || '',
                countryname: countryname || '',
                buyrate: buyrate || '',
                salerate: salerate || '',
            });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSave = async () => {
        try {
            const { currencyid, currencyname, countryname, buyrate, salerate } = this.state;

            await CurrencyData.addcurrencies(currencyid, currencyname, countryname, buyrate, salerate);

            toast.success(
                `Currency updated successfully:`
            );

            // Funga modal kandi usubize data
            if (this.props.refreshData) this.props.refreshData();

    // Close modal
         this.props.handleClose();
        } catch (ex) {
            if (ex.response && (ex.response.status === 400 || ex.response.status === 409)) {
                toast.error('Error: ' + ex.response.data);
            } else {
                toast.error('An error occurred while updating currency.');
            }
        }
    };

    render() {
        if (!this.props.show) return null; // ntirere modal niba show = false

        return (
            <div className="modal d-block" tabIndex="-1" role="dialog">
                <div
                    className="modal-dialog"
                    role="document"
                    style={{
                        maxWidth: '800px',
                        width: '100%',
                    }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Currency</h5>
                            <button type="button" className="btn-close" onClick={this.props.handleClose} />
                        </div>

                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label">Currency</label>
                                    <input type="text" className="form-control" name="currencyname" value={this.state.currencyname} onChange={this.handleChange} placeholder="Currency Name" />
                                </div>
                                <div className="col">
                                    <label className="form-label">Country</label>
                                    <input type="text" className="form-control" name="countryname" value={this.state.countryname} onChange={this.handleChange} placeholder="Country Name" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label">Buying Rate</label>
                                    <input type="number" className="form-control" name="buyrate" value={this.state.buyrate} onChange={this.handleChange} placeholder="Buying Rate" />
                                </div>
                                <div className="col">
                                    <label className="form-label">Selling Rate</label>
                                    <input type="number" className="form-control" name="salerate" value={this.state.salerate} onChange={this.handleChange} placeholder="Selling Rate" />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.props.handleClose}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={this.handleSave}>
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateCurrencyModal;
