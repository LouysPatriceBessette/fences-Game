import { styled } from "styled-components";

export const AppLoaderStyled = styled.div`

  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left:0;
  
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;

  /* Credits goes to  https://css-loaders.com/dots/ for whats below */

  & .loader {
    width: 4px;
    color: #000;
    aspect-ratio: 1;
    border-radius: 50%;
    box-shadow: 
      19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px,
      19px 0     0 5px, 38px 0     0 5px, 57px 0     0 5px,
      19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 0px;
    transform: translate(-38px, -38px);
    animation: l26 1.6s infinite linear;
  }

  @keyframes l26 {
    12.5% {box-shadow: 
      19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 5px,
      19px 0     0 5px, 38px 0     0 0px, 57px 0     0 5px,
      19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 0px}
    25%   {box-shadow: 
      19px -19px 0 5px, 38px -19px 0 0px, 57px -19px 0 5px,
      19px 0     0 0px, 38px 0     0 0px, 57px 0     0 0px,
      19px 19px  0 0px, 38px 19px  0 5px, 57px 19px  0 0px}
    50%   {box-shadow: 
      19px -19px 0 5px, 38px -19px 0 5px, 57px -19px 0 0px,
      19px 0     0 0px, 38px 0     0 0px, 57px 0     0 0px,
      19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 5px}
    62.5% {box-shadow: 
      19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px,
      19px 0     0 5px, 38px 0     0 0px, 57px 0     0 0px,
      19px 19px  0 0px, 38px 19px  0 5px, 57px 19px  0 5px}
    75%   {box-shadow: 
      19px -19px 0 0px, 38px -19px 0 5px, 57px -19px 0 0px,
      19px 0     0 0px, 38px 0     0 0px, 57px 0     0 5px,
      19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 5px}
    87.5% {box-shadow: 
      19px -19px 0 0px, 38px -19px 0 5px, 57px -19px 0 0px,
      19px 0     0 0px, 38px 0     0 5px, 57px 0     0 0px,
      19px 19px  0 5px, 38px 19px  0 0px, 57px 19px  0 0px}
  }
`