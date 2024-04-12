import React, { useState, useRef, useEffect, Fragment } from 'react'
import { Card, Button, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { firestore } from "../../firebase";
import "./Dashboard.css";
import {
  onSnapshot,
  addDoc,
  collection,
  query,
} from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

export default function Dashboard() {

  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const collectionRef = collection(firestore, currentUser.uid);

  // Firebase Document and Fields
  const [application, setApplication] = useState([]);
  const companyRef = useRef() // Company
  const stageRef = useRef() // Stage
  const jobTitleRef = useRef()  // Position
  const linkedinNoteRef = useRef() // Linkedin Note
  const connectionSentRef = useRef() // Number of connections sent
  const applyDateRef = useRef() // Apply Date
  const responseDataRef = useRef() // Reponse Date
  const linkRef = useRef()  // Job URL
  const referralRef = useRef() // Referall ?
  const salaryRef = useRef()  // Salary

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
    console.log(currentUser)

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
        setApplication(data);
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

    let data = {
      company: companyRef.current.value,
      stage: stageRef.current.value,
      jobTitle: jobTitleRef.current.value,
      linkedinNote: linkedinNoteRef.current.value,
      connectionSent: connectionSentRef.current.value,
      applyDate: applyDateRef.current.value,
      responseData: responseDataRef.current.value,
      referral: referralRef.current.value,
      salary: salaryRef.current.value
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

        <div className="profilie-container">
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
        </div>
        <button variant="link" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /></button>

      </div>
      <div className="profile-container">

        <div>
          <form onSubmit={handleSave}>
            <label>Job Title</label>
            <input type="text" ref={companyRef} />
            <input type="text" ref={stageRef} />
            <input type="text" ref={jobTitleRef} />
            <input type="text" ref={linkedinNoteRef} />
            <input type="text" ref={connectionSentRef} />
            <input type="text" ref={applyDateRef} />
            <input type="text" ref={responseDataRef} />
            <input type="text" ref={referralRef} />
            <input type="text" ref={salaryRef} />
            <button type="submit">Save</button>
          </form>
        </div>

        <div className="display-container">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            application.map((job) => (
              <div className="joblist-container" key={job.id}>
                <p>{job.company}</p>
                <p>{job.stage}</p>
                <p>{job.jobTitle}</p>
                <p>{job.linkedinNote}</p>
                <p>{job.connectionSent}</p>
                <p>{job.applyDate}</p>
                <p>{job.responseData}</p>
                <p>{job.referral}</p>
                <p>{job.salary}</p>
                <p>This line is working</p>
              </div>
            ))
          )}
        </div>

      </div>

    </>

  )
}
