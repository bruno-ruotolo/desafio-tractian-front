import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import unitsService from "../services/unitsService";
import { ArrowLeftOutlined, PlusSquareFilled } from "@ant-design/icons";
import Unity from "../components/units/Unity";
export default function Units() {
  const navigate = useNavigate();

  const { setAuth, auth } = useContext(AuthContext);
  const [units, setUnits] = useState();

  const location = useLocation();
  const localPath = location.pathname.split("/").reverse()[0];

  useEffect(() => {
    (async () => {
      try {
        const units = await unitsService.getUnits(localPath, auth.token);
        setUnits(units);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [auth.token, localPath]);

  return (
    <>
      <Header />

      <UnitsContainer>
        <Buttons>
          <CreationButton onClick={() => navigate("/create-unit")}>
            <h2>Create Unit</h2>
            <PlusSquareFilled className="plus_icon" />
          </CreationButton>
          <CreationButton
            onClick={() => navigate(`/${localPath}/create-asset`)}
          >
            <h2>Create Asset</h2>
            <PlusSquareFilled className="plus_icon" />
          </CreationButton>
        </Buttons>
        <UnitsWrapper>
          <TitleContainer>
            <ArrowLeftOutlined
              className="arrow_left_icon"
              onClick={() => navigate(-1)}
            />
            <h1>Units' Informations</h1>
          </TitleContainer>
          <UnitsComponents>
            {units?.map((unity) => {
              return <Unity unity={unity} />;
            })}
          </UnitsComponents>
        </UnitsWrapper>
      </UnitsContainer>
    </>
  );
}

const Buttons = styled.div`
  display: flex;
`;

const CreationButton = styled.article`
  display: flex;
  flex-direction: column;
  margin-right: 90px;
  cursor: pointer;

  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 31px;
    text-align: justify;
    color: #ffffff;
  }
  .plus_icon {
    font-size: 80px;
    color: #ffffff;
  }
`;

const UnitsContainer = styled.main`
  position: absolute;
  height: calc(100vh - 70px);
  top: 60px;
  width: 100vw;
  padding: 0px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UnitsWrapper = styled.section`
  position: relative;
  top: 20px;
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

const TitleContainer = styled.div`
  display: flex;

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

const UnitsComponents = styled.div`
  display: flex;
`;
