import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async ( e: React.SubmitEvent<HTMLFormElement> ) => {
    e.preventDefault();

    try {
      setLoading(true);

      console.log("Signup Data:", formData);

      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      alert("Signup Successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-800 p-8 shadow-2xl">
 
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Signup to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-600 bg-slate-900 p-3 text-white outline-none transition focus:border-green-500"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-600 bg-slate-900 p-3 text-white outline-none transition focus:border-green-500"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-600 bg-slate-900 p-3 pr-12 text-white outline-none transition focus:border-green-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-3 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-600 bg-slate-900 p-3 pr-12 text-white outline-none transition focus:border-green-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-3 top-3 text-slate-400"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-green-600 p-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <span className="cursor-pointer text-green-400 hover:underline">
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;