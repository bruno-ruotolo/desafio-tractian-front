import styled from "styled-components";

import Header from "../components/Header";
import UserCompanies from "../components/companies/UserCompanies";

export default function Companies() {
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
