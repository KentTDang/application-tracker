import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";

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
      backgroundColor: "black",
      height: "45rem",
      width: "45rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    reviewFormStyle: {
      height: "40rem",
      width: "40rem",
      backgroundColor: "lightblue",
      "& > input": {
        width: "40%",
      },
    },
    reviewFormRowStyle: {
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
    },
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
        <h1>Add Jobs</h1>

          <form className={styles.reviewFormStyle}>
            <div className={styles.reviewFormRowStyle}>
              <label>Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <label>Stage</label>
              <input
                type="text"
                value={stage}
                onChange={(e) => setStage(e.target.value)}
              />
            </div>

            <div className={styles.reviewFormRowStyle}>
              <label>Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
              <label>LinkedIn Note</label>
              <input
                type="text"
                value={linkedinNote}
                onChange={(e) => setLinkedinNote(e.target.value)}
              />
            </div>

            <div className={styles.reviewFormRowStyle}>
              <label>Connection Sent</label>
              <input
                type="text"
                value={connectionSent}
                onChange={(e) => setConnectionSent(e.target.value)}
              />
              <label>Apply Date</label>
              <input
                type="text"
                value={applyDate}
                onChange={(e) => setApplyDate(e.target.value)}
              />
            </div>

            <div className={styles.reviewFormRowStyle}>
              <label>Response Date</label>
              <input
                type="text"
                value={responseDate}
                onChange={(e) => setResponseDate(e.target.value)}
              />
              <label>Link</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <div className={styles.reviewFormRowStyle}>
              <label>Referral</label>
              <input
                type="text"
                value={referral}
                onChange={(e) => setReferral(e.target.value)}
              />
              <label>Salary</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            <button onClick={handleCreate}>Create</button>

            <button onClick={closeModal}>Close</button>

            {/* {!show ? (
        <button onClick={handleCreate}>Create</button>
      ) : (
        <button onClick={handleUpdate}>Update</button>
      )} */}
          </form>
        </div>
      </Modal>
    </>
  );
}
