import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, PlusSquareOutlined } from "@ant-design/icons";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import usersService from "../services/usersService";
import User from "../components/users/User";

export default function Users() {
  const navigate = useNavigate();
  const { setAuth, auth } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [users, setUsers] = useState([{ managers: [], employees: [] }]);

  useEffect(() => {
    (async () => {
      try {
        const users = await usersService.getAllUsers(auth.token);
        setUsers(users);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [auth.token, refresh]);

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
            <UsersNamesContainer>
              {users.managers?.map((user) => {
                return (
                  <User
                    setRefresh={(value) => setRefresh(value)}
                    refresh={refresh}
                    key={user._id}
                    user={user}
                  />
                );
              })}
            </UsersNamesContainer>
          </ManagersContainer>

          <EmployeesContainer>
            <h3>Employees</h3>
            <UsersNamesContainer>
              {users.employees?.map((user) => {
                return (
                  <User
                    setRefresh={(value) => setRefresh(value)}
                    refresh={refresh}
                    key={user._id}
                    user={user}
                  />
                );
              })}
            </UsersNamesContainer>
          </EmployeesContainer>
        </UsersContainer>
      </UsersWrapper>
    </>
  );
}

const UsersWrapper = styled.main`
  background-color: #224eb8;
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 0px 100px;
  height: calc(100vh - 70px);
  top: 70px;
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

const UsersNamesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
