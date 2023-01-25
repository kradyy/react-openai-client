import React from 'react'
import { TrashIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image'

interface Props {
    setIsSideBarOpen: React.Dispatch<React.SetStateAction<Boolean>>
    isSidebarOpen: Boolean
  }
  
function Sidebar({setIsSideBarOpen, isSidebarOpen}: Props) {
  return (
         <div className="flex flex-col h-full">
            <div className="h-full">
            {isSidebarOpen ? (
                <button className="flex flex-row items-center hover:bg-white/10 duration-500 text-left text-uppercase w-full uppercase font-bold text-xs text-white p-3" onClick={() => setIsSideBarOpen(prev => !prev)}>
                  <ArrowLeftCircleIcon className="text-white w-6 mr-3" /> Göm</button>
            ) : (     
                 <button className="flex bg-white flex-row w-full transition-all duration-500 hover:text-black/80 items-center marker:duration-500 text-left text-uppercase uppercase font-bold text-xs text-black p-3 absolute top-0 left-0" onClick={() => setIsSideBarOpen(prev => !prev)}>
                 <ArrowRightCircleIcon className="text-primary w-6 mr-3" /> Visa</button>
            )}
          </div>

          <Image src="/logo.webp" className="mt-auto mx-auto w-12 pb-10" alt="OpenAI Logo" width={200} height={200} />
        </div>
  )
}

export default Sidebar