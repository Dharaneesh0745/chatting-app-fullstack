'use client';

import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { pusherClient } from "@/app/libs/pusher";
import useConversation from "@/app/hooks/useConversation";
import MessageBox from "./MessageBox";
import { FullMessageType } from "@/app/types";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  // useEffect(() => {
  //   axios.post(`/api/conversations/${conversationId}/seen`)
  //     .then(response => {
  //       // Handle successful response here
  //     })
  //     .catch(error => {
  //       // Handle error here
  //       console.error(error); // Log the error for debugging purposes
  
  //       // Optionally, you can access the error response properties
  //       if (error.response) {
  //         console.log('Error Response:', error.response.data);
  //         console.log('Status Code:', error.response.status);
  //         console.log('Status Text:', error.response.statusText);
  //       }
  //     });
  // }, [conversationId]);
  
  useEffect(() => {
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
      
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };
  

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
  }, [conversationId]);

  return ( 
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
}
 
export default Body;