import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import GraduatePrograms from "./components/GraduatePrograms";
import LoginForm from "./components/LoginForm";
import StudentDashboard from "./components/StudentDashboard";
import NotFound from "./components/NotFound";
import { Button } from "react-bootstrap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/graduate-programs" element={<GraduatePrograms />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
