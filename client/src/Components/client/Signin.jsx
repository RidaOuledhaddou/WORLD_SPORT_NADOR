import React, { useState } from 'react';
import Navbar from "../../Components/common/Navbar";
import Footer from "../../Components/common/Footer";
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conf_password, setConf_password] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== conf_password) {
            setError('Passwords do not match');
            return;
        }

        const newUser = {
            username: sanitizeInput(username),
            email: sanitizeInput(email),
            password: sanitizeInput(password),
            first_name: sanitizeInput(firstName),
            last_name: sanitizeInput(lastName),
            address: sanitizeInput(address),
            phone_number: sanitizeInput(phoneNumber),
            conf_password: sanitizeInput(conf_password)
        };

        try {
            let res = await fetch('http://localhost:8000/api/Signin_user', {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                if (res.status === 422) {
                    const data = await res.json();
                    setError(data.message || 'Validation error');
                } else {
                    throw new Error('Failed to sign in: ' + res.status);
                }
                return;
            }

            if (res.status === 201) {
                console.log('User signed in successfully');
                setUsername('');
                setEmail('');
                setPassword('');
                setConf_password('');
                setFirstName('');
                setLastName('');
                setAddress('');
                setPhoneNumber('');
                setError(null);
                navigate('/Login');
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Failed to sign in. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.container}>
                <h2 style={styles.heading}>Sign In</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inlineFormGroup}>
                        <div style={styles.inlineField}>
                            <label htmlFor="username" style={styles.label}>Username</label>
                            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} required />
                        </div>
                        <div style={styles.inlineField}>
                            <label htmlFor="email" style={styles.label}>Email</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
                        </div>
                    </div>
                    <div style={styles.inlineFormGroup}>
                        <div style={styles.inlineField}>
                            <label htmlFor="firstName" style={styles.label}>First Name</label>
                            <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} />
                        </div>
                        <div style={styles.inlineField}>
                            <label htmlFor="lastName" style={styles.label}>Last Name</label>
                            <input type="text" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} />
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="address" style={styles.label}>Address</label>
                        <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} style={styles.input} />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="phoneNumber" style={styles.label}>Phone Number</label>
                        <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={styles.input} />
                    </div>
                    <div style={styles.inlineFormGroup}>
                        <div style={styles.inlineField}>
                            <label htmlFor="password" style={styles.label}>Password</label>
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
                        </div>
                        <div style={styles.inlineField}>
                            <label htmlFor="conf_password" style={styles.label}>Confirm Password</label>
                            <input type="password" name="conf_password" value={conf_password} onChange={(e) => setConf_password(e.target.value)} style={styles.input} required />
                        </div>
                    </div>
                    <button type="submit" style={styles.button}>Sign In</button>
                    {error && <p>Error: {error}</p>}
                </form>
            </div>
            <Footer />
        </>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '10px auto',
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
    inlineFormGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '15px'
    },
    inlineField: {
        width: '48%',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#555'
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        outline: 'none'
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#800080',
        border: 'none',
        borderRadius: '5px',
        color: '#fff',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    }
};

export default Signin;
