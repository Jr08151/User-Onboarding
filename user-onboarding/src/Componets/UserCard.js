import React from 'react';
import styled from 'styled-components';

const UCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  h3 {
    margin: 25px;
    color: darkblue;
  }
  p {
    margin: 25px
  }
  button {
    margin: 25px;
  }
`;

function UserCard (props) {

  return (
    <UCard>
      <p>{props.user.id}</p>
      <h3>{props.user.uname}</h3>
      <p>{props.user.email}</p>
      <button onClick={()=>props.editFunction(props.user)}>Edit</button>
    </UCard>
  )
}

export default UserCard;