import React, { useState, useEffect } from 'react';
import siteInspectionService from '../../../../services/RevenuRessources/siteInspectionServices';
import * as FiscalYear from '../../../../services/RMFPlanning/fiscalYearService';
import { toast } from 'react-toastify';
import SiteInspectionForm from './siteInspectionForm';
import Pagination from '../../../common/pagination';
import Modal from '../../../common/ModalDesign';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css';

const SiteInspectionTable = () => {
    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [fiscalyearID, setfiscalyearID] = useState(null);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentInspection, setCurrentInspection] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fiscalResponse = await FiscalYear.getFiscalyears();

                if (!fiscalResponse?.data?.length) {
                    toast.error('No fiscal years found');
                    return;
                }

                const firstFiscalId = fiscalResponse.data[0].fiscalyearid;
                setfiscalyearID(firstFiscalId);

                const inspectionsData = await siteInspectionService.getAllSiteInspectionbyfiscalyears(firstFiscalId);
                setInspections(inspectionsData || []);
            } catch (error) {
                toast.error('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredItems = inspections.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return item.itemname?.toLowerCase().includes(searchLower) || item.itemprice?.toString().includes(searchLower);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleAddNew = () => {
        setCurrentInspection(null);
        setIsModalOpen(true);
    };

    const handleEdit = (inspection) => {
        setCurrentInspection(inspection);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this inspection?')) {
            try {
                await siteInspectionService.deleteSiteInspection(id);
                setInspections(inspections.filter((item) => item.DamagedItemID !== id));
                toast.success('Inspection deleted successfully');
            } catch (error) {
                toast.error('Failed to delete inspection');
            }
        }
    };

    const handleSuccess = (result, isUpdate) => {
        if (isUpdate) {
            setInspections(inspections.map((item) => (item.DamagedItemID === result.DamagedItemID ? result : item)));
        } else {
            setInspections([result, ...inspections]);
        }
        setIsModalOpen(false);
        toast.success(`Inspection ${isUpdate ? 'updated' : 'created'} successfully`);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2>Site Inspections</h2>
                    <button className="btn btn-primary" onClick={handleAddNew}>
                        Add New Inspection
                    </button>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Search inspections..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                    <th>Plate Number</th>
                                    <th>Accident Date</th>
                                    <th>Fiscal Year</th>

                                    <th>UPDATE</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.DamagedItemID}>
                                        <td>{item.itemname}</td>
                                        <td>{item.itemprice}</td>
                                        <td>{item.reableplatenumber}</td>
                                        <td>{new Date(item.accidentdate).toLocaleDateString()}</td>
                                        <td>{item.fiscalyear}</td>
      
                                        <td>
                                            <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item)}>
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.DamagedItemID)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentInspection ? 'Edit Inspection' : 'New Inspection'}>
                <SiteInspectionForm inspection={currentInspection} fiscalyearId={fiscalyearID} onSuccess={handleSuccess} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default SiteInspectionTable;
