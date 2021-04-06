import React, { useState } from "react";
import { Prompt } from "react-router";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    password: "",
    status: false,
  });
  console.log(userLogin);
  const handleChange = (e) => {
    const { value, name } = e.target;
    const newUserLogin = {
      ...userLogin,
      [name]: value,
    };

    let valid = true;
    for (let key in newUserLogin) {
      if (key !== "status") {
        if (newUserLogin[key].trim() === "") {
          valid = false;
        }
      }
    }

    if (!valid) {
      newUserLogin.status = true;
    } else {
      newUserLogin.status = false;
    }

    setUserLogin(newUserLogin);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (userLogin.userName === "123" && userLogin.password === "123") {
      // Chuyen ve truoc do
      // props.history.goBack();

      // Chuyen den path chi dinh
      //props.history.push("/");

      // replace thay doi path tuong ung
      props.history.replace("/home");

      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("login failed");
      return;
    }
  };

  return (
    <form className="container" onSubmit={handleLogin}>
      <h3 className="display-4">Login</h3>
      <div className="form-group">
        <p>Username</p>
        <input
          name="userName"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Password</p>
        <input
          name="password"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-success">Dang Nhap</button>
      </div>
      <Prompt
        when={userLogin.status}
        message={() => {
          return "Ban co chac muon roi khoi trang nay?";
        }}
      />
    </form>
  );
}
