import { set, useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data.email); // Check if the email value is correct
    console.log(data.password);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Login successful!");
      // Navigate to StudentDashboard after successful login
      navigate("/student-dashboard");
      console.log("login successful!");
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
      console.error(error);
    }
    setLoading(false);
  };

  // if (error) {
  //   throw new Error(error.message);
  // }
  // console.log(userData);
  // const { data: programData, error: programError } = await supabase
  //   .from("userProgram")
  //   .select("id")
  //   .eq("id", userData.id)
  //   .single();
  // console.log(programData);

  // if (!programData) {
  //   navigate("/graduate-programs");
  // } else {
  //   toast.success("Login successful!");
  //   // Navigate to StudentDashboard after successful login
  //   navigate("/student-dashboard");
  // }

  return (
    <div
      style={{ maxWidth: "516px" }}
      className="container mt-5 justify-content-center card shadow py-4"
    >
      <h2 className="text-center mb-4">Student Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            className="form-control"
          />
          {errors.email && (
            <span className="text-danger">
              Please enter a valid email address
            </span>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
            className="form-control"
          />
          {errors.password && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="mt-3">
          Don't have an account?{" "}
          <Link to="/" className="text-primary">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
