import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

import EngineImage from "../assets/engine.png";
import NaittracLogo from "../assets/naittrac.png";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <HomePageWrapper>
      <WavesFilter>
        <div className="custom-shape-divider-bottom-1665069828">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </WavesFilter>
      <TopContent>
        <img src={NaittracLogo} alt="Naittrac Logo" />
        <UserArea onClick={() => navigate("/login")}>
          <UserOutlined className="user_icon" />
          <p>User Area</p>
        </UserArea>
      </TopContent>
      <MainContent>
        <h1>Track and Manage your Assets Quickly, Easily and Online</h1>
        <img src={EngineImage} alt="engine" />
      </MainContent>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.section`
  background-color: #224eb8;
  height: 100vh;
  width: 100vw;

  padding: 60px 100px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 80px;

  h1 {
    margin-right: 200px;
    font-style: normal;
    font-weight: 400;
    font-size: 36px;
    line-height: 46px;
    text-align: justify;
    color: #ffffff;
  }

  img {
    width: 725px;
    height: 526px;
  }
`;

const TopContent = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  img {
    width: 321px;
    height: 48px;
  }
`;

const UserArea = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  right: 0;
  transition: 0.5s;

  cursor: pointer;

  p {
    right: 50px;
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 26px;
    text-align: justify;
    color: #ffffff;
  }

  .user_icon {
    font-size: 35px;
    margin-right: 10px;
    color: #ffffff;
  }

  &:hover {
    transform: translateX(-5px);
    filter: drop-shadow(4px 0px 2px #000000);
  }
`;

const WavesFilter = styled.div`
  .custom-shape-divider-bottom-1665069828 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .custom-shape-divider-bottom-1665069828 svg {
    position: relative;
    display: block;
    width: calc(104% + 1.3px);
    height: 198px;
  }

  .custom-shape-divider-bottom-1665069828 .shape-fill {
    fill: #ffffff;
    filter: drop-shadow(0 0 10px #000000);
  }
`;
