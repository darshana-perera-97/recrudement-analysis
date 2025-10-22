import React, { useState, useEffect } from 'react';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual API call
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          position: 'Software Engineer',
          department: 'IT',
          experience: 5,
          skills: 'JavaScript, React, Node.js'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          position: 'HR Manager',
          department: 'HR',
          experience: 8,
          skills: 'Recruitment, Employee Relations, HRIS'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          email: 'mike.johnson@example.com',
          position: 'Financial Analyst',
          department: 'Finance',
          experience: 3,
          skills: 'Financial Modeling, Excel, SQL'
        }
      ];
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading users...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="mb-0">User Management</h3>
              <a href="/addUser" className="btn btn-primary">
                Add New User
              </a>
            </div>
            <div className="card-body">
              {users.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No users found.</p>
                  <a href="/addUser" className="btn btn-primary">
                    Add First User
                  </a>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Experience</th>
                        <th>Skills</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.position}</td>
                          <td>
                            <span className="badge bg-secondary">{user.department}</span>
                          </td>
                          <td>{user.experience} years</td>
                          <td>
                            <small className="text-muted">{user.skills}</small>
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button className="btn btn-sm btn-outline-primary">
                                Edit
                              </button>
                              <button className="btn btn-sm btn-outline-danger">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
