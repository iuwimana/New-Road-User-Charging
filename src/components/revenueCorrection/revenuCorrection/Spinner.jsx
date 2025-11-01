// Spinner.jsx
import React from 'react';
import { Spinner as ReactstrapSpinner } from 'reactstrap';

const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <ReactstrapSpinner color="primary" />
  </div>
);

export default Spinner;
