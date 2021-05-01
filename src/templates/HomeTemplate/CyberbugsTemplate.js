import React from "react";
import { Route } from "react-router";
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs";
import ModalCyberbugs from "../../components/Cyberbugs/Modal/ModalCyberbugs";
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs";

export default function CyberbugsTemplate(props) {
  const { Component, ...restRouteProps } = props;
  return (
    <Route
      {...restRouteProps}
      render={(propsRoute) => {
        return (
          <div className="jira">
            {/* Sider Bar  */}
            <SidebarCyberbugs />
            {/* Menu */}
            <MenuCyberbugs />
            {/* {/* {/* Main Board * /} * /} */}
            <Component {...propsRoute} />
            <ModalCyberbugs />
          </div>
        );
      }}
    />
  );
}
