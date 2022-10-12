import styled from "styled-components";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Checkbox from "antd/lib/checkbox/Checkbox";

import Header from "../components/Header";
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
      <CreateUserWrapper className="create_wrapper">
        <CreateUserContainer className="create_container">
          <TitleContainer className="create_title_container">
            <ArrowLeftOutlined
              className="arrow_left_icon"
              onClick={() => navigate(-1)}
            />
            <h2>Creating User</h2>
          </TitleContainer>
          <form onSubmit={handleForm}>
            <InputsWrapper>
              <input
                className="create_input"
                type="text"
                name="name"
                placeholder="User Name"
                onChange={(e) => handleInput(e)}
              />
              <input
                className="create_input"
                type="text"
                name="email"
                placeholder="User Email"
                onChange={(e) => handleInput(e)}
              />
              <input
                className="create_input"
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
            <button className="create_button" type="submit">
              Create
            </button>
          </form>
        </CreateUserContainer>
      </CreateUserWrapper>
    </>
  );
}

const CreateUserWrapper = styled.main``;
const TitleContainer = styled.div``;

const CreateUserContainer = styled.div`
  top: 50px;
  min-height: 700px;
  height: fit-content;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

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

const InputsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
