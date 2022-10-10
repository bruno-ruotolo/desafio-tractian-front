import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import NaittracLogo from "../assets/naittrac.png";
import { useContext, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import UserCompanies from "../components/companies/UserCompanies";

export default function Companies() {
  const navigate = useNavigate();

  const { setAuth, auth } = useContext(AuthContext);
  const [companies, setCompanies] = useState();

  return (
    <CompaniesContainer>
      <Header />
      <UserCompanies />
    </CompaniesContainer>
  );
}

const CompaniesContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #224eb8;
  height: 100vh;
  width: 100vw;
  padding: 0px 100px;
`;
