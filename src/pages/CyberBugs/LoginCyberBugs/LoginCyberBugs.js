import { Button, Input } from "antd";
import React from "react";
import { UserOutlined, LockOutlined, TwitterOutlined } from "@ant-design/icons";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { signinCyberbugsAction } from "../../../redux/actions/CyberbugActions";

function LoginCyberBugs(props) {
  const { errors, handleChange, handleSubmit } = props;
  return (
    <form
      onSubmit={handleSubmit}
      className="container"
      style={{ height: window.innerHeight }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h3 className="text-center">Login CyberBugs</h3>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="email"
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
          />
        </div>

        <div className="text-danger">{errors.email}</div>

        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            style={{ width: "100%", minWidth: 300 }}
            name="password"
            type="password"
            size="large"
            placeholder="Password"
            prefix={<LockOutlined />}
          />
        </div>

        <div className="text-danger">{errors.password}</div>

        <Button
          htmlType="submit"
          size="large"
          style={{
            minWidth: 300,
            backgroundColor: "rgb(102, 117, 223)",
            color: "#fff",
          }}
          className="mt-5"
        >
          Login
        </Button>

        <div className="social mt-3 d-flex">
          <Button
            type="primary"
            shape="circle"
            size="large"
            style={{ backgroundColor: "rgb(59,89, 152)" }}
          >
            <span className="font-weight-bold" style={{ color: "#fff" }}>
              f
            </span>
          </Button>
          <Button
            type="primary ml-3"
            shape="circle"
            size="large"
            icon={<TwitterOutlined />}
          ></Button>
        </div>
      </div>
    </form>
  );
}

const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Pw must have min 6 characters")
      .max(32, "Pw must have max 32 characters"),
  }),
  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    props.dispatch(signinCyberbugsAction(email, password));
  },
  displayName: "Basicform",
})(LoginCyberBugs);

export default connect()(LoginCyberBugsWithFormik);
