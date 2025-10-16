import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'react-toastify';
import { getUser, updateUser } from '../api/user-api';
import bcrypt from 'bcryptjs';

export default function UserProfile() {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(true);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        if (!userId) {
            toast.error('You are not logged in!');
            navigate('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const userData = await getUser(userId);
                setUser(userData);
            } catch (error) {
                toast.error('Error fetching user information!');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, navigate]);

    const validateName = (name) => {
        return /^[A-Za-z]+(\s[A-Za-z]+)*$/.test(name);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = async () => {
        if (!oldPassword || !newPassword) {
            toast.error('Please enter all required fields!');
            return;
        }
        if (!validatePassword(newPassword)) {
            toast.error('Password must be at least 6 characters long!');
            return;
        }
        try {
            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!passwordMatch) {
                toast.error('Incorrect old password!');
                return;
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await updateUser({ ...user, password: hashedPassword });
            toast.success('Password changed successfully!');
            setShowPasswordInput(false);
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            toast.error('Password change failed, please try again!');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateName(user.name)) {
            toast.error('Name can only contain letters and spaces between words!');
            return;
        }
        try {
            await updateUser(user);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error('Update failed, please try again!');
        }
    };

    if (loading) return <p>Loading data...</p>;

    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col>
                        <img
                            src="https://github.com/mdo.png"
                            alt="User Avatar"
                            width="auto"
                            height="auto"
                            className="rounded-circle p-4"
                        />
                    </Col>
                    <Col md={6}>
                        <h2 className='text-center'>Personal Information</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='name'
                                    value={user.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    name='email'
                                    value={user.email}
                                    onChange={handleChange}
                                    required
                                    disabled
                                />
                            </Form.Group>
                            {!showPasswordInput && (
                                <Row md={6}>
                                    <Col>
                                        <Button variant='primary' type='submit' className='my-3'>
                                            Update
                                        </Button>
                                    </Col>
                                    <Col>
                                        {user.role === "manager" ?
                                            <Link to='/dashboard' className='btn btn-secondary mt-3'>Go Back</Link>
                                            : <Link to='/' className='btn btn-secondary mt-3'>Go Back</Link>
                                        }
                                    </Col>
                                    <Col md={5}>
                                        <Button variant='warning' className='my-3' onClick={() => setShowPasswordInput(!showPasswordInput)}>
                                            Change Password
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </Form>
                        {showPasswordInput && (
                            <Form.Group controlId='password' className='mt-3'>
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                />
                                <Form.Label className='mt-2'>New Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <Button variant='success' className='m-2' onClick={handlePasswordChange}>
                                    Confirm
                                </Button>
                                <Button variant='danger' className='m-2' onClick={() => setShowPasswordInput(!showPasswordInput)}>
                                    Cancel
                                </Button>
                            </Form.Group>
                        )}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}