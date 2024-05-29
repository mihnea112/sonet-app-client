import React, { useState, useContext } from "react";
import Balls from "../home/Balls";
import axios from "axios";
import { getProxyy } from "../App";
import { AlertContext } from "../AlertComponent";

function Register() {
  const { handleAxiosError } = useContext(AlertContext);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    cpassword: "",
  });
  function handleChange(e) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }
  async function submit() {
    if (userData.password === userData.cpassword) {
      axios
        .post(getProxyy() + "/register", userData)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          console.log(res.data.token);
          window.location.replace("/dash");
        })
        .catch(handleAxiosError);
    }
  }
  return (
    <section className="login">
      <Balls></Balls>
      <div className="max-w-sm mx-auto">
        <h1
          className="text-5xl text-center md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-emerald-300"
          data-aos="zoom-y-out"
        >
          Register
        </h1>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <label
              className="block text-emerald-300 text-sm font-medium mb-1"
              htmlFor="email"
            >
              Nume si Prenume
            </label>
            <input
              id="name"
              name="name"
              type="email"
              value={userData.name}
              onChange={handleChange}
              className="form-input w-full p-2 border-2 rounded border-current bg-transparent text-emerald-300"
              placeholder="Enter your email address"
              required
            />
          </div>
        </div>
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
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <div className="flex justify-between">
              <label
                className="block text-emerald-300 text-sm font-medium mb-1"
                htmlFor="password"
              >
                Confirm Password
              </label>
            </div>
            <input
              id="cpassword"
              name="cpassword"
              type="password"
              value={userData.cpassword}
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

export default Register;
