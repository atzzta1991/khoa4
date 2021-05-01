import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Route } from "react-router";

const { Sider, Content } = Layout;

export default function UserLoginTemplate(props) {
  const [{ width, height }, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);

  let { Component, ...restRoute } = props;
  return (
    <Route
      {...restRoute}
      render={(propsRoute) => {
        return (
          <>
            <Layout>
              <Sider
                width={window.innerWidth / 2}
                style={{
                  height: window.innerHeight,
                  backgroundImage: `url(https://picsum.photos/${Math.round(
                    width / 2
                  )}/${height})`,
                }}
              />
              <Content>
                <Component {...propsRoute} />
              </Content>
            </Layout>
          </>
        );
      }}
    />
  );
}
