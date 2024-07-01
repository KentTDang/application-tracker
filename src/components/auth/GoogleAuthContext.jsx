import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useStyles from "./Styles";

export default function GoogleAuthContext() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/gmail.readonly");

  const navigate = useNavigate();
  const styles = useStyles();

  async function googleSignIn() {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem("gmailToken", token);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.buttonRole}>
        <button onClick={googleSignIn} className={styles.googleBtn}>
          <FcGoogle className={styles.icon} />
          Log in with Google
        </button>
      </div>
      <div className={styles.divider}>
        <span>or</span>
      </div>
    </>
  );
}
