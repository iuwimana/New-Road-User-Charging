import React from "react";

const Arear = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <div className="mb-3">
        <div className="col-auto">
          <label htmlFor={name}>{label}</label>
        </div>
        <div className="col-auto">
          <textarea
            {...rest}
            name={name}
            id={name}
            rows="5"
            cols="33"
            className="form-control"
          />
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Arear;
