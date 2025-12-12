import { styled } from "styled-components";

export const WelcomeDialogTitleStyled = styled.div`

  display: flex;

  & svg{
    margin-right: 0.5em;
    transform: translateY(4px);
  }
`

export const WelcomeDialogBodyStyled = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;

  & p:not(:first-child){
    margin-top: 0.5em;
  }

  & button{
    margin-top: 1em;
  }
`

export const H3 = styled.h3`
  font-size: 1.3em;
  width: 100%;
  text-align: center;
`

export const Div1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: justify;
  margin-top: 1.2em;
`

export const Divn = styled.div`
  width: 100%;
  display: flex;
  justify-content: justify;
  margin-top: 0.8em;
`

export const AppLoader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

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
    transform: translateX(-38px);
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