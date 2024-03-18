import Home from "./pages/home";
import SignUp from './pages/Signup';
import { Container } from "react-bootstrap";
import { AuthProvider } from "../src/contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: '400px ' }}>
          
          <SignUp />
          
          </div>
      </Container>
    </AuthProvider>

  )
}

export default App;