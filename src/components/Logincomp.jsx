import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { postloginuser } from '../controllers/Logincontroller';
import { useDispatch, useSelector } from "react-redux";
     import { useLocation } from "react-router-dom";
import {
  authCheckStart,
  loginSuccess,
  authFail,
} from "../store/userloginedslice";

function Login() {
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isLoggedIn, authChecked, user } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    dispatch(authCheckStart());

    const loginuserdata = await postloginuser(formData);

    dispatch(loginSuccess(loginuserdata.data.user));

    const from = location.state?.from || "/";

    navigate(from, { replace: true });

  } catch (err) {
    dispatch(authFail(err.message));
  }
};
  if (!authChecked) {
    return <h2>Checking login...</h2>;
  }

  if (isLoggedIn) {

    return <Navigate to="/" replace />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-rose-500 flex items-center justify-center text-white text-2xl font-bold">
            A
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">
            Welcome back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue to Airbnb
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-rose-500 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;