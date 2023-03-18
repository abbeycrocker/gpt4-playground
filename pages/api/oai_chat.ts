import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'

type Chat = {
    text: string,
    isUser: boolean,
    isFour: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    try {
        if (req.method !== 'POST') {
            res.status(405).json({ data: "Method not allowed" })
            return
        }
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        });
        const openai = new OpenAIApi(configuration);

        const prompt: string = req.body.params.prompt as string
        const history: Chat[] = req.body.params.history as Chat[]
        const isFour: boolean = req.body.params.isFour as boolean

        const old_messages = history.map((chat: Chat) => {
            return {role: chat.isUser ? 'user' : 'assistant', content: chat.text}
        })

        const messages = [
            {role: 'system', content: 'You are a helpful assisant'}, 
            ...old_messages, 
            {role: 'user', content: prompt}
        ] as ChatCompletionRequestMessage[]
       
        const response = await openai.createChatCompletion({
            model: isFour ? "gpt4" : "gpt-3.5-turbo",
            messages: messages,
            temperature: 1,
            max_tokens: 2048
        })
        res.status(200).json({ data: response.data })
    }
    catch {
        res.status(500).json({ data: "Error" })
    }
}