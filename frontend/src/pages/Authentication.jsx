import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validEmail, validPassword } from "../utilities/validation";
import { Link } from "react-router-dom";
import { registerApi, loginApi } from "../apis/authentication";
import { useGoogleLogin } from "@react-oauth/google";

export const PageType = Object.freeze({
  LOGIN: 0,
  REGISTER: 1,
});

const initialErrorsState = { email: "", password: "", api: "" };

const Authentication = ({ PageType: pageType }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrorsState);
  const [loading, setLoading] = useState(false);

  // Normal login/register handlers
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = { email: "", password: "", api: "" };
    let hasError = false;

    if (!validEmail(email)) {
      tempErrors.email = "Invalid email format";
      hasError = true;
    }

    if (!validPassword(password)) {
      tempErrors.password =
        "Password must be at least 8 characters long and contain at least one number and one special character";
      hasError = true;
    }

    setErrors(tempErrors);
    if (hasError) return;

    setLoading(true);
    const body = { email, password };

    let result, apiError;
    if (pageType === PageType.REGISTER) {
      [result, apiError] = await registerApi(body);
    } else {
      [result, apiError] = await loginApi(body);
    }
    setLoading(false);

    if (apiError) {
      setErrors((prev) => ({ ...prev, api: apiError }));
    } else {
      console.log("API Success:", result);
      navigate("/"); // Redirect after success
    }
  };

  // Google login handler
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("http://localhost:3000/users/auth/google_oauth2/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });
        const data = await res.json();
        console.log("Google Login Success:", data);
        navigate("/"); // Redirect after success
      } catch (err) {
        console.log("Google Login Error:", err);
        setErrors((prev) => ({ ...prev, api: "Google login failed" }));
      }
    },
    onError: (err) => {
      console.log("Google login error", err);
      setErrors((prev) => ({ ...prev, api: "Google login failed" }));
    },
  });

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border border-gray-200 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">
          {pageType === PageType.LOGIN ? "Login" : "Register"}
        </h1>

        {pageType === PageType.LOGIN ? (
          <p className="mb-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        ) : (
          <p className="mb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {errors.api && <p className="text-red-500 text-sm mb-3">{errors.api}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            {loading
              ? "Processing..."
              : pageType === PageType.LOGIN
              ? "Login"
              : "Register"}
          </button>
        </form>

        {/* Google Login Button */}
        <div className="mt-4 text-center">
          <button
            onClick={() => loginWithGoogle()}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

Authentication.propTypes = { PageType: PropTypes.number.isRequired };

export default Authentication;
