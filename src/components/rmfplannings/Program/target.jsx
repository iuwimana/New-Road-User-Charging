import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import * as TargetData from "../../../services/RMFPlanning/targetService";
import * as QuarterData from "../../../services/RMFPlanning/quarterService";

const Target = ({
  index,
  TargetId,
  TargetName,
  StartQuorter,
  EndQuorter,
  StartQuorterId,
  EndQuorterId,
}) => {
  const id = index;
  const targetId = TargetId;
  //------------------------------------------------------------------
  const [targetName, setTargetName] = useState(TargetName);
  const [startQuorter, setStartQuorter] = useState(StartQuorter);
  const [endQuorter, setEndQuorter] = useState(EndQuorter);
  const [startQuorterId, setStartQuorterId] = useState(StartQuorterId);
  const [endQuorterId, setEndQuorterId] = useState(EndQuorterId);
  const [quarterId, setQuarterId] = useState(0);
  const [quarter, setQuarter] = useState("");

  //-------------------------------------------------------------------
  const startQuorterHandler = (e) => {
    this.setState({ quarterId: e.target.value });
    setStartQuorterId(quarterId);
  };

  //---------------------------------------------------------------
  const [quarters, setQuarters] = useState([]);
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await QuarterData.getquarters();
      setQuarters(data);
    };
    fetchProgram();
  }, []);
  //------------------------------------------------------------------
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (startQuorterId === 0 || endQuorterId === 0) {
        toast.info("please select starting period and ending period");
      } else {
        await TargetData.addtarget(
          targetId,
          id,
          targetName,
          startQuorterId,
          endQuorterId
        );
        toast.success(
          `Baseline data with outputID:${id} and TargetId: ${targetId} and  ${targetName} and  ${startQuorterId} and  ${endQuorterId}   has been updated successful`
        );
        window.location.reload(false);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else if (ex.response && ex.response.status === 409) {
        const errors = { ...this.state.errors };
        errors.rolename = ex.response.data;
        toast.error("Error:" + errors.rolename);
        this.setState({ errors });
      } else {
        toast.error(
          "An Error Occured, while saving Program data Please try again later"
        );
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <div class="row"></div>
        <br></br>
        <div class="row">
          <div class="col">
            <Form.Label />
            From:
          </div>
          <div className="div col">
            <Form.Control
              as="Select"
              name="StartQuorterId"
              onChange={(e) => setStartQuorterId(e.target.value)}
            >
              <option value={StartQuorterId}>{StartQuorter}</option>
              {quarters.map((quarters) => (
                <option key={quarters.quarterid} value={quarters.quarterid}>
                  {quarters.quarter}
                </option>
              ))}
            </Form.Control>
          </div>
        </div>
        <br></br>
        <div class="row">
          <div class="col">
            <Form.Label />
            To :{" "}
          </div>
          <div className="div col">
            <Form.Control
              as="Select"
              custom
              name="endQuorterId"
              onChange={(e) => setEndQuorterId(e.target.value)}
            >
              <option value={EndQuorterId}>{EndQuorter}</option>
              {quarters.map((quarters) => (
                <option key={quarters.quarterid} value={quarters.quarterid}>
                  {quarters.quarter}
                </option>
              ))}
            </Form.Control>
          </div>
        </div>
        <br></br>
        <br></br>

        <Form.Label>Target </Form.Label>
        <Form.Control
          type="text"
          placeholder="targetName "
          name="targetName"
          value={targetName}
          onChange={(e) => setTargetName(e.target.value)}
          required
        />
      </Form.Group>

      <br></br>
      <br></br>

      <Button variant="success" type="submit" block>
        AddNew
      </Button>
    </Form>
  );
};

export default Target;
