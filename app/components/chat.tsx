import { useState, useEffect, useRef } from 'react';
import {
  useLanguage,
  useSocketInstance,
  useChatMessages,
  useIamPlayer,
  useGameId,
  usePlayer1Name,
  usePlayer2Name,
} from '../store/selectors';
import { sendMessage } from '../socket';
import Chakra from "./Chakra";
import { ChatMessagesContainer, ChatInputsContainer, PlayerNameChatColor, } from './chat.styled';

// Translations
import t from "../translations";
import { SupportedLanguagesType } from "../translations/supportedLanguages";

export const Chat = () => {
  const language: SupportedLanguagesType = useLanguage()
  const [messageInput, setMessageInput] = useState('');
  const messages = useChatMessages();
  const socket = useSocketInstance();
  const iamPlayer = useIamPlayer();
  const gameId = useGameId();
  const player1Name = usePlayer1Name();
  const player2Name = usePlayer2Name();
  const myName = iamPlayer === 1 ? player1Name : player2Name;

  const handleSendMessage = () => sendMessage(socket, gameId, `<span>${myName}</span>: ${messageInput}`, setMessageInput);

  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      handleSendMessage()
    }
  }

  const messagesScrollBox = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if(messagesScrollBox.current){
      messagesScrollBox.current.scrollTop = messagesScrollBox.current.scrollHeight
    }

  }, [messages, messagesScrollBox])

  return (
    <>
      <ChatMessagesContainer ref={messagesScrollBox}>
        {messages.map((msg: string, index: number) => 
          {
            const msgParts = msg.split('</span>')
            const name = msgParts[0].replace('<span>', '');
            const message = msgParts[1];

            const playerNumber = name === player1Name ? 1 : name === player2Name ? 2 : 0;
            const nameSpanned = <PlayerNameChatColor $playerNumber={playerNumber}>{name}</PlayerNameChatColor>;

            return <p key={index}>{nameSpanned}{message}</p>
          }
        )}
      </ChatMessagesContainer>

      <ChatInputsContainer>
        <Chakra.Input
          disabled={gameId === -1}
          placeholder={t[language]['Message']}
          value={messageInput}
          setValue={setMessageInput}
          onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => handleInputKeyUp(event)}
        />

        <Chakra.Button
          type='button'
          text={t[language]['Send']}
          onClick={handleSendMessage}
          disabled={gameId === -1}
        />
      </ChatInputsContainer>
    </>
  );
}