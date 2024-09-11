import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import MainDash from './components_admin/MainDash/MainDash';
import RightSide from './components_admin/RightSide/RightSide';
import Sidebar from './components_admin/sidebar/Sidebar';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      alert('An error occurred. Please login again.');
      navigate('/login_Admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className='Dashboard'>
      <div className="DashboardGlass">
        <Sidebar />
        <MainDash />
        <RightSide />
      </div>
    </div>
  );
}

export default Dashboard;
