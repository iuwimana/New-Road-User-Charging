import React, { useEffect, useState } from 'react';
import * as RoadItem from '../../../../services/RevenuRessources/roaditemServices';
import * as damagedItemService from '../../../../services/RevenuRessources/damagedItemServices';
import { toast } from 'react-toastify';
import './addDeclarationModal.css';

const DamagedItemForm = ({ declaration, onClose, onSuccess }) => {
    const declarationId = declaration?.declarationid || 0;
    const splitDriverName = (driverName) => {
        if (!driverName) return ['', '', ''];
        const parts = driverName.trim().split(' ');
        return [parts[0] || '', parts.length > 2 ? parts.slice(1, -1).join(' ') : '', parts.length > 1 ? parts[parts.length - 1] : ''];
    };

    const [roadItems, setRoadItems] = useState([]);
    const [damagedItems, setDamagedItems] = useState([]);

    const [formData, setFormData] = useState({
        DeclarationID: declaration?.declarationid || 0,
        AccidentRoad: declaration?.roadid || '', // store road ID
        firstname: declaration?.firstname || splitDriverName(declaration?.drivername)[0],
        middlename: declaration?.middlename || splitDriverName(declaration?.drivername)[1],
        lastname: declaration?.lastname || splitDriverName(declaration?.drivername)[2],
        platenumber: declaration?.platenumber || '',
        AccidentDate: declaration?.accidentdate?.split('T')[0] || '',
        LocationCoordinate: declaration?.location || '', // location from API
        FiscalYearID: declaration?.fiscalyearid || fiscalyearId || '',
        UseInsurance: declaration?.useinsurance || false,
        InsuranceID: declaration?.insuranceid || 1,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadRoadItems();
        loadDamagedItems();
    }, [declarationId]);

    const loadRoadItems = async () => {
        try {
            const data = await RoadItem.getAllRoadItems();
            setRoadItems(data || []);
        } catch {
            toast.error('Failed to load road items');
        }
    };

    const loadDamagedItems = async () => {
        try {
            //toast.info(`.....${declarationId}`)
            const response = await damagedItemService.getDamagedItemsByDeclarationId(declarationId);
            setDamagedItems(response || []);
        } catch {
            toast.error('Failed to load damaged items');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'itemId') {
            const selected = roadItems.find((item) => item.roaditemid === parseInt(value));
            setFormData({
                ...formData,
                itemId: value,
                itemValue: selected ? selected.itemprice : '',
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.itemId || !formData.payedAmount) {
            toast.warning('Please fill in all required fields');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                damagedItemId: parseInt(formData.damagedItemId) || 0,
                declarationId: declarationId,
                itemId: parseInt(formData.itemId),
                itemValue: parseFloat(formData.itemValue),
                payedAmount: parseFloat(formData.payedAmount),
                status: formData.status,
            };
            //toast.info(`...................${JSON.stringify(payload)}`)saveRoadItem
            await damagedItemService.saveDamagedItem(payload);
            toast.success(`${payload.damagedItemId > 0 ? 'Updated' : 'Added'} damaged item successfully`);

            setFormData({
                damagedItemId: 0,
                declarationId: declarationId,
                itemId: '',
                itemValue: '',
                payedAmount: '',
                status: 'Pending',
            });

            await loadDamagedItems();
            if (onSuccess) onSuccess(); // notify parent
        } catch (error) {
            toast.error('Failed to save damaged item');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            damagedItemId: item.damageditemid,
            declarationId: declarationId,
            itemId: item.itemid,
            itemValue: item.itemvalue,
            payedAmount: item.payedamount,
            status: item.status || 'Pending',
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this damaged item?')) {
            try {
                await damagedItemService.deleteDamagedItem(id);
                toast.success('Deleted successfully');
                loadDamagedItems();
            } catch {
                toast.error('Failed to delete item');
            }
        }
    };

    // 🧾 Split driver name for display
    const [first, middle, last] = splitDriverName(declaration?.drivername);

    return (
        <div className="damaged-item-form">
            {/* Declaration Info Header */}

            <div className="bg-light p-3 mb-3 rounded border">
                <div className="row">
                    <div className="col-md-4">
                        <strong>Driver:</strong> {`${first} ${middle} ${last}`}
                    </div>
                    <div className="col-md-4">
                        <strong>Plate No:</strong> {declaration?.platenumber || '-'}
                    </div>
                    <div className="col-md-4">
                        <strong>Accident Road:</strong> {declaration?.roadname || '-'}
                    </div>
                </div>
            </div>

            {/* Add/Edit Form */}
            <form onSubmit={handleSubmit} className="row g-3 mb-4">
                <div className="col-md-4">
                    <label className="form-label">Road Item</label>
                    <select className="form-select" name="itemId" value={formData.itemId} onChange={handleChange} required>
                        <option value="">-- Select Road Item --</option>
                        {roadItems.map((item) => (
                            <option key={item.roaditemid} value={item.roaditemid}>
                                {item.itemname}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-2">
                    <label className="form-label">Item Value</label>
                    <input type="text" className="form-control" name="itemValue" value={formData.itemValue} readOnly />
                </div>

                <div className="col-md-2">
                    <label className="form-label">Payed Amount</label>
                    <input type="number" className="form-control" name="payedAmount" value={formData.payedAmount} onChange={handleChange} required />
                </div>

                <div className="col-md-2">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Saving...' : formData.damagedItemId > 0 ? 'Update' : 'Save'}
                    </button>
                </div>
            </form>

            {/* Damaged Item List */}
            <h6 className="fw-bold text-secondary mt-3">List of Damaged Items</h6>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Item Value</th>
                        <th>Payed Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {damagedItems.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">
                                No damaged items recorded
                            </td>
                        </tr>
                    ) : (
                        damagedItems.map((item, index) => (
                            <tr key={item.damageditemid}>
                                <td>{index + 1}</td>
                                <td>{item.itemname}</td>
                                <td>{item.itemvalue}</td>
                                <td>{item.payedamount}</td>
                                <td>{item.status || 'Pending'}</td>
                                <td>
                                    {/** 
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(item)}>
                                        Edit
                                    </button>*/}
                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.damageditemid)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="modal-footer d-flex justify-content-end mt-4">
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default DamagedItemForm;
