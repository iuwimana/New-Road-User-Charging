import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import { FcPlus } from 'react-icons/fc';
import useOpenController from './Hooks/useOpenController';
import { TableSection } from './TableSection.jsx';
import * as Program from '../../../services/RMFPlanning/programServices';
import * as SubProgram from '../../../services/RMFPlanning/subProgramService';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import AddModal from './addroleModal';
import { toast } from 'react-toastify';
import './model.css';
const ProgramTable = () => {
    const { isOpen, toggle } = useOpenController(false);
    const { isLoading, setIsLoading } = useState(true);
    const [program, setProgram] = useState([]);
    const [subProgram, setSubProgram] = useState([]);
    //----------------------model call

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const [modalOpen, setModalOpen] = useState(false);
    const handleCloseprogram = () => setModalOpen(false);
    const handleShowsubprogram = () => setModalOpen(true);
    //---------------------------------------
    try {
        useEffect(() => {
            const fetchProgram = async () => {
                try {
                    const { data } = await Program.getprograms();
                    setProgram(data);
                    const { datas } = await SubProgram.getsubprograms();
                    setSubProgram(datas);
                } catch (ex) {
                    toast.error('Loading issues......');
                }
            };
            fetchProgram();
        }, []);
    } catch (ex) {
        toast.error('Loading issues......');
    }
    return (
        <div
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Col
                style={{
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Col
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                ></Col>

                <Card className=" shadow border-0">
                    <CardHeader className="bg-transparent ">
                        <div className="text-muted text-center mt-2 mb-3"></div>
                        <div className="btn-wrapper text-center"></div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="table-responsive mb-5">
                            <table>
                                <thead>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            AddProgram
                                            <button 
                                            className="btn text-warning btn-act"
                                             data-toggle="addsubprogrammodal"
                                            onClick={handleShowsubprogram}>
                                                <FcPlus />
                                            </button>
                                        </div>
                                        {/**
                                         * <AddModal  />
                                         */}

                                        <Modal show={modalOpen} onHide={handleCloseprogram}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Program </Modal.Title>
                                                
                                            </Modal.Header>

                                            <Modal.Body>
                                                <AddModal />
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseprogram}>
                                                    Close
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </th>
                                </thead>

                                {program.map((program) => (
                                    <TableSection programname={program.programname} description={program.description} index={program.programid} />
                                ))}
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
};

export default ProgramTable;
