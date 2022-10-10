import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  DownOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";

import NaittracLogo from "../assets/naittrac.png";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";

export default function Users() {
  const navigate = useNavigate();
  const { setAuth, auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  return (
    <>
      <Header />
      <UsersWrapper>
        <UsersContainer>
          <TopInfosContainer>
            <TitleContainer>
              <ArrowLeftOutlined
                className="arrow_left_icon"
                onClick={() => navigate(-1)}
              />
              <h1>User’s</h1>
            </TitleContainer>
            <PlusSquareOutlined
              className="plus_icon"
              onClick={() => navigate("/create-user")}
            />
          </TopInfosContainer>
          <ManagersContainer>
            <h3>Managers</h3>
          </ManagersContainer>

          <EmployeesContainer>
            <h3>Employees</h3>
          </EmployeesContainer>
        </UsersContainer>
      </UsersWrapper>
    </>
  );
}

const UsersWrapper = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 0px 100px;
  margin-top: 50px;
`;

const UsersContainer = styled.section`
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

const TopInfosContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .plus_icon {
    cursor: pointer;
    color: #ffffff;
    font-size: 50px;
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

const ManagersContainer = styled.div`
  margin-left: 75px;
  h3 {
    font-family: "Crete Round";
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 41px;
    text-align: justify;
    color: #ffffff;
  }
`;

const EmployeesContainer = styled.div`
  margin-left: 75px;
  h3 {
    font-family: "Crete Round";
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 41px;
    text-align: justify;
    color: #ffffff;
  }
`;
