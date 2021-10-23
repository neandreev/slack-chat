export default ({ children, title }) => (
<div className="row justify-content-md-center">
      <div className="h-100 col-sm-10 col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-body text-center">
            <h3 className="card-title mt-2 mb-4">{title}</h3>
            { children }
          </div>
        </div>
      </div>
    </div>
);
