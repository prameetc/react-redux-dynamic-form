import React, { Component } from 'react';
import { fields } from './data';
import Form from './form';

class Home extends Component {
  render() { 
    return (
      <div className="container">
        <div className="form-group w-50">
          <h2>React Redux Sample Dynamic Form</h2>
          <Form fields={fields}/> 
        </div>
      </div>
    )
  }
}

export default Home
