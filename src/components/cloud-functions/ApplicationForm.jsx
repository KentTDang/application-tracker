import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";

export default function ApplicationForm({ collectionRef }) {

  const [positionTitle, setPositionTitle] = useState(""); // Position
  const [company, setCompany] = useState(""); // Company
  const [location, setLocation] = useState("");
  const [stage, setStage] = useState(""); // Stage
  const [date, setDate] = useState(""); // Apply Date
  const [resume, setResume] = useState(""); // Resume

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
      positionTitle: positionTitle,
      company: company,
      location: location,
      stage: stage,
      date: date,
      resume: resume
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
      height: "25rem",
      width: "45rem",
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "center",
      padding: 24,
      borderRadius: "12px",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    reviewFormStyle: {
      // height: "25rem",
      // width: "24.6rem",
      backgroundColor: "white",
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gridColumnGap: "1rem",
      gridRowGap: "1rem",
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
          <div>
          <h2>Add Custom Application</h2>
          <Form className={styles.reviewFormStyle} onSubmit={handleCreate}>

          <Form.Group>
              <Form.Label>Position Title</Form.Label>
              <Form.Control
                placeholder="Title"
                onChange={(e) => setPositionTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Location</Form.Label>
              <Form.Control
                placeholder="Location"
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Stage</Form.Label>
              <Form.Select
                placeholder="Select Stage"
                onChange={(e) => setStage(e.target.value)}
                required
              >
                <option>Select Stage</option>
                <option>APPLIED</option>
                <option>INTERVIEW</option>
                <option>OFFER</option>
                <option>NEXT TIME</option>

              </Form.Select>
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                placeholder="Date"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Resume Uploaded</Form.Label>
              <Form.Control
                placeholder="Resume"
                onChange={(e) => setResume(e.target.value)}
                required
              />
            </Form.Group>

            <Button onClick={closeModal}>Close</Button>
            <Button type="submit">Add</Button>

          </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
