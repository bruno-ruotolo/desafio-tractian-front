import { InputNumber } from "antd";
import { useState } from "react";
import styled from "styled-components";

import assetsService from "../../services/assetsService";

export default function UpdateHealth({
  localPath,
  token,
  setRefreshPage,
  refreshPage,
}) {
  const [healthData, setHealthData] = useState({
    health: 100,
    assetId: localPath,
  });

  function onChangeHealth(value) {
    setHealthData({ ...healthData, health: value });
  }

  async function handleSubmitHealth(e) {
    e.preventDefault();
    try {
      setHealthData({ ...healthData, assetId: localPath });
      await assetsService.updateHealth(healthData, token);
      setRefreshPage(!refreshPage);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UpdateHealthWrapper>
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
    </UpdateHealthWrapper>
  );
}

const UpdateHealthWrapper = styled.div`
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
