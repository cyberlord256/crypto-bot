const { RSI, MACD, EMA } = require("technicalindicators");

// Function to calculate indicators based on closing prices
function calculateIndicators(closes) {

    // Calculate RSI (14-period)
    const rsi = RSI.calculate({
        values: closes,
        period: 14
    });

    // Calculate MACD (12, 26, 9)
    const macd = MACD.calculate({
        values: closes,
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
        SimpleMAOscillator: false,
        SimpleMASignal: false
    });

    // Calculate EMA (50-period)
    const ema = EMA.calculate({
        values: closes,
        period: 50
    });

    // Return the latest value of each indicator
    return {
        rsi: rsi[rsi.length - 1],          // last RSI
        macd: macd[macd.length - 1],       // last MACD object: {MACD, signal, histogram}
        ema: ema[ema.length - 1]           // last EMA
    };
}

module.exports = calculateIndicators;
