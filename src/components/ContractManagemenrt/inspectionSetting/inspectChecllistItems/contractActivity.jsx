import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col, Button } from 'reactstrap';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../../utils/paginate';
import SearchBox from '../../../searchBox';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';
import AddContractActivityModal from './addcontractActivityModal';
import UpdateContractActivityModal from './updatecontractActivityModal';
import * as ContractActivityService from '../../../../services/ContractManagement/ContractSetting/contractActivityServices';

import { toast } from 'react-toastify';

class ContractActivities extends Component {
    state = {
        contractActivities: [],
        FiscalYear: [],
        currentPage: 1,
        fiscalyearid:0,
        pageSize: 5,
        searchQuery: '',
        sortColumn: { path: 'activityname', order: 'asc' },
        showModalAdd: false,
        showModalUpdate: false,
        selectedActivity: null,
    };

    async componentDidMount() {
        await this.populateContractActivities();
    }

    populateContractActivities = async () => {
        try {
            
            const contractActivities = await ContractActivityService.getContractActivities();
            if (contractActivities) this.setState({ contractActivities });
            else toast.error('No contract activities found.');
        } catch (ex) {
            toast.error('Failed to load contract activities.');
        }
    };

    toggleModalAdd = () => {
        this.setState((prev) => ({ showModalAdd: !prev.showModalAdd }));
    };

    toggleModalUpdateOpen = (activity) => {
        this.setState({
            showModalUpdate: true,
            selectedActivity: activity,
        });
    };

    toggleModalUpdateClose = () => {
        this.setState({
            showModalUpdate: false,
            selectedActivity: null,
        });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query, currentPage: 1 });
    };

    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, searchQuery, contractActivities: allActivities } = this.state;
        let filtered = allActivities;
        if (searchQuery) {
            filtered = allActivities.filter((a) => a.activityname.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const contractActivities = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: contractActivities };
    };

    handleDelete = async (id) => {
        try {
            await ContractActivityService.deleteContractActivity(id);
            toast.success('Contract activity deleted successfully.');
            await this.populateContractActivities();
        } catch (ex) {
            toast.error('Error deleting contract activity.');
        }
    };

    render() {
        const { pageSize, currentPage, searchQuery, showModalAdd, showModalUpdate, selectedActivity } = this.state;
        const { totalCount, data: contractActivities } = this.getPagedData();

        return (
            <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Col style={{ textAlign: 'center' }}>
                    <Card className="shadow border-0">
                        <CardHeader className="bg-transparent">
                            <Button color="success" onClick={this.toggleModalAdd}>
                                <FcPlus /> Add Contract Activity
                            </Button>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div style={{ textAlign: 'center' }}>
                                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                            </div>

                            <div className="table-responsive mb-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Contract</th>
                                            <th>Activity Type</th>
                                            <th>Activity Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Planned Budget</th>
                                            <th>Actual Cost</th>
                                            <th>Progress %</th>
                                            <th>Status</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contractActivities.map((activity) => (
                                            <tr key={activity.contractactivityid}>
                                                <td>{activity.contractdiscription}</td>
                                                <td>{activity.activitytypename}</td>
                                                <td>{activity.activityname}</td>
                                                <td>{new Date(activity.startdate).toISOString().split('T')[0]}</td>
                                                <td>{new Date(activity.enddate).toISOString().split('T')[0]}</td>
                                                <td>{activity.plannedbudget}</td>
                                                <td>{activity.actualcost}</td>
                                                <td>{activity.progresspercent}</td>
                                                <td>{activity.status}</td>
                                                <td>
                                                    <Button color="primary" size="sm" onClick={() => this.toggleModalUpdateOpen(activity)}>
                                                        <AiFillEdit /> Update
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button color="danger" size="sm" onClick={() => this.handleDelete(activity.contractactivityid)}>
                                                        <AiFillDelete /> Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {showModalAdd && <AddContractActivityModal show={showModalAdd} handleClose={this.toggleModalAdd} refreshData={this.populateContractActivities} />}
                                {showModalUpdate && selectedActivity && (
                                    <UpdateContractActivityModal
                                        show={showModalUpdate}
                                        handleClose={this.toggleModalUpdateClose}
                                        refreshData={this.populateContractActivities}
                                        selectedActivity={selectedActivity}
                                    />
                                )}
                            </div>

                            <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default ContractActivities;
