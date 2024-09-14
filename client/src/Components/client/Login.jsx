import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify'; // Add this package .

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        // Sanitize inputs
        const sanitizedEmail = sanitizeInput(email);
        const sanitizedPassword = sanitizeInput(password);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login_user', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add CSRF token header if needed
                    // 'X-CSRF-TOKEN': 'your-csrf-token'
                },
                body: JSON.stringify({ email: sanitizedEmail, password: sanitizedPassword }),
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || 'Login failed');
            }

            const responseData = await response.json();
            const token = responseData.token;
            localStorage.setItem('token', token);
            console.log('Login successful');
            navigate('/');
        } catch (error) {
            console.error('Error during login:', error);
            setError('Password or email not correct');
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <h2 style={styles.heading}>Login</h2>
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
                    {error && <p style={styles.error}>{error}</p>}
                </form>
                <Link to={'/Signin'}><span>create an account ?</span> SIGN IN &ensp;&ensp;</Link>
            </div>
            <Footer />
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

export default Login;
