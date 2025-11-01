import React, { useState, useEffect } from 'react';
import siteInspectionService from '../../../../services/RevenuRessources/siteInspectionServices';
import declarationService from '../../../../services/RevenuRessources/declarationServices';
import * as FiscalYear from '../../../../services/RMFPlanning/fiscalYearService';
import { toast } from 'react-toastify';
import SiteInspectionForm from './siteInspectionForm';
import Pagination from '../../../common/pagination';
import Modal from '../../../common/ModalDesign';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css';

const SiteInspectionTable = () => {
    const [declarations, setDeclarations] = useState([]);
    const [expandedDeclarations, setExpandedDeclarations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [fiscalyearID, setfiscalyearID] = useState(null);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentInspection, setCurrentInspection] = useState(null);
    const [selectedDeclaration, setSelectedDeclaration] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fiscalResponse = await FiscalYear.getFiscalyears();
                const firstFiscalId = fiscalResponse.data[0].fiscalyearid;
                setfiscalyearID(firstFiscalId);

                const declarationsData = await declarationService.getAllDeclarationbyfiscalyears(firstFiscalId);
                setDeclarations(
                    declarationsData.map((dec) => ({
                        ...dec,
                        damagedItems: dec.damagedItems || [],
                    }))
                );

                
            } catch (error) {
                toast.error('Failed to load declarations');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const toggleDeclaration = async (declarationid) => {
        try {
            const isExpanded = expandedDeclarations.includes(declarationid);

            if (!isExpanded) {
                const data  = await siteInspectionService.getAllSiteInspectionbydeclaration(declarationid);
                //toast.info(`declarationid: ${declarationid} data:${JSON.stringify(data)}`)
                // Filter items to match current declaration
                // const filteredItems = data.filter(item => item.declarationid === declarationid);
                setDeclarations((prev) => prev.map((dec) => (dec.declarationid === declarationid ? { ...dec, damagedItems: data || [] } : dec)));
            }

            setExpandedDeclarations((prev) => (isExpanded ? prev.filter((id) => id !== declarationid) : [...prev, declarationid]));
        } catch (error) {
            console.error('Error loading items:', error);
            toast.error('Failed to load damaged items');
        }
    };

    const handleAddNew = (declarationid) => {
        setSelectedDeclaration(declarationid);
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
                setDeclarations((prev) =>
                    prev.map((dec) => ({
                        ...dec,
                        damagedItems: (dec.damagedItems || []).filter((item) => item.damageditemid !== id),
                    }))
                );
                toast.success('Inspection deleted successfully');
            } catch (error) {
                toast.error('Failed to delete inspection');
            }
        }
    };

    const handleSuccess = (result, isUpdate) => {
        setDeclarations((prev) =>
            prev.map((dec) => {
                if (dec.declarationid === result.declarationid) {
                    const currentItems = dec.damagedItems || [];
                    const newItems = isUpdate ? currentItems.map((item) => (item.damageditemid === result.damageditemid ? result : item)) : [result, ...currentItems];
                    return { ...dec, damagedItems: newItems };
                }
                return dec;
            })
        );
        setIsModalOpen(false);
        toast.success(`Inspection ${isUpdate ? 'updated' : 'created'} successfully`);
    };

    // Filtering and pagination
    const filteredItems = declarations.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        return (item.reableplatenumber?.toLowerCase() || '').includes(searchLower) || (item.roadname?.toLowerCase() || '').includes(searchLower);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    if (loading) return <div className="text-center p-5">Loading declarations...</div>;
    //toast.info(`${JSON.stringify(declarations.damagedItems)}`)
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2>Accident Inspected Infrastructures</h2>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Search declarations..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}></th>
                                    <th>Plate Number</th>
                                    <th>Accident Date</th>
                                    <th>Road Name</th>
                                    <th>Damaged Items</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((declaration) => (
                                    <React.Fragment key={declaration.declarationid}>
                                        <tr>
                                            <td>
                                                <button className="btn btn-sm btn-light" onClick={() => toggleDeclaration(declaration.declarationid)}>
                                                    {expandedDeclarations.includes(declaration.declarationid) ? '−' : '+'}
                                                </button>
                                            </td>
                                            <td>{declaration.platenumber}</td>
                                            <td>{new Date(declaration.accidentdate).toLocaleDateString()}</td>
                                            <td>{declaration.roadname}</td>
                                            <td>{(declaration.damagedItems || []).length}</td>
                                            <td>
                                                <button className="btn btn-sm btn-primary" onClick={() => handleAddNew(declaration.declarationid)}>
                                                    Add Item
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedDeclarations.includes(declaration.declarationid) && (
                                            <tr>
                                                <td colSpan="6">
                                                    <div className="p-3 bg-light">
                                                        <h5>Damaged Items</h5>
                                                        <table className="table table-bordered mt-2">
                                                            <thead>
                                                                <tr>
                                                                    <th>Item Name</th>
                                                                    <th>Item Price</th>
                                                                    <th>Actions</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {(declaration.damagedItems || []).map((item) => (
                                                                    <tr key={item.damageditemid}>
                                                                        <td>{item.itemname}</td>
                                                                        <td>{item.itemprice}</td>
                                                                        <td>
                                                                            <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item)}>
                                                                                Edit
                                                                            </button>
                                                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.damageditemid)}>
                                                                                Delete
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                        {(declaration.damagedItems || []).length === 0 && <div className="text-center p-3 text-muted">No damaged items found</div>}
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={currentInspection ? 'Edit Damaged Item' : 'New Damaged Item'}>
                <SiteInspectionForm inspection={currentInspection} declarationId={selectedDeclaration} fiscalyearId={fiscalyearID} onSuccess={handleSuccess} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default SiteInspectionTable;
