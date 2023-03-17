import { Configuration, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'

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
       
        const response = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{role: 'user', content: req.body.params.prompt}],
            temperature: 1,
            max_tokens: 2048
        })
        res.status(200).json({ data: response.data })
    }
    catch {
        res.status(500).json({ data: "Error" })
    }
}