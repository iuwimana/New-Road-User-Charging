import React, { useState, useEffect } from "react";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { FcPlus, FcInspection } from "react-icons/fc";
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Tab, Tabs } from "react-bootstrap";
import * as OutputData from "../../../services/RMFPlanning/outputService";
import * as BaselineData from "../../../services/RMFPlanning/baselineServices";
import * as IndicatorData from "../../../services/RMFPlanning/indicatorService";
import * as TargetData from "../../../services/RMFPlanning/targetService";
import * as ActivityData from "../../../services/RMFPlanning/activityServices";
import BaselineModal from "./baseline";
import IndicatorModal from "./indicator";
import {ActivitySection} from "./ActivitySection";
import Target from "./target";
import Activity from "./activities";
import "./Modal.css";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { ExpendableButton } from "./ExpendableButton";
import useOpenController from "./Hooks/useOpenController";
import { DiSqllite } from "react-icons/di";
const ViewModal = ({ }) => {

  return(
    <h1>Hello</h1>
  )
  };

export default ViewModal;