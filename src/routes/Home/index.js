import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select';

// This is a sample data set. 
const fields = [
  { name: 'name', type: 'text', placeholder: 'Enter Name' },
  { name: 'age', type: 'number', placeholder: 'Enter age' },
  { name: 'email', type: 'email', placeholder: 'Enter Email' },
  { name: 'employed', type: 'checkbox' },
  {
    name: 'favouriteColors',
    type: 'select',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Green', value: 'green' },
    ],
  },
]

// Function to check for validation
const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email";
  } else if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Entered passwords doesn't match";
  }
  return errors;
};

// Component to render the field
 const renderField = ({ input, field }) => {
      const { type, placeholder } = field
      if (type === 'text' || type === 'email' || type === 'number' || type === 'checkbox') {
        return <input {...input} placeholder={placeholder} type={type} />
      } else if (type === 'select') {
        const { options } = field
        return (
          <Select options={options} isSerchable={options.length > 2 ? true : false} />
        )
      } else {
        return <div>Type not supported.</div>
      }
 }
    
function submit(values) {
  console.log('here', values);
}


class Home extends Component {
  
  render() { 
    const { handleSubmit } = this.props
    return (
      <div>
        <h2>React Redux Sample Dynamic Form</h2>
        <form onSubmit={handleSubmit(submit)}>
          {fields.map(field => (
            <div key={field.name}>
              <Field
                name={field.name}
                component={renderField}
                field={field}
              />
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: "sampleform", 
  validate,
  destroyOnUnmount: false
})(Home);
