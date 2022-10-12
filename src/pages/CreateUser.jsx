import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import SelectUsers from "../components/users/SelectUsers";
import usersService from "../services/usersService";

export default function CreateUser() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [userData, setUserData] = useState({ manager: false });
  async function handleForm(e) {
    e.preventDefault();
    try {
      await usersService.createUser(userData, auth.token);
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  }

  function handleInput(e) {
    setUserData({
      ...userData,
      [e.target.attributes.name.nodeValue]: e.target.value,
    });
  }

  function handleCheckbox(e) {
    setUserData({
      ...userData,
      manager: e.target.checked,
    });
  }

  return (
    <>
      <Header />
      <CreateUserWrapper>
        <CreateUserContainer>
          <TitleContainer>
            <ArrowLeftOutlined
              className="arrow_left_icon"
              onClick={() => navigate(-1)}
            />
            <h2>Creating User</h2>
          </TitleContainer>
          <form onSubmit={handleForm}>
            <InputsWrapper>
              <input
                type="text"
                name="name"
                placeholder="User Name"
                onChange={(e) => handleInput(e)}
              />
              <input
                type="text"
                name="email"
                placeholder="User Email"
                onChange={(e) => handleInput(e)}
              />
              <input
                type="text"
                name="password"
                placeholder="User Password"
                onChange={(e) => handleInput(e)}
              />
            </InputsWrapper>

            <SelectUsers
              setCompanyId={(companyId) =>
                setUserData({ ...userData, companyId })
              }
              token={auth.token}
            />
            <Checkbox className="checkbox" onChange={(e) => handleCheckbox(e)}>
              Manager
            </Checkbox>
            <button type="submit">Create</button>
          </form>
        </CreateUserContainer>
      </CreateUserWrapper>
    </>
  );
}

const CreateUserWrapper = styled.main`
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 0px 100px;
  background-color: #224eb8;
  height: calc(100vh - 70px);
  top: 70px;
`;

const CreateUserContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 50px;
  background-color: #00045c;

  width: 100%;
  min-height: 700px;
  height: fit-content;
  padding: 20px 40px;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      border: none;
      margin-top: 80px;
      width: 280px;
      height: 70px;
      background-color: #224eb9;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;

      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 41px;
      text-align: justify;
      color: #ffffff;
    }

    .checkbox {
      display: flex;
      position: relative;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 41px;
      text-align: justify;
      color: #ffffff;

      input {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 30px;
      }
    }
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

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  input {
    margin-bottom: 20px;
    background-color: #d9d9d9;
    width: 500px;
    height: 55px;
    border-radius: 4px;
    padding-left: 20px;

    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    text-align: justify;
    color: #00045c;
  }
`;
