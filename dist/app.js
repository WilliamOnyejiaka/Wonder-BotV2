"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const openai_1 = require("openai");
const sendMessage_1 = __importDefault(require("./modules/sendMessage"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Running",
    });
});
app.post("/whatsapp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const openai = new openai_1.OpenAIApi(new openai_1.Configuration({
        apiKey: process.env.API_KEY,
    }));
    const message = req.body.Body;
    const contact = req.body.From;
    const response = yield openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
    });
    console.log(message);
    const openaiResponse = yield response.data.choices[0].message.content;
    console.log(openaiResponse);
    yield (0, sendMessage_1.default)(openaiResponse, contact, res);
}));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
