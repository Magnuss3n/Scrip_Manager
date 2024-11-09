import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    symbol: String,
    quantity: Number,
    purchasePrice: Number,
    currentPrice: Number,
});

const portfolioSchema = new mongoose.Schema({
    name: String,
    stocks: [stockSchema],
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    portfolios: [portfolioSchema],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
