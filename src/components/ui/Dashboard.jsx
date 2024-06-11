import React, { Suspense, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { firestore } from "../../firebase";
import "../../styles/Dashboard.css";
import { collection } from "firebase/firestore";

import useFirebaseData from "../application/useFirebaseData";

import Banner from "./Banner";
import ApplicationForm from "../application/ApplicationForm";
import ApplicationTable from "../application/ApplicationTable";
import Gmail from "../gmail/Gmail";

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
      <Gmail />
    </>
  );
}
