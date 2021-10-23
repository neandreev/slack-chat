import * as yup from 'yup'
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/ProvideAuth';
import AuthContainer from '../AuthContainer/AuthContainer';

export default () => {
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
      .min(6, t('loginForm.passwordLimit'))
      .required(t('loginForm.required')),
  });

  const FormikChildren = ({ errors, touched, isSubmitting }) => (
    <Form>
      <div className="form-floating my-2">
        <Field name="username" required className="form-control" />
        <label htmlFor="username">{t('loginForm.login')}</label>
      </div>
      {
        errors.username && touched.username
          ? <div className="text-left text-danger my-2">{errors.username}</div>
          : null
      }
      <div className="form-floating my-2">
        <Field type="password" name="password" required className="form-control" />
        <label htmlFor="password">{t('loginForm.password')}</label>
      </div>
      {
        errors.password && touched.password
          ? <div className="text-left text-danger my-2">{errors.password}</div>
          : null
      }
      {
        auth.state.unauthorized
          ? <div className="text-danger w-100 my-2 p-1">{t('loginForm.unauthorized')}</div>
          : null
      }
      <div className="d-flex align-items-baseline flex-sm-row flex-column">
        <button
          disabled={isSubmitting}
          className="flex-fill btn btn-primary w-100"
          type="submit"
        >
          {t('loginForm.submit')}
        </button>
        <div className="baseline w-100 mx-sm-2 mx-0 my-sm-0 my-2">Или</div>
        <button
          disabled={isSubmitting}
          className="flex-fill btn btn-success w-100"
          type="submit"
        >
          {t('loginForm.signup')}
        </button>
      </div>
      
    </Form>
  );

  return (
    <AuthContainer title={t('loginForm.header')}>
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
