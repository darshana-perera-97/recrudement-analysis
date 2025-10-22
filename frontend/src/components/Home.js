import React from 'react';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title">Recruitment Analysis Dashboard</h1>
              <p className="card-text">
                Welcome to the recruitment analysis system. Manage and analyze your recruitment data efficiently.
              </p>
              <div className="mt-4">
                <a href="/addUser" className="btn btn-primary me-3">Add New User</a>
                <a href="/viewUser" className="btn btn-outline-primary">View Users</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
