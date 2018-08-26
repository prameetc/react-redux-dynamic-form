import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux';
// import { getFormValues } from 'redux-form/immutable'
import Select from 'react-select';

// This is a sample data set. 
const fields = [
  { name: 'Name', type: 'text', placeholder: 'Enter Name'},
  { name: 'Age', type: 'number', placeholder: 'Enter age' },
  { name: 'Email', type: 'email', placeholder: 'Enter Email'},
  { name: 'Employed', type: 'checkbox' },
  {
    name: 'Favourite Colors',
    type: 'select',
    options: [
      { label: 'Red', value: 'red' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Green', value: 'green' },
    ],
  },
  { name: 'Gender', type: 'radio', value: 'Male' },
]

// Regex check
const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const minLength5 = maxLength(5);
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
    'Invalid email address' : undefined

// Component to render the field
    
const renderField = ({ input, field, meta: { touched, error, warning } }) => {
  const { type, placeholder, value, name, conditional } = field
  if (type === 'text' || type === 'email' || type === 'number') {
    return (
      <div>
        <input {...input} className="form-control" placeholder={placeholder} type={type} />
        {touched && ((error && <span style={{ color: 'red' }}>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    )
  }
  else if (type === 'checkbox') {
    return (
      <input {...input} className="form-control" value={value} placeholder={placeholder} type={type} />
    )
  }
  else if (type === 'select') {
    const { options } = field
    const handleBlur = e => e.preventDefault();
    return (
      <div style={{ display: 'block', width: '40%' }} className="text-center">
        <Select {...input} options={options} onBlur={this.handleblur} onChange={input.onChange} isSerchable={options.length > 2 ? true : false} />
      </div>
    )
  }
  else if (type === 'radio') {
    return (
      <span>
        <label className="p-2">{value}</label>
        <input {...input} type={type} value={value} />
      </span>
    )
  }
  else {
    return <div>Type not supported.</div>
  }
}

function submit(values) {
  console.log('here', values);
}


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }
  render() { 
    const { handleSubmit, pristine, reset, submitting } = this.props;
    
    return (
      <div className="container">
        <div className="form-group w-50">
          <h2>React Redux Sample Dynamic Form</h2>
          <form onSubmit={handleSubmit(submit)}>
            {fields.map(field => (
            <div key={field.name}>
              <label className="font-weight-bold pt-3">{field.name}</label>
              <div>
                <Field
                  name={field.name}
                  component={renderField}
                  field={field}
                 // validate={[required, email]}
                />
              </div>
            </div>
            ))}
            <button className="btn btn-secondary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const HomeScreen = reduxForm({
  form: "sampleform", 
  destroyOnUnmount: false
})(Home);

const mapStateToProps = state => {
  const formState = getFormValues('sampleform')(state)
  return {
    formState: state.form.sampleform,
  }
}

export default connect(mapStateToProps)(HomeScreen);
