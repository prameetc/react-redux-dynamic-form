import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux';
import Select from 'react-select';
import debounce from 'lodash/debounce';
import { formSubmit } from '../../redux/SampleForm/action';

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


// Component to render the form fields
const renderField = ({ input, field, meta: { touched, error, warning } }) => {
  const { type, placeholder, value, name, multiple } = field
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
      <div>
        <input {...input} className="form-control" value={value} placeholder={placeholder} type={type} />
        {touched && ((error && <span style={{ color: 'red' }}>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    )
  }
  else if (type === 'select') {
    const { options } = field
    const handleBlur = e => e.preventDefault();
    return (
      <div style={{ display: 'block', width: '40%' }} className="text-center">
        <Select {...input} options={options} onBlur={this.handleblur} onChange={input.onChange} isMulti={multiple} isSerchable={options.length > 2 ? true : false} />
        {touched && ((error && <span style={{ color: 'red' }}>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    )
  }
  else if (type === 'radio') {
    return (
      <span>
        <label className="p-2">{value}</label>
        <input {...input} type={type} value={value} />
        {touched && ((error && <span className="p-2" style={{ color: 'red' }}>{error}</span>) || (warning && <span>{warning}</span>))}
      </span>
    )
  }
  else {
    return <div>Type not supported.</div>
  }
}


class Form extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this); // Binds the onSubmit Function.
    this.debouncedSubmit = debounce(this.onSubmit, 5000); // Performs debounce to delay for 5 seconds. Can be changed to any desired value.
  }

  // Submit Function
  onSubmit(values) { 
    formSubmit(values); // Dispatcher to call API
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields } = this.props;
    
    return (
      <div>
        <form>
          {fields.map(field => (        // Mapping the fields array to generate our form
            <div key={field.name}>
              {!field.dependant &&
                <div>
                  <label className="font-weight-bold pt-3">{field.name}</label>
                  <div>
                    <Field
                      name={field.name}
                      component={renderField}
                      field={field}
                      onChange={handleSubmit(this.debouncedSubmit)} // onChange event to submit values with debounce
                      onBlur={handleSubmit(this.debouncedSubmit)} // onBlur event to submit values with debounce
                      validate={field.type === "number" ? [required, number] : (field.type === "email" ? [required, email] : [required])} // Performs validation based on field type
                    />
                  </div>
                </div>
              }
              {this.props.checkboxValue && field.dependant && // can be replaced with any field that we wish to be dependant.
                <div>
                  <label className="font-weight-bold pt-3">{field.name}</label>
                  <Field
                    name={field.name}
                    component={renderField}
                    field={field}
                    validate={required}
                  />
                </div>
              }
            </div>
          ))}
        </form>
      </div>
    )
  }
}

const FormComponent = reduxForm({
  form: "sampleform", // wrapping our form component and giving it a name.
  destroyOnUnmount: false
})(Form);

const selector = formValueSelector('sampleform');

const mapStateToProps = (state, props) => { 
  let checkboxValue;
  props.fields.map((index) => {
    if (index.type === 'checkbox') {  // Just an Example. Here we can add the field type for which we want dependant fields.
      checkboxValue = selector(state, index.name);
    }
  })
  return {
    checkboxValue
  }
}

function bindActions(dispatch) {
  return {
    formSubmit: () => dispatch(formSubmit()), // dispatch functions
  };
}

export default withRouter(connect(mapStateToProps, bindActions)(FormComponent)); // connecting our state props and dispatch functions to component.