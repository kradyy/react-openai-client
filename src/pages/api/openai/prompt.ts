// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  response: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    const configuration = new Configuration({
      organization: process.env.OPENAPI_ORG_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const { prompt, engine } = req.body;

    const completion = await openai.createCompletion({
      model: engine,
      prompt: prompt,
      max_tokens: 100,
      temperature: 0
    });

    res.status(200).json({ response: completion.data.choices[0].text });
  }
