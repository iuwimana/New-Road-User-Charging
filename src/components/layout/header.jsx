import React,{useState,useEffect} from "react";
import "./header.css";
import { toast } from "react-toastify";
import * as FiscalYear from "../../services/RMFPlanning/fiscalYearService";
import * as auth from "../../services/authService";
import myLogo from "./RMF_Banner.jpg";

const Header = ({ user }) => {
  //----------state declaration
  const [fiscalyearData, setfiscalyearData] = useState([]);
  //const [user, setUser] = useState([]);
  const [fiscalyearid, setfiscalyearid] = useState(0);
  const [fiscalyear, setfiscalyear] = useState("");
  
  //------------------------------------------
  useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await FiscalYear.getFiscalyearAll();
      setfiscalyearData(data);
    };
    fetchProgram();
  }, []);

  //------------------------------------
   //------------------------------------------
   useEffect(() => {
    const fetchProgram = async () => {
      const { data } = await auth.getCurrentUser();
      setUser(data);
    };
    fetchProgram();
  }, []);

  //------------------------------------
  const fiscalyearidHandler= async(e)=> {
    const fiscalyearid = e.target.value;
    const fiscalyear="2024/2025";
    const islocked = true;
    const isselected = true;
    setfiscalyearid(fiscalyearid);
    
    try {
      await FiscalYear.addFiscalyear(
        fiscalyearid,
        fiscalyear,
        islocked,
        isselected
      );
      window.location.reload(false);
    } catch (ex) {
      toast.error("we accountered an issues while selecting Fiscal year, please select again......" + ex);
    }
   
  }
  //----------------------------------
  return (
    <div className="main-content bg-info">
      <div className="header-body text-center-red mb-7">
        <img src={myLogo} className="myLogo" alt="logo" />
        <h3 className="text-white">RUCS-Road User Charging System</h3>

        <select
          name="fiscalyearid"
          id="fiscalyearid"
          className="form-control"
          onChange={(e) => {fiscalyearidHandler(e)}}
          
        >
          <option
            value={fiscalyearid}
          >
            {fiscalyear}
          </option>
          {fiscalyearData.map((fiscalyearData) => (
            <option
              key={fiscalyearData.fiscalyearid}
              value={fiscalyearData.fiscalyearid}
            >
              {fiscalyearData.fiscalyear}
            </option>
          ))}
        </select>
      </div>
    </div>
    //-------

    //----
  );
};

export default Header;
