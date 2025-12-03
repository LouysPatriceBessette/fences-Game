import { useState } from 'react';
import {
  useSocketInstance,
  useChatMessages,
  useIamPlayer,
  useGameId,
  usePlayer1Name,
  usePlayer2Name,
} from '../store/selectors';
import { sendMessage } from '../socket';
import { ChatHeader, ChatMessagesContainer, ChatInputsContainer, ChatInput, ChatButton, PlayerNameChatColor, } from './chat.styled';

export const Chat = () => {
  const [messageInput, setMessageInput] = useState('');
  const messages = useChatMessages();
  const socket = useSocketInstance();
  const iamPlayer = useIamPlayer();
  const gameId = useGameId();
  const player1Name = usePlayer1Name();
  const player2Name = usePlayer2Name();
  const myName = iamPlayer === 1 ? player1Name : player2Name;

  const sendMessageHandler = () => sendMessage(socket, gameId, `<span>${myName}</span>: ${messageInput}`, setMessageInput);

  return (
    <>
      <ChatHeader>Real-time Chat</ChatHeader>
      <ChatMessagesContainer>
        {messages.map((msg: string, index: number) => 
          {
            const msgParts = msg.split('</span>')
            const name = msgParts[0].replace('<span>', '');
            const message = msgParts[1];

            const playerNumber = name === player1Name ? 1 : name === player2Name ? 2 : 0;
            const nameSpanned = <PlayerNameChatColor playerNumber={playerNumber}>{name}</PlayerNameChatColor>;

            return <p key={index}>{nameSpanned}{message}</p>
          }
        )}
      </ChatMessagesContainer>

      <ChatInputsContainer>
        <ChatInput
          type="text"
          disabled={gameId === -1}
          value={messageInput}
          onKeyUp={(event) => {
            if(event.key === 'Enter') {
              sendMessageHandler();
            }
          }}
          onChange={(event) => {
            setMessageInput(event.target.value)
          }}
        />
        <ChatButton onClick={sendMessageHandler} disabled={gameId === -1}>Send</ChatButton>
      </ChatInputsContainer>
    </>
  );
}