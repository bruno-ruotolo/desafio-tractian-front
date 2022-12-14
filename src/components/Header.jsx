import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DownOutlined, ExportOutlined, UserOutlined } from "@ant-design/icons";

import NaittracLogo from "../assets/naittrac.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  function logout() {
    localStorage.removeItem("auth");
    navigate("/");
  }

  return (
    <HeaderWrapper>
      <img src={NaittracLogo} alt="" />
      <h2
        onClick={() => {
          navigate("/companies");
        }}
      >
        Companies
      </h2>
      <UsersContainer onClick={() => navigate("/users")}>
        <UserOutlined className="user_icon" />
        <h2>Users</h2>
      </UsersContainer>
      <UserContainer>
        <p>{auth.name}</p>
        <ExportOutlined onClick={logout} className="down_icon" />
      </UserContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00045c;
  height: 70px;
  width: 100vw;
  padding: 0px 100px;
  z-index: 20;

  img {
    width: 164px;
    height: 23px;
    left: 0;
  }
  h2 {
    cursor: pointer;
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 26px;
    text-align: justify;
    color: #ffffff;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    text-align: justify;
    color: #ffffff;
  }

  .down_icon {
    cursor: pointer;
    font-size: 20px;
    margin-left: 10px;
    color: #ffffff;
  }
`;

const UsersContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  .user_icon {
    font-size: 30px;
    color: #ffffff;
    margin-right: 10px;
  }
`;
