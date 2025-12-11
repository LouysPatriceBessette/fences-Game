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