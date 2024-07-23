import React from "react";

const Inputmodal = ({ name, value, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="mb-3">
        <div className="col-auto">
          <label htmlFor={name}>{label}</label>
        </div>
        <div className="col-auto">
          <input
            {...rest}
            value={value}
            name={name}
            id={name}
            placeholder={name}
            className="form-control"
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Inputmodal;
