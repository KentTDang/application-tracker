import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase";
import "../../styles/Dashboard.css";
import {
  addDoc,
  collection,
} from "firebase/firestore";


import GetApplication from "../../cloud-functions/GetApplication";
import ApplicationTable from "../../cloud-functions/ApplicationTable";
import ApplicationForm from "../../cloud-functions/ApplicationForm";
import Banner from "./Banner";

export default function Dashboard() {

  const currentUser = useAuth().currentUser;
  const applications = GetApplication(currentUser.uid);
  const collectionRef = collection(firestore, currentUser.uid);


 
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
      <Banner />
      <ApplicationTable applications={applications} />
      <ApplicationForm collectionRef={collectionRef}/>
    </>
  );
}
