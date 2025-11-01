import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../../utils/paginate';
import SearchBox from '../../../searchBox';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { FcPlus } from 'react-icons/fc';
import _ from 'lodash';
import AddModal from './addActivityTypesModal';
import UpdateModal from './updateActivityTypesModal';
import { getActivityTypes, deleteActivityType } from '../../../../services/ContractManagement/ContractSetting/activityTypeService';

class ContractActivityTypes extends Component {
    state = {
        activityTypes: [],
        currentPage: 1,
        pageSize: 5,
        searchQuery: '',
        sortColumn: { path: 'name', order: 'asc' },
        showModaladd: false,
        showModalupdate: false,

        // Update modal state
        selectedActivityType: null,
    };

    async componentDidMount() {
        await this.populateActivityTypes();
    }

    populateActivityTypes = async () => {
        try {
            const activityTypes = await getActivityTypes();

            if (activityTypes) this.setState({ activityTypes });
            else toast.error('No activity types found.');
        } catch (ex) {
            toast.error('Failed to load activity types.');
        }
    };

    toggleModalAdd = () => {
        this.setState((prev) => ({ showModaladd: !prev.showModaladd }));
    };

    /**
        toggleModalUpdateOpen = (activityType) => {
        this.setState({
            showModalupdate: true,
            selectedActivityType: activityType,
        });
    };
        
        */

    toggleModalUpdateOpen = (activityType) => {
        this.setState({
            showModalupdate: true,
            selectedActivityType: activityType,
        });
    };

    toggleModalUpdateClose = () => {
        this.setState({
            showModalupdate: false,
            selectedActivityType: null,
        });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleSearch = (query) => {
        this.setState({ searchQuery: query, currentPage: 1 });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };

    getPagedData = () => {
        const { pageSize, currentPage, sortColumn, searchQuery, activityTypes: allActivityTypes } = this.state;

        let filtered = allActivityTypes;
        if (searchQuery) {
            filtered = allActivityTypes.filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        const activityTypes = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: activityTypes };
    };

    handleDelete = async (id) => {
        try {
            await deleteActivityType(id);
            toast.success('Activity type deleted successfully.');
            await this.populateActivityTypes();
        } catch (ex) {
            toast.error('Error deleting activity type.');
        }
    };

    render() {
        const { pageSize, currentPage, searchQuery, showModaladd, showModalupdate, selectedActivityType } = this.state;
        const { totalCount, data: activityTypes } = this.getPagedData();

        return (
            <div
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Col style={{ textAlign: 'center' }}>
                    <Card className="shadow border-0">
                        <CardHeader className="bg-transparent">
                            <button className="btn btn-success" onClick={this.toggleModalAdd}>
                                <FcPlus /> Add Activity Type
                            </button>
                            <AddModal show={showModaladd} onClose={this.toggleModalAdd} refresh={this.populateActivityTypes} />
                          
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div style={{ textAlign: 'center' }}>
                                <SearchBox value={searchQuery} onChange={this.handleSearch} />
                            </div>

                            <div className="table-responsive mb-5">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Require Shoulder</th>
                                            <th>Require Lane</th>
                                            <th>Require Lane Width</th>
                                            <th>Classification</th>
                                            <th>Mandatory</th>
                                            <th>Update</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activityTypes.map((type) => (
                                            <tr key={type.activitytypeid}>
                                                <td>{type.name}</td>
                                                <td>{type.description}</td>
                                                <td>{type.require_shoulder ? 'Yes' : 'No'}</td>
                                                <td>{type.require_lane ? 'Yes' : 'No'}</td>
                                                <td>{type.require_lanewidth ? 'Yes' : 'No'}</td>
                                                <td>{type.require_classification}</td>
                                                <td>{type.mandatory ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => this.toggleModalUpdateOpen(type)} // ✅ pass single object
                                                    >
                                                        <AiFillEdit /> Update
                                                    </button>
                                                </td>

                                                <td>
                                                    <button className="btn btn-danger" onClick={() => this.handleDelete(type.activitytypeid)}>
                                                        <AiFillDelete /> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                 {showModalupdate && selectedActivityType && (
                                    <UpdateModal
                                        show={showModalupdate}
                                        handleClose={this.toggleModalUpdateClose} // rename to match child
                                        refreshData={this.populateActivityTypes}
                                        selectedActivity={selectedActivityType} // ✅ match the prop name
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

export default ContractActivityTypes;
