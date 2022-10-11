import styled from "styled-components";

export default function Employee({ user }) {
  return (
    <UserWrapper>{!user.manager ? <h4>{user.name}</h4> : <></>}</UserWrapper>
  );
}

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  padding: 0 10px;

  h4 {
    font-style: normal;
    font-weight: 200;
    font-size: 20px;
    line-height: 41px;
    text-align: center;
    color: #00045c;
  }
`;
