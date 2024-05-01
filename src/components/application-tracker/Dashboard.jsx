import React, { Suspense } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase";
import "../../styles/Dashboard.css";
import { collection } from "firebase/firestore";
import { lazy } from 'react';

import useFirebaseData from "../../cloud-functions/useFirebaseData";

import ApplicationForm from "../../cloud-functions/ApplicationForm";
import Banner from "./Banner";
const ApplicationTable = lazy(() => import("../../cloud-functions/ApplicationTable"));

export default function Dashboard() {

  const currentUser = useAuth().currentUser;
  const applications = useFirebaseData(currentUser.uid);
  const collectionRef = collection(firestore, currentUser.uid);

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
      <Suspense fallback={<div>Loading...</div>}>
        <ApplicationTable applications={applications} uid={currentUser.uid} />
      </Suspense>
      <ApplicationForm collectionRef={collectionRef}/>
    </>
  );
}
