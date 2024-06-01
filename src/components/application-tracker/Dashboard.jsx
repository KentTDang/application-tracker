import React, { Suspense, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { firestore } from "../../firebase";
import "../../styles/Dashboard.css";
import { collection } from "firebase/firestore";

import useFirebaseData from "../cloud-functions/useFirebaseData";

import Banner from "./Banner";
import ApplicationForm from "../cloud-functions/ApplicationForm";
import ApplicationTable from "../cloud-functions/ApplicationTable";

export default function Dashboard() {
  const currentUser = useAuth().currentUser;
  const applications = useFirebaseData(currentUser);
  const collectionRef = collection(firestore, currentUser.uid);

  return (
    <>
      <Banner />
      <ApplicationTable
        applications={applications}
        currentUser={currentUser}
        collectionRef={collectionRef}
      />
      <ApplicationForm collectionRef={collectionRef} />
    </>
  );
}
