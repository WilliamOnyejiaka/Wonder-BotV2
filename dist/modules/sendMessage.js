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
const twilio_1 = __importDefault(require("twilio"));
function sendMessage(message, contact, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountSid = "ACf97600c1e08cd2f7abb4038da1f75d3f";
        const authToken = "95dc000e7e2ca0bd314f5b85a3f433ff";
        const client = (0, twilio_1.default)(accountSid, authToken);
        client.messages
            .create({
            from: "whatsapp:+14155238886",
            to: contact,
            body: message,
        })
            .then((message) => {
            console.log(message.sid);
            res.send("WhatsApp message sent!");
        })
            .catch((error) => {
            console.error(error);
            res.send("Error sending WhatsApp message.");
        });
    });
}
exports.default = sendMessage;
