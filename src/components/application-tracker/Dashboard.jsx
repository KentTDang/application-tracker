import React, { useState, useRef, useEffect, Fragment } from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { firestore } from "../../firebase";
import "./Dashboard.css";
import {
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

export default function Dashboard() {

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const jobTitleRef = useRef();
  const collectionRef = collection(firestore, "job-applications");


  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Fail to logout")
    }
  }

  // Real Time Get Function
  useEffect(() => {
    console.log(collectionRef);

    const q = query(
      //Kinda of a filter method, we can use where methods here
    );

    setLoading(true);
    const unsub = onSnapshot(collectionRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      try {
        setLoading(true);
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
        setError('Failed to fetch data from Firestore');
        setLoading(false);
      }

    });
    return () => {
      unsub();
    };
  }, []);

  // Add Function 
  const handleSave = async (e) => {

    e.preventDefault();
    console.log(jobTitleRef.current.value);

    let data = {
      jobTitle: jobTitleRef.current.value,
    }

    try {
      addDoc(collectionRef, data);
    } catch (e) {
      console.log(e);
    }

  };

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
        </div>

        <div className="display-container">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            jobs.map((job) => (
              <div key={job.id}>
                <p>{job.jobTitle}</p>
                <p>This line is working</p>
              </div>
            ))
          )}
        </div>

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
