import React from 'react'
import styled, { css } from "styled-components";



const Container = styled.div`
  height: 70vh;
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

const FeatureShape = styled.div`
  ${Shape}
  clip-path: polygon(0 0, 50% 0%, 30% 100%, 0 100%);
  background-color: pink;
`;

const ServiceShape = styled.div`
  ${Shape}
  clip-path: polygon(0 0, 30% 0%, 30% 100%, 0 100%);
  background-color: #f88497;
`;



const LogProf = () => {
  return (
    <>
      
      <Container>
        
        <FeatureShape />
      </Container>
      <Container>

         <ServiceShape />
      </Container>
      
    </>
  );
};
export default LogProf
