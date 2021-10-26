import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../context/ProvideAuth.jsx';
import AuthContainer from '../AuthContainer/AuthContainer.jsx';

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
      .required(t('loginForm.required')),
  });

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
        <Field id="username" name="username" required className="form-control" />
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
