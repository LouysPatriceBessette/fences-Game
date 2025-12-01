import { useState } from 'react';
import {
  useSocketInstance,
  useChatMessages,
  useIamPlayer,
  useGameId,
} from '../store/selectors';
import { sendMessage } from '../socket';
import { ChatHeader, ChatMessagesContainer, ChatInputsContainer, ChatInput, ChatButton } from './chat.styled';

export const Chat = () => {
  const [messageInput, setMessageInput] = useState('');
  const messages = useChatMessages();
  const socket = useSocketInstance();
  const iamPlayer = useIamPlayer();
  const gameId = useGameId();

  const sendMessageHandler = () => sendMessage(socket, gameId, `Player${iamPlayer}: ${messageInput}`, setMessageInput);

  return (
    <>
      <ChatHeader>Real-time Chat</ChatHeader>
      <ChatMessagesContainer>
        {messages.map((msg: string, index: number) => (
          <p key={index}>{msg}</p>
        ))}
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