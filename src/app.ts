import express, { Request, Response } from "express";
import cors from "cors";
import { OpenAIApi, Configuration } from "openai";
import sendMessage from "./modules/sendMessage";
import { config } from "dotenv";
config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Running",
  });
});

app.post("/whatsapp", async (req, res) => {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.API_KEY,
    })
  );

  const message = req.body.Body;
  const contact = req.body.From;
  const response: any = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
  });

  console.log(message);

  const openaiResponse = await response.data.choices[0].message.content;
  console.log(openaiResponse);
  await sendMessage(
    openaiResponse as string,
    contact,
    res
  );
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
