import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../config';

const Home = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    activeEmployees: 0,
    retiredEmployees: 0,
    allRecords: 0,
    retiringThisYear: 0,
    requiredSkills: []
  });
  const [retirementPage, setRetirementPage] = useState(1);
  const [vacancyPage, setVacancyPage] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      calculateAnalytics();
    }
  }, [selectedYear, users, selectedProvince, selectedPosition, selectedDesignation]);

  // Reset pagination when year or filters change
  useEffect(() => {
    setRetirementPage(1);
    setVacancyPage(1);
  }, [selectedYear, selectedProvince, selectedPosition, selectedDesignation]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(getApiUrl('api/users'));
      const result = await response.json();

      if (response.ok) {
        setUsers(result.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on selected filters
  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchProvince = !selectedProvince || user.province === selectedProvince;
      const matchPosition = !selectedPosition || user.position === selectedPosition;
      const matchDesignation = !selectedDesignation || user.designation === selectedDesignation;
      
      return matchProvince && matchPosition && matchDesignation;
    });
  };

  const calculateAnalytics = () => {
    const filteredUsers = getFilteredUsers();

    const activeEmployees = filteredUsers.filter(user => {
      const startYear = parseInt(user.startDate.split('-')[0]);
      const retiringYear = parseInt(user.retiringDate.split('-')[0]);

      // Employee is active if they started before or during the selected year
      // AND haven't retired before or during the selected year
      return startYear <= selectedYear && retiringYear > selectedYear;
    }).length;

    const retiredEmployees = filteredUsers.filter(user => {
      const retiringYear = parseInt(user.retiringDate.split('-')[0]);
      return retiringYear <= selectedYear;
    }).length;

    const retiringThisYear = filteredUsers.filter(user => {
      const retiringYear = parseInt(user.retiringDate.split('-')[0]);
      return retiringYear === selectedYear;
    }).length;

    // Extract unique skills from filtered employees
    const skillsSet = new Set();
    filteredUsers.forEach(user => {
      if (user.skills) {
        user.skills.split(',').forEach(skill => {
          skillsSet.add(skill.trim());
        });
      }
    });
    const requiredSkills = Array.from(skillsSet).slice(0, 8);

    setAnalyticsData({
      activeEmployees,
      retiredEmployees,
      allRecords: filteredUsers.length,
      retiringThisYear,
      requiredSkills
    });
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Get employees retiring this year
  const getRetiringEmployees = () => {
    const filteredUsers = getFilteredUsers();
    return filteredUsers.filter(user => {
      const retiringYear = parseInt(user.retiringDate.split('-')[0]);
      return retiringYear === selectedYear;
    });
  };

  // Get vacancies (positions that will become vacant when employees retire)
  const getAllVacancies = () => {
    const filteredUsers = getFilteredUsers();
    return filteredUsers.filter(user => {
      const retiringYear = parseInt(user.retiringDate.split('-')[0]);
      return retiringYear <= selectedYear;
    });
  };

  // Get unique values for filters
  const getUniqueProvinces = () => {
    const provinces = [...new Set(users.map(user => user.province))].filter(Boolean);
    return provinces.sort();
  };

  const getUniquePositions = () => {
    const positions = [...new Set(users.map(user => user.position))].filter(Boolean);
    return positions.sort();
  };

  const getUniqueDesignations = () => {
    const designations = [...new Set(users.map(user => user.designation))].filter(Boolean);
    return designations.sort();
  };

  // Paginate items - show 6 items per page
  const paginateItems = (items, page, setPage) => {
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;
    const paginatedItems = items.slice(startIndex, endIndex);
    const totalPages = Math.ceil(items.length / 6);

    return {
      items: paginatedItems,
      totalPages,
      currentPage: page,
      setPage
    };
  };

  const retirementPagination = paginateItems(getRetiringEmployees(), retirementPage, setRetirementPage);
  const vacancyPagination = paginateItems(getAllVacancies(), vacancyPage, setVacancyPage);

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="text-center py-5">
              <div className="spinner-border text-muted" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-3">Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

          {/* Filters Section */}
          <div className="mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="text-dark mb-3 fw-medium">Filters</h5>
                <div className="row g-3">
                  <div className="col-md-3 col-6">
                    <label className="form-label small fw-medium text-muted">Province</label>
                    <select
                      className="form-select border-0 bg-light"
                      value={selectedProvince}
                      onChange={(e) => setSelectedProvince(e.target.value)}
                    >
                      <option value="">All Provinces</option>
                      {getUniqueProvinces().map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 col-6">
                    <label className="form-label small fw-medium text-muted">Position</label>
                    <select
                      className="form-select border-0 bg-light"
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                    >
                      <option value="">All Positions</option>
                      {getUniquePositions().map(position => (
                        <option key={position} value={position}>{position}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 col-6">
                    <label className="form-label small fw-medium text-muted">Designation</label>
                    <select
                      className="form-select border-0 bg-light"
                      value={selectedDesignation}
                      onChange={(e) => setSelectedDesignation(e.target.value)}
                    >
                      <option value="">All Designations</option>
                      {getUniqueDesignations().map(designation => (
                        <option key={designation} value={designation}>{designation}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3 col-6">
                    <label className="form-label small fw-medium text-muted">&nbsp;</label>
                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={() => {
                        setSelectedProvince('');
                        setSelectedPosition('');
                        setSelectedDesignation('');
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
              <div className="col-md-3 col-6">
                <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)' }}>
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
              <div className="col-md-3 col-6">
                <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'rgba(108, 117, 125, 0.1)' }}>
                  <div className="card-body text-center p-4">
                    <div className="text-secondary mb-2">
                      <i className="fas fa-user-times fa-2x"></i>
                    </div>
                    <h3 className="card-title text-dark mb-1">{analyticsData.retiredEmployees}</h3>
                    <p className="text-muted mb-0">Retired Employees</p>
                  </div>
                </div>
              </div>

              {/* All Records */}
              <div className="col-md-3 col-6">
                <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'rgba(255, 193, 7, 0.1)' }}>
                  <div className="card-body text-center p-4">
                    <div className="text-warning mb-2">
                      <i className="fas fa-database fa-2x"></i>
                    </div>
                    <h3 className="card-title text-dark mb-1">{analyticsData.allRecords}</h3>
                    <p className="text-muted mb-0">All Records</p>
                  </div>
                </div>
              </div>

              {/* Retiring This Year */}
              <div className="col-md-3 col-6">
                <div className="card border-0 shadow-sm h-100" style={{ backgroundColor: 'rgba(13, 202, 240, 0.1)' }}>
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

          {/* Retirements and Vacancies Section */}
          <div className="mb-5">
            <div className="row g-4">
              {/* Retirements in this year */}
              <div className="col-12 col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title text-dark mb-4">Retirements in {selectedYear}</h5>

                    {retirementPagination.items.length === 0 ? (
                      <p className="text-muted text-center py-4 mb-0">No retirements this year</p>
                    ) : (
                      <>
                        <div className="table-responsive">
                          <table className="table table-sm mb-0">
                            <thead style={{ backgroundColor: '#9ca3af' }}>
                              <tr>
                                <th className="text-white fw-medium" style={{ fontSize: '0.875rem', backgroundColor: '#9ca3af' }}>Name</th>
                                <th className="text-white fw-medium" style={{ fontSize: '0.875rem', backgroundColor: '#9ca3af' }}>Job role</th>
                                <th className="text-white fw-medium" style={{ fontSize: '0.875rem', backgroundColor: '#9ca3af' }}>Location</th>
                                <th className="text-white fw-medium" style={{ fontSize: '0.875rem', backgroundColor: '#9ca3af' }}>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {retirementPagination.items.map((user, index) => (
                                <tr key={user.id}>
                                  <td className="align-middle">
                                    <div className="d-flex align-items-center">
                                      <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                        <span className="text-muted fw-medium small">{user.name.charAt(0)}</span>
                                      </div>
                                      <div>
                                        <div className="fw-medium text-dark">{user.name}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="align-middle">
                                    <span className="text-dark">{user.designation || 'N/A'}</span>
                                  </td>
                                  <td className="align-middle">
                                    <span className="text-dark">{user.workingLocation || 'N/A'}</span>
                                  </td>
                                  <td className="text-end align-middle">
                                    <small className="text-muted">{user.retiringDate}</small>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        {retirementPagination.totalPages > 0 && (
                          <nav className="mt-3">
                            <ul className="pagination pagination-sm justify-content-center mb-0">
                              <li className={`page-item ${retirementPagination.currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => retirementPagination.setPage(retirementPagination.currentPage - 1)}>Previous</button>
                              </li>
                              {[...Array(retirementPagination.totalPages)].map((_, i) => (
                                <li key={i} className={`page-item ${retirementPagination.currentPage === i + 1 ? 'active' : ''}`}>
                                  <button className="page-link" onClick={() => retirementPagination.setPage(i + 1)}>{i + 1}</button>
                                </li>
                              ))}
                              <li className={`page-item ${retirementPagination.currentPage === retirementPagination.totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => retirementPagination.setPage(retirementPagination.currentPage + 1)}>Next</button>
                              </li>
                            </ul>
                          </nav>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* All Vacancies */}
              <div className="col-12 col-md-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title text-dark mb-4">All Vacancies</h5>

                    {vacancyPagination.items.length === 0 ? (
                      <p className="text-muted text-center py-4 mb-0">No vacancies</p>
                    ) : (
                      <>
                        <div className="table-responsive">
                          <table className="table table-sm mb-0">
                            <thead style={{ backgroundColor: '#9ca3af' }}>
                              <tr>
                                <th className="text-white fw-medium" style={{ fontSize: '0.875rem', backgroundColor: '#9ca3af', color: 'white' }}>Position</th>
                                <th className="text-white fw-medium" style={{ fontSize: '0.875rem', backgroundColor: '#9ca3af' }}>Department</th>
                                <th className="text-white fw-medium" style={{ fontSize: '0.875rem', backgroundColor: '#9ca3af' }}>Location</th>
                              </tr>
                            </thead>
                            <tbody>
                              {vacancyPagination.items.map((user, index) => (
                                <tr key={user.id}>
                                  <td className="align-middle">
                                    <span className="text-dark">{user.designation || 'N/A'}</span>
                                  </td>
                                  <td className="align-middle">
                                    <span className="text-dark">{user.department || 'N/A'}</span>
                                  </td>
                                  <td className="align-middle">
                                    <span className="text-dark">{user.workingLocation || 'N/A'}</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Pagination */}
                        {vacancyPagination.totalPages > 1 && (
                          <nav className="mt-3">
                            <ul className="pagination pagination-sm justify-content-center mb-0">
                              <li className={`page-item ${vacancyPagination.currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => vacancyPagination.setPage(vacancyPagination.currentPage - 1)}>Previous</button>
                              </li>
                              {[...Array(vacancyPagination.totalPages)].map((_, i) => (
                                <li key={i} className={`page-item ${vacancyPagination.currentPage === i + 1 ? 'active' : ''}`}>
                                  <button className="page-link" onClick={() => vacancyPagination.setPage(i + 1)}>{i + 1}</button>
                                </li>
                              ))}
                              <li className={`page-item ${vacancyPagination.currentPage === vacancyPagination.totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => vacancyPagination.setPage(vacancyPagination.currentPage + 1)}>Next</button>
                              </li>
                            </ul>
                          </nav>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Required Skills Section */}
          {/* <div className="mb-5">
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
          </div> */}

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
