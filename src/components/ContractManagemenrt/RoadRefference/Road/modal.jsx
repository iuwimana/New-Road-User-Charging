import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import * as RoadService from "../../../../services/ContractManagement/RoadRefference/road";
import * as RoadTypeService from "../../../../services/ContractManagement/RoadRefference/roadTypeServices";
import * as CharacteristicService from "../../../../services/ContractManagement/RoadRefference/roadCharacteristicServices";

const UpdateRoadModal = ({ show, handleClose, refreshData, selectedRoad }) => {
  const [formData, setFormData] = useState({
    roodid: 0,
    roodname: "",
    rooddistance: 0,
    roodtypeid: 0,
    roadcharacteristicsid: 0,
  });

  const [roadTypes, setRoadTypes] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);

  // Fetch dropdown data
  useEffect(() => {
    async function fetchData() {
      try {
        const { data: types } = await RoadTypeService.getroadtypes();
        const { data: chars } = await CharacteristicService.getcharacteristics();
        setRoadTypes(types || []);
        setCharacteristics(chars || []);
      } catch (error) {
        toast.error("Failed to load road types or characteristics.");
      }
    }
    fetchData();
  }, []);

  // Prefill form when selectedRoad changes
  useEffect(() => {
    if (selectedRoad) {
      setFormData({
        roodid: selectedRoad.roodid || 0,
        roodname: selectedRoad.roodname || "",
        rooddistance: selectedRoad.rooddistance || 0,
        roodtypeid: selectedRoad.roodtypeid || 0,
        roadcharacteristicsid: selectedRoad.roadcharacteristicsid || 0,
      });
    }
  }, [selectedRoad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: e.target.type === "number" ? parseFloat(value) : value }));
  };

  const handleSubmit = async () => {
    try {
      await RoadService.addroad(
        formData
      );
      toast.success("Road updated successfully!");
      refreshData();
      handleClose();
    } catch (error) {
      toast.error("Failed to update road."+error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Update Road</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Road Name</Form.Label>
            <Form.Control type="text" name="roodname" value={formData.roodname} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Road Distance (KM)</Form.Label>
            <Form.Control type="number" name="rooddistance" value={formData.rooddistance} onChange={handleChange} step="0.01" />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Road Type</Form.Label>
            <Form.Select name="roodtypeid" value={formData.roodtypeid} onChange={handleChange}>
              <option value={0}>-- Select Road Type --</option>
              {roadTypes.map((t) => (
                <option key={t.roadtypeid} value={t.roadtypeid}>
                  {t.roadtypename}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Road Characteristics</Form.Label>
            <Form.Select name="roadcharacteristicsid" value={formData.roadcharacteristicsid} onChange={handleChange}>
              <option value={0}>-- Select Characteristics --</option>
              {characteristics.map((c) => (
                <option key={c.roadcharacteristicsid} value={c.roadcharacteristicsid}>
                  {c.roadclass} | Lanes: {c.numberoflames} | Shoulder: {c.shouldername}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateRoadModal;
