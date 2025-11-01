

  

import React from "react";

const Selectany = ({
  name,
  label,
  options = [],  // default to empty array
  valueProperty = "id",
  labelProperty = "name",
  error,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="">Select...</option>
        {Array.isArray(options) &&
          options.map((option) => (
            <option key={option[valueProperty]} value={option[valueProperty]}>
              {option[labelProperty]}
            </option>
          ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Selectany;
