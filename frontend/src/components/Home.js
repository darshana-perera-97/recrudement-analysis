import React, { useState } from 'react';

const Home = () => {
  const [selectedYear, setSelectedYear] = useState(2025);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Mock data for analytics
  const analyticsData = {
    activeEmployees: 1247,
    retiredEmployees: 89,
    vacantPositions: 23,
    retiringThisYear: 12,
    requiredSkills: [
      'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Kubernetes'
    ]
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="h2 mb-3 text-dark fw-light">Recruitment Analysis Dashboard</h1>
            <p className="text-muted mb-0">
              Welcome to the recruitment analysis system. Manage and analyze your recruitment data efficiently.
            </p>
          </div>

          {/* Year Slider Section */}
          <div className="mb-5">
            <div className="text-center mb-3">
              <h5 className="text-dark mb-1">Analysis Year</h5>
              <div className="h3 text-primary fw-bold">{selectedYear}</div>
            </div>
            
            <div className="px-4">
              <input
                type="range"
                className="form-range"
                min="2025"
                max="2050"
                value={selectedYear}
                onChange={handleYearChange}
                style={{
                  height: '6px',
                  background: '#e9ecef',
                  borderRadius: '3px'
                }}
              />
              <div className="d-flex justify-content-between mt-2">
                <span className="text-muted small">2025</span>
                <span className="text-muted small">2050</span>
              </div>
            </div>
          </div>

          {/* Analytics Cards Section */}
          <div className="mb-5">
            <div className="row g-4">
              {/* Active Employees */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-primary mb-2">
                      <i className="fas fa-users fa-2x"></i>
                    </div>
                    <h3 className="card-title text-dark mb-1">{analyticsData.activeEmployees.toLocaleString()}</h3>
                    <p className="text-muted mb-0">Active Employees</p>
                  </div>
                </div>
              </div>

              {/* Retired Employees */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-secondary mb-2">
                      <i className="fas fa-user-times fa-2x"></i>
                    </div>
                    <h3 className="card-title text-dark mb-1">{analyticsData.retiredEmployees}</h3>
                    <p className="text-muted mb-0">Retired Employees</p>
                  </div>
                </div>
              </div>

              {/* Vacant Positions */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-warning mb-2">
                      <i className="fas fa-briefcase fa-2x"></i>
                    </div>
                    <h3 className="card-title text-dark mb-1">{analyticsData.vacantPositions}</h3>
                    <p className="text-muted mb-0">Vacant Positions</p>
                  </div>
                </div>
              </div>

              {/* Retiring This Year */}
              <div className="col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body text-center p-4">
                    <div className="text-info mb-2">
                      <i className="fas fa-calendar-alt fa-2x"></i>
                    </div>
                    <h3 className="card-title text-dark mb-1">{analyticsData.retiringThisYear}</h3>
                    <p className="text-muted mb-0">Retiring in {selectedYear}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Required Skills Section */}
          <div className="mb-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="card-title text-dark mb-3">Required Skills</h5>
                <div className="d-flex flex-wrap gap-2">
                  {analyticsData.requiredSkills.map((skill, index) => (
                    <span key={index} className="badge bg-light text-dark border px-3 py-2">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <div className="d-flex justify-content-center gap-3">
              <a href="/addUser" className="btn btn-dark px-4">
                Add New User
              </a>
              <a href="/viewUser" className="btn btn-outline-dark px-4">
                View Users
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
