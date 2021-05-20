import { withFormik } from "formik";
import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { SIGNUP_SAGA } from "../../../redux/constants/Cyberbugs/UserConst";

function FormCreateUser(props) {
  const { handleChange, handleSubmit } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_SUBMIT_CREATE_USER", submitForm: handleSubmit });
  }, [dispatch, handleSubmit]);
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group col-6 offset-3">
        <label>Email</label>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <div className="form-group col-6 offset-3">
          <label>Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="form-group col-6 offset-3">
          <label>Name</label>
          <input
            type="text"
            onChange={handleChange}
            name="name"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-group">
        <div className="form-group col-6 offset-3">
          <label>Phone Number</label>
          <input
            type="text"
            onChange={handleChange}
            name="phoneNumber"
            className="form-control"
          />
        </div>
      </div>
    </form>
  );
}

const formCreateUser = withFormik({
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: SIGNUP_SAGA,
      newUser: values,
    });
  },
  displayName: "formCreateUser",
})(FormCreateUser);

export default connect()(formCreateUser);
