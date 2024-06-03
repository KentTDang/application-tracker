import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";

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
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
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
        display: "block",
      },
      "& > label": {
        display: "block",
      },
    },
    buttonStyle: {
      fontSize: "17px",
      border: "transparent",
      boxShadow: "2px 2px 4px rgba(0,0,0,0.4)",
      background: "dodgerblue",
      color: "white",
      borderRadius: "4px",
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
          <Form className={styles.reviewFormStyle} onSubmit={handleCreate}>
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stage</Form.Label>
              <Form.Control
                onChange={(e) => setStage(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>LinkedIn Note</Form.Label>
              <Form.Control
                onChange={(e) => setLinkedinNote(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Connections Sent</Form.Label>
              <Form.Control
                onChange={(e) => setConnectionSent(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apply Date</Form.Label>
              <Form.Control
                onChange={(e) => setApplyDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Response Date</Form.Label>
              <Form.Control
                onChange={(e) => setResponseDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Referral</Form.Label>
              <Form.Control
                onChange={(e) => setReferral(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Salary</Form.Label>
              <Form.Control
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </Form.Group>
            <Button onClick={closeModal}>Close</Button>
            <Button type="submit">Add</Button>
          </Form>
        </div>
      </Modal>
    </>
  );
}
