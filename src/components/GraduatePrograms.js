import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const GraduatePrograms = ({ user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Save the selected choices to the database
      const { levelOfStudy, program, faculty } = data;

      const {
        data: { user },
      } = await supabase.auth.getUser(); //await is necessary to fix the problem of undefined
      console.log(user);
      // Insert the selected choices into the database table
      const { data: userProgram, error } = await supabase
        .from("userProgram")
        .insert([
          {
            id: user.id, // Use the user's ID
            levelOfStudy,
            program,
            faculty,
          },
        ]);

      toast.success("Program choices saved successfully!");
      // Navigate to StudentDashboard after successful submission
      navigate("/student-dashboard");
    } catch (error) {
      toast.error("Failed to save program choices. Please try again.");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "516px" }} className="container mt-5">
      <h2 className="text-center mb-4">Graduate Programs</h2>
      <div className="alert alert-warning mb-3" role="alert">
        {message}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Level of Study */}
        <div className="mb-3">
          <label htmlFor="levelOfStudy" className="form-label">
            Select Level of Study
          </label>
          <select
            {...register("levelOfStudy", { required: true })}
            className="form-select"
          >
            <option value="">Select Level of Study</option>
            <option value="Bachelor's degree">Bachelor's degree</option>
            <option value="Master's degree">Master's degree</option>
            <option value="Doctoral degree">Doctoral degree</option>
            <option value="Professional degree">Professional degree</option>
          </select>
          {errors.levelOfStudy && (
            <span className="text-danger">Level of Study is required</span>
          )}
        </div>

        {/* Program */}
        <div className="mb-3">
          <label htmlFor="program" className="form-label">
            Select Program
          </label>
          <select
            {...register("program", { required: true })}
            className="form-select"
          >
            <option value="">Select Program</option>
            <option value="Information systems">Information systems</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Computer Engineering">Computer Engineering</option>
          </select>
          {errors.program && (
            <span className="text-danger">Program is required</span>
          )}
        </div>

        {/* Faculty */}
        <div className="mb-3">
          <label htmlFor="faculty" className="form-label">
            Select Faculty/Division
          </label>
          <select
            {...register("faculty", { required: true })}
            className="form-select"
          >
            <option value="">Select Faculty/Division</option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Engineering">Engineering</option>
          </select>
          {errors.faculty && (
            <span className="text-danger">Faculty/Division is required</span>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default GraduatePrograms;
