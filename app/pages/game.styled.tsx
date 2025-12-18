import styled from "styled-components";

export const LoadingWrapper = styled.div<{$isLoading?: boolean}>`
  opacity: ${(props) => !props.$isLoading ? '1' : '0'};
  transition: opacity 0.8s ease-in-out;
`

export const GameNumberStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & div:nth-child(1){
    color: orange;
    text-shadow: 0px 0 1px black;
    font-weight: bold;
    font-size: 1.6em;
    text-align: center;
  }
  & div:nth-child(2){
    color: grey;
    font-size: 0.7em;
    transform: translateY(-6px);
  }
`

export const PageContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);
  padding: 10px 20px 40px;
`

export const ConnectedPlayersContainer = styled.div`
  text-align: center;

  & span{
    color: green;
    font-weight: bold;
  }
`

export const DrawerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const PlayersNameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-weight: bold;
`

export const PlayersScoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  font-weight: bold;
`

export const PlayerNameContainer = styled.div`
  display: inline-block;
`

export const Player = styled.div`
  display: flex;
  flex-direction: column;
`

export const PlayerScore = styled.div<{color: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background-color: ${(props) => props.color};
  color: white;
  font-size: 2em;
  border-radius: 6px;
  corner-shape: squircle;
`

export const PlayerOnlineIndicator = styled.div<{$online: boolean}>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.$online ? 'green' : 'red'};
`

export const CurrentTurn = styled.div<{$hidden: boolean}>`
  ${(props) => props.$hidden ? 'display: none;' : 'block'}
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 5em;
  & span{
    color: #fe7474ff;
  }
    transform: translateY(-10px);
`

export const GameGridContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const LanguageDialogContainer = styled.div`
  & button{
    display: none;
  }
`

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

export const GameOver = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  margin:0 auto;

  & > div:nth-child(1){
    color: #fe7474ff;
    font-size: 2.5em;
    font-weight: 600;
  }

  & button{
    display: none;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin: 10px 0 0;
  padding: 0 10px;
  color: white;
  background-color: #656565ff;

  & > div:nth-child(1){
    display: flex;
    align-items: center;

    & span{
      margin-left: 0.5em;
    }
  }
  & > div:nth-child(2) > div{
    margin: 0;
  }
`