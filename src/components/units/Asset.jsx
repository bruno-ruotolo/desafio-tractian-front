import { ToolFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Asset({ asset }) {
  const { title, _id } = asset;
  const navigate = useNavigate();
  return (
    <AssetWrapper
      onClick={() => {
        navigate(`/asset/${_id}`);
      }}
    >
      <h3>{title}</h3>
    </AssetWrapper>
  );
}

const AssetWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 10px;

  h3 {
    font-family: "Donegal One", serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 19px;
    text-align: justify;
    color: #ffffff;
  }
`;
