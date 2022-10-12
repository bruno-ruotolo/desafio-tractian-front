import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import unitsService from "../services/unitsService";
import { ArrowLeftOutlined, PlusSquareFilled } from "@ant-design/icons";
import Unity from "../components/units/Unity";
import assetsService from "../services/assetsService";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { InputNumber, Select } from "antd";
import { Option } from "antd/lib/mentions";

export default function Assets() {
  const navigate = useNavigate();

  const { setAuth, auth } = useContext(AuthContext);
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
  const [status, setStatus] = useState({ status: "" });
  const [refreshPage, setRefreshPage] = useState(false);
  const { healthArr, timeArr } = healths;
  const { status: currentStatus } = status;
  console.log(currentStatus);

  const location = useLocation();
  const localPath = location.pathname.split("/").reverse()[0];

  const [healthData, setHealthData] = useState({
    health: 100,
    assetId: localPath,
  });

  const [statusData, setStatusData] = useState({
    status: "Running",
    assetId: localPath,
  });

  console.log(statusData);

  const healthOptions = {
    title: {
      text: "Health Chart",
    },
    yAxis: {
      title: { text: "Health (%)" },
      max: 100,
      min: 0,
    },
    xAxis: {
      categories: timeArr,
      title: { text: "Time" },
    },
    series: [
      {
        data: healthArr,
        name: "Health Data",
        color: "#00045c",
      },
    ],
  };

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

  const onChangeHealth = (value) => {
    setHealthData({ ...healthData, health: value });
  };

  const onChangeStatus = (value) => {
    setStatusData({ ...statusData, status: value });
  };

  async function handleSubmitHealth(e) {
    e.preventDefault();
    try {
      setHealthData({ ...healthData, assetId: localPath });
      await assetsService.updateHealth(healthData, auth.token);
      setRefreshPage(!refreshPage);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitStatus(e) {
    e.preventDefault();
    try {
      setStatusData({ ...statusData, assetId: localPath });
      await assetsService.updateStatus(statusData, auth.token);
      setRefreshPage(!refreshPage);
    } catch (error) {
      console.log(error);
    }
  }

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
          <OtherInfos>
            <h3>Update Health</h3>
            <form onSubmit={handleSubmitHealth}>
              <InputNumber
                defaultValue={100}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace("%", "")}
                onChange={onChangeHealth}
              />
              <button type="submit">Update</button>
            </form>
          </OtherInfos>
          <OtherInfos>
            <h3>Update Status</h3>
            <form onSubmit={handleSubmitStatus}>
              <Select
                defaultValue="Running"
                style={{ width: 120 }}
                onChange={onChangeStatus}
              >
                <Option value="Running">Running</Option>
                <Option value="Waiting">Waiting</Option>
                <Option value="Stopping">Stopping</Option>
              </Select>
              <button type="submit">Update</button>
            </form>
          </OtherInfos>
        </AssetsInfos>
        <GraphsContainer>
          <HealthGraph>
            <HighchartsReact highcharts={Highcharts} options={healthOptions} />
          </HealthGraph>
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

const HealthGraph = styled.article`
  width: 780px;
  height: fit-content;
  background-color: #00045c;
  margin-bottom: 30px;

  .highcharts-figure,
  .highcharts-data-table table {
    min-width: 360px;
    max-width: 800px;
    margin: 1em auto;
  }

  .highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
  }

  .highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
  }

  .highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
  }

  .highcharts-data-table td,
  .highcharts-data-table th,
  .highcharts-data-table caption {
    padding: 0.5em;
  }

  .highcharts-data-table thead tr,
  .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
  }

  .highcharts-data-table tr:hover {
    background: #f1f7ff;
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
