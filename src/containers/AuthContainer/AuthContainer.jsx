import React from 'react';

const AuthContainer = ({ children, title, footer }) => (
  <div className="row justify-content-center mt-4">
    <div className="h-100 col-sm-10 col-md-8 col-lg-6 col-xxl-4">
      <div className="card shadow">
        <div className="card-body text-center">
          <h3 className="card-title mt-2 mb-4">{title}</h3>
          { children }
        </div>
        { footer }
      </div>
    </div>
  </div>
);

export default AuthContainer;
