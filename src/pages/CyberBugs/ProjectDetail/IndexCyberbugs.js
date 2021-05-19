import React, { useEffect } from "react";
import ContentMain from "../../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../../components/Cyberbugs/Main/InfoMain";
import { useSelector, useDispatch } from "react-redux";

export default function IndexCyberbugs(props) {
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();

  //console.log("load page", projectDetail);

  useEffect(() => {
    const { projectId } = props.match.params;
    dispatch({
      type: "GET_PROJECT_DETAIL_SAGA",
      projectId,
    });
  }, []);

  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />
      <InfoMain projectDetail={projectDetail} />
      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
