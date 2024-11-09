import User from '../models/user.models.js';

// Adding a Portfolio i.e. new name and stock info with it.
export const addPortfolio = async (req, res) => {
    try {
        const { name, stocks } = req.body;
        const portfolio = {
            name,
            stocks,
        };
        req.user.portfolios.push(portfolio);
        await req.user.save();
        res.status(201).json(req.user.portfolios);
        console.log("Incoming request body:", req.body);

    } catch (error) {
        console.error("Error creating portfolio:", error);
        res.status(400).json({ error: error.message });
    }
};


// Getting all portfolios for a user
export const getPortfolios = async (req, res) => {
    try {
        const portfolios = req.user.portfolios || [];
        res.status(200).json(portfolios);
    } catch (error) {
        console.error("Error fetching portfolios:", error);
        res.status(404).json({ error: error.message });
    }
};

// Getting a specific portfolio for a user with it's portfolio id stored under the name and stocks data
//in MongoDB

export const getPortfolio = async (req, res) => {
    try {
        const portfolioId = req.params.portfolioId;
        const portfolio = req.user.portfolios.find(p => p._id.toString() === portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found, have u even created a portfolio!" })
        }
        res.status(200).json(portfolio);
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// Updating a portfolio as in whole with it's ID
export const updatePortfolio = async (req, res) => {
    try {
        const { name, stocks } = req.body;

        const portfolio = req.user.portfolios.id(req.params.portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found" });
        }

        portfolio.name = name || portfolio.name;
        portfolio.stocks = stocks || portfolio.stocks;

        await req.user.save();
        res.status(200).json(portfolio)
    } catch (error) {
        console.error("Error updating portfolio:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


// Deleting the portfolio from the array of portfolios containing all substocks in it one time all deletion.
export const deletePortfolio = async (req, res) => {
    try {
        const portfolio = req.user.portfolios.id(req.params.portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: "Could not find portfolio" })
        }

        req.user.portfolios.pull(req.params.portfolioId);
        await req.user.save()
        res.status(200).json({ message: "Porttfolio deleted successfully!" })
    } catch (error) {
        console.error("Error deleting portfolio:", error);
        res.status(500).json({ error: "Internal server error" })
    }
}

// adding the stock within a portfolio just by portfolio ID
export const addStock = async (req, res) => {
    try {
        const { symbol, quantity, purchasePrice, currentPrice } = req.body;
        const portfolio = req.user.portfolios.id(req.params.portfolioId);

        if (!portfolio) {
            res.status(404).json({ error: "Could not find portfolio" });
        };

        const newStock = { symbol, quantity, purchasePrice, currentPrice }
        portfolio.stocks.push(newStock);

        await req.user.save();
        res.status(201).json(portfolio.stocks);
    } catch (error) {
        console.error("Error adding stock!", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// updating a stock with portfolio and stock ID changing it's fields.
export const updateStock = async (req, res) => {
    try {
        const { symbol, quantity, purchasePrice, currentPrice } = req.body;

        const portfolio = req.user.portfolios.id(req.params.portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found!" });
        }
        const stock = portfolio.stocks.id(req.params.stockId)
        if (!stock) {
            return res.status(404).json({ error: "Stock not found!" })
        }

        stock.symbol = symbol || stock.symbol;
        stock.quantity = quantity || stock.quantity;
        stock.purchasePrice = purchasePrice || stock.purchasePrice;
        stock.currentPrice = currentPrice || stock.currentPrice;

        await req.user.save();
        res.status(200).json(stock);
    } catch (error) {
        console.error("Error updating stock:", error)
        res.status(500).json({ error: "Internal server error" })
    }
};

// Deleting a stock within a portfolio a specific stock with it's stock id.
export const deleteStock = async (req, res) => {
    try {
        const portfolio = req.user.portfolios.id(req.params.portfolioId);
        if (!portfolio) {
            return res.status(404).json({ error: "Portfolio not found!" });
        }

        const stock = portfolio.stocks.id(req.params.stockId);
        if (!stock) {
            return res.status(404).json({ error: "Stock not found" })
        }

        portfolio.stocks.pull(req.params.stockId);
        await req.user.save();
        res.status(200).json({ message: "Stock deleted successfully" });
    } catch (error) {
        console.error("Error deleting stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}