import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArrowLeftOutlined } from "@ant-design/icons";
import unitsService from "../services/unitsService";
import SelectUnits from "../components/assets/SelectUnits";
import SelectUsers from "../components/assets/SelectUsers";
import assetsService from "../services/assetsService";

export default function CreateAsset() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [assetData, setAssetData] = useState({});
  console.log(assetData);

  const location = useLocation();
  const localPath = location.pathname.split("/")[1];

  async function handleForm(e) {
    e.preventDefault();
    try {
      await assetsService.createAsset(assetData, auth.token);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  function handleInput(e) {
    setAssetData({
      ...assetData,
      [e.target.attributes.name.nodeValue]: e.target.value,
    });
  }

  return (
    <>
      <Header />
      <CreateWrapper>
        <CreateContainer>
          <TitleContainer>
            <ArrowLeftOutlined
              className="arrow_left_icon"
              onClick={() => navigate(-1)}
            />
            <h2>Creating Asset</h2>
          </TitleContainer>
          <form onSubmit={handleForm}>
            <input
              type="text"
              name="title"
              placeholder="Asset Name"
              onChange={(e) => handleInput(e)}
            />
            <input
              type="text"
              name="image"
              placeholder="Asset Image Link"
              onChange={(e) => handleInput(e)}
            />
            <input
              type="text"
              name="description"
              placeholder="Asset Description"
              onChange={(e) => handleInput(e)}
            />
            <input
              type="text"
              name="model"
              placeholder="Asset Model"
              onChange={(e) => handleInput(e)}
            />

            <SelectUnits
              setUnitId={(unityId) => setAssetData({ ...assetData, unityId })}
              token={auth.token}
              companyId={localPath}
            />

            <SelectUsers
              setUserId={(owner) => setAssetData({ ...assetData, owner })}
              token={auth.token}
            />
            <button type="submit">Create</button>
          </form>
        </CreateContainer>
      </CreateWrapper>
    </>
  );
}

const CreateWrapper = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 0px 100px;
  background-color: #224eb8;
  height: calc(100vh - 70px);
  top: 0px;
  z-index: 0;
`;

const CreateContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 120px;
  background-color: #00045c;

  width: 100%;
  padding: 20px 40px;
  min-height: 600px;

  form {
    width: 100%;
    display: flex;
    margin-top: 0px;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    input {
      background-color: #d9d9d9;
      width: 500px;
      height: 55px;
      border-radius: 4px;
      padding-left: 20px;

      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 26px;
      text-align: justify;
      color: #00045c;
      margin-bottom: 20px;
    }

    button {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border: none;
      margin-top: 50px;
      margin-bottom: 50px;
      width: 280px;
      height: 70px;
      background-color: #224eb9;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;

      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 41px;
      text-align: justify;
      color: #ffffff;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 80px;

  h2 {
    font-family: "Crete Round";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 41px;
    text-align: justify;
    color: #ffffff;
  }

  .arrow_left_icon {
    color: #ffffff;
    font-size: 40px;
    margin-right: 30px;
  }
`;
