import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constants/Cyberbugs/Cyberbugs";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();

  const { handleChange, handleSubmit, setFieldValue } = props;

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });
  }, []);

  const handleEditorChange = (e) => {
    setFieldValue("description", e.target.getContent());
  };
  return (
    <div className="container m-5">
      <h3 className="text-center">Create Project</h3>
      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <p>Name</p>
          <input
            className="form-control"
            name="projectName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic |  alignleft aligncenter alignright |  bullist numlist outdent indent | help",
            }}
            onChange={handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option key={index} value={item.id}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrProjectCategory } = props;
    return {
      projectName: "",
      description: "",
      categoryId: `${arrProjectCategory[0]?.id}`,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props }) => {
    props.dispatch({
      type: "CREATE_PROJECT_SAGA",
      newProject: values,
    });
  },
  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(createProjectForm);
