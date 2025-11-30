import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  padding: 40px 20px;
`

export const PlayersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  font-weight: bold;
`

export const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const CurrentTurn = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 5em;
  & span{
    color: #fe7474ff;
  }
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