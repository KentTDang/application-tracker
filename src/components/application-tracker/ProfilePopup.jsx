import React, { useState } from 'react'
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthContext';

export default function ProfilePopup() {

    const { currentUser, logout } = useAuth()
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogout() {
        setError("");
    
        try {
          await logout();
          navigate("/login")
        } catch {
          setError("Fail to logout")
        }
      }

  return (
    <div className="profilie-container">
          <Popup
            trigger={
              <button>
                <FontAwesomeIcon icon={faUser} />
              </button>
            }
          >
            <div className="profile-dialog">
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <button variant="link" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </button>
            </div>
          </Popup>
        </div>
  )
}
