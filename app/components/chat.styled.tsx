'use client'

import styled from "styled-components";

export const ChatMessagesContainer = styled.div`
  width: 70%;
  margin: 0 auto 1em auto;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 0.5em 1em;
  background-color: #e6f7f6ff;
  max-height: 8em;
  overflow-y: scroll;
  scrollbar-color: black transparent;
  scrollbar-width: thin;
`

export const ChatInputsContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4em;
  width: 70vw;
  margin: 0 auto;

  & input {
    border-radius: 4px 0 0 4px;
  }
  
  & button {
    border-radius: 0 4px 4px 0;
  }
`

export const PlayerNameChatColor = styled.span<{playerNumber: number}>`
  color: ${(props) => props.playerNumber === 1 ? 'green' : 'blue'};
`;