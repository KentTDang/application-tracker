import Home from "./components/home";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../src/contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Container className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: '400px ' }}>

        <Router>
          <AuthProvider>
            <Routes>
            <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Dashboard />} />
              </Route>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
            </Routes>
          </AuthProvider>
        </Router>

  
      </div>
    </Container>

  )
}

export default App;