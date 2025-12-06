import styled from "styled-components";

export const ControlButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const DialogGridStyled = styled.div`
  display: grid;
  width: 100%;
  gap: 0.5em;
  margin-bottom: 1em;

  &>div{
    display: flex;
    align-items: center;
  }

  &>div:nth-child(2) {
    align-items: start;
  }

  &>div:nth-child(1) {
    display: block;
    
    text-align: center;
    grid-column: span 2;

    &>div{
      margin: 0 auto;}
  }
`

export const DialogLabelStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5em;
`