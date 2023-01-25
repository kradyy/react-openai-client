import React, { useEffect } from 'react'
import Image from 'next/image'
import { ThreeDots } from 'react-loader-spinner'

interface Props {
  chatLogState: Array<any>
}

function ChatLog({chatLogState}: Props) {
  const [chatLog, setChatLog] = chatLogState;

  return (
    <div className="flex flex-col">
            {chatLog.length > 0 ? chatLog.map((chat, index) => (
                chat.user === 'User' ? (
                    <div key={index} className="userMessage flex flex-col h-full">
                        <div className="flex flex-row bg-gray-300/10 px-5 py-3 items-center justify-start">
                            <Image src="/no-avatar.png" className="w-8 h-8 object-center" alt="OpenAI" width={200} height={200} />
                            <p className=" text-black p-4 w-full"> {chat.message} </p>
                        </div>
                        {/* <div className="flex flex-row justify-end">
                            <p className="text-gray-200 text-xs p-2 text-right">User - 12:00</p>
                        </div> */}
                    </div>
                ) : (
                  <div key={index} className="botMessage whitespace-pre-wrap flex flex-col h-full animate-fadeIn">
                    <div className="flex flex-row px-5 py-3 justify-start items-center">
                        <Image src="/openai.svg" className="w-8 h-8 object-center" alt="OpenAI" width={200} height={200} />
                          <div className="text-black p-4 w-full">
                            {!chat?.loading && <strong>AI </strong>}

                            {chat?.loading ? (
                                <ThreeDots 
                                  height="30" 
                                  width="40" 
                                  radius="9"
                                  color="#00bfa5" 
                                  ariaLabel="three-dots-loading"
                                  wrapperStyle={{}}
                                  visible={true}
                              />
                            ) : 
                              ` ${chat.message}`
                            }
                         </div>
                    </div>
                    {/* <div className="flex flex-row justify-end">
                            <p className="text-gray-200 text-xs p-2 ">User - 12:00</p>
                    </div> */}
                </div>
                )
            )) : (
                <div className="flex text-2xl font-light mt-10 text-center text-gray-500 flex-col h-full">
                    Inga meddelanden, börja skriva nedanför!
                </div>
            )}
     </div> 
  )
}

export default ChatLog