import Home from "./pages/home";
import SignUp from './pages/Signup';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../src/contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: '400px ' }}>

        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Dashboard/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>
          </AuthProvider>
        </Router>

  
      </div>
    </Container>

  )
}

export default App;