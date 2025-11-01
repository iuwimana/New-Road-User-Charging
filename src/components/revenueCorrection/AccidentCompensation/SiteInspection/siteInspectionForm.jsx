import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import siteInspectionService from '../../../../services/RevenuRessources/siteInspectionServices';
import roadItemService from '../../../../services/RevenuRessources/roaditemServices';

const SiteInspectionForm = ({ inspection, onSuccess, onClose, fiscalyearId, declarationId }) => {
    const [formData, setFormData] = useState({
        DamagedItemID: inspection?.DamagedItemID || 0,
        DeclarationID: declarationId,  // Set from props
        roaditemid: inspection?.roaditemid || '',
    });

    const [submitting, setSubmitting] = useState(false);
    const [roadItems, setRoadItems] = useState([]);

    useEffect(() => {
        const fetchRoadItems = async () => {
            try {
                const data = await roadItemService.getAllRoadItems();
                if (data) setRoadItems(data);
            } catch (error) {
                toast.error('Failed to load road items');
            }
        };
        fetchRoadItems();
    }, []);

    useEffect(() => {
        if (inspection) {
            setFormData(prev => ({
                ...prev,
                DamagedItemID: inspection.DamagedItemID,
                roaditemid: inspection.roaditemid
            }));
        }
    }, [inspection]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.roaditemid) {
            toast.error('Please select a road item');
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                DamagedItemID: formData.DamagedItemID,
                DeclarationID: formData.DeclarationID,  // From props
                ItemID: parseInt(formData.roaditemid)
            };

            const result = await siteInspectionService.saveSiteInspection(payload);
            onSuccess(result, !!formData.DamagedItemID);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to save inspection';
            toast.error(errorMessage);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <h5>Declaration ID: {declarationId}</h5>
                <input type="hidden" name="DeclarationID" value={declarationId} />
            </div>

            <div className="mb-3">
                <label className="form-label">Road Item*</label>
                <select 
                    className="form-select" 
                    name="roaditemid" 
                    value={formData.roaditemid} 
                    onChange={handleChange} 
                    required
                    disabled={submitting}
                >
                    <option value="">Select Item</option>
                    {roadItems.map((item) => (
                        <option key={item.roaditemid} value={item.roaditemid}>
                            {item.itemname} (Rwf{item.itemprice})
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-4 d-flex justify-content-end gap-2">
                <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={onClose} 
                    disabled={submitting}
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={submitting}
                >
                    {submitting ? 'Saving...' : formData.DamagedItemID ? 'Update' : 'Save'}
                </button>
            </div>
        </form>
    );
};

export default SiteInspectionForm;