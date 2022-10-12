import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";
import companiesService from "../../services/companiesService";
import { PlusSquareOutlined } from "@ant-design/icons";

export default function UserCompanies() {
  const navigate = useNavigate();
  const { setAuth, auth } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const companies = await companiesService.getUserCompanies(auth.token);
        setCompanies(companies);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [auth.token]);

  return (
    <CompaniesWrapper>
      <TitleContainer>
        <h1>User’s Companies</h1>
        <PlusSquareOutlined
          className="plus_icon"
          onClick={() => navigate("/create-company")}
        />
      </TitleContainer>

      <ButtonsContainer>
        {companies?.map(({ name, _id }) => {
          return (
            <button
              key={_id}
              onClick={() => {
                navigate(`/company/${_id}`);
              }}
            >
              {name}
            </button>
          );
        })}
      </ButtonsContainer>
    </CompaniesWrapper>
  );
}

const CompaniesWrapper = styled.section`
  position: relative;
  top: 80px;
  padding: 20px 40px;

  width: 100%;
  height: calc(100vh - 230px);
  background-color: #00045c;
  border-radius: 10px;

  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 41px;
    text-align: justify;
    color: #ffffff;
    margin-bottom: 50px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  button {
    border: none;
    width: fit-content;
    height: 80px;
    padding: 0 20px;
    background-color: #a7bdf6;
    border-radius: 10px;

    cursor: pointer;

    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    text-align: justify;
    color: #000000;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .plus_icon {
    cursor: pointer;
    color: #ffffff;
    font-size: 50px;
  }
`;
