'use client'

import styled from "styled-components";

export const ChatHeader = styled.h1`
  text-align: center;
`

export const ChatMessagesContainer = styled.div`
  width: 50%;
  margin: 0 auto 1em auto;
  border: 1px solid black;
  padding: 1em;
  background-color: lightgrey;
  max-height: 8em;
  overflow-y: scroll;
`

export const ChatInputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4em;
`

export const ChatInput = styled.input`
  width: 20em;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 1em;
  ${(props) => props.disabled ? 'cursor: not-allowed;' : ''}
`;

export const ChatButton = styled.button`
  background-color: #4CAF50;
  border: 1 px solid grey;
  padding: 0 0.5em;
  border-radius: 4px;
  corner-shape: squircle;
  cursor: pointer;
  ${(props) => props.disabled ? 'cursor: not-allowed;' : ''}
`;

