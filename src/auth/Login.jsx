import React, { useState, useContext } from "react";
import Balls from "../home/Balls";
import axios from "axios";
import { getProxyy } from "../App";
import { AlertContext } from "../AlertComponent";

function Login() {
  const { handleAxiosError } = useContext(AlertContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  async function submit() {
    axios
      .post(getProxyy() + "/login", userData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        const token = localStorage.getItem("token");
        const sonet = localStorage.getItem("sonet");
        if (sonet.length>0) {
          axios
            .post(getProxyy() + "/sonet-user", {
              sonetId: sonet,
              token,
            })
            .then(() => {
              localStorage.removeItem("sonet");
              window.location.href = "/for-me";
            });
        }
        else{
          window.location.replace("/dash");
        }
      })
      .catch(handleAxiosError);
  }
  return (
    <section className="login">
      <Balls></Balls>
      <div className="max-w-sm mx-auto">
        <h1
          className="text-5xl text-center md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-emerald-300"
          data-aos="zoom-y-out"
        >
          Login
        </h1>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-emerald-300 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              className="form-input w-full p-2 border-2 rounded border-current bg-transparent text-emerald-300"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <div className="flex justify-between">
              <label
                className="block text-emerald-300 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <a
                href="/reset-passwor"
                className="text-sm font-medium text-emerald-100 hover:underline"
              >
                Having trouble signing in?
              </a>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              className="form-input w-full p-2 border-2 rounded border-current bg-transparent text-emerald-300"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mt-6">
          <div className="w-full px-3">
            <button
              className="btn text-emerald-800 bg-emerald-300 hover:bg-emerald-600 w-full p-3 rounded"
              onClick={submit}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
