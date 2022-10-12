import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { useState } from "react";
import styled from "styled-components";

import assetsService from "../../services/assetsService";

export default function UpdateStatus({
  localPath,
  token,
  setRefreshPage,
  refreshPage,
}) {
  const [statusData, setStatusData] = useState({
    status: "Running",
    assetId: localPath,
  });

  function onChangeStatus(value) {
    setStatusData({ ...statusData, status: value });
  }
  async function handleSubmitStatus(e) {
    e.preventDefault();
    try {
      setStatusData({ ...statusData, assetId: localPath });
      await assetsService.updateStatus(statusData, token);
      setRefreshPage(!refreshPage);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UpdateStatuWrapper>
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
    </UpdateStatuWrapper>
  );
}

const UpdateStatuWrapper = styled.div`
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
