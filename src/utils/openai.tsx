import React from 'react'

/**
 * Send Message to OpenAI
 * @param {string} Message - Array of Message
 * @returns {Promise} - Promise that resolves to the OpenAI response
 * @example
 **/
const OPENAI_sendMessage = async (Message: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/openai`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: Message
        })
    });

    const json = await req.json();
    return json.response;
}

export { OPENAI_sendMessage }