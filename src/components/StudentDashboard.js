import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.js";
import { useNavigate } from "react-router-dom";
import "../index.css";

const StudentDashboard = () => {
  const navigate = useNavigate();

  // State to store student data and loading status
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // State to store profile picture URL
  const [profilePictureURL, setProfilePictureURL] = useState(null);

  // Fetch student data from Supabase
  const fetchStudentData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: student, error: studentError } = await supabase
        .from("students")
        .select("firstName, lastName, email, photoURL")
        .eq("id", user.id)
        .single();

      const { data: programData, error: programError } = await supabase
        .from("userProgram")
        .select("levelOfStudy, program, faculty")
        .eq("id", user.id)
        .single();

      // Set profile picture URL
      setProfilePictureURL(
        `https://mlklnfeqqzyntwystzmv.supabase.co/storage/v1/object/public/profile-picture/profile-picture/${user.id}`
      );

      if (studentError || programError) {
        console.error(studentError || programError);
      } else {
        setStudentData({ ...student, ...programData });
      }
    }

    setIsLoading(false); // Set loading status to false
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  // Handle user sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login"); // Navigate to the login page after sign out
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "1200px" }}>
      <div className="card shadow" style={{ padding: "32px" }}>
        <div className="card-body">
          <div style={{ marginBottom: "32px" }}>
            <button
              className="btn btn-primary float-end"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
            <h2 className="card-title">Student Dashboard</h2>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card border-0 bg-glassy">
                <div className="card-body">
                  <h5 className="card-title">Student Information</h5>
                  {isLoading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : studentData ? (
                    <>
                      <div className="d-flex align-items-center mb-3">
                        {profilePictureURL && (
                          <img
                            src={profilePictureURL}
                            alt="Profile"
                            className="rounded-circle me-3"
                            style={{ width: "75px", height: "75px" }}
                          />
                        )}
                        <div>
                          <p className="mb-0">
                            <strong>Name</strong>
                            <br />
                            {studentData.firstName} {studentData.lastName}
                          </p>
                          <p className="mb-0" style={{ marginTop: "16px" }}>
                            <strong>Email</strong>
                            <br /> {studentData.email}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>No student data available.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card border-0 bg-glassy">
                <div className="card-body">
                  <h5 className="card-title">Program Information</h5>
                  {isLoading ? (
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : studentData ? (
                    <>
                      <p className="card-text">
                        <strong>Level of Study</strong>
                        <br />
                        {studentData.levelOfStudy}
                      </p>
                      <p className="card-text">
                        <strong>Program</strong>
                        <br />
                        {studentData.program}
                      </p>
                      <p className="card-text">
                        <strong>Faculty/Division</strong> <br />{" "}
                        {studentData.faculty}
                      </p>
                    </>
                  ) : (
                    <p>No student data available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
