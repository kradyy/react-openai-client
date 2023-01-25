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
  const { prompt } = req.body;

  const configuration = new Configuration({
    organization: process.env.OPENAPI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Send a completion request
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 1500,
    temperature: 2,
  });

  res.status(200).json({ response: prompt +  ' - ' + completion.data.choices[0].text });
}
