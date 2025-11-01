import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col, Button } from 'reactstrap';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../../utils/paginate';
import SearchBox from '../../../searchBox';
import _ from 'lodash';

import AddDescriptorModal from './addevaluationDiscriptorModal';
import UpdateDescriptorModal from './updateevaluationDiscriptorModal';
import * as DescriptorService from '../../../../services/ContractManagement/ContractSetting/evaluationDescriptorServices';

class EvaluationDescriptors extends Component {
    state = {
        descriptors: [],
        aggregates: {},
        currentPage: 1,
        pageSize: 5,
        searchQuery: '',
        sortColumn: { path: 'description', order: 'asc' },
        showModalAdd: false,
        showModalUpdate: false,
        selectedDescriptor: null,
    };

    async componentDidMount() {
        await this.populateDescriptors();
    }

    populateDescriptors = async () => {
        try {
            const result = await DescriptorService.getDescriptorsWithAggregates();
            const results = await DescriptorService.getevaluationDescriptors();

            if (result && results) {
                this.setState({
                    descriptors: results || [],
                    aggregates: result[0] || {},
                });
            } else {
                toast.error('No descriptors found.');
            }
        } catch (ex) {
            toast.error('Failed to load evaluation descriptors.');
        }
    };

    toggleModalAdd = () => {
        this.setState((prev) => ({ showModalAdd: !prev.showModalAdd }));
    };

    toggleModalUpdateOpen = (descriptor) => {
        this.setState({
            showModalUpdate: true,
            selectedDescriptor: descriptor,
        });
    };

    toggleModalUpdateClose = () => {
        this.setState({
            showModalUpdate: false,
            selectedDescriptor: null,
        });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query, currentPage: 1 });
    };

    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, searchQuery, descriptors: allDescriptors } = this.state;
        let filtered = allDescriptors;

        if (searchQuery) {
            filtered = allDescriptors.filter((d) => d.description.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const descriptors = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: descriptors };
    };

    handleDelete = async (id) => {
        try {
            await DescriptorService.deleteDescriptor(id);
            toast.success('Descriptor deleted successfully.');
            await this.populateDescriptors();
        } catch (ex) {
            toast.error('Error deleting descriptor.');
        }
    };

    render() {
        const { pageSize, currentPage, searchQuery, showModalAdd, showModalUpdate, selectedDescriptor, aggregates } = this.state;
        const { totalCount, data: descriptors } = this.getPagedData();

        return (
            <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Col style={{ textAlign: 'center' }}>
                    <Card className="shadow border-0">
                        <CardHeader className="bg-transparent">
                            <Button color="success" onClick={this.toggleModalAdd}>
                                <FcPlus /> Add Evaluation Descriptor
                            </Button>
                            {showModalAdd && <AddDescriptorModal show={showModalAdd} handleClose={this.toggleModalAdd} refreshData={this.populateDescriptors} />}
                               
                        </CardHeader>

                        <CardBody className="px-lg-5 py-lg-5">
                            {/* Small dashboard section */}
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="card text-center shadow-sm p-2 mx-2" style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Total</h6>
                                            <p className="card-text fs-4">{aggregates.total_descriptors || 0}</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm p-2 mx-2" style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Active</h6>
                                            <p className="card-text fs-4">{aggregates.active_count || 0}</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm p-2 mx-2" style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Inactive</h6>
                                            <p className="card-text fs-4">{aggregates.inactive_count || 0}</p>
                                        </div>
                                    </div>
                                    <div className="card text-center shadow-sm p-2 mx-2" style={{ flex: 1 }}>
                                        <div className="card-body">
                                            <h6 className="card-title">Avg Weight</h6>
                                            <p className="card-text fs-4">{aggregates.avg_weight || 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Search */}
                            <div style={{ textAlign: 'center' }}>
                                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                            </div>

                            {/* Table */}
                            <div className="table-responsive mb-5">
                                <div className="table-responsive mb-5">
                                    <table className="table table-striped table-hover align-middle">
                                        <thead className="table-dark text-center">
                                            <tr>
                                                <th>ID</th>
                                                <th>Activity Type</th>
                                                <th>Description</th>
                                                <th>Threshold</th>
                                                <th>Weight</th>
                                                <th>Status</th>
                                                <th>Update</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">
                                            {descriptors.map((d) => (
                                                <tr key={d.descriptor_id}>
                                                    <td>{d.descriptor_id}</td>
                                                    <td>{d.activitytype_name}</td>
                                                    <td className="text-start">{d.description}</td>
                                                    <td>{d.threshold}</td>
                                                    <td>{d.weight}</td>
                                                    <td>{d.active ? <span className="badge bg-success">Active</span> : <span className="badge bg-secondary">Inactive</span>}</td>
                                                    <td>
                                                        <Button color="primary" size="sm" onClick={() => this.toggleModalUpdateOpen(d)} className="d-flex align-items-center">
                                                            <AiFillEdit className="me-1" /> Update
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button color="danger" size="sm" onClick={() => this.handleDelete(d.descriptor_id)} className="d-flex align-items-center">
                                                            <AiFillDelete className="me-1" /> Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {showModalAdd && <AddDescriptorModal show={showModalAdd} handleClose={this.toggleModalAdd} refreshData={this.populateDescriptors} />}
                                {showModalUpdate && selectedDescriptor && (
                                    <UpdateDescriptorModal
                                        show={showModalUpdate}
                                        handleClose={this.toggleModalUpdateClose}
                                        refreshData={this.populateDescriptors}
                                        selectedDescriptor={selectedDescriptor}
                                    />
                                )}
                            </div>

                            {/* Pagination */}
                            <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                        </CardBody>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default EvaluationDescriptors;
