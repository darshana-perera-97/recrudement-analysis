import React, { useState, useEffect } from 'react';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDesignation, setFilterDesignation] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, filterDesignation, filterDepartment]);

  const filterUsers = () => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nic.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Designation filter
    if (filterDesignation) {
      filtered = filtered.filter(user => user.designation === filterDesignation);
    }

    // Department filter
    if (filterDepartment) {
      filtered = filtered.filter(user => user.department === filterDepartment);
    }

    setFilteredUsers(filtered);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterDesignation('');
    setFilterDepartment('');
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5055/api/users');
      const result = await response.json();

      if (response.ok) {
        setUsers(result.users || []);
      } else {
        setError(result.message || 'Failed to fetch users');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="text-center py-5">
              <div className="spinner-border text-muted" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-3">Loading users...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="text-center py-5">
              <div className="mb-4">
                <svg width="64" height="64" fill="currentColor" className="text-danger" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
              </div>
              <h4 className="text-danger mb-3">Error Loading Users</h4>
              <p className="text-muted mb-4">{error}</p>
              <button className="btn btn-outline-danger" onClick={fetchUsers}>
                Try Again
              </button>
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
          {/* Search and Filters */}
          <div className="bg-white rounded-3 shadow-sm border-0 p-4 mb-4">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label small fw-medium text-muted">Search</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <svg width="16" height="16" fill="currentColor" className="text-muted" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control border-0 bg-light"
                    placeholder="Search by name, email, position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-medium text-muted">Designation</label>
                <select
                  className="form-select border-0 bg-light"
                  value={filterDesignation}
                  onChange={(e) => setFilterDesignation(e.target.value)}
                >
                  <option value="">All Designations</option>
                  <option value="Executive Level">Executive Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Junior Level">Junior Level</option>
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label small fw-medium text-muted">Department</label>
                <select
                  className="form-select border-0 bg-light"
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label small fw-medium text-muted">&nbsp;</label>
                <div className="d-flex gap-2">
                  <button 
                    className="btn btn-outline-secondary btn-sm flex-fill"
                    onClick={clearFilters}
                    title="Clear Filters"
                  >
                    Clear
                  </button>
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={fetchUsers}
                    title="Refresh"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59a.25.25 0 0 0 .192.41z"/>
                      <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h3 mb-1 text-dark fw-light">Users</h1>
              <p className="text-muted small mb-0">
                {filteredUsers.length} of {users.length} users
                {(searchTerm || filterDesignation || filterDepartment) && (
                  <span className="text-primary ms-2">(filtered)</span>
                )}
              </p>
            </div>
            <div className="d-flex gap-2">
              <a href="/addUser" className="btn btn-dark btn-sm">
                Add User
              </a>
            </div>
          </div>

          {/* Users List */}
          {filteredUsers.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <svg width="64" height="64" fill="currentColor" className="text-muted" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
              </div>
              <h4 className="text-muted mb-3">
                {users.length === 0 ? 'No users yet' : 'No users found'}
              </h4>
              <p className="text-muted mb-4">
                {users.length === 0 
                  ? 'Get started by adding your first user' 
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
              {users.length === 0 ? (
                <a href="/addUser" className="btn btn-dark">
                  Add First User
                </a>
              ) : (
                <button className="btn btn-outline-secondary" onClick={clearFilters}>
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3 shadow-sm border-0">
              <div className="p-0">
                {filteredUsers.map((user, index) => (
                  <div key={user.id} className={`p-4 ${index !== filteredUsers.length - 1 ? 'border-bottom' : ''}`}>
                    <div className="row align-items-center">
                      <div className="col-md-4">
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '48px', height: '48px'}}>
                            <span className="text-muted fw-medium">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h6 className="mb-1 fw-medium text-dark">{user.name}</h6>
                            <small className="text-muted">{user.email}</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="text-muted small mb-1">Designation</div>
                        <span className={`badge ${user.designation ? 'bg-primary' : 'bg-light text-muted'}`}>
                          {user.designation || 'Not specified'}
                        </span>
                      </div>
                      <div className="col-md-3">
                        <div className="text-muted small mb-1">NIC</div>
                        <code className="text-dark">{user.nic}</code>
                      </div>
                      <div className="col-md-2 text-end">
                        <button 
                          className="btn btn-outline-dark btn-sm"
                          onClick={() => handleViewMore(user)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="modal fade show" style={{display: 'block'}} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-bottom">
                <h5 className="modal-title">{selectedUser.name}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <strong>Email:</strong>
                    <p className="mb-0">{selectedUser.email}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>NIC:</strong>
                    <p className="mb-0">{selectedUser.nic}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Position:</strong>
                    <p className="mb-0">{selectedUser.position}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Designation:</strong>
                    <p className="mb-0">{selectedUser.designation || 'Not specified'}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Department:</strong>
                    <p className="mb-0">{selectedUser.department}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Experience:</strong>
                    <p className="mb-0">{selectedUser.experience} years</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Working Location:</strong>
                    <p className="mb-0">{selectedUser.workingLocation}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Province:</strong>
                    <p className="mb-0">{selectedUser.province}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Start Date:</strong>
                    <p className="mb-0">{new Date(selectedUser.startDate).toLocaleDateString()}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <strong>Retiring Date:</strong>
                    <p className="mb-0">{new Date(selectedUser.retiringDate).toLocaleDateString()}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <strong>Address:</strong>
                    <p className="mb-0">{selectedUser.address}</p>
                  </div>
                  <div className="col-12 mb-3">
                    <strong>Skills:</strong>
                    <p className="mb-0">{selectedUser.skills || 'Not specified'}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {showModal && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
};

export default ViewUser;
