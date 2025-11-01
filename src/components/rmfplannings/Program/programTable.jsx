import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import { FcPlus } from 'react-icons/fc';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import useOpenController from './Hooks/useOpenController';
import { TableSection } from './TableSection.jsx';
import * as Program from '../../../services/RMFPlanning/programServices';
import * as SubProgram from '../../../services/RMFPlanning/subProgramService';
import AddModal from './addroleModal';
import { toast } from 'react-toastify';
import './model.css';

const ProgramTable = () => {
  const { isOpen, toggle } = useOpenController(false);
  const [isLoading, setIsLoading] = useState(true);
  const [program, setProgram] = useState([]);
  const [subProgram, setSubProgram] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseprogram = () => setModalOpen(false);
  const handleShowsubprogram = () => setModalOpen(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const { data } = await Program.getprograms();
        setProgram(data);
        const { datas } = await SubProgram.getsubprograms();
        setSubProgram(datas);
      } catch {
        toast.error('Error loading data. Please refresh.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProgram();
  }, []);

  return (
    <div className="container py-4">
      <Col className="mx-auto">
        <Card className="shadow-lg border-0 rounded-4 overflow-hidden">
          <CardHeader className="bg-gradient text-white text-center py-3" style={{ backgroundColor: '#0066cc' }}>
            <h4 className="fw-bold mb-0">📘 Annual Action Plan</h4>
          </CardHeader>

          <CardBody className="p-4 bg-light">
            <div className="d-flex justify-content-end mb-3">
              <OverlayTrigger placement="top" overlay={<Tooltip>Add a new Program</Tooltip>}>
                <Button variant="outline-primary" size="sm" onClick={handleShowsubprogram} className="d-flex align-items-center gap-1">
                  <FcPlus /> <span>Add Program</span>
                </Button>
              </OverlayTrigger>
            </div>

            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle text-center shadow-sm">
                <thead className="table-primary">
                  <tr>
                    <th></th>
                    <th>Program Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr><td colSpan="4">Loading...</td></tr>
                  ) : (
                    program.map((p) => (
                      <TableSection
                        key={p.programid}
                        programname={p.programname}
                        description={p.description}
                        index={p.programid}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>

      {/* Add Program Modal */}
      <Modal
        show={modalOpen}
        onHide={handleCloseprogram}
        size="lg"
        centered
        className="fade"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-semibold text-primary">Add Program</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          <AddModal />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseprogram}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProgramTable;
