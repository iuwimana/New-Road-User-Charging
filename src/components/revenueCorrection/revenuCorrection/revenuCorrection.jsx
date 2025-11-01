import React, { Component } from 'react';
import { Col, Card, CardHeader, CardBody, Button, Dropdown } from 'react-bootstrap';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as Advices from '../../../services/RevenuRessources/nfradviceservices';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import _ from 'lodash';
import AddModal from './addroleModal';
import AddNewModal from './addNewModal';
import withNavigation from '../../revenueCorrection/revenuCorrection/withNavigation';

class RevenueCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fiscalyearsid: 0,
            fiscalyear: '',
            sources: [],
            responses: [],
            totaldeposit: 0,
            currentPage: 1,
            pageSize: 10,
            searchQuery: '',
            displaymsg: '',
            loading: false,
            downloading: false,
            downloadingPDF: false,
            downloadingExcel: false,
            startDate: '',
            endDate: '',
            showModaladd: false,
            showaddNewModal: false,
        };
    }

    toggleModaladd = () => this.setState({ showModaladd: !this.state.showModaladd });
    toggleModaladdNew = () => this.setState({ showaddNewModal: !this.state.showaddNewModal });

    async populateBanks() {
        try {
            const response = await FiscalYear.getFiscalyears();
            if (response?.data?.length > 0) {
                const fiscalYears = response.data;
                const fiscalyearsid = fiscalYears[0].fiscalyearid;
                const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                this.setState({ data: response, fiscalyearsid, fiscalyear });
            } else {
                toast.error('No Fiscal year found.');
            }
        } catch (error) {
            console.error('Error loading fiscal years:', error);
            toast.error('Error loading fiscal years. Please try again later.');
            displaymsg = displaymsg + 'Error loading fiscal years:' + error;
            this.setState({ displaymsg: displaymsg });
        }
    }

    async componentDidMount() {
        this.setState({ loading: true });
        try {
            await this.populateBanks();
            const fiscalyearid = this.state.fiscalyearsid;
            const [{ data: sources }, { data: responses }] = await Promise.all([Advices.getnfradvicebyfiscalyear(fiscalyearid), Advices.getsumnfradvice(fiscalyearid)]);

            const totaldeposit = responses?.[0]?.totaldeposit ?? 0;
            this.setState({ sources: sources ?? [], responses: responses ?? [], totaldeposit, loading: false });
        } catch (error) {
            console.error('Error loading revenue data:', error);
            displaymsg = displaymsg + 'Error loading revenue data:' + error;
            this.setState({ displaymsg: displaymsg });
            this.setState({ loading: false });
            toast.error('Failed to fetch revenue data.');
            displaymsg = displaymsg + 'Failed to fetch revenue data.:' + error;
            this.setState({ displaymsg: displaymsg });
            displaymsg = displaymsg + 'Failed to fetch revenue data.';
            this.setState({ displaymsg: displaymsg });
        }
    }

    handlePageChange = (page) => this.setState({ currentPage: page });
    handleSearch = (e) => this.setState({ searchQuery: e.target.value, currentPage: 1 });

    getPagedData = () => {
        const { pageSize, currentPage, searchQuery, sources: allsources } = this.state;
        let filtered = allsources;

        if (searchQuery) {
            filtered = allsources.filter((m) => [m.revenueproductname, m.advice, m.name, m.paymentdate].join(' ').toLowerCase().includes(searchQuery.toLowerCase()));
        }

        const sorted = _.orderBy(filtered, ['name'], ['asc']);
        const sources = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: sources };
    };
    handleDownloadExcel = async () => {
        const { fiscalyearsid, startDate, endDate } = this.state;
        if (!fiscalyearsid) {
            toast.warn('Please refresh to reload Fiscal year');
            displaymsg = displaymsg + 'Please refresh to reload Fiscal year';
            this.setState({ displaymsg: displaymsg });
            return;
        }

        if (!startDate || !endDate) {
            toast.warn('Please select both start and end dates.');
            displaymsg = displaymsg + 'Please select both start and end dates.';
            this.setState({ displaymsg: displaymsg });
            return;
        }
        this.setState({ downloadingExcel: true });
        try {
            const response = await Advices.getExportExcelbydate(fiscalyearsid, startDate, endDate);
            // const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', `Revenue_Report_${startDate}_${endDate}.xlsx`);
            // document.body.appendChild(link);
            // link.click();
            // link.remove();
            toast.success('Excel file downloaded successfully.');
        } catch (error) {
            console.error(error);
            toast.error('Failed to download Excel file.');
        } finally {
            this.setState({ downloadingExcel: false });
        }
    };

    handleDownloadPDF = async () => {
        const { fiscalyearsid, startDate, endDate } = this.state;

        if (!fiscalyearsid) {
            toast.warn('Please refresh to reload Fiscal year');
            displaymsg = displaymsg + 'Please refresh to reload Fiscal year';
            this.setState({ displaymsg: displaymsg });
            return;
        }

        if (!startDate || !endDate) {
            toast.warn('Please select both start and end dates.');
            displaymsg = displaymsg + 'Please select both start and end dates.';
            this.setState({ displaymsg: displaymsg });
            return;
        }

        this.setState({ downloadingPDF: true });
        try {
            const response = await Advices.getExportPDFbydate(fiscalyearsid, startDate, endDate);
            // const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', `Revenue_Report_${startDate}_${endDate}.pdf`);
            // document.body.appendChild(link);
            // link.click();
            // link.parentNode.removeChild(link);

            toast.success('PDF downloaded successfully.');
        } catch (error) {
            console.error('PDF download error:', error);
            toast.error('Failed to download PDF.');
        } finally {
            this.setState({ downloadingPDF: false });
        }
    };

    render() {
        const { totalCount, data: sources } = this.getPagedData();
        const { loading, downloading, fiscalyear, totaldeposit, searchQuery, startDate, endDate, currentPage, pageSize, displaymsg } = this.state;

        return (
            <div className="container-fluid py-3">
                <Col className="text-center">
                    <Card className="shadow border-0">
                        <CardHeader className="bg-white d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <div>
                                <h2 className="text-primary mb-1">NFR Advice Collection</h2>
                                <small className="text-muted">Fiscal Year: {fiscalyear}</small>
                            </div>
                            <div className="text-end">
                                <p className="text-muted mb-0">Total Revenue Collected</p>
                                <h3 className="text-success fw-bold">{new Intl.NumberFormat().format(totaldeposit)} USD</h3>
                            </div>
                        </CardHeader>

                        <CardBody className="bg-light">
                            {/* --- Action Dropdown --- */}
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                                <Dropdown>
                                    <Dropdown.Toggle
                                                                                                    variant="primary"
                                                                                                    id="nfrAdviceDropdown"
                                                                                                    className="!rounded-full !px-4 !py-2 flex items-center gap-2 shadow hover:scale-[1.03] transition-all duration-200"
                                                                                                    style={{ height: '50px', width: '90px', borderRadius: '20%' }}
                                                                                                >
                                                                                                    Action <FcPlus size={40} />
                                                                                                </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={this.toggleModaladd}>Load Data</Dropdown.Item>
                                        <Dropdown.Item onClick={this.toggleModaladdNew}>Add New</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            {/* --- Search and Date Filters --- */}
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
                                <input type="text" className="form-control" placeholder="🔍 Search..." value={searchQuery} onChange={this.handleSearch} />
                                <div className="d-flex gap-2 align-items-center">
                                    <input type="date" className="form-control" value={startDate} onChange={(e) => this.setState({ startDate: e.target.value })} />
                                    <input type="date" className="form-control" value={endDate} onChange={(e) => this.setState({ endDate: e.target.value })} />
                                    {displaymsg}
                                    <Dropdown>
                                        {this.state.downloadingPDF || this.state.downloadingExcel ? (
                                            <Dropdown.Toggle variant="success" id="downloadDropdown" disabled>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                {this.state.downloadingPDF ? 'Downloading PDF...' : 'Downloading Excel...'}
                                            </Dropdown.Toggle>
                                        ) : (
                                            <>
                                                <Dropdown.Toggle variant="success" id="downloadDropdown">
                                                    📥 Download
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={this.handleDownloadPDF} disabled={this.state.downloadingPDF}>
                                                        {this.state.downloadingPDF ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                                Downloading PDF...
                                                            </>
                                                        ) : (
                                                            'Download PDF'
                                                        )}
                                                    </Dropdown.Item>

                                                    <Dropdown.Item onClick={this.handleDownloadExcel} disabled={this.state.downloadingExcel}>
                                                        {this.state.downloadingExcel ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                                Downloading Excel...
                                                            </>
                                                        ) : (
                                                            'Download Excel'
                                                        )}
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </>
                                        )}
                                    </Dropdown>
                                </div>
                            </div>

                            {/* --- Table --- */}
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary mb-3" role="status"></div>
                                    <p>Loading data, please wait...</p>
                                </div>
                            ) : sources.length === 0 ? (
                                <div className="alert alert-warning text-center">No revenue records found for this fiscal year.</div>
                            ) : (
                                <div className="table-responsive shadow-sm rounded">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-primary text-dark">
                                            <tr>
                                                <th>Product</th>
                                                <th>Advice</th>
                                                <th>Name</th>
                                                <th>Service Period</th>
                                                <th>Deposit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sources.map((s, index) => (
                                                <tr key={index}>
                                                    <td>{s.revenueproductname}</td>
                                                    <td>{s.advice}</td>
                                                    <td>{s.name}</td>
                                                    <td>{s.paymentdate}</td>
                                                    <td className="fw-semibold text-end">{new Intl.NumberFormat().format(s.amount)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* --- Pagination --- */}
                            <div className="d-flex justify-content-center mt-3">
                                <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                            </div>

                            {/* --- Modals --- */}
                            <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                            <AddNewModal show={this.state.showaddNewModal} onClose={this.toggleModaladdNew} />
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default withNavigation(RevenueCollection);
