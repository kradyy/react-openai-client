import React from 'react'

/**
 * Send messages to OpenAI
 * @param {Array} messages - Array of messages
 * @param {String} activeEngine - The active OpenAI engine
 * @param {Boolean} useHistory - Whether to use the entire chat history or just the last message
 * @returns {Promise} - Promise that resolves to the OpenAI response
 * @example
 **/
const OPENAI_sendMessage = async (messages: Array<any>, activeEngine: string, useHistory: boolean = false) => {
    const userMessages = messages.filter((log) => log.user == 'User')

    const combinedMessages = !useHistory ? userMessages.at(-1).message : userMessages.map((log) => log.message).join('\r\n');
    
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/openai/prompt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: combinedMessages,
            engine: activeEngine
        })
    });

    const json = await req.json();
    return json.response;
}

const OPENAI_getEngines = async () => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/openai/getEngines`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const json = await req.json();
    return json;
}

export { OPENAI_sendMessage, OPENAI_getEngines }