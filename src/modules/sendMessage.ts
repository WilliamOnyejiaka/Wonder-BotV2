import twilio from "twilio";
import {Response as ExpressResponse} from "express";

async function sendMessage(message: string, contact: string, res: ExpressResponse) {
    const accountSid = "ACf97600c1e08cd2f7abb4038da1f75d3f";
    const authToken = "95dc000e7e2ca0bd314f5b85a3f433ff";
    const client = twilio(accountSid, authToken);

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
}

export default sendMessage;