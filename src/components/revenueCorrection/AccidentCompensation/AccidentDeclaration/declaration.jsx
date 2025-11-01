import React, { useState, useEffect } from 'react';
import * as declarationService from '../../../../services/RevenuRessources/declarationServices';
import * as FiscalYear from '../../../../services/RMFPlanning/fiscalYearService';
import * as InsuranceService from '../../../../services/RevenuRessources/InsuranceServices';
//import * as FiscalYear from '../../../../services/RMFPlanning/fiscalYearService';
import { toast } from 'react-toastify';
import DeclarationForm from './declarationForm';
import AddDeclarationModal from './AddDeclarationModal';
import UpdateDeclarationModal from './UpdateDeclarationModal';
import AddDamagedItemModal from './AddDamagedItemModal';
import Pagination from '../../../common/pagination';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Dropdown from 'react-bootstrap/Dropdown';

const DeclarationTable = () => {
    const [declarations, setDeclarations] = useState([]);
    const [search, setSearch] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDamagedModal, setShowDamagedModal] = useState(false);
    const [selectedDeclaration, setSelectedDeclaration] = useState(null);
    const [fiscalYearname, setfiscalYearname] = useState('');

    // Fetch declarations and sanitize
    const fetchDeclarations = async () => {
        try {
            const response = await FiscalYear.getFiscalyears();
            if (response) {
              const fiscalYears = response.data;
              const fiscalyearsid = fiscalYears.length > 0 ? fiscalYears[0].fiscalyearid : null; // Get the first fiscalyearid
              const fiscalyear = fiscalYears.map((year) => year.fiscalyear);
              setfiscalYearname(fiscalyear);
              //toast.info(`...........${fiscalyearsid}`)
              const data = await declarationService.getAllDeclarationByFiscalYear(fiscalyearsid);
            //toast.info(`................${JSON.stringify(data)}`)
            const sanitized = data.map((d) => ({
                ...d,
                drivername: d.drivername || '',

                platenumber: d.platenumber || '',
                AccidentDate: d.accidentdate || '',
                AccidentRoad: d.roadname || '',

                LocationCoordinate: d.location || '',
            }));
            setDeclarations(sanitized);
            }
            
        } catch (error) {
            toast.error('Failed to fetch declarations');
        }
    };

    useEffect(() => {
        fetchDeclarations();
    }, []);

    const filteredDeclarations = declarations.filter((d) => {
        const first = d.drivername.toLowerCase();
        const plate = d.platenumber.toLowerCase();
        const road = d.roadname.toLowerCase();
        const s = search.toLowerCase();
        return first.includes(s) || road.includes(s) || plate.includes(s);
    });

    const handleAdd = () => {
        setSelectedDeclaration(null);
        setShowAddModal(true);
    };

    const handleUpdate = (declaration) => {
        setSelectedDeclaration(declaration);
        setShowUpdateModal(true);
    };

    const handlesenddeclaration = async (declarationId) => {
        const confirmed = window.confirm('Are you sure you want to send this declaration into Revenues collected?');
        if (!confirmed) return;
        try {
            const success = await declarationService.sendDeclaration(declarationId);
            if (success) {
                toast.success('Declaration deleted successfully!');
                // Refresh list after delete
                fetchDeclarations();
            }
        } catch (error) {
            toast.error('Failed to delete declaration.');
        }
    };

    const handleDelete = async (declarationId) => {
        const confirmed = window.confirm('Are you sure you want to delete this declaration?');
        if (!confirmed) return;

        try {
            const success = await declarationService.deleteDeclaration(declarationId);
            if (success) {
                toast.success('Declaration deleted successfully!');
                // Refresh list after delete
                fetchDeclarations();
            }
        } catch (error) {
            toast.error('Failed to delete declaration.');
        }
    };

    const handleAddDamagedItem = (declaration) => {
        setSelectedDeclaration(declaration);
        setShowDamagedModal(true);
    };

    // Refresh after any modal operation
    {
        /** 
  const handleSuccess = () => {
    fetchDeclarations();
    setShowAddModal(false);
    setShowUpdateModal(false);
    setShowDamagedModal(false);
  };*/
    }
    const handleSuccess = (result, isUpdate) => {
        toast.success(isUpdate ? 'Declaration updated successfully!' : 'Declaration added successfully!');
        setShowAddModal(false);
        setShowUpdateModal(false);
        fetchDeclarations(); // if you refresh list after save
    };

    return (
        <div className="p-4">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h1>Accident Compasation Registration-</h1><small>{fiscalYearname}</small>
                <button className="btn btn-primary" onClick={handleAdd}>
                    Add New Compasation
                </button>
            </header>

            <input type="text" className="form-control mb-3" placeholder="Search declarations..." value={search} onChange={(e) => setSearch(e.target.value)} />

            <table className="table table-bordered">
                <thead className="table-light text-center align-middle">
                    <tr>
                        <th scope="col">Driver Name</th>
                        <th scope="col">Vehicle Plate</th>
                        <th scope="col">Accident Date</th>
                        <th scope="col">Road Name</th>
                        <th scope="col">Amount Paid</th>
                        <th scope="col">Current Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDeclarations.length > 0 ? (
                        filteredDeclarations.map((d) => (
                            <tr key={d.declarationid}>
                                <td>{`${d.drivername} `}</td>
                                <td>{d.platenumber}</td>
                                <td>{d.accidentdate?.split('T')[0]}</td>
                                <td>{d.roadname}</td>
                                <td>{d.totalpayedamount}</td>
                                <td>{d.status}</td>
                                <td>
                                    {/** 
                                    {d.status !== 'Send to Revenue' && (
                                        <div className="dropdown">
                                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Actions
                                            </button>

                                            <ul className="dropdown-menu">
                                                <li>
                                                    <button className="dropdown-item" onClick={() => handleUpdate(d)}>
                                                        Update
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item text-danger" onClick={() => handleDelete(d.declarationid)}>
                                                        Delete
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item text-success" onClick={() => handleAddDamagedItem(d)}>
                                                        Add Damaged Item
                                                    </button>
                                                </li>
                                                {Number(d.totalpayedamount) !== 0 && (
                                                    <li>
                                                        <button className="dropdown-item text-primary" onClick={() => handlesenddeclaration(d.declarationid)}>
                                                            <i className="bi bi-send me-1"></i> Send to Revenues
                                                        </button>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                        */}

                                    {d.status !== 'Send to Revenue' && (
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" size="sm">
                                                Actions
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleUpdate(d)}>Update</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDelete(d.declarationid)}>Delete</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleAddDamagedItem(d)}>Add Damaged Item</Dropdown.Item>
                                                {Number(d.totalpayedamount) !== 0 && (
                                                    <Dropdown.Item onClick={() => handlesenddeclaration(d.declarationid)}>
                                                        <i className="bi bi-send me-1"></i> Send to Revenues
                                                    </Dropdown.Item>
                                                )}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No declarations found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showAddModal && (
                <AddDeclarationModal
                    isOpen={showAddModal} // <-- pass the correct prop
                    onClose={() => setShowAddModal(false)}
                    onSuccess={handleSuccess}
                />
            )}
            {showUpdateModal && <UpdateDeclarationModal isOpen={showUpdateModal} onClose={() => setShowUpdateModal(false)} declaration={selectedDeclaration} onSuccess={handleSuccess} />}

            {/*{showDamagedModal && <AddDamagedItemModal declaration={selectedDeclaration} onClose={() => setShowDamagedModal(false)} onSuccess={handleSuccess} />}
             */}
            {showDamagedModal && <AddDamagedItemModal isOpen={showDamagedModal} declaration={selectedDeclaration} onClose={() => setShowDamagedModal(false)} onSuccess={handleSuccess} />}
        </div>
    );
};

export default DeclarationTable;
