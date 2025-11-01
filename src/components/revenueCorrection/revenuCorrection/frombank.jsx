import React, { Component } from 'react';
import { Col, Card, CardHeader, CardBody, Dropdown } from 'react-bootstrap';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import * as FiscalYear from '../../../services/RMFPlanning/fiscalYearService';
import * as BankDataService from '../../../services/RevenuRessources/bankdataServices';
import Pagination from '../../common/pagination';
import { paginate } from '../../../utils/paginate';
import _ from 'lodash';
import AddModal from './addBankDataModal';
import AddNewModal from './addNewBankDataModal';
import withNavigation from '../../revenueCorrection/revenuCorrection/withNavigation';

class BankDataCollection extends Component {
    state = {
        fiscalyearsid: 0,
        fiscalyear: '',
        sources: [],
        totaldeposit: 0,
        balance: 0,
        currentPage: 1,
        pageSize: 10,
        searchQuery: '',
        displaymsg: '',
        loading: false,
        downloadingPDF: false,
        downloadingExcel: false,
        startDate: '',
        endDate: '',
        showModaladd: false,
        showaddNewModal: false,
    };

    toggleModaladd = () => this.setState({ showModaladd: !this.state.showModaladd });
    toggleModaladdNew = () => this.setState({ showaddNewModal: !this.state.showaddNewModal });

    async populateFiscalYears() {
        try {
            const response = await FiscalYear.getFiscalyears();
            if (response?.data?.length > 0) {
                const fiscalYears = response.data;
                const fiscalyearsid = fiscalYears[0].fiscalyearid;
                const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
                this.setState({ fiscalyearsid, fiscalyear });
            } else {
                toast.error('No Fiscal year found.');
            }
        } catch (error) {
            console.error('Error loading fiscal years:', error);
            toast.error('Error loading fiscal years. Please try again later.');
            this.setState({ displaymsg: `Error loading fiscal years: ${error}` });
        }
    }

    async populateBankData() {
        const { fiscalyearsid } = this.state;
        if (!fiscalyearsid) return;

        this.setState({ loading: true });
        try {
            const [{ data: sources },{data:sourcesummary}] = await Promise.all([BankDataService.getBanksDataByFiscalYear(fiscalyearsid),BankDataService.getBanksDataByFiscalYearsummary(fiscalyearsid)]);
            
            this.setState({ sources: sources ?? [], loading: false });
            const totaldeposit = sourcesummary?.[0]?.totalcredit ?? 0;
            const balance= sourcesummary?.[0]?.maxbalance ?? 0;
            this.setState({ totaldeposit, loading: false });
            this.setState({ balance, loading: false });

            
        } catch (error) {
            console.error('Error loading bank data:', error);
            this.setState({ displaymsg: `Error loading bank data: ${error}`, loading: false });
            toast.error('Failed to fetch bank data.');
        }
    }

    async componentDidMount() {
        await this.populateFiscalYears();
        await this.populateBankData();
    }

    handlePageChange = (page) => this.setState({ currentPage: page });
    handleSearch = (e) => this.setState({ searchQuery: e.target.value, currentPage: 1 });

    getPagedData = () => {
        const { pageSize, currentPage, searchQuery, sources: allsources } = this.state;
        let filtered = allsources;

        if (searchQuery) {
            filtered = allsources.filter((m) => [m.revenueproductname, m.account, m.paymentdate].join(' ').toLowerCase().includes(searchQuery.toLowerCase()));
        }

        const sorted = _.orderBy(filtered, ['account'], ['asc']);
        const sources = paginate(sorted, currentPage, pageSize);
        return { totalCount: filtered.length, data: sources };
    };

