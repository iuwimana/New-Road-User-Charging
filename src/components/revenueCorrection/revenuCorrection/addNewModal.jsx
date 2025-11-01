import React, { Component } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx'; // Import xlsx for Excel file handling
import * as Product from '../../../services/RevenuRessources/productServices';
import * as Payment from '../../../services/RevenuRessources/revenuPaymentServices';
import * as BorderData from '../../../services/RevenuRessources/nationalborderservices';
import * as Correction from '../../../services/RevenuRessources/nfradviceservices';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';
import { format, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
class AddNewModal extends Component {
    constructor(props) {
        super(props);
        //this.handleSave = this.handleSave.bind(this);
        this.state = {
            data: {
                RevenueCorrectionId: 0,
                borderid: 0,
                bordername: '',
                RevenueProductId: 0,
                RevenuePaymentId: 0,
                CorrectionDate: '',
                RefNumber: {},
                TransactionDetails: {},
                Deposit: {},
                PoRef: {},
                DocId: {},
            },
            GivenDate: '',
            value: 1,
            Name: '',
            Advice: '',
            TaxCenter: '',
            PaymentDate: '',
            Amount: 0,
            startDate: null,
            endDate: null,
            currencyid: 0,
            currencyname: '',
            revenuproductid: 0,
            revenuepaymentid: 0,
            revenuproductname: '',
            activeon: '',
            CurrentDate: '',
            isactif: true,
            nametochek: 'sibo',
            fiscalyearsid: 0,
            fiscalyear: '',
            loadData: [],
            sources: [],
            user: {},
            ParsedData: [],
            borders: [],
            TableRows: [],
            Values: [],
            product: [],
            payment: [],
            paymentModes: [],
            errors: {},
            currentPage: 1,
            pageSize: 5,
            requiredItem: 0,
            brochure: [],
            searchQuery: '',
            selectedrole: null,
            search: [],
            sortColumn: { path: 'title', order: 'asc' },
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            revenuproductid: nextProps.revenuproductid,
            revenuproductname: nextProps.revenuproductname,
            currencyid: nextProps.currencyid,
            currencyname: nextProps.currencyname,
            activeon: nextProps.activeon,
        });
    }

    async populateBanks() {
        try {
            const { data: product } = await Product.getrevenuproducts();
            const { data: payment } = await Payment.getrevenupayments();
            const { data: borders } = await BorderData.getnationalborders();

            this.setState({ product, payment, borders });

            const { data: fiscalyear } = await FiscalYear.getFiscalyears();
            const response = await FiscalYear.getFiscalyears();

            if (response) {
                const fiscalYears = response.data;
                this.setState({ data: response });
                const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
                const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                //this.setState({ fiscalyearid, fiscalyear });
                this.setState({ fiscalyearsid, fiscalyear });
            } else {
                toast.error('No Fiscal year find......' + fiscalyear);
            }
            const fiscalyearid = this.state.fiscalyearsid;
            const revenuproductid = this.state.revenuproductid;
            const revenuproductname = this.state.revenuproductname;
            const currencyid = this.state.currencyid;
            const currencyname = this.state.currencyname;
            const activeon = this.state.activeon;
            //const currentDate = new Date().toDateString();
            var CurrentDate = new Date();
            CurrentDate.setHours(0, 0, 0, 0);
            // const formattedDate = `${CurrentDate.getDate()}-${CurrentDate.getMonth() + 1}-${CurrentDate.getFullYear()}`;
            const formattedCurrentDate = format(new Date(CurrentDate), 'yyyy-MM-dd');
            this.setState({ CurrentDate: formattedCurrentDate });
            //const GivenDate = new Date(activeon);
            // GivenDate.setHours(0, 0, 0, 0);
            //const GivenDate = new Date(activeon);
            //const localISOString = GivenDate.toISOString();

            this.setState({
                fiscalyearid,
                revenuproductid,
                revenuproductname,
                currencyid,
                currencyname,
                activeon,
            });
        } catch (ex) {
            toast.error('Loading issues......' + ex);
        }
    }

    async componentDidMount() {
        try {
            await this.populateBanks();
            const user = auth.getJwt();
            this.setState({ user });
        } catch (ex) {
            toast.error('An Error Occurred while fetching revenue payment data: ' + ex);
        }
    }

    PaymentIDHandler(e) {
        this.setState({ revenuepaymentid: e.target.value });
    }
    Advicehandle(e) {
        this.setState({ Advice: e.target.value });
    }
    NameHandler(e) {
        this.setState({ Name: e.target.value });
    }
    TaxCenterHandler(e) {
        this.setState({ TaxCenter: e.target.value });
    }
    PaymentDateHandler(date) {
        //this.setState({ PaymentDate: e.target.value });
        this.setState({
            startDate: date,
            PaymentDate: date, // If you need to store it in PaymentDate as well
        });
    }
    AmountHandler(e) {
        this.setState({ Amount: e.target.value });
    }

    changeHandler = (event) => {
        const file = event.target.files[0];
        if (!file) {
            toast.error('No file selected.');
            return;
        }

        const fileType = file.name.split('.').pop().toLowerCase(); // Get file extension

        if (fileType === 'csv') {
            // Process CSV file using Papa.parse
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const rowsArray = [];
                    const valuesArray = [];

                    // Iterating data to get column names and their values
                    results.data.forEach((d) => {
                        rowsArray.push(Object.keys(d));
                        valuesArray.push(Object.values(d));
                    });

                    const ParsedData = results.data;
                    const TableRows = rowsArray[0];
                    const Values = valuesArray;

                    this.setState({ ParsedData, TableRows, Values });
                },
                error: (error) => {
                    toast.error('Error parsing CSV file: ' + error.message);
                },
            });
        } else if (fileType === 'xls' || fileType === 'xlsx') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // Convert sheet to JSON with header row as the first row
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' }); // Add defval: '' to handle missing cells

                const headers = jsonData[0] || [];
                const valuesArray = jsonData.slice(1).map((row) => {
                    return headers.map((header, index) => {
                        // Ensure each cell is filled with an empty string if it's blank
                        return row[index] || ''; // If undefined or null, return empty string
                    });
                });

                // Map the header values with their corresponding row values
                const ParsedData = valuesArray.map((row) => {
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = row[index];
                    });
                    return obj;
                });

                const TableRows = headers;
                const Values = valuesArray;

                this.setState({ ParsedData, TableRows, Values });
            };
            reader.readAsArrayBuffer(file);
        } else {
            toast.error('Unsupported file type. Please upload a CSV or Excel file.');
        }
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSaves = async () => {
        try {
            // e.preventDefault();
            const nfradviceid = 0;
            const RevenueProductId = 2;
            const currencyid = 1;

            toast.info(`the data: ${this.state.revenuepaymentid} , ${this.state.Advice}, ${this.state.Name}, ${this.state.TaxCenter}, ${this.state.PaymentDate}, ${this.state.Amount}`);

            await Correction.addNewrevenucorrection(
                nfradviceid,
                RevenueProductId,
                this.state.revenuepaymentid,
                this.state.Advice,
                this.state.Name,
                this.state.TaxCenter,
                this.state.PaymentDate,
                this.state.Amount,
                currencyid
            );
        } catch (ex) {
            toast.error('An Error Occured, while uploading revenu correction file:' + ex);
        }
        //this.props.history.push('/revenu/revenucorrection');
        //const { state } = this.props.location;
        //window.location = state ? state.from.pathname : "/";
    };

    renderTable = () => {
        const { TableRows, Values, currentPage, pageSize } = this.state;

        if (Values.length === 0) {
            return <p>No data to display.</p>;
        }

        const paginatedValues = paginate(Values, currentPage, pageSize);

        return (
            <div className="table-responsive mb-5">
                <table className="striped bordered hover" border={1}>
                    <thead>
                        <tr>
                            {TableRows.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedValues.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    render() {
        if (!this.props.show) {
            return null;
        }
        const payment = this.state.payment;
        const product = this.state.product;
        const borders = this.state.borders;

        const { totalCount, pageSize, currentPage } = this.state;

        return (
            <div
                className="modal-backdrop d-flex align-items-center justify-content-center"
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
                onClick={this.props.onClose}
            >
                <div className="modal-content bg-white rounded shadow-lg" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
                    <Col>
                        <Card className="border-0 h-100 d-flex flex-column">
                            <CardHeader className="d-flex justify-content-between align-items-center bg-light">
                                <h5 className="mb-0">Add New NFR ADVICE</h5>
                                <button type="button" className="btn-close" onClick={this.props.onClose}></button>
                            </CardHeader>
                            <CardBody
                                className="overflow-auto p-4"
                                style={{
                                    height: `${this.state.cardBodyHeight}px`,
                                    transition: this.state.isResizing ? 'none' : 'height 0.3s ease',
                                    position: 'relative',
                                }}
                            >
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="exampleFormControlInput1">Product Payment</label>
                                        </div>
                                        <div className="col">
                                            <select name="RevenuePaymentId" id="RevenuePaymentId" className="form-control" onChange={(e) => this.PaymentIDHandler(e)}>
                                                <option value={this.state.revenuproductid}>{this.state.revenuproductname}</option>
                                                {payment.map((payment) => (
                                                    <option key={payment.revenuepaymentid} value={payment.revenuepaymentid}>
                                                        {payment.revenueproductname}
                                                        {'--->'}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <br></br>

                                <div className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden`}></div>

                                {/* Main container with equal width panels */}
                                <div className="flex flex-1 w-full">
                                    {/* First panel - now takes equal space */}
                                    <div className={`panel p-4 dark:gray-50 flex-1 min-w-0 space-y-3 relative z-10 rounded-md overflow-hidden`}>
                                        <div className="flex flex-col h-full pb-45">
                                            <div className="row">
                                                <div className="col">
                                                    {/**---------------------------------------------------------------- */}
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col">
                                                                <label htmlFor="exampleFormControlInput1">Advice</label>
                                                            </div>
                                                            <div className="col">
                                                                <input
                                                                    type="text"
                                                                    name="Advice"
                                                                    id="Advice"
                                                                    className="form-control"
                                                                    value={this.state.Advice} // Display the selected product name
                                                                    onChange={(e) => this.Advicehandle(e)}
                                                                    placeholder="add a advice"
                                                                    // Add click handler for custom dropdown
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/**---------------------------------------------------------------- */}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    {/**---------------------------------------------------------------- */}

                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col">
                                                                <label htmlFor="exampleFormControlInput1">Name</label>
                                                            </div>
                                                            <div className="col">
                                                                <input
                                                                    type="text"
                                                                    name="Name"
                                                                    id="Name"
                                                                    className="form-control"
                                                                    value={this.state.Name} // Display the selected product name
                                                                    onChange={(e) => this.NameHandler(e)}
                                                                    placeholder="add a Name"
                                                                    // Add click handler for custom dropdown
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/**---------------------------------------------------------------- */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Second panel - now takes equal space */}
                                    <div className={`panel p-0 flex-1 min-w-0 overflow-x-hidden`}>
                                        <div className="row">
                                            <div className="col">
                                                {/**---------------------------------------------------------------- */}

                                                <div className="mb-3">
                                                    <div className="row">
                                                        <div className="col">
                                                            <label htmlFor="exampleFormControlInput1">TaxCenter</label>
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                type="text"
                                                                name="TaxCenter"
                                                                id="TaxCenter"
                                                                className="form-control"
                                                                value={this.state.TaxCenter} // Display the selected product name
                                                                onChange={(e) => this.TaxCenterHandler(e)}
                                                                placeholder="add a TaxCenter"
                                                                // Add click handler for custom dropdown
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/**---------------------------------------------------------------- */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                {/**---------------------------------------------------------------- */}

                                                <div className="mb-3">
                                                    <div className="row">
                                                        <div className="col">
                                                            <label htmlFor="exampleFormControlInput1">PaymentDate</label>
                                                        </div>
                                                        <div className="col">
                                                            {/** 
                                                            <DatePicker
                                                                selected={this.state.startDate}
                                                                onChange={(e) => this.PaymentDateHandler(e)}
                                                                selectsStart
                                                                startDate={this.state.startDate}
                                                                endDate={this.state.endDate}
                                                                placeholderText="Pick start date"
                                                                dateFormat="MM/dd/yyyy"
                                                                className="date-picker"
                                                                style={{
                                                                    padding: '12px 15px',
                                                                    fontSize: '16px',
                                                                    height: '40px',
                                                                    width: '200px',
                                                                }}
                                                                required
                                                            />
                                                            */}

                                                            <DatePicker
                                                                selected={this.state.startDate}
                                                                onChange={(e) => this.PaymentDateHandler(e)}
                                                                selectsStart
                                                                startDate={this.state.startDate}
                                                                endDate={this.state.endDate}
                                                                placeholderText="Select payment date"
                                                                dateFormat="MM/dd/yyyy"
                                                                className="form-control"
                                                                style={{
                                                                    padding: '12px 15px',
                                                                    fontSize: '16px',
                                                                    height: '40px',
                                                                    width: '200px',
                                                                }}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/**---------------------------------------------------------------- */}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                {/**---------------------------------------------------------------- */}

                                                <div className="mb-3">
                                                    <div className="row">
                                                        <div className="col">
                                                            <label htmlFor="exampleFormControlInput1">Amount</label>
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                type="text"
                                                                name="Amount"
                                                                id="Amount"
                                                                className="form-control"
                                                                value={this.state.Amount} // Display the selected product name
                                                                onChange={(e) => this.AmountHandler(e)}
                                                                placeholder="enter payment Amount" // Add click handler for custom dropdown
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/**---------------------------------------------------------------- */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br />
                            </CardBody>
                            <CardFooter className="bg-light d-flex justify-content-end py-3">
                                <div className="row g-2">
                                    <div className="col">
                                        <button type="button" className="btn btn-primary " onClick={this.handleSaves}>
                                            AddNew
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button type="button" className="btn btn-secondary " onClick={this.props.onClose}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>
                    </Col>
                </div>
            </div>
        );
    }
}

AddNewModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddNewModal;
