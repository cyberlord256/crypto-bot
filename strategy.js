function getSignal(indicators, price) {
    let signal = "HOLD"; // default signal

    const rsi = indicators.rsi;
    const macd = indicators.macd; // { MACD, signal, histogram }
    const ema = indicators.ema;

    // Basic strategy example:

    // 1️⃣ Buy condition:
    // RSI is low (oversold), MACD is rising, price above EMA
    if (rsi < 35 && macd.MACD > macd.signal && price > ema) {
        signal = "BUY";
    }

    // 2️⃣ Sell condition:
    // RSI is high (overbought), MACD is falling, price below EMA
    if (rsi > 70 && macd.MACD < macd.signal && price < ema) {
        signal = "SELL";
    }

    return signal;
}

module.exports = getSignal;
