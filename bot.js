const axios = require("axios");
const calculateIndicators = require("./indicators");
const getSignal = require("./strategy");
const sendSignal = require("./telegram");

const symbol = "BTCUSDT";   // trading pair

async function getMarketData() {

    const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=100`;

    const response = await axios.get(url);

    // closing prices
    const closes = response.data.map(candle => parseFloat(candle[4]));

    return closes;
}

async function runBot() {

    try {

        const closes = await getMarketData();

        const price = closes[closes.length - 1];

        const indicators = calculateIndicators(closes);

        const signal = getSignal(indicators, price);

        const message = `
🚨 Crypto Signal

Pair: ${symbol}
Price: ${price}

RSI: ${indicators.rsi.toFixed(2)}

Signal: ${signal}
`;

        console.log(message);

        if (signal !== "HOLD") {
            sendSignal(message);
        }

    } catch (error) {

        console.error("Bot error:", error.message);

    }
}

// run every 5 minutes
setInterval(runBot, 300000);

// run immediately when starting
runBot();
