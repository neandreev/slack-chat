import * as yup from 'yup';
import cn from 'classnames';
import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContainer from '../../containers/AuthContainer/AuthContainer.jsx';
import { useAuth } from '../../context/ProvideAuth.jsx';

const getInputClasses = (errors, touched) => cn('form-control', {
  'is-invalid': errors && touched,
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'signupForm.loginLimit')
    .max(20, 'signupForm.loginLimit')
    .required('signupForm.loginLimit'),
  password: yup
    .string()
    .min(6, 'signupForm.passwordLimit')
    .required('signupForm.loginLimit'),
  passwordConfirmation: yup
    .string()
    .required('signupForm.loginLimit')
    .oneOf([yup.ref('password'), ''], 'signupForm.passwordsNotMatch'),
});

const Errors = ({ touched, errors, name }) => {
  const { t } = useTranslation();

  return errors[name] && touched[name]
    ? <div className="invalid-feedback">{t(errors[name])}</div>
    : null;
};

const AuthError = ({ conflict }) => {
  const { t } = useTranslation();

  return conflict
    ? <div className="text-danger my-3">{t('signupForm.conflict')}</div>
    : null;
};

const Signup = () => {
  const auth = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  const initialValues = { username: '', password: '', passwordConfirmation: '' };
  const onSubmit = (values) => auth.signUp(() => history.push('/'), values);

  useEffect(() => auth.resetForm, []);

  const FormikChildren = ({ errors, touched, isSubmitting }) => (
    <Form>
      <div className="form-floating my-2">
        <Field
          id="username"
          type="text"
          name="username"
          autoComplete="off"
          required
          className={getInputClasses(errors.username, touched.username)}
        />
        <label htmlFor="username">{t('signupForm.login')}</label>
        <Errors errors={errors} touched={touched} name="username" />
      </div>

      <div className="form-floating my-2">
        <Field
          id="password"
          type="password"
          name="password"
          autoComplete="off"
          required
          className={getInputClasses(errors.password, touched.password)}
        />
        <label htmlFor="password">{t('signupForm.password')}</label>
        <Errors errors={errors} touched={touched} name="password" />
      </div>

      <div className="form-floating my-2">
        <Field
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          autoComplete="off"
          required
          className={getInputClasses(errors.passwordConfirmation, touched.passwordConfirmation)}
        />
        <label htmlFor="passwordConfirmation">{t('signupForm.passwordConfirmation')}</label>
        <Errors errors={errors} touched={touched} name="passwordConfirmation" />
      </div>

      <AuthError conflict={auth.state.conflict} />
      <button disabled={isSubmitting} className="btn btn-primary w-100" type="submit">{t('signupForm.submit')}</button>
    </Form>
  );

  return (
    <AuthContainer title={t('signupForm.header')}>
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

export default Signup;
