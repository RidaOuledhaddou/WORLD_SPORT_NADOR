import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login_Admin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });
    
          const data = await response.json();
    
          if (data.status === 'success') {
            localStorage.setItem('token_admin', data.token);
            navigate('/Dashboard');
          } else {
            alert(data.message);
          }
        } catch (error) {
          alert('Login failed. Please try again.');
        }
        };
    

    return (
        <>
            <header className="navbar">
                <div className="container">
                    <div className="nav-wrapper grid p-2">
                        <div className="flex justify-between items-center">
                            <img src="../assets/images/logo.png" alt="Logo" />
                        </div>
                    </div>
                </div>
            </header>
            <div style={styles.container}>
                <h2 style={styles.heading}>Login Admin</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            style={styles.input} 
                            required 
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            style={styles.input} 
                            required 
                        />
                    </div>
                    <button type="submit" style={styles.button}>Sign In</button>
                </form>
            </div>
        </>
    );
};

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '60px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff'
    },
    heading: {
        textAlign: 'center',
        marginBottom: '10px',
        color: '#333'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formGroup: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#555'
    },
    input: {
        width: 'calc(100% - 22px)',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        outline: 'none'
    },
    button: {
        width: '100%',
        marginTop: '',
        marginBottom: '10px',
        padding: '10px',
        backgroundColor: '#800080',
        border: 'none',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    },
    error: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'center'
    }
};


export default Login_Admin;


