import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import SelectUsers from "../components/users/SelectUsers";
import unitsService from "../services/unitsService";

export default function CreateUnity() {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const [unitData, setUnitData] = useState({});

  async function handleForm(e) {
    e.preventDefault();
    try {
      const data = { name: unitData.name };
      const { companyId } = unitData;
      await unitsService.createUnit(data, companyId, auth.token);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  function handleInput(e) {
    setUnitData({
      ...unitData,
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
            <h2>Creating Unit</h2>
          </TitleContainer>
          <form className="create_form" onSubmit={handleForm}>
            <input
              className="create_input"
              type="text"
              name="name"
              placeholder="Unit Name"
              onChange={(e) => handleInput(e)}
            />

            <SelectUsers
              setCompanyId={(companyId) =>
                setUnitData({ ...unitData, companyId })
              }
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

const CreateWrapper = styled.main``;
const CreateContainer = styled.div``;
const TitleContainer = styled.div``;
