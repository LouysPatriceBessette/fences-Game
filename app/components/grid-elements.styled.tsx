'use client'

import styled from "styled-components";

export const GridStyled = styled.div<{size: number}>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.size}, auto);
`;

export const SquareStyled = styled.div<{isFenced: boolean}>`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: ${(props) => props.isFenced ? "green" : "white"};
`;

export const DotStyled = styled.div<{isFriend: boolean, isOrigin: boolean}>`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${(props) => props.isOrigin ? "red" : props.isFriend ? "green" : "lightgrey"};
  border-radius: 50%;
  cursor: ${(props) => props.isOrigin || props.isFriend ? "pointer" : "default"};
`;

export const VlineStyled = styled.div<{isUsed: boolean}>`
  display: inline-block;
  width: 10px;
  height: 40px;
  background-color: ${(props => props.isUsed ? "black" : "lightgrey")};
`;

export const HlineStyled = styled.div<{isUsed: boolean}>`
  display: inline-block;
  width: 40px;
  height: 10px;
  background-color: ${(props => props.isUsed ? "black" : "lightgrey")};
`;

export const Cell = styled.div`
 border: 1px solid black;
 width: 40px;
 height: 40px;
`;