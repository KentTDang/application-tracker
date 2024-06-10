import React, { useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  async function googleSignIn() {

    setError("");
    setLoading(true);

    try{
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch(error) {
      console.error("Error signing in with Google: ", error);
    } finally {
      setLoading(false);
    }
  }


  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const passwordConfirm = data.get("passwordConfirm");

    if (password !== passwordConfirm) {
      setLoading(false);
      return setError("Passwords do not match");
    }

    try {
      await signup(email, password, passwordConfirm);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Button onClick={googleSignIn}>Google Sign In</Button>
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    name="passwordConfirm"
                    type="password"
                    required
                  ></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
