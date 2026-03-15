const TelegramBot = require("node-telegram-bot-api");

// Use environment variables for security
const token = process.env.TELEGRAM_TOKEN;   // Your BotFather token
const chatId = process.env.CHAT_ID;         // Your Telegram chat ID

const bot = new TelegramBot(token);

// Function to send message
function sendSignal(message) {
    bot.sendMessage(chatId, message)
       .then(() => console.log("Telegram message sent!"))
       .catch(err => console.error("Telegram error:", err));
}

module.exports = sendSignal;
