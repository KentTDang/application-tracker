import React, { useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from './AuthContext';
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    /**
     * Form submit handler to process a user login request.
     * 
     * TODO: Switch to TypeScript 😛
     * 
     * @param {FormEvent<HTMLFormElement>} e 
     */
    async function handleSubmit(e) {
        // Prevent form from submitting an action
        e.preventDefault();
        // Reset any errors and set state to inform user that application is processing their request to login
        setError("");
        setLoading(true);

        // Get data from from
        const data = new FormData(e.currentTarget);
        const email = data.get("email"); // Note: the "name" attribute matches the value provided here
        const password = data.get("password");

        try {
            await login(email, password);
            navigate("/")
        } catch {
            setError("Failed to log in")
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}>
                <div>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" type="email" required></Form.Control>
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" required></Form.Control>
                                </Form.Group>
                                <Button disabled={loading} className="w-100 mt-4" type="submit">Login</Button>
                            </Form>
                            <div className='w-100 text-center mt-2'>
                                <Link to='/forgot-password'>Forgot Password?</Link>
                            </div>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>

            </Container>



        </>
    )
}
