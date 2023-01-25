import React, { useEffect, useState } from 'react'
import { TrashIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image'
import { OPENAI_getEngines } from '@/utils/openai';

interface Props {
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<Boolean>>
    isSidebarOpen: Boolean,
    chatLogState: Array<any>,
    activeEngineState: Array<any>
}

// Text value for each engine is in swedish
const engines = [
  {
    id: 'text-davinci-001',
    text: 'Texter (davinci-001)'
  },
  {
    id: 'text-davinci-003',
    text: 'Texter (davinci-003)'
  },
  {
    id: 'code-davinci-003',
    text: 'Kod (davinci-003)'
  },
  {
    id: 'code-cushman-001',
    text: 'Kod (cushman-001)',
  }
]

   
function Sidebar({setIsSideBarOpen, isSidebarOpen, chatLogState, activeEngineState}: Props) {
  const [chatLog, setChatLog] = chatLogState;
  const [activeEngine, setActiveEngine] = activeEngineState;
  const [enginesList, setAllEnginesList] = useState<any>([]);

  useEffect(() => {
    const fetchEngines = async () => {
      //const { response: { data } } = await OPENAI_getEngines();
      setActiveEngine(engines[0].id);
      setAllEnginesList(engines || []);
    }
    fetchEngines();
  }, [])

  const clearChat = () => {
    localStorage.removeItem('chatLogs');
    setChatLog('')
  }

  return (
         <div className="flex flex-col h-full">
            <div className="h-full">

            {isSidebarOpen ? (
                <button className="flex flex-row items-center bg-white/10 hover:bg-white/10 duration-500 text-left text-uppercase w-full uppercase font-bold text-xs text-white p-3" onClick={() => setIsSideBarOpen(prev => !prev)}>
                  <ArrowLeftCircleIcon className="text-white w-6 mr-3" /> Göm</button>
            ) : (     
                 <button className="flex bg-white flex-row w-full transition-all duration-500 hover:text-black/80 items-center marker:duration-500 text-left text-uppercase uppercase font-bold text-xs text-black p-3 absolute top-0 left-0" onClick={() => setIsSideBarOpen(prev => !prev)}>
                 <ArrowRightCircleIcon className="text-primary w-6 mr-3" /> Visa</button>
            )}

            {enginesList && 
            <div className="my-2">
            <label className="text-white text-xs font-light p-3">AI Modell</label>
              <select onChange={(e) => setActiveEngine(e.target.value)} className="bg-transparent text-white text-xs font-bold p-3 rounded-md w-full mt-3 w-[80%]">
                {enginesList.map((engine, index) => (
                  <option key={index} value={engine.id}>{engine.text}</option>
                ))}
              </select>
              </div>
          }
                          
          <hr className="border-white/10 py-2" />

          <div className="my-2">
          <label className="text-white text-xs font-light p-3">Chatt</label>

          <button className="flex flex-row items-center hover:bg-white/10 duration-500 text-left text-uppercase w-full uppercase font-bold text-xs text-white p-3" onClick={clearChat}>
            <TrashIcon className="text-white w-6 mr-3" /> Rensa</button>
          </div>
          <hr className="border-white/10 py-2" />

          </div>

   
          <Image src="/logo.webp" className="mt-auto mx-auto w-12 pb-10" alt="OpenAI Logo" width={200} height={200} />
        </div>
  )
}

export default Sidebar