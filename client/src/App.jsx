import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import Pages
import Gallery from './components/Gallery.jsx';
import ProjectDetails from './pages/ProjectDetails.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Journal from './pages/Journal.jsx';
import AddProject from './pages/AddProject.jsx';
import Login from './pages/Login.jsx';

// Import Global Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// 🛡️ The "Bouncer" Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  // We check local storage to see if she's already logged in
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAdmin(authStatus);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} />

        <div className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Gallery isAdmin={isAdmin} />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />

            {/* 🔐 Protected Admin Routes */}
            <Route
              path="/add"
              element={
                <ProtectedRoute>
                  <AddProject />
                </ProtectedRoute>
              }
            />

            {/* The Admin Dashboard (Gallery in Admin Mode) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Gallery isAdmin={true} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
