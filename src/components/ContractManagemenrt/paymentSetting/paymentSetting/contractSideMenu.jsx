import React, { Component, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FcHome } from 'react-icons/fc';
import { FcPlanner, FcTimeline, FcTodoList, FcNeutralTrading, FcParallelTasks, FcComboChart } from 'react-icons/fc';

import { GiTimeBomb } from 'react-icons/gi';
import { FcApproval } from 'react-icons/fc';
import { FaPeopleCarry, FaRoad } from 'react-icons/fa';
import { FcFeedIn, FcMoneyTransfer, FcSalesPerformance, FcConferenceCall, FcServices, FcDebt, FcCurrencyExchange } from 'react-icons/fc';
import { FcBusinessman, FcPodiumWithSpeaker, FcBiotech, FcUnlock } from 'react-icons/fc';
import { BiSolidShoppingBag } from 'react-icons/bi';

import * as FisclaYearData from '../../services/RMFPlanning/fiscalYearService';
import { MdPermContactCalendar, MdManageAccounts, MdOutlineAddRoad, MdMergeType } from 'react-icons/md';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, DropdownButton } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ExpendableButton } from '../../components/ContractManagemenrt/ContractSettings/contractor/ExpendableButton';

import { FcPlus, FcSynchronize } from 'react-icons/fc';
import { AiFillEdit, AiFillDelete, AiOutlineWeibo, AiOutlineShop } from 'react-icons/ai';
import { GiPayMoney } from 'react-icons/gi';
import { toast } from 'react-toastify';

//--------------
import useOpenController from '../../components/ContractManagemenrt/ContractSettings/contractor/Hooks/useOpenController';
import * as Contract from '../../services/ContractManagement/ContractSetting/contractservice';

import * as UserAccessData from '../../services/security/securableService';
import * as UserHeadData from '../../services/security/userServices';

import {jwtDecode} from 'jwt-decode';
import { BiSubdirectoryRight } from 'react-icons/bi';
import * as ContractType from '../../services/ContractManagement/ContractSetting/contractTypeService';
import { DiSqllite } from 'react-icons/di';
import { FaHandPointRight, FaCoins } from 'react-icons/fa';
import { GiLookAt, GiRoad } from 'react-icons/gi';
import auth from '../../services/authService';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import * as FiscalYear from '../../services/RMFPlanning/fiscalYearService';
import * as FiscalYearContractType from '../../services/ContractManagement/ContractSetting/Fiscalyearcontracttypeservice';
import * as Projectdata from '../../services/ContractManagement/ContractSetting/projectservice';

import ContractTypeMenu from '../Menu/contracttype';
import ContractTypeMenuinspection from '../MenuInspection/contracttype';
import ContractTypeMenupayment from '../MenuPayment/contracttype';

//------------

import Dropdown from '../../components/Dropdown';
import { Card, CardHeader, CardBody, Col } from 'reactstrap';
import _ from 'lodash';

const contractSideMenu = () => {
    //---------------------------------------------------------------------------


    
    function handleopenplanningclick() {
        setOpenrecState(false);
        setOpensecurityState(false);
        setOpenlookupState(false);
        setOpenplanState(!isopenplan);
        setOpenlookcollState(false);
        setOpencontState(false);
        setOpenwaitingapproval(false);
    }
    function handleopencontractclick() {
        setOpenrecState(false);
        setOpenrecState(false);
        setOpensecurityState(false);
        setOpenlookupState(false);
        setOpenlookcollState(false);
        setOpencontState(!isopencont);
        setOpenwaitingapproval(false);
    }
    function handleopencontractcontractclick() {
        setOpenrecState(false);
        setOpenrecState(false);
        setOpensecurityState(false);
        setOpenlookupState(false);
        setOpenlookcollState(false);
        setOpenprojectState(!isopenproject);
        setOpencontracttypeState(false);
        setOpenfiscalyearState(false);
        setOpenwaitingapproval(false);
    }
    function handleopenwaitingapprovalclick() {
        setOpenrecState(false);
        setOpenrecState(false);
        setOpensecurityState(false);
        setOpenlookupState(false);
        setOpenlookcollState(false);
        setOpenprojectState(false);
        setOpenwaitingapproval(!isopenwaitingapproval);
        setOpencontracttypeState(false);
        setOpenfiscalyearState(false);
    }
    function handleopencontractinspectionclick() {
        setOpenrecState(false);
        setOpenrecState(false);
        setOpensecurityState(false);
        setOpenlookupState(false);
        setOpenlookcollState(false);
        setOpenprojectState(false);
        setOpenfiscalyearState(false);
        setOpencontracttypeState(!isopencontracttype);
        setOpenwaitingapproval(false);
    }
    function handleopencontractpaymentclick() {
        setOpenrecState(false);
        setOpenrecState(false);
        setOpensecurityState(false);
        setOpenlookupState(false);
        setOpenlookcollState(false);
        setOpencontracttypeState(false);
        setOpenprojectState(false);
        setOpenfiscalyearState(!isopenfiscalyear);
        setOpenwaitingapproval(false);
    }
    function handleopensecurityclick() {
        setOpenrecState(false);
        setOpenplanState(false);
        setOpenlookupState(false);
        setOpensecurityState(!isopensecurity);
        setOpenlookcollState(false);
        setOpencontState(false);
        setOpenwaitingapproval(false);
    }
    function handleopenlookupclick() {
        setOpenrecState(false);
        setOpenplanState(false);
        setOpensecurityState(false);
        setOpenlookupState(!isopenlookup);
        setOpenlookcollState(false);
        setOpencontState(false);
        setOpenwaitingapproval(false);
    }

    function handleopenlookupcollectionclick() {
        setOpenrecState(false);
        setOpenplanState(false);
        setOpensecurityState(false);
        setOpenlookcontrState(false);
        setOpencontState(false);
        setOpenlookcollState(!isopenlookcoll);
        setOpenwaitingapproval(false);
    }
    function handleopenlookupcontractclick() {
        setOpenrecState(false);
        setOpenplanState(false);
        setOpensecurityState(false);
        setOpenlookcollState(false);
        setOpencontState(false);
        setOpenlookcontrState(!isopenlookcontr);
        setOpenwaitingapproval(false);
    }

    //----------------------------------------------------
    const handleNavCollapse = () => {
        if (isNavCollapsed === true) setIsNavCollapsed(false);
        else setIsNavCollapsed(true);
    };

    return (
        <>
            <button type="button" className="collapsibles" style={{width:250}} onClick={handleopencontractcontractclick}>
                <div>
                    <span className="nav-link-inner--text">
                        &nbsp;&nbsp;&nbsp;
                        <AiOutlineShop />
                        &nbsp; Contracts
                    </span>
                </div>
            </button>
            {isopenproject && (
                <div className="row">
                    {' '}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div className="col">
                        <div>
                            
                                    <>
                                        {fiscalYear.map((fiscalYear) => (
                                            <ContractTypeMenu fiscalyearid={fiscalYear.fiscalyearid} fiscalyear={fiscalYear.fiscalyear} />
                                        ))}
                                    </>
                                
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default contractSideMenu;