    handleDownloadPDF = async () => {
        const { fiscalyearsid } = this.state;
        if (!fiscalyearsid) return toast.warn('Please select a Fiscal year.');

        this.setState({ downloadingPDF: true });
        try {
            await BankDataService.exportBankDataPDF(fiscalyearsid);
            toast.success('PDF downloaded successfully.');
        } catch (error) {
            console.error('PDF download error:', error);
            toast.error('Failed to download PDF.');
        } finally {
            this.setState({ downloadingPDF: false });
        }
    };

    handleDownloadExcel = async () => {
        const { fiscalyearsid } = this.state;
        if (!fiscalyearsid) return toast.warn('Please select a Fiscal year.');

        this.setState({ downloadingExcel: true });
        try {
            await BankDataService.exportBankDataExcel(fiscalyearsid);
            toast.success('Excel downloaded successfully.');
        } catch (error) {
            console.error('Excel download error:', error);
            toast.error('Failed to download Excel.');
        } finally {
            this.setState({ downloadingExcel: false });
        }
    };

    render() {
        const { totalCount, data: sources } = this.getPagedData();
        const { loading, fiscalyear, totaldeposit,balance, searchQuery, currentPage, pageSize } = this.state;

        return (
            <div className="container-fluid py-3">
                <Col className="text-center">
                    <Card className="shadow border-0">
                        <CardHeader className="bg-white d-flex flex-column flex-md-row justify-content-between align-items-center">
                            <div>
                                <h2 className="text-primary mb-1">Data From Commercial Banks</h2>
                                <small className="text-muted">Fiscal Year: {fiscalyear}</small>
                            </div>
                            <div className="text-end">
                                <p className="text-muted mb-0">Total  Deposit</p>
                                <h3 className="text-success fw-bold">{new Intl.NumberFormat().format(totaldeposit)} USD</h3>
                                <br/>
                                <p className="text-muted mb-0">the highest balance</p>
                                <h3 className="text-success fw-bold">{new Intl.NumberFormat().format(balance)} USD</h3>
                            </div>
                        </CardHeader>

                        <CardBody className="bg-light">
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="primary"
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

                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
                                <input type="text" className="form-control" placeholder="🔍 Search..." value={searchQuery} onChange={this.handleSearch} />
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
                                                    {this.state.downloadingPDF ? 'Downloading PDF...' : 'Download PDF'}
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={this.handleDownloadExcel} disabled={this.state.downloadingExcel}>
                                                    {this.state.downloadingExcel ? 'Downloading Excel...' : 'Download Excel'}
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </>
                                    )}
                                </Dropdown>
                            </div>

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary mb-3" role="status"></div>
                                    <p>Loading data, please wait...</p>
                                </div>
                            ) : sources.length === 0 ? (
                                <div className="alert alert-warning text-center">No bank data found for this fiscal year.</div>
                            ) : (
                                <div className="table-responsive shadow-sm rounded">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-primary text-dark">
                                            <tr>
                                                <th>Product</th>
                                                <th>Account</th>
                                                <th>Payment Date</th>
                                                <th>Debit amount</th>
                                                <th>Credit amount</th>
                                                <th>Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sources.map((s, index) => (
                                                <tr key={index}>
                                                    <td>{s.revenueproductname}</td>
                                                    <td>{s.account}</td>
                                                    <td style={{ fontWeight: 'bold', color: '#2c3e50' }}>
                                                        {new Date(s.paymentdate).toLocaleDateString('en-GB', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </td>
                                                    <td className="fw-semibold text-end">{new Intl.NumberFormat().format(s.debitamount)}</td>
                                                    <td className="fw-semibold text-end">{new Intl.NumberFormat().format(s.creditamount)}</td>
                                                    <td className="fw-semibold text-end">{new Intl.NumberFormat().format(s.value)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div className="d-flex justify-content-center mt-3">
                                <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                            </div>

                            <AddModal show={this.state.showModaladd} onClose={this.toggleModaladd} />
                            <AddNewModal show={this.state.showaddNewModal} onClose={this.toggleModaladdNew} />
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default withNavigation(BankDataCollection);
