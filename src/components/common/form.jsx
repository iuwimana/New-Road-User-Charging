import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Inputmodal from "./inputmodal";
import SelectPartenerStatus from "./selectPartenerStatus";
import SelectBusinessPaterner from "./selectBusinessPaterner";
import SelectPaternerService from "./selectPaternerService";
import Select from "./select";
import Arear from "./arear";
import SelectrevT from "./selectrevT";
import SelectSourceofFunds from "./selectSourceofFunds";
import SelectRevenuProduct from "./selectRevenuProduct";
import SelectPaymentMode from "./selectpaymentMode";
import SelectClassification from "./selectClassification";
import SelectCharacteristic from "./selectCharacteristic";
import SelectRoadType from "./selectRoadType";
import SelectPavettype from "./selectPavettype";
import SelectShoulder from "./selectShoulder";
import SelectCurr from "./selectcurr";
import Check from "./check";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  handleChange1 = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    // data[input.name] = input.name;
    //data[input.value] = input.value;

    this.setState({ data, errors });
  };

  handleChackBox = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    //data[input.name] = input.value;
    data[input.name] = input.checked;
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  rendernodisabledButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderArear(name, label) {
    const { data, errors } = this.state;

    return (
      <Arear
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelectroadClassification(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectClassification
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelectroadCharacteristic(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectCharacteristic
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelectroadType(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectRoadType
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelectroadShoulder(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectShoulder
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelectroadpavettype(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectPavettype
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderselectPartenerStatus(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectPartenerStatus
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelectBusinessPaterner(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectBusinessPaterner
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelectPaternerService(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectPaternerService
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelectRevenuProduct(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectRevenuProduct
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelectPaymentMode(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectPaymentMode
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelectRev(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectrevT
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelectcurr(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectCurr
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSelectsource(name, label, options) {
    const { data, errors } = this.state;

    return (
      <SelectSourceofFunds
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  rendermodalInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Inputmodal
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={(e) => this.handleChange1(e)}
        error={errors[name]}
      />
    );
  }

  renderChackBox(name, label, type = "checkbox") {
    const { data, errors } = this.state;

    return (
      <Check
        type={type}
        name={name}
        value={data[name]}
        label={label}
        checked={this.state.data[name]}
        onChange={this.handleChackBox}
        error={errors[name]}
      />
    );
  }
}

export default Form;
