import { OA_sendMessages } from '@/utils/openai'
import React from 'react'
import { useState }   from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { v4 as uuid } from 'uuid';

interface Props {
    inputState: Array<any>,
    chatLogState: Array<any>
}

function ChatInput({inputState, chatLogState}: Props) {
   const [input, setInput] = inputState
   const [chatLog, setChatLog] = chatLogState
   const [isLoading, setIsLoading] = React.useState<Boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!input) {
        return;
    }

    // Set chat log
    setChatLog([...chatLog, { user: 'User', message: input }])

    // Clear input
    setInput('')

    setIsLoading(true)

    const iaMsgId = uuid();

    // Populate a loading spinner
    setChatLog((prev: any) => { 
        return [...prev, {
            id: iaMsgId,
            user: 'AI', 
            loading: true
    }] })

    // Send message to AI and populate chat log
    const AIResponse = await OA_sendMessages(chatLog);

    // Add AI message
    setChatLog((prev: any) => {
        // Find the loading item with id iaMsgId and replace its loading property with the AI message
        const index = prev.findIndex((item: any) => item.id === iaMsgId);
        
        prev[index].loading = false;
        prev[index].message = AIResponse;
        
        return [...prev];        
    })

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-auto w-full p-5">
    <input className="w-full resize-none ring-primary animate-shake focus:border-primary focus:border outline-none shadow-lg py-4 px-5 text-lg p-3 border-black border border-1 hover:shadow-lg transition-all duration-300" value={input} onChange={(e) => {
        
        // If value is null add a clas of named "shake"
        if(e.target.value === null) {
            e.target.classList.add('animate-shake')
        } else {
            e.target.classList.remove('animate-shake')
        }
        
        setInput(e.target.value)
    }} placeholder="Skriv in prompt här ..."/>
    </form>
  )
}

export default ChatInput