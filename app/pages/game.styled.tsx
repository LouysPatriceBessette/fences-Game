import styled from "styled-components";

export const GameNumberStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & div:nth-child(1){
    color: grey;
  }
    & div:nth-child(2){
    color: orange;
    font-weight: bold;
    font-size: 1.4em;
  }
`

export const PageContainer = styled.div`
  width: 100%;
  padding: 40px 20px;
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
  margin-top: 10px;
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

export const GameOver = styled.div`
  color: #fe7474ff;
  font-size: 4em;
  font-weight: 600;
  display: flex;
  justify-content: center;
  width: 100%;
`