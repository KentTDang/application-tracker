import React, { useState } from "react";
import axios from "axios";
export default function Gmail() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const handleGetGmail = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("gmailToken");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }
      const response = await axios.get(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setResult(response.data.messages);
    } catch (error) {
      console.error("Error reading gmail api call: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button onClick={handleGetGmail}>Gmail</button>
    </div>
  );
}
