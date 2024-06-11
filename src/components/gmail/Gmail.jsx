import React from 'react'
import axios from 'axios'
export default function Gmail() {
  
  const handleGetGmail = async() => {
    
    try{ 
      const response = axios.get("https://gmail.googleapis.com/gmail/v1/users/{ktd6900@gmail.com}/messages");
      console.log(response);
    } catch(error) {
      console.error("Error reading gmail api call: ", error);
    }

    
  }
  return (
    <div>
      <button onClick={handleGetGmail}>Gmail</button>
    </div>
  )
}
