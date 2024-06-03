import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";
import {TextField} from '@mui/material'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ApplicationForm({ collectionRef }) {
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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    console.log("Open");
    setModalIsOpen(true);
    console.log(modalIsOpen);
  }

  function closeModal() {
    console.log("Close");
    setModalIsOpen(false);
    console.log(modalIsOpen);
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

  const useStyles = createUseStyles({
    modalStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
    },
    reviewFormContainerStyle: {
      backgroundColor: "white",
      height: "35rem",
      width: "35rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "12px",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"

    },
    reviewFormStyle: {
      height: "25rem",
      width: "24.6rem",
      backgroundColor: "white",
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gridColumnGap: "1rem",
      gridRowGap: "1rem",
    },
    reviewFormRowStyle: {
      "& > input": {
        borderRadius: "6px",
        display: "block"
      },
      "& > label": {
        display: "block"
      }
    },
    buttonStyle: {
      fontSize: "17px",
      border: "transparent",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.4)",
      background: "dodgerblue",
      color: "white",
      borderRadius: "4px",
    }
  });

  const styles = useStyles();

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modalStyle}
      >
        <div className={styles.reviewFormContainerStyle}>
          <form className={styles.reviewFormStyle}>
            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="Outlined" variant="outlined" value={company}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="Stage" variant="outlined" value={stage}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="Job Title" variant="outlined" value={jobTitle}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="LinkedIn Note" variant="outlined" value={linkedinNote}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="Connections Sent" variant="outlined" value={connectionSent}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="Apply Date" variant="outlined" value={applyDate}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="Response Date" variant="outlined" value={responseDate}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="Link" variant="outlined" value={link}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="Referral" variant="outlined" value={referral}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>

            <div className={styles.reviewFormRowStyle}>
              <TextField id="outlined-basic" label="Salary" variant="outlined" value={salary}
                onChange={(e) => setCompany(e.target.value)}/>
            </div>
            <button onClick={closeModal} className={styles.buttonStyle}>Cancel</button>
            <button onClick={handleCreate} className={styles.buttonStyle}><FontAwesomeIcon icon={faPlus} /> Add Application </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
