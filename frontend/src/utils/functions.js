export const calculateCurrentValue = (portfolio) => {
    let currentValue = 0;
    for (const stock of portfolio.stocks) {
        currentValue += stock.quantity * stock.currentPrice;
    }
    return currentValue;
}

export const calculateInvestedAmount = (portfolio) => {
    let investedAmount = 0;
    for (const stock of portfolio.stocks) {
        investedAmount += stock.quantity * stock.purchasePrice;
    }
    return investedAmount;
}

export const calculateProfitLossPercentage = (portfolio) => {
    const currentValue = calculateCurrentValue(portfolio);
    const investedAmount = calculateInvestedAmount(portfolio);
    const profitLoss = currentValue - investedAmount;
    return ((profitLoss / investedAmount) * 100).toFixed(2);
}

export const getProfitLossClass = (portfolio) => {
    const currentValue = calculateCurrentValue(portfolio);
    const investedAmount = calculateInvestedAmount(portfolio);
    const profitLoss = currentValue - investedAmount;
    return profitLoss >= 0 ? "profit" : "loss";
}