import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import Logo from '../../components_admin/imgs/logo.png';
import { SidebarData } from '../Data/Data';
import { UilSignOutAlt } from '@iconscout/react-unicons';

const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleSignOut = () => {
        localStorage.removeItem('token_admin'); // Remove the token from local storage
        navigate('/'); // Redirect to the home page
    }

    return (
        <div className="Sidebar">
            <div className="logo">
                <img src={Logo} alt='' onClick={handleSignOut} style={{ cursor: 'pointer' }} />
            </div>
            <div className="menu">
                {SidebarData.map((item, index) => {
                    return (
                        <div className={selected === index ? 'menuItem active' : 'menuItem'}
                            key={index}
                            onClick={() => setSelected(index)}
                        >
                            <Link to={item.link}>
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
                                    <span style={{ marginRight: 10 }}>
                                        <item.icon />
                                    </span>
                                    <span>
                                        {item.heading}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )
                })}

                <div className="menuItem" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
                    <UilSignOutAlt />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
