import React from "react";

const SelectBusinessPaterner = ({ name, label, options, error, ...rest }) => {
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
                key={option.institutionpartenerid}
                value={option.institutionpartenerid}
              >
                {option.institutionpartenername}
              </option>
            ))}
          </select>
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default SelectBusinessPaterner;
