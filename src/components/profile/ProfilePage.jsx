import React from 'react'
import { useAuth } from '../auth/AuthContext'
import Banner from '../ui/Banner';

export default function ProfilePage() {

    const currentUser = useAuth().currentUser;
    
  return (
    <>
        <Banner />
        <h1>{currentUser.email}</h1>
    </>
  )
}
