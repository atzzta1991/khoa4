import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

export default function DrawerCyberbugs() {
  const {
    title,
    visible,
    ComponentContentDrawer,
    callBackSubmit,
  } = useSelector((state) => state.DrawerCyberbugsReducer);
  const dispatch = useDispatch();
  //   const showDrawer = () => {
  //     dispatch({ type: "OPEN_DRAWER" });
  //   };

  const onClose = () => {
    dispatch({ type: "CLOSE_DRAWER" });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
