import { OPENAI_sendMessage } from "@/utils/openai";
import React, { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { v4 as uuid } from "uuid";

interface Props {
  inputState: Array<any>;
  chatLogState: Array<any>;
  activeEngineState: Array<any>;
}

function ChatInput({ inputState, chatLogState, activeEngineState }: Props) {
  const [input, setInput] = inputState;
  const [chatLog, setChatLog] = chatLogState;
  const [activeEngine, setActiveEngine] = activeEngineState;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remove shake
    inputRef.current?.classList.remove("animate-shake");

    if (!input) {
        setTimeout(() => {
            inputRef.current?.classList.add("animate-shake");
        }, 300);
        return;
    }

    const newChatLog = [...chatLog, { user: "User", message: input }];

    // Set chat log
    setChatLog(newChatLog);

    // Clear input
    setInput("");

    setIsLoading(true);

    const iaMsgId = uuid();

    // Populate a loading spinner
    setChatLog((prev: any) => {
      return [
        ...prev,
        {
          id: iaMsgId,
          user: "AI",
          loading: true,
        },
      ];
    });

    var AIResponse = "";

    // Send message to AI and populate chat log
    try {
        AIResponse = await OPENAI_sendMessage(newChatLog, activeEngine, false);
    }
    catch (err) {
        console.error(err)
        AIResponse = "Något gick fel, försök igen senare.";
    }

    // Add AI message
    setChatLog((prev: any) => {
        const index = prev.findIndex((item: any) => item.id === iaMsgId);

        prev[index].loading = false;
        prev[index].message = AIResponse;

        return [...prev];
    });

    // Save current chatLog to localStorage
    localStorage.setItem("chatLog", JSON.stringify(newChatLog));
    setIsLoading(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isLoading]);

  return (
    <form onSubmit={handleSubmit} className="mt-auto w-full p-5">
      <input
        ref={inputRef}
        autoFocus
        className="w-full resize-none ring-primary focus:border-primary focus:border outline-none shadow-lg py-4 px-5 text-lg p-3 border-black border border-1 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:border-gray-300"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        disabled={isLoading}
        placeholder={`${isLoading ? "Väntar på svar .." : "Skriv in prompt här ..."}`}
      />
    </form>
  );
}

export default ChatInput;
