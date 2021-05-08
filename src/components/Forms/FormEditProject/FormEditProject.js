import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

function FormEditProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit, setFieldValue } = props;

  useEffect(() => {
    dispatch({ type: "SET_SUBMIT_EDIT_PROJECT", submitForm: handleSubmit });
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
  }, []);

  const handleEditorChange = (e) => {
    console.log("Content", e.target.getContent());
    setFieldValue("description", e.target.getContent());
  };
  return (
    <form className="container-fluid" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Id</p>
            <input
              disabled
              className="form-control"
              value={values.id}
              name="id"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input
              className="form-control"
              name="projectName"
              value={values.projectName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              className="form-control"
              name="categoryId"
              value={values.categoryId}
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
        </div>
        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              name="description"
              initialValue={values.description}
              init={{
                height: 300,
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
        </div>
      </div>
    </form>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      description: projectEdit?.description,
      categoryId: projectEdit?.categoryId,
    };
  },
  validationSchema: Yup.object().shape(),
  handleSubmit: (values, { props, setSubmitting }) => {
    const action = {
      type: "UPDATE_PROJECT_SAGA",
      projectUpdate: values,
    };

    props.dispatch(action);
  },
  displayName: "createProjectForm",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectReducer.projectEdit,
});

export default connect(mapStateToProps)(createProjectForm);
