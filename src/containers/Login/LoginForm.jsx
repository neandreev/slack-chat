import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import routes from '../../routes';

const validationScheme = yup.object().shape({
  login: yup
    .string()
    .min(4, 'This login is too short!')
    .required('This field is required!'),
  password: yup
    .string()
    .min(4, 'This passport is too short!')
    .required('This field is required!'),
});

const FormikForm = ({
  values,
  errors,
  touched,
  isSubmitting,
}) => {
  console.log('errors', errors.email);
  console.log('touched', touched.touched);
  return (
    <div>
      <div className="row">
        <label className="col" htmlFor="login">Login</label>
        <label className="col" htmlFor="password">Password</label>
        <div className="col-2" />
      </div>
      <Form className="row">
        <div className="col">
          <Field className="form-control m-0" name="login" />
        </div>
        <div className="col">
          <Field className="form-control m-0" name="password" />
        </div>
        <div className="col-2">
          <button disabled={isSubmitting} className="btn mt-24 btn-primary" type="submit">Submit</button>
        </div>
      </Form>
      <div className="row">
        <div className="col">
          {
            errors.login && touched.login
              ? <span htmlFor="login">{errors.login}</span>
              : null
          }
        </div>
        <div className="col">
          {
            errors.password && touched.password
              ? <span htmlFor="password">{errors.password}</span>
              : null
          }
        </div>
        <div className="col-2" />
      </div>
    </div>
  );
};

const handleSubmit = async (values) => {
  console.log(values);
};

const LoginForm = () => (
  <Formik
    initialValues={{ login: '', password: '' }}
    validationSchema={validationScheme}
    onSubmit={handleSubmit}
  >
    {FormikForm}
  </Formik>
);

export default LoginForm;
