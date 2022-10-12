import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import jwt_decode from "jwt-decode";

import NaittracLogo from "../assets/naittrac.png";
import { useContext, useState } from "react";
import authService from "../services/authService";
import { AuthContext } from "../context/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setAuth, auth } = useContext(AuthContext);

  const [login, setLogin] = useState();

  async function handleForm(e) {
    e.preventDefault();
    try {
      const token = await authService.createTokenAndLogin(login);
      localStorage.setItem("auth", token);
      const userInfos = token ? jwt_decode(token) : null;
      setAuth({ ...userInfos, token });
      navigate("/companies");
    } catch (error) {
      console.log(error);
    }
  }

  function handleInput(e) {
    setLogin({
      ...login,
      [e.target.attributes.name.nodeValue]: e.target.value,
    });
  }

  return (
    <SignInWrapper>
      <MainContent>
        <LogoSide>
          <Rings
            height="400"
            width="400"
            color="#4fa94d"
            radius="6"
            wrapperStyle={{ position: "absolute", filter: "opacity(0.2)" }}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
          <img src={NaittracLogo} alt="Naittrac Logo" />
        </LogoSide>
        <LoginSide>
          <h2>Login</h2>
          <form onSubmit={handleForm}>
            <input
              name="email"
              type="text"
              placeholder="email"
              onChange={(e) => handleInput(e)}
            />
            <input
              name="password"
              type="text"
              placeholder="password"
              onChange={(e) => handleInput(e)}
            />
            <button>Access</button>
          </form>
        </LoginSide>
      </MainContent>
    </SignInWrapper>
  );
}

const SignInWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #224eb8;
  height: 100vh;
  width: 100vw;
  padding: 170px 240px;
`;

const MainContent = styled.section`
  position: relative;
  background-color: #ffffff;
  width: 800px;
  height: 333px;
  border-radius: 10px;
`;

const LogoSide = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00045c;
  width: 400px;
  height: 333px;
  border-radius: 10px 0 0 10px;
  img {
    width: 227px;
    height: 34px;
  }
`;

const LoginSide = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  right: 0;
  width: 400px;
  height: 333px;
  padding: 55px 75px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 31px;
    text-align: justify;
    color: #00045c;
    margin-bottom: 34px;
  }

  input {
    width: 251px;
    height: 30px;
    background-color: #d9d9d9;
    border-radius: 8px;
    padding-left: 10px;
    margin-bottom: 20px;

    font-family: "Crete Round";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: justify;
    color: #000000;
  }

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    width: 147px;
    height: 30px;

    background-color: #d9d9d9;
    border-radius: 8px;

    font-family: "Crete Round";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: justify;
    color: #00045c;
    transition: 0.4s;

    &:hover {
      background-color: #00045c;
      color: #d9d9d9;
    }
  }
`;
