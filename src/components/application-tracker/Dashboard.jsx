import React, { useState, useRef, useEffect, Fragment } from "react";
import { Card, Button, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from "../../firebase";
import "./Dashboard.css";
import Popup from "reactjs-popup";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";

import GetApplication from "../../cloud-functions/GetApplication";
import ApplicationTable from "../../cloud-functions/ApplicationTable";
import ApplicationForm from "../../cloud-functions/ApplicationForm";

export default function Dashboard() {
  // New Code
  const { currentUser, logout } = useAuth();
  const applications = GetApplication(currentUser.uid);

  const [error, setError] = useState("");

  const navigate = useNavigate();

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
  // // Delete Function
  // const handleDelete = async (id) => {
  //   const jobApplicationDoc = doc(firestore, currentUser.uid, id);
  //   await deleteDoc(jobApplicationDoc);
  // };

  // // Edit Function
  // const handleEdit = async (
  //   id,
  //   companyRef,
  //   stageRef,
  //   jobTitleRef,
  //   linkedinNoteRef,
  //   connectionSentRef,
  //   applyDateRef,
  //   responseDateRef,
  //   referralRef,
  //   salaryRef
  // ) => {
  //   setCompany(companyRef);
  //   setStage(stageRef);
  //   setJobTitle(jobTitleRef);
  //   setLinkedinNote(linkedinNoteRef);
  //   setConnectionSent(connectionSentRef);
  //   setApplyDate(applyDateRef);
  //   setResponseDate(responseDateRef);
  //   setReferral(referralRef);
  //   setSalary(salaryRef);
  //   setId(id);
  //   setShow(true);
  // };

  // // Update Function
  // const handleUpdate = async (e) => {
  //   e.preventDefault()
    
  //   const updateData = doc(firestore, currentUser.uid, id);

  //   let data = {
  //     company: company,
  //     stage: stage,
  //     jobTitle: jobTitle,
  //     linkedinNote: linkedinNote,
  //     connectionSent: connectionSent,
  //     applyDate: applyDate,
  //     responseDate: responseDate,
  //     referral: referral,
  //     salary: salary,
  //   };

  //   await updateDoc(updateData, data);
  //   setShow(false)
  //   setCompany('');
  //   setStage('');
  //   setJobTitle('');
  //   setLinkedinNote('');
  //   setConnectionSent('');
  //   setApplyDate('');
  //   setResponseDate('');
  //   setReferral('');
  //   setSalary('');
  // };


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


      <ApplicationTable applications={applications} />
      <ApplicationForm collectionRef={collectionRef}/>
    </>
  );
}
