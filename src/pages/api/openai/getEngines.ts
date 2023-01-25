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
  const { request } = req.query;

  const configuration = new Configuration({
    organization: process.env.OPENAPI_ORG_ID,
    apiKey: process.env.OPENAI_API_KEY,
  });

    const openai = new OpenAIApi(configuration);
    const resposne = await openai.listEngines();

    res.status(200).json({ response: resposne.data });
}
