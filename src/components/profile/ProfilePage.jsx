import React from "react";
import { useAuth } from "../auth/AuthContext";
import Banner from "../ui/Banner";

export default function ProfilePage() {
  const currentUser = useAuth().currentUser;

  return (
    <>
      <Banner />
      <img src={currentUser.photoURL} />
      <h1>{currentUser.displayName}</h1>
      <h1>{currentUser.email}</h1>
    </>
  );
}
