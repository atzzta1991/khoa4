import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Popconfirm, message } from "antd";
import Highlighter from "react-highlight-words";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_USER_SAGA,
  EDIT_USER,
  GET_USER_API,
} from "../../redux/constants/Cyberbugs/UserConst";
import FormCreateUser from "../../components/Forms/FormCreateUser/FormCreateUser";
import FormEditUser from "../../components/Forms/FormEditUser.js/FormEditUser";

export default function UserManagement() {
  const [state, setState] = useState({
    searchText: "",
    searchedColumn: "",
  });

  const { userSearch } = useSelector((state) => state.UserCyberbugsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_USER_API, keyword: "" });
  }, [dispatch]);

  const userData = userSearch.map((user, index) => {
    return {
      tableIndex: index + 1,
      email: user.email,
      name: user.name,
      phone: user.phoneNumber,
      id: user.userId,
    };
  });

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          //   ref={(node) => {
          //     searchInput = node;
          //   }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setState({ searchText: "" });
  };

  const columns = [
    {
      title: "Index",
      dataIndex: "tableIndex",
      key: "tableIndex",
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "25%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Action",
      width: "15%",
      render: (text, record, index) => {
        function confirm() {
          dispatch({ type: DELETE_USER_SAGA, id: record.id });
          message.success("Delete successfully");
        }

        return (
          // Edit and Delete
          <Space size="middle">
            <EditOutlined
              style={{ color: "orange", cursor: "pointer" }}
              onClick={() => {
                dispatch({
                  type: EDIT_USER,
                  userEdit: {
                    id: record.id,
                    passWord: "",
                    email: record.email,
                    name: record.name,
                    phoneNumber: record.phone,
                  },
                });

                dispatch({
                  type: "OPEN_FORM_EDIT_USER",
                  title: "Edit User",
                  Component: <FormEditUser />,
                });
              }}
            />
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="container">
      <div style={{ marginTop: "100px" }} className="row ml-4">
        <Button
          onClick={() => {
            dispatch({
              type: "OPEN_FORM_CREATE_USER",
              title: "Sign Up",
              Component: <FormCreateUser />,
            });
          }}
        >
          Create User
        </Button>
      </div>
      <div className="row m-2">
        <div className="col-12">
          <Table
            columns={columns}
            dataSource={userData}
            pagination={{
              defaultPageSize: 6,
              showSizeChanger: true,
              pageSizeOptions: [6, 8, 10],
            }}
          />
        </div>
      </div>
    </div>
  );
}
