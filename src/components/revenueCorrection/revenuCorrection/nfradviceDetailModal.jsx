import React, { Component } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx'; // Import xlsx for Excel file handling
import * as Product from '../../../services/RevenuRessources/productServices';
import * as Payment from '../../../services/RevenuRessources/revenuPaymentServices';
import * as BorderData from '../../../services/RevenuRessources/nationalborderservices';
import * as Correction from '../../../services/RevenuRessources/nfradviceservices';
import * as NFRAdvice from '../../../services/RevenuRessources/nfradviceservices';
import { toast } from 'react-toastify';
import * as auth from '../../../services/authService';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import PropTypes from 'prop-types';
import { Card, CardFooter, CardHeader, CardBody, Col } from 'reactstrap';
import { FcDownload } from 'react-icons/fc';
import { format, parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
class NfradviceDetailModal extends Component {
    constructor(props) {
        super(props);
        console.log('Modal received:', {
            props: props,
            duplicate_number: props.duplicate_number,
            item: props.item,
        });
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
            duplicate_number: props.duplicate_number || 0,
            currencyname: '',
            revenuproductid: 0,
            revenuepaymentid: 0,
            revenuproductname: '',
            activeon: '',
            type:'',
            CurrentDate: '',
            isactif: true,
            nametochek: 'sibo',
            fiscalyearsid: 0,
            fiscalyear: '',
            loadData: [],
            sources: [],
            details: [],

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
            pageSize: 100,
            requiredItem: 0,
            brochure: [],
            searchQuery: '',
            selectedrole: null,
            search: [],
            sortColumn: { path: 'title', order: 'asc' },
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //toast.info(`inside modal with duplicate_number:${nextProps.duplicate_number} and ${prevState.duplicate_number} `);
        if (nextProps.duplicate_number !== prevState.duplicate_number) {
            return { duplicate_number: nextProps.duplicate_number };
        }
        return null;
    }
    toggleDropdown = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }));
    };

    async componentDidMount() {
        try {
            if (!this.props.duplicate_number) {
                throw new Error('No duplicate number provided');
            }

            const { data: details } = await NFRAdvice.getnfradvicediplicatebyfiscalyeardetails(this.props.duplicate_number);

            if (!details) {
                throw new Error('No data returned from API');
            }

            this.setState({
                details: Array.isArray(details) ? details : [details],
                loading: false,
                error: null,
            });
        } catch (error) {
            this.setState({
                loading: false,
                error: error.message,
            });
            toast.error(`Error loading details: ${error.message}`);
        }
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };
    handleExport = async (type) => {
        toast.info(`exporting with ${type}`);
        //setExportType(type);
        this.setState({type:type})

        //setLoading(true);
        try {
            if (this.state.type === 'pdf') {
                const { data: sources } = await NFRAdvice.getExportPDF(this.props.duplicate_number);

                if (!sources) {
                    toast.error(`Failed to export ${exportType.toUpperCase()}`);
                }
            } else {
                const { data: sources } = await NFRAdvice.getExportExcel(this.props.duplicate_number);

                if (!sources) {
                    toast.error(`Failed to export ${exportType.toUpperCase()}`);
                }
            }
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setLoading(false);
            setIsOpen(false);
        }
    };

    renderDuplicateDetails() {
        const { details, loading, error, currentPage, pageSize } = this.state;

        if (loading) {
            return <div className="text-center my-4">Loading details...</div>;
        }

        if (error) {
            return <div className="alert alert-danger">{error}</div>;
        }

        if (!details || details.length === 0) {
            return <div className="alert alert-info">No duplicate details found</div>;
        }

        // Safely paginate the data
        const itemsCount = details?.length || 0;
        const paginatedDetails = itemsCount > 0 ? paginate(details, currentPage, pageSize) : [];

        return (
            <>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Advice</th>
                                <th>Name</th>
                                <th>Payment Date</th>
                                <th>Amount</th>
                                <th>Duplications</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedDetails.map((detail) => (
                                <tr key={detail.nfradviceid}>
                                    <td>{detail?.revenueproductname || 'N/A'}</td>
                                    <td>{detail?.advice || 'N/A'}</td>
                                    <td>{detail?.name || 'N/A'}</td>
                                    <td>{detail?.paymentdate || 'N/A'}</td>
                                    <td>{detail?.amount || 'N/A'}</td>
                                    <td>{detail?.number_of_duplications || '0'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {itemsCount > 0 && <Pagination itemsCount={itemsCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />}
            </>
        );
    }

    render() {
        //toast.info("Modal constructor props1:", this.props);
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="modal-backdrop" onClick={this.props.onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <Col>
                        <Card className="shadow border-0">
                            <CardHeader className="bg-transparent revenue-header">
                                <div className="text-muted text-center mt-2 mb-3">
                                    <h1>
                                        <small>NFR Advice Detail-{this.state.duplicate_number || 'N/A'}</small>
                                    </h1>
                                </div>
                                <div className="btn-wrapper text-right">
                                    <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>
                                        Close
                                    </button>
                                </div>
                            </CardHeader>
                            <CardBody className="px-lg-5 py-lg-5">
                                <div className="dropdown">
                                    <button className="btn btn-info dropdown-toggle" onClick={this.toggleDropdown}>
                                        <FcDownload className="me-2" />
                                        Export
                                    </button>

                                    {this.state.isOpen && (
                                        <div
                                            className="dropdown-menu show"
                                            style={{
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                                width: '200px',
                                            }}
                                        >
                                            <button className="dropdown-item" onClick={() => this.handleExport('excel')}>
                                                Export to Excel
                                            </button>
                                            <button className="dropdown-item" onClick={() => this.handleExport('pdf')}>
                                                Export to PDF
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {this.renderDuplicateDetails()}
                            </CardBody>
                        </Card>
                    </Col>
                </div>
            </div>
        );
    }
}

NfradviceDetailModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    duplicate_number: PropTypes.number.isRequired,
};

export default NfradviceDetailModal;
