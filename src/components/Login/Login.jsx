import * as yup from 'yup';
import cn from 'classnames';
import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../context/ProvideAuth.jsx';
import AuthContainer from '../../containers/AuthContainer/AuthContainer.jsx';

const getInputClasses = (errors, touched) => cn('form-control', {
  'is-invalid': errors && touched,
});

const Login = () => {
  const auth = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  const initialValues = { username: '', password: '' };
  const onSubmit = (values) => auth.signIn(() => history.push('/'), values);
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('loginForm.loginLimit'))
      .required(t('loginForm.required')),
    password: yup
      .string()
      .required(t('loginForm.required')),
  });

  useEffect(() => auth.resetForm, []);

  const footer = (
    <div className="text-center card-footer">
      <span>
        {t('loginForm.noAccount')}
        &nbsp;
        <Link tabIndex="0" to="/signup">
          {t('loginForm.signup')}
        </Link>
      </span>
    </div>
  );

  const FormikChildren = ({ errors, touched, isSubmitting }) => (
    <Form>
      <div className="form-floating my-2">
        <Field
          id="username"
          type="text"
          name="username"
          autoComplete="on"
          required
          className={getInputClasses(errors.username, touched.username)}
        />
        <label htmlFor="username">{t('loginForm.login')}</label>
        {
          errors.username && touched.username
            ? <div className="invalid-feedback">{errors.username}</div>
            : null
        }
      </div>
      <div className="form-floating my-2">
        <Field
          id="password"
          type="password"
          name="password"
          autoComplete="on"
          required
          className={getInputClasses(errors.password, touched.password)}
        />
        <label htmlFor="password">{t('loginForm.password')}</label>
        {
          errors.password && touched.password
            ? <div className="invalid-feedback">{errors.password}</div>
            : null
        }
      </div>
      {
        auth.state.unauthorized
          ? <div className="text-danger my-3">{t('loginForm.unauthorized')}</div>
          : null
      }
      <div className="">
        <button
          disabled={isSubmitting}
          className="flex-fill btn btn-primary w-100"
          type="submit"
        >
          {t('loginForm.submit')}
        </button>
      </div>
    </Form>
  );

  return (
    <AuthContainer title={t('loginForm.header')} footer={footer}>
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {FormikChildren}
      </Formik>
    </AuthContainer>
  );
};

export default Login;
