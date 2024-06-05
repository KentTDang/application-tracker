import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import Modal from "react-modal";
import { createUseStyles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX} from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

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
      resume: resume,
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
      padding: 24,
      borderRadius: "12px",
      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    reviewFormStyle: {
      backgroundColor: "white",
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gridColumnGap: "1rem",
      gridRowGap: "1rem",
    },
    reviewFormHeader: {
      display: "flex",
      justifyContent: "space-between"
    },
    closeFormButtonX: {
      background: "transparent",
      color: "gray",
      border: "none",
    },
    addApplicationButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "3rem",
      width: "10rem",
      fontSize: "14.8px",
      "& > svg": {
        marginRight: '0.25rem'
      }
    },
  });

  const styles = useStyles();

  return (
    <>
      <Button onClick={openModal} className={styles.addApplicationButton}><FontAwesomeIcon icon={faPlus} />Add Application</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.modalStyle}
      >
        <div className={styles.reviewFormContainerStyle}>
          <div>
            <div className={styles.reviewFormHeader}>
            <h2>Add Jobs</h2>
            <Button className={styles.closeFormButtonX} onClick={closeModal}><FontAwesomeIcon icon={faX} /></Button>
            </div>
            <Form className={styles.reviewFormStyle} onSubmit={handleCreate}>
              <Form.Group>
                <Form.Label>Position Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setPositionTitle(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company"
                  onChange={(e) => setCompany(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Stage</Form.Label>
                <Form.Select
                  type="text"
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
                  type="date"
                  placeholder="Date"
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Resume Uploaded</Form.Label>
                <Form.Control
                  type="text"
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
