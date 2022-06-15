import React from 'react'
import { useDispatch } from 'react-redux';
import Nav from '../Navbar/Nav';
import { logout } from "../Redux/actions/auth";
import Contact from './Contact';
import Foot from './Foot';
import styled, { css } from "styled-components";
import "./Home.css"
import JoinCards from './LogCard/JoinCards';


const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Shape = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const IntoShape = styled.div`
  ${Shape}
  clip-path: polygon(67% 0, 100% 0%, 100% 100%, 55% 100%);
  background-color: crimson;
`;


const Home = () => {
    const token = localStorage.getItem("token");

    return token ? (
      <div></div>
    ) : (
      <div>
        <Container>
          <Nav />
          <JoinCards />
          <IntoShape />
        </Container>
        <Container>
          <Contact />
          <Foot />
        </Container>
      </div>
    );
}

export default Home
