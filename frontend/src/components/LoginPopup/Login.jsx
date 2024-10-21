import React, { useEffect, useState } from "react";
import "./Login.css";
import { Formik, Field, Form, useFormik } from "formik";
import axios from "axios";

const Login = () => {
  const [data, setData] = useState({});
  const [login, setLogin] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios
        .post("https://interview-lens.vercel.app/api/user/login", data)
        .then(() => {
          if (response.data.success) {
            console.log(response.data);
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
          } else {
            alert(response.data.message);
          }
        });
    } catch (error) {
      console.log("error");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setData(values);
      fetchData();
    },
  });
  return (
    <div className="login-popup">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
