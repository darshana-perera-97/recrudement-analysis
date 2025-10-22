import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AddUser from './components/AddUser';
import ViewUser from './components/ViewUser';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Recruitment Analysis
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/addUser">
                    Add User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/viewUser">
                    View Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/viewUser" element={<ViewUser />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
