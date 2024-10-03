import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // Import the Firebase auth instance
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user);
        toast.success("Logged in successfully!");
        navigate("/"); // Navigate to the dashboard or another page after successful login
      })
      .catch((error) => {
        setError(error.message);
        toast.error(`Login failed: ${error.message}`);
      });
  };

  return (
    <div>
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img
            src="https://www.svgrepo.com/show/4151/food.svg"
            alt="Sample image"
          />
        </div>
        <div className="md:w-1/3 max-w-sm">
          <div className="my-5">
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="button"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
              Don&apos;t have an account?{" "}
              <a
                href="/signUp"
                className="text-red-600 hover:underline hover:underline-offset-4"
              >
                Sign Up
              </a>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
