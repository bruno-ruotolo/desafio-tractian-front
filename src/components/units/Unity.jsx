import styled from "styled-components";
import Asset from "./Asset";

export default function Unity({ unity }) {
  const { name, assets } = unity;
  return (
    <UnitWrapper>
      <h2>{name}</h2>
      <AssetsContainer>
        {assets?.map((asset) => {
          return <Asset asset={asset}></Asset>;
        })}
      </AssetsContainer>
    </UnitWrapper>
  );
}

const UnitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 204px;
  height: 204px;
  background: #224eb9;
  border: 1px solid #ffffff;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.25);
  margin-left: 30px;
  padding: 10px 10px;

  h2 {
    font-family: "Asap", sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    text-align: justify;
    color: #ffffff;
    margin-bottom: 20px;
  }
`;

const AssetsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;
