import { useHistory } from 'react-router-dom';
import React from 'react';

import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../context/ProvideAuth';

const validationScheme = yup.object().shape({
  username: yup
    .string()
    .min(3, 'This login is too short!')
    .required('This field is required!'),
  password: yup
    .string()
    .min(6, 'This passport is too short!')
    .required('This field is required!'),
});

const FormikForm = ({
  errors,
  touched,
  isSubmitting,
}) => {
  const auth = useAuth();

  return (
    <div className="row justify-content-md-center">
      <div className="h-100 col-sm-10 col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-body text-center">
            <h3 className="card-title mt-2 mb-4">Welcome to chat, User</h3>
            <Form>
              <div className="form-floating my-2">
                <Field name="username" required className="form-control" />
                <label htmlFor="username">Login</label>
              </div>
              {
                errors.username && touched.username
                  ? <div className="text-left text-danger my-2">{errors.username}</div>
                  : null
              }
              <div className="form-floating my-2">
                <Field type="password" name="password" required className="form-control" />
                <label htmlFor="password">Password</label>
              </div>
              {
                errors.password && touched.password
                  ? <div className="text-left text-danger my-2">{errors.password}</div>
                  : null
              }
              {
                auth.state.unauthorized
                  ? <div className="text-danger w-100 my-2 p-1">Wrong login or password, try again</div>
                  : null
              }
              <button disabled={isSubmitting} className="btn btn-primary w-100" type="submit">Login</button>
            </Form>
          </div>
          <div className="card-footer">Footer here</div>
        </div>
      </div>
    </div>
  );
};

const LoginForm = () => {
  const auth = useAuth();
  const history = useHistory();

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationScheme}
      onSubmit={(values) => auth.signIn(() => history.push('/'), values)}
    >
      {FormikForm}
    </Formik>
  );
};

export default LoginForm;
