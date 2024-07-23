import React from "react";
import { Row } from "reactstrap";

const SelectPaternerService = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="mb-3">
        <div className="col-auto">
          <label htmlFor={name}>{label}</label>
        </div>
        <div className="col-auto">
          <select name={name} id={name} {...rest} className="form-control">
            <option value="" />
            {options.map((option) => (
              <option
                key={option.partenerserviceid}
                value={option.partenerserviceid}
              >
                <table className="table border=1">
                  <tbody>
                    <td>{option.institutionpartenername}</td>
                    <td>{"------>   "} </td>
                    <td>{option.revenueproductname}</td>
                  </tbody>
                </table>
              </option>
            ))}
          </select>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default SelectPaternerService;
