import React, { Component } from "react";
//import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NotFound from "../../components/notFound";
import Revmen from "./revenunavbar";
import RevHome from "./revenuHome";
import Sources from "./sourceoffunds/sourceofFunds";
import Product from "./revenuProduct/revenuProduct";
import Payment from "./revenuPayment/revenuPayment";
import RevCorrection from "./revenuCorrection/revenuCorrection";
import Revupload from "./revenuCorrection/revenuCorrectionsupload";
import ViewPayment from "./paternerServicePayment/viewpaternerServicePayment";
import Business from "./businessPaterner/businessPaterner";
import Paterner from "./paternerService/paternerService";
import ServicePayment from "./servicePayment/servicePayment";
import PaternerServicePayment from "./paternerServicePayment/paternerServicePayment";
// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';


class SecMenu extends Component {
  state = {};
    render() {
    
    return (
      <div>
         <ToastContainer />
          <div className="row">
          <div className="col-4">
            <Revmen />
          </div>
          <div className="col-6">
              
          <Switch>
            <Route path="/revenu/home" component={RevHome} />
            <Route path="/revenu/sourceoffunds" component={Sources} />
            <Route path="/revenu/revenuproduct" component={Product} />
            <Route path="/revenu/revenupayment" component={Payment} />
            <Route path="/revenu/revenucorrection" component={RevCorrection} />
            <Route path="/revenu/viewpaternerservicepayment" component={ViewPayment} />
            <Route path="/revenu/businesspaterner" component={Business} />
            <Route path="/revenu/paternerservice" component={Paterner} />
            <Route path="/revenu/servicepayment" component={ServicePayment} />
            <Route path="/revenu/paternerservicepayment" component={PaternerServicePayment} />
             <Route path="/revenu/upload" component={Revupload} />
            
            <Route path="/not-found" component={NotFound} />
            {/**<Redirect from="/revenu" exact to="/revenu/home" />*/}
            
          </Switch>
         

         
         </div>
         </div>

      </div>
    )
    }
  };
  export default SecMenu;