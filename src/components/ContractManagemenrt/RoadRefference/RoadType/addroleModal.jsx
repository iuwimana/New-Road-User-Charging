import React from "react";
//import * as source from "../../../services/RevenuRessources/sourceofFundsServices";
import Joi from "joi-browser";
import * as bank from "../../../../services/RevenuRessources/bankservices";
//import * as RevenuType from "../../../services/RevenuRessources/revenuTypeServices";
import { toast } from "react-toastify";
import * as auth from "../../../../services/authService";
import Form from "../../../common/form";
import * as PaternerStatuses from "../../../../services/RevenuRessources/paternerStatusServices";
import * as BusinessPaterner from "../../../../services/RevenuRessources/businessPaternerServices";
import * as RoadType from "../../../../services/ContractManagement/RoadRefference/roadTypeServices";
class AddroleModal extends Form {
  constructor(props) {
    super(props);
    //this.handleSave = this.handleSave.bind(this);

    this.state = {
      data: { roadtypeid: 0, roadtypename: "" },

      roadtypeid: 0,
      roadtypename: "",
      user: {},
      errors: {},
      banks: [],
      paternerStatuses: [],
      roadTypes: [],
    };
  }
  async populateBanks() {
    try {
      const { data: banks } = await bank.getbanks();
      const { data: paternerStatuses } =
        await PaternerStatuses.getpaternerstatuses();
      const { data: roadTypes } = await RoadType.getroadtypes();
      this.setState({ banks, paternerStatuses, roadTypes });
    } catch (ex) {
      toast.error("Loading issues......" + ex);
    }
  }

  async componentDidMount() {
    await this.populateBanks();
    const user = auth.getJwt();
    this.setState({ user });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      roadtypeid: nextProps.roadtypeid,
      roadtypename: nextProps.roadtypename,
    });
  }
  schema = {
    roadtypeid: Joi.number().required(),
    roadtypename: Joi.string().required().label("roadtypename"),
  };

  handleClick = async (e) => {
    try {
      const { data } = this.state;
      const roadtypeid = 0;
      
      await RoadType.addroadtype(
        roadtypeid,
        data.roadtypename
      );
      toast.success(`roadtype Paterner with   has been Save successful: `);
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
          "An Error Occured, while saving roadtype parterner Please try again later" +
            ex
        );
      }
    }
  };

  render() {
    //const paternerStatuses = this.state.paternerStatuses;
    //const banks = this.state.banks;
    return (
      <div
        className="modal fade"
        id="exampleAddModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Institution Paterner
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form onSubmit={this.handleSubmit}>
              {this.renderInput(
                "roadtypename",
                "roadtypename"
              )}
              

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={this.handleClick}
                >
                  AddNew
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddroleModal;
