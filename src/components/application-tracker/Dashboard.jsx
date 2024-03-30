import React, { useState, useRef } from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { firestore } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";
import "./Dashboard.css";

export default function Dashboard() {

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const jobTitleRef = useRef();
  const ref = collection(firestore, "job-applications");
  const handleSave = async (e) => {

    e.preventDefault();
    console.log(jobTitleRef.current.value);

    let data = {
      jobTitle: jobTitleRef.current.value,
    }

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }

  };

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Fail to logout")
    }
  }

  return (
    <>
      <div className="header">
        Job Application Tracker
      </div>
      <div className="profile-container">

        <div>
          <form onSubmit={handleSave}>
            <label>Job Title</label>
            <input type="text" ref={jobTitleRef} />
            <button type="submit">Save</button>
          </form>
        </div>;

      </div>
      <Container className="d-flex align-items-center justify-content-center"

        style={{ minHeight: "100vh" }}>
        <div className="profile-container">
          <Card >
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Link to='/update-profile' className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>Log Out</Button>
          </div>
        </div>

      </Container >


    </>

  )
}
