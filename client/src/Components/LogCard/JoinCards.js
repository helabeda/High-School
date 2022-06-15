import React from "react";
import styled from "styled-components";
import AnimatedShapes from "../AnimatedShapes";
import { Link } from "react-router-dom";

const Contained = styled.div`
  margin-right: 50px;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 17px -11px rgba(0, 0, 0, 0.58);
  box-shadow: 0px 0px 17px -11px rgba(0, 0, 0, 0.58);
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: 480px) {
    margin-right: 0;
    margin-bottom: 10px;
    padding: 10px;
  }
`;



const Type = styled.button`
  padding: 10px;
  margin: 10px 0;
  border: 1.5px solid crimson;
  color: crimson;
  background-color: white;
  border-radius: 20px;
  @media only screen and (max-width: 480px) {
    display: none;
  }
`;

const List = styled.ul`
  list-style: none;
`;



const Button = styled.button`
  border: none;
  background-color: darkblue;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  @media only screen and (max-width: 480px) {
    font-size: 12px;
    padding: 5px;
  }
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 480px) {
    flex-direction: column;
  }
`;
const JoinCards = () => {
  return (
    <Container>
      <Contained>
        <Type> Espace Parents</Type>
        <List></List>
        <Link to="/parentlogin">
          <Button>Se connecter</Button>
        </Link>
      </Contained>
      <Contained>
        <Type>Espace Administration</Type>
        <List></List>
        <Link to="/adminlogin">
          <Button>Se connecter</Button>
        </Link>
      </Contained>
      <Contained>
        <Type> Espace Professeur </Type>
        <List></List>
        <Link to="/proflogin">
          <Button>Se connecter</Button>
        </Link>
      </Contained>
      <AnimatedShapes />
    </Container>
  );
};

export default JoinCards;
