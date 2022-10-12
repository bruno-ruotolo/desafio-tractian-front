import { DeleteOutlined } from "@ant-design/icons";
import { useContext } from "react";
import styled from "styled-components";

import { AuthContext } from "../../context/AuthContext";
import usersService from "../../services/usersService";

export default function User({ user, setRefresh, refresh }) {
  const { auth } = useContext(AuthContext);

  async function handleDelete() {
    try {
      await usersService.deleteUser(user._id, auth.token);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UserWrapper>
      <h4>{user.name}</h4>
      <DeleteOutlined className="delete_icon" onClick={handleDelete} />
    </UserWrapper>
  );
}

const UserWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 0 10px;
  width: 200px;
  border-radius: 10px;
  height: 100px;
  margin-right: 30px;

  h4 {
    font-style: normal;
    font-weight: 200;
    font-size: 20px;
    line-height: 41px;
    text-align: center;
    color: #00045c;
  }

  .delete_icon {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 20px;
  }
`;
