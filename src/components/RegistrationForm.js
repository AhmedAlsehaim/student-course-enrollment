import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "../supabaseClient.js";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const tempPhotoURL = Date.now();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const uploadProfilePicture = async (file) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase.storage
      .from("profile-picture")
      .upload(`profile-picture/${user.id}`, file);

    if (error) {
      throw new Error(error.message);
    }

    return data.Key;
  };

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      // Sign up the user
      const { user, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      const profilePictureKey = profilePicture
        ? await uploadProfilePicture(profilePicture)
        : null;

      const { data: student, error: insertError } = await supabase
        .from("students")
        .insert([
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            DOB: formData.dateOfBirth,
            photoURL: profilePictureKey,
          },
        ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      toast.success("Registration successful!");
      reset();
      navigate("/graduate-programs");
    } catch (error) {
      toast.error("Registration failed. Please try again.");

      setError("Invalid registration credentials");
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "516px" }} className="container mt-5">
      <h2 className="text-center mb-4">Student Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* First Name */}
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register("firstName", { required: "This field is required" })}
            className="form-control"
          />
          {errors.firstName && (
            <span className="text-danger">{errors.firstName.message}</span>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", { required: "This field is required" })}
            className="form-control"
          />
          {errors.lastName && (
            <span className="text-danger">{errors.lastName.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
            className="form-control"
          />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        {/* Date of Birth */}
        <div className="mb-3">
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth", { required: "This field is required" })}
            className="form-control"
          />
          {errors.dateOfBirth && (
            <span className="text-danger">{errors.dateOfBirth.message}</span>
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
            {...register("password", { required: "This field is required" })}
            className="form-control"
          />
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        {/* Profile Picture */}
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
          />
          {error && <span className="text-danger">{error}</span>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
