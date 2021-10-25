import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import AuthContainer from '../AuthContainer/AuthContainer';
import { useAuth } from '../../context/ProvideAuth';

export default () => {
  const auth = useAuth();
  const history = useHistory();
  const { t } = useTranslation();

  const initialValues = { username: '', password: '', passwordConfirmation: '' };
  const onSubmit = (values) => auth.signUp(() => history.push('/'), values);
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('signupForm.loginLimit'))
      .max(20, t('signupForm.loginLimit'))
      .required(t('signupForm.loginLimit')),
    password: yup
      .string()
      .min(6, t('signupForm.passwordLimit'))
      .required(t('signupForm.loginLimit')),
    passwordConfirmation: yup
      .string()
      .required(t('signupForm.loginLimit'))
      .oneOf([yup.ref('password'), ''], t('signupForm.passwordsNotMatch')),
  });

  const FormikChildren = ({ errors, touched, isValid, isSubmitting }) => (
    <Form>
      <div className="form-floating my-2">
        <Field name="username" required className="form-control" />
        <label htmlFor="username">{t('signupForm.login')}</label>
      </div>
      {
        errors.username && touched.username
          ? <div className="text-left text-danger my-2">{errors.username}</div>
          : null
      }
      <div className="form-floating my-2">
        <Field type="password" name="password" required className="form-control" />
        <label htmlFor="password">{t('signupForm.password')}</label>
      </div>
      {
        errors.password && touched.password
          ? <div className="text-left text-danger my-2">{errors.password}</div>
          : null
      }
      <div className="form-floating my-2">
        <Field type="password" name="passwordConfirmation" required className="form-control" />
        <label htmlFor="passwordConfirmation">{t('signupForm.passwordConfirmation')}</label>
      </div>
      {
        errors.passwordConfirmation && touched.passwordConfirmation
          ? <div className="text-left text-danger my-2">{errors.passwordConfirmation}</div>
          : null
      }
      {
        auth.state.conflict
          ? <div className="text-danger w-100 my-2 p-1">{t('signupForm.conflict')}</div>
          : null
      }
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
