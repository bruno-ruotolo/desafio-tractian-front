import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import companiesService from "../services/companiesService";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArrowLeftOutlined } from "@ant-design/icons";
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
      <CreateWrapper>
        <CreateContainer>
          <TitleContainer>
            <ArrowLeftOutlined
              className="arrow_left_icon"
              onClick={() => navigate(-1)}
            />
            <h2>Creating Unit</h2>
          </TitleContainer>
          <form onSubmit={handleForm}>
            <input
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
  top: 70px;
`;

const CreateContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 150px;
  background-color: #00045c;

  width: 100%;
  padding: 20px 40px;
  min-height: 600px;

  form {
    width: 100%;
    display: flex;
    margin-top: 50px;
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
      margin-top: 100px;
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
