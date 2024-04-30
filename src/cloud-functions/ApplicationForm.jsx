import React, { useState } from "react";
import { addDoc } from "firebase/firestore";

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

  return (
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
      <button onClick={handleCreate}>Create</button>

      {/* {!show ? (
        <button onClick={handleCreate}>Create</button>
      ) : (
        <button onClick={handleUpdate}>Update</button>
      )} */}
    </form>
  );
}
