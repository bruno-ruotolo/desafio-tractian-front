import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import companiesService from "../services/companiesService";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function CreateCompany() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [companyData, setCompanyData] = useState({});
  console.log(companyData);

  async function handleForm(e) {
    e.preventDefault();
    try {
      await companiesService.createCompany(companyData, auth.token);
      navigate("/companies");
    } catch (error) {
      console.log(error);
    }
  }

  function handleInput(e) {
    setCompanyData({
      ...companyData,
      [e.target.attributes.name.nodeValue]: e.target.value,
    });
  }

  return (
    <>
      <Header />
      <CreateCompanyWrapper>
        <CreateCompanyContainer>
          <TitleContainer>
            <ArrowLeftOutlined
              className="arrow_left_icon"
              onClick={() => navigate(-1)}
            />
            <h2>Creating Company</h2>
          </TitleContainer>
          <form onSubmit={handleForm}>
            <input
              type="text"
              name="name"
              placeholder="Company Name"
              onChange={(e) => handleInput(e)}
            />
            <button type="submit">Create</button>
          </form>
        </CreateCompanyContainer>
      </CreateCompanyWrapper>
    </>
  );
}

const CreateCompanyWrapper = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 0px 100px;
`;

const CreateCompanyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 150px;
  background-color: #00045c;

  width: 100%;
  min-height: 750px;
  padding: 20px 40px;

  form {
    margin-top: 100px;
    width: 100%;
    display: flex;
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
