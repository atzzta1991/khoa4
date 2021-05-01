import React, { useEffect, useState } from "react";
import { Table, Space, Tag } from "antd";
// import HtmlParser from "react-html-parser";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import FormEditProject from "../../../components/Forms/FormEditProject/FormEditProject";

export default function ProjectManagement() {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  const projectList = useSelector(
    (state) => state.ProjectCyberbugsReducer.projectList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "GET_ALL_PROJECT_SAGA",
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => item2.id - item1.id,
      sortDirections: ["descend"],
    },
    {
      title: "projectName",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectname?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },
    // {
    //   title: "description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = HtmlParser(text);
    //     return <>{jsxContent}</>;
    //   },
    // },
    {
      title: "categoryName",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "creator",
      //dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator.name?.trim().toLowerCase();
        let creator2 = item2.creator.name?.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <EditOutlined
              onClick={() => {
                const action = {
                  type: "OPEN_FORM_EDIT_PROJECT",
                  Component: <FormEditProject />,
                };
                dispatch(action);

                const actionEditProject = {
                  type: "EDIT_PROJECT",
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                dispatch({
                  type: "DELETE_PROJECT_SAGA",
                  projectId: record.id,
                });
              }}
            />
          </Space>
        );
      },
    },
  ];
  return (
    <div className="container-fluid">
      <h3>Project Management</h3>

      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={projectList}
        onChange={handleChange}
        pagination={{
          defaultPageSize: 8,
          showSizeChanger: true,
          pageSizeOptions: ["6", "8", "10"],
        }}
      />
    </div>
  );
}
