import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX} from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import useStyles from './Styles'

export default function ApplicationForm({ collectionRef }) {
  const [positionTitle, setPositionTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [stage, setStage] = useState("");
  const [date, setDate] = useState("");
  const [resume, setResume] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

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
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Company"
                  onChange={(e) => setCompany(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

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
                  onChange={(e) => setStage(e.target.value)}
                  required
                >
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
