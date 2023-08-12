import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import GraduatePrograms from "./components/GraduatePrograms";
import LoginForm from "./components/LoginForm";
import StudentDashboard from "./components/StudentDashboard";
import NotFound from "./components/NotFound";

function App() {
  const appStyle = {
    backgroundColor: "#3CB4E5",
    minHeight: "100vh",
  };

  return (
    <div style={appStyle}>
      {" "}
      {/* Apply background color here */}
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/graduate-programs" element={<GraduatePrograms />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
