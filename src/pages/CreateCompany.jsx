import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import companiesService from "../services/companiesService";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function CreateCompany() {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const [companyData, setCompanyData] = useState({});

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
      <CreateCompanyWrapper className="create_wrapper">
        <CreateCompanyContainer className="create_container">
          <TitleContainer className="create_title_container">
            <ArrowLeftOutlined
              className="arrow_left_icon"
              onClick={() => navigate(-1)}
            />
            <h2>Creating Company</h2>
          </TitleContainer>
          <form className="create_form" onSubmit={handleForm}>
            <input
              className="create_input"
              type="text"
              name="name"
              placeholder="Company Name"
              onChange={(e) => handleInput(e)}
            />
            <button className="create_button" type="submit">
              Create
            </button>
          </form>
        </CreateCompanyContainer>
      </CreateCompanyWrapper>
    </>
  );
}

const CreateCompanyWrapper = styled.main``;
const CreateCompanyContainer = styled.div``;
const TitleContainer = styled.div``;
