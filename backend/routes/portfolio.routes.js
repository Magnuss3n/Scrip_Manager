import express from "express";
import authentication from "../middleware/authentication.js";
import { addPortfolio, deletePortfolio, getPortfolios, getPortfolio, updatePortfolio, addStock, updateStock, deleteStock } from "../controllers/PortfolioHandlers.js";



const router = express.Router();

router.post("/portfolio", authentication, addPortfolio)
router.get("/portfolios", authentication, getPortfolios)
router.get("/portfolio/:portfolioId", authentication, getPortfolio)
router.put("/portfolio/:portfolioId", authentication, updatePortfolio)
router.delete("/portfolio/:portfolioId", authentication, deletePortfolio)

router.post("/portfolio/:portfolioId/stocks", authentication, addStock)
router.put("/portfolio/:portfolioId/stocks/:stockId", authentication, updateStock)
router.delete("/portfolio/:portfolioId/stocks/:stockId", authentication, deleteStock)

export default router;
