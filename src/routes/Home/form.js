import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux';
import Select from 'react-select';
// import { fields } from './data';
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

// Component to render the field

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
      <input {...input} className="form-control" value={value} placeholder={placeholder} type={type} />
    )
  }
  else if (type === 'select') {
    const { options } = field
    const handleBlur = e => e.preventDefault();
    return (
      <div style={{ display: 'block', width: '40%' }} className="text-center">
        <Select {...input} options={options} onBlur={this.handleblur} onChange={input.onChange} isMulti={multiple} isSerchable={options.length > 2 ? true : false} />
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

class Form extends Component {

  submit(values) {
    formSubmit(values);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields } = this.props;
    
    console.log('lsdjfj', this.props.myValues);

    return (
      <div>
        <form onSubmit={handleSubmit(this.submit)}>
          {fields.map(field => (
            <div key={field.name}>
              {!field.dependant &&
                <div>
                  <label className="font-weight-bold pt-3">{field.name}</label>
                  <div>
                    <Field
                      name={field.name}
                      component={renderField}
                      field={field}
                      validate={field.type === "number" ? [required, number] : (field.type === "email" ? [required, email] : [required])}
                    />
                  </div>
                </div>
              }
              {this.props.myValues && field.dependant &&
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
          <button className="btn btn-secondary" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const FormComponent = reduxForm({
  form: "sampleform",
  destroyOnUnmount: false
})(Form);

const selector = formValueSelector('sampleform');

const mapStateToProps = state => {
  const myValues = selector(state, 'Employed');
  return {
    myValues
  }
}
function bindActions(dispatch) {
  return {
    formSubmit: () => dispatch(formSubmit()),
  };
}

export default withRouter(connect(mapStateToProps, bindActions)(FormComponent));