import { withFormik } from "formik";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { EDIT_USER_SAGA } from "../../../redux/constants/Cyberbugs/UserConst";

function FormEditUser(props) {
  const { handleChange, handleSubmit, values } = props;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SET_SUBMIT_EDIT_USER", submitForm: handleSubmit });
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
          value={values.email}
        />
      </div>
      <div className="form-group">
        <div className="form-group col-6 offset-3">
          <label>New Password</label>
          <input
            type="password"
            onChange={handleChange}
            name="passWord"
            className="form-control"
            value={values.passWord}
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
            value={values.name}
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
            value={values.phoneNumber}
          />
        </div>
      </div>
    </form>
  );
}

const formEditUser = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { userEdit } = props;

    console.log("userEdit", userEdit);
    return {
      email: userEdit?.email,
      passWord: userEdit?.passWord,
      name: userEdit?.name,
      phoneNumber: userEdit?.phoneNumber,
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    let editedUser = { ...values, id: props.userEdit.id };
    props.dispatch({
      type: EDIT_USER_SAGA,
      editedUser,
    });
  },
  displayName: "Form Edit User",
})(FormEditUser);

const mapState = (state) => {
  const { userEdit } = state.UserCyberbugsReducer;
  return { userEdit };
};

export default connect(mapState)(formEditUser);
