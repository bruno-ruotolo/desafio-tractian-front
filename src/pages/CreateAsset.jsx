import styled from "styled-components";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import SelectUnits from "../components/assets/SelectUnits";
import SelectUsers from "../components/assets/SelectUsers";
import assetsService from "../services/assetsService";

export default function CreateAsset() {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const location = useLocation();
  const localPath = location.pathname.split("/")[1];

  const [assetData, setAssetData] = useState({});

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
      <CreateWrapper className="create_wrapper">
        <CreateContainer className="create_container">
          <TitleContainer className="create_title_container">
            <ArrowLeftOutlined
              className="arrow_left_icon"
              onClick={() => navigate(-1)}
            />
            <h2>Creating Asset</h2>
          </TitleContainer>
          <form className="create_form" onSubmit={handleForm}>
            <input
              className="create_input"
              type="text"
              name="title"
              placeholder="Asset Name"
              onChange={(e) => handleInput(e)}
            />
            <input
              className="create_input"
              type="text"
              name="image"
              placeholder="Asset Image Link"
              onChange={(e) => handleInput(e)}
            />
            <input
              className="create_input"
              type="text"
              name="description"
              placeholder="Asset Description"
              onChange={(e) => handleInput(e)}
            />
            <input
              className="create_input"
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
            <button className="create_button" type="submit">
              Create
            </button>
          </form>
        </CreateContainer>
      </CreateWrapper>
    </>
  );
}

const CreateWrapper = styled.main`
  top: 0px;
  z-index: 0;
`;

const CreateContainer = styled.div``;
const TitleContainer = styled.div``;
