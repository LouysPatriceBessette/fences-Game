// pages/index.js
import { useState } from 'react';
import { useSocketInstance,useChatMessages } from '../store/selectors';
import { sendMessage } from './socket';
import { ChatHeader, ChatMessagesContainer, ChatInputsContainer, ChatInput, ChatButton } from './chat.styled';

export const Chat = () => {
  const [messageInput, setMessageInput] = useState('');
  const messages = useChatMessages();
  const socket = useSocketInstance();

  const sendMessageHandler = () => sendMessage(socket, messageInput, setMessageInput);

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
          value={messageInput}
          onKeyUp={(event) => {
            console.log(event.key)
            if(event.key === 'Enter') {
              sendMessageHandler();
            }
          }}
          onChange={(event) => {
            setMessageInput(event.target.value)
          }}
        />
        <ChatButton onClick={sendMessageHandler}>Send</ChatButton>
      </ChatInputsContainer>
    </>
  );
}