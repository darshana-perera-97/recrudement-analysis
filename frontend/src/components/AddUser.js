import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    workingLocation: '',
    nic: '',
    dob: '',
    province: '',
    address: '',
    startDate: '',
    retiringDate: '',
    cvFile: null,
    position: '',
    department: '',
    experience: '',
    skills: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cvFile: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend API
    console.log('User data:', formData);
    alert('User added successfully!');
    navigate('/');
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-light text-dark mb-2">Add New User</h2>
                <p className="text-muted small">Enter user information below</p>
              </div>

              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-4">
                  <div className="fw-medium text-dark text-start mb-2">Full Name</div>
                  <input
                    type="text"
                    className="form-control form-control-lg border-0 bg-light"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <div className="fw-medium text-dark text-start mb-2">Email Address</div>
                  <input
                    type="email"
                    className="form-control form-control-lg border-0 bg-light"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                <div className="mb-4">
                  <div className="fw-medium text-dark text-start mb-2">Working Location/Office</div>
                  <input
                    type="text"
                    className="form-control form-control-lg border-0 bg-light"
                    id="workingLocation"
                    name="workingLocation"
                    value={formData.workingLocation}
                    onChange={handleChange}
                    placeholder="Enter working location or office"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="fw-medium text-dark text-start mb-2">NIC</div>
                    <input
                      type="text"
                      className="form-control form-control-lg border-0 bg-light"
                      id="nic"
                      name="nic"
                      value={formData.nic}
                      onChange={handleChange}
                      placeholder="Enter NIC number"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="fw-medium text-dark text-start mb-2">Date of Birth</div>
                    <input
                      type="date"
                      className="form-control form-control-lg border-0 bg-light"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="fw-medium text-dark text-start mb-2">Province</div>
                  <select
                    className="form-select form-select-lg border-0 bg-light"
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Province</option>
                    <option value="Western Province">Western Province</option>
                    <option value="Central Province">Central Province</option>
                    <option value="Southern Province">Southern Province</option>
                    <option value="Northern Province">Northern Province</option>
                    <option value="Eastern Province">Eastern Province</option>
                    <option value="North Western Province">North Western Province</option>
                    <option value="North Central Province">North Central Province</option>
                    <option value="Uva Province">Uva Province</option>
                    <option value="Sabaragamuwa Province">Sabaragamuwa Province</option>
                  </select>
                </div>

                <div className="mb-4">
                  <div className="fw-medium text-dark text-start mb-2">Address</div>
                  <textarea
                    className="form-control form-control-lg border-0 bg-light"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter full address"
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="fw-medium text-dark text-start mb-2">Started Date</div>
                    <input
                      type="date"
                      className="form-control form-control-lg border-0 bg-light"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="fw-medium text-dark text-start mb-2">Retiring Date</div>
                    <input
                      type="date"
                      className="form-control form-control-lg border-0 bg-light"
                      id="retiringDate"
                      name="retiringDate"
                      value={formData.retiringDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="fw-medium text-dark text-start mb-2">Upload CV</div>
                  <input
                    type="file"
                    className="form-control form-control-lg border-0 bg-light"
                    id="cvFile"
                    name="cvFile"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <div className="form-text text-muted small mt-1">
                    Accepted formats: PDF, DOC, DOCX (Max size: 5MB)
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="fw-medium text-dark text-start mb-2">Position</div>
                    <input
                      type="text"
                      className="form-control form-control-lg border-0 bg-light"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Job title"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="fw-medium text-dark text-start mb-2">Department</div>
                    <select
                      className="form-select form-select-lg border-0 bg-light"
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="IT">IT</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operations">Operations</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="fw-medium text-dark text-start mb-2">Experience</div>
                    <input
                      type="number"
                      className="form-control form-control-lg border-0 bg-light"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Years"
                      min="0"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="fw-medium text-dark text-start mb-2">Skills</div>
                    <input
                      type="text"
                      className="form-control form-control-lg border-0 bg-light"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g., JavaScript, React"
                    />
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-dark btn-lg px-4"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
