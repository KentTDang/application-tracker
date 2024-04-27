import React, { useState, useRef, useEffect, Fragment } from "react";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "../../firebase";
import "./Dashboard.css";
import Popup from "reactjs-popup";
import {
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { update } from "firebase/database";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);

  const collectionRef = collection(firestore, currentUser.uid);

  // Firebase Document and Fields
  const [application, setApplication] = useState([]);
  const [company, setCompany] = useState(""); // Company
  const [stage, setStage] = useState(""); // Stage
  const [jobTitle, setJobTitle] = useState(""); // Position
  const [linkedinNote, setLinkedinNote] = useState(""); // Linkedin Note
  const [connectionSent, setConnectionSent] = useState(""); // Number of connections sent
  const [applyDate, setApplyDate] = useState(""); // Apply Date
  const [responseDate, setResponseDate] = useState(""); // Response Date
  const [link, setLink] = useState(""); // Job URL
  const [referral, setReferral] = useState(""); // Referral ?
  const [salary, setSalary] = useState(""); // Salary

  // Logout Function
  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Fail to logout");
    }
  }

  // Real Time Get Function
  useEffect(() => {
    const getData = async () => {
      const db = await getDocs(collectionRef);
      setApplication(db.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  });

  // Create Function
  const handleCreate = async (e) => {
    e.preventDefault();

    let data = {
      company: company,
      stage: stage,
      jobTitle: jobTitle,
      linkedinNote: linkedinNote,
      connectionSent: connectionSent,
      applyDate: applyDate,
      responseDate: responseDate,
      referral: referral,
      salary: salary,
    };
    await addDoc(collectionRef, data);
  };

  // Delete Function
  const handleDelete = async (id) => {
    const jobApplicationDoc = doc(firestore, currentUser.uid, id);
    await deleteDoc(jobApplicationDoc);
  };

  // Edit Function
  const handleEdit = async (
    id,
    companyRef,
    stageRef,
    jobTitleRef,
    linkedinNoteRef,
    connectionSentRef,
    applyDateRef,
    responseDateRef,
    referralRef,
    salaryRef
  ) => {
    setCompany(companyRef);
    setStage(stageRef);
    setJobTitle(jobTitleRef);
    setLinkedinNote(linkedinNoteRef);
    setConnectionSent(connectionSentRef);
    setApplyDate(applyDateRef);
    setResponseDate(responseDateRef);
    setReferral(referralRef);
    setSalary(salaryRef);
    setId(id);
    setShow(true);
  };

  // Update Function
  const handleUpdate = async (e) => {
    e.preventDefault()
    
    const updateData = doc(firestore, currentUser.uid, id);

    let data = {
      company: company,
      stage: stage,
      jobTitle: jobTitle,
      linkedinNote: linkedinNote,
      connectionSent: connectionSent,
      applyDate: applyDate,
      responseDate: responseDate,
      referral: referral,
      salary: salary,
    };

    await updateDoc(updateData, data);
    setShow(false)
    setCompany('');
    setStage('');
    setJobTitle('');
    setLinkedinNote('');
    setConnectionSent('');
    setApplyDate('');
    setResponseDate('');
    setReferral('');
    setSalary('');
  };

  return (
    <>
      <div className="header">
        Job Application Tracker
        <div className="profilie-container">
          <Popup
            trigger={
              <button>
                <FontAwesomeIcon icon={faUser} />
              </button>
            }
          >
            <div className="profile-dialog">
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <button variant="link" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
          </Popup>
        </div>
      </div>

      <div>
        <form>
          <label>Job Title</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type="text"
            value={stage}
            onChange={(e) => setStage(e.target.value)}
          />

          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />

          <input
            type="text"
            value={linkedinNote}
            onChange={(e) => setLinkedinNote(e.target.value)}
          />

          <input
            type="text"
            value={connectionSent}
            onChange={(e) => setConnectionSent(e.target.value)}
          />

          <input
            type="text"
            value={applyDate}
            onChange={(e) => setApplyDate(e.target.value)}
          />

          <input
            type="text"
            value={responseDate}
            onChange={(e) => setResponseDate(e.target.value)}
          />

          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <input
            type="text"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
          />

          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          {!show ? (
            <button onClick={handleCreate}>Create</button>
          ) : (
            <button onClick={handleUpdate}>Update</button>
          )}
        </form>
      </div>

      {application.map((job) => (
        <div>
          <p>{job.company}</p>
          <p>{job.stage}</p>
          <p>{job.jobTitle}</p>
          <p>{job.linkedinNote}</p>
          <p>{job.connectionSent}</p>
          <p>{job.applyDate}</p>
          <p>{job.responseDate}</p>
          <p>{job.referral}</p>
          <p>{job.salary}</p>
          <button onClick={() => handleDelete(job.id)}>Delete</button>
          <button
            onClick={() =>
              handleEdit(
                job.id,
                job.company,
                job.stage,
                job.jobTitle,
                job.linkedinNote,
                job.connectionSent,
                job.applyDate,
                job.responseDate,
                job.referral,
                job.salary
              )
            }
          >
            Edit
          </button>
        </div>
      ))}
    </>
  );
}
