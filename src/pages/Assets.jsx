import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import assetsService from "../services/assetsService";
import HealthChart from "../components/assets/HealthChart";
import UpdateHealth from "../components/assets/UpdateHealth";
import UpdateStatus from "../components/assets/UpdateStatus";

export default function Assets() {
  const { auth } = useContext(AuthContext);

  const [assets, setAssets] = useState({
    name: "",
    image: "",
    model: "",
    description: "",
    unit: "",
    owner: "",
  });
  const {
    title,
    image,
    model,
    owner,
    description,
    unit: { name },
  } = assets;

  const [healths, setHealths] = useState([{ healthArr: [], timeArr: [] }]);
  const { healthArr, timeArr } = healths;

  const [status, setStatus] = useState({ status: "" });
  const { status: currentStatus } = status;

  const [refreshPage, setRefreshPage] = useState(false);

  const location = useLocation();
  const localPath = location.pathname.split("/").reverse()[0];

  useEffect(() => {
    (async () => {
      try {
        const assets = await assetsService.getAsset(localPath, auth.token);
        const healths = await assetsService.getHealth(localPath, auth.token);
        const status = await assetsService.getStatus(localPath, auth.token);
        setAssets(assets);
        setHealths(healths);
        setStatus(status);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [auth.token, localPath, refreshPage]);

  return (
    <>
      <Header />
      <AssetsContainer>
        <AssetsInfos>
          <h2>{name}</h2>
          <img src={image} alt="Asset" />
          <h1>{title}</h1>
          <p>{description}</p>
          <OtherInfos>
            <h3>Model</h3>
            <h3>{model}</h3>
          </OtherInfos>
          <OtherInfos>
            <h3>Owner</h3>
            <h3>{owner?.name}</h3>
          </OtherInfos>
          <UpdateHealth
            localPath={localPath}
            token={auth.token}
            setRefreshPage={setRefreshPage}
            refreshPage={refreshPage}
          />
          <UpdateStatus
            localPath={localPath}
            token={auth.token}
            setRefreshPage={setRefreshPage}
            refreshPage={refreshPage}
          />
        </AssetsInfos>
        <GraphsContainer>
          <HealthChart healthArr={healthArr} timeArr={timeArr} />
          <StatusGraph>
            <h4>{currentStatus}</h4>
          </StatusGraph>
        </GraphsContainer>
      </AssetsContainer>
    </>
  );
}

const AssetsContainer = styled.main`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  top: 120px;
  padding: 0px 100px;
`;

const AssetsInfos = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  background-color: #00045c;
  padding: 15px 30px;

  h1,
  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    text-align: justify;
    color: #ffffff;
    margin-bottom: 10px;
  }

  img {
    width: 330px;
    height: 180px;
    margin-bottom: 10px;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;
    text-align: justify;
    color: #ffffff;
    margin-bottom: 40px;
  }
`;

const StatusGraph = styled.article`
  width: 780px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  margin-top: 10px;
  background-color: #00045c;

  h4 {
    font-size: 80px;
    color: #ffffff;
  }
`;
const GraphsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OtherInfos = styled.div`
  display: flex;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  border-top: solid 1px #ffffff;
  border-bottom: solid 1px #ffffff;

  h3 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    text-align: justify;
    color: #ffffff;
  }

  button {
    height: 32px;
    background-color: #224eb9;
    color: #ffffff;
    cursor: pointer;
  }
`;
