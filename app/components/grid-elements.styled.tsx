'use client'

import styled from "styled-components";

export const GridContainerStyled = styled.div<{$waitingForOpponent: boolean}>`
  position: relative;
  ${(props) => props.$waitingForOpponent ? "cursor: not-allowed;" : "cursor: pointer;"}
`

export const GridOverlayStyled = styled.div<{$waitingForOpponent: boolean}>`
  ${(props) => props.$waitingForOpponent ? "display: block;" : "display: none;"}
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  color: #fe7474ff;
  text-shadow: 0px 0 1px black;
  text-align: center;
  font-weight: bold;
`

export const GridStyled = styled.div<{$size: number, $waitingForOpponent: boolean}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$size}, auto);
  ${(props) => props.$waitingForOpponent ? "pointer-events: none;" : ""}
`;

export const SquareStyled = styled.div<{$wasFencedBy: number}>`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: ${props => props.$wasFencedBy === 1 ? "green" : props.$wasFencedBy === 2 ? "blue" : "white"};
`;

export const DotStyled = styled.div<{$isFriend: boolean, $isOrigin: boolean, $origin: number}>`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.$origin === -1 ? 'black' :props.$isOrigin ? "orange" : props.$isFriend ? "green" : "lightgrey"};
  border-radius: 50%;
  cursor: ${(props) => props.$origin === -1 || (props.$isOrigin || props.$isFriend) ? "pointer" : "default"};
`;

export const VlineStyled = styled.div<{$isUsed: boolean}>`
  display: inline-block;
  width: 10px;
  height: 40px;
  background-color: ${(props => props.$isUsed ? "black" : "lightgrey")};
`;

export const HlineStyled = styled.div<{$isUsed: boolean}>`
  display: inline-block;
  width: 40px;
  height: 10px;
  background-color: ${(props => props.$isUsed ? "black" : "lightgrey")};
`;

export const Cell = styled.div`
 border: 1px solid black;
 width: 40px;
 height: 40px;
`;