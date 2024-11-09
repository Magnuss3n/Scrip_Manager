import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import '../css/AddScrip.css'
import "../css/Watchlist.css"
import "../css/home.css"
import LogoutButton from "../components/LogoutButton.jsx"
import { getPortfolios, addPortfolio, updatePortfolio, deletePortfolio, addStock, updateStock, deleteStock } from "../hooks/frontcrud.js";
import { calculateCurrentValue, calculateInvestedAmount, getProfitLossClass } from "../utils/functions.js";

function Home() {
    const [formData, setFormData] = useState({
        name: "",
        symbol: "",
        quantity: "",
        purchasePrice: "",
        currentPrice: "",
    });
    const [portfolios, setPortfolios] = useState([]);
    const [portfolioId, setPortfolioId] = useState(null);
    const [stockId, setStockId] = useState(null);
    const [actionType, setActionType] = useState('addPortfolio');
    const [showProfit, setShowProfit] = useState(false);
    const [showLoss, setShowLoss] = useState(false);

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const fetchedPortfolios = await getPortfolios();
            setPortfolios(fetchedPortfolios);
        } catch (error) {
            console.error("Error fetching portfolios:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const resetForm = () => {
        setFormData({ name: '', symbol: '', quantity: '', purchasePrice: '', currentPrice: '' });
        setPortfolioId(null);
        setStockId(null);
        setActionType('addPortfolio');
    };

    const handlePortfolioSubmit = async (e) => {
        e.preventDefault()
        try {
            const portfolioData = {
                name: formData.name,
                stocks: {
                    symbol: formData.symbol || '',
                    quantity: formData.quantity || 0,
                    purchasePrice: formData.purchasePrice || 0,
                    currentPrice: formData.currentPrice || 0
                }
            };
            if (actionType === 'addPortfolio') {
                await addPortfolio(portfolioData);
            } else if (actionType === 'editPortfolio') {
                await updatePortfolio(portfolioId, portfolioData);
            }
            fetchPortfolios();
            resetForm();
        } catch (error) {
            console.error(`Error ${actionType === 'addPortfolio' ? 'adding' : 'editing'} portfolio:`, error)
        }
    }

    const handleStockSubmit = async (e) => {
        e.preventDefault()
        try {
            const stockData = {
                symbol: formData.symbol,
                quantity: formData.quantity,
                purchasePrice: formData.purchasePrice,
                currentPrice: formData.currentPrice
            }

            if (actionType === 'addStock') {
                await addStock(portfolioId, stockData);
            } else if (actionType === 'editStock') {
                await updateStock(portfolioId, stockId, stockData);
            }
            fetchPortfolios()
            resetForm()
        } catch (error) {
            console.error(`Error ${actionType === 'addstock' ? 'adding' : 'editing'}stock: `, error);
        }
    };

    const onEditPortfolio = (id) => {
        const portfolio = portfolios.find((p) => p._id === id);
        const firstStock = portfolio.stocks[0] || { symbol: '', quantity: '', purchasePrice: '', currentPrice: '' };
        setFormData({
            name: portfolio.name,
            symbol: firstStock.symbol,
            quantity: firstStock.quantity,
            purchasePrice: firstStock.purchasePrice,
            currentPrice: firstStock.currentPrice
        });
        setPortfolioId(id);
        setActionType('editPortfolio');
    };


    const onEditStock = (portfolioId, stock) => {
        setFormData({
            name: "",
            symbol: stock.symbol,
            quantity: stock.quantity,
            purchasePrice: stock.purchasePrice,
            currentPrice: stock.currentPrice
        });
        setPortfolioId(portfolioId)
        setStockId(stock._id);
        setActionType('editStock');
    };

    const handleAddStockClick = (portfolioId) => {
        resetForm();
        setPortfolioId(portfolioId);
        setActionType('addStock');
    };

    const onDeletePortfolio = async (id) => {
        try {
            await deletePortfolio(id);
            fetchPortfolios();
        } catch (error) {
            console.error('Error deleting portfolio:', error)
        }
    }
    const onDeleteStock = async (portfolioId, stockId) => {
        try {
            await deleteStock(portfolioId, stockId);
            fetchPortfolios();
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    const handleShowProfit = () => {
        setShowProfit(true);
        setShowLoss(false);
    };

    const handleShowLoss = () => {
        setShowProfit(false);
        setShowLoss(true);
    };



    return (

        <div className="Home">
            <div className='card text-white'>
                <LogoutButton />
                <div className='card-overlay'></div>
                <div className='card-inner'>
                    <h2 className='sub-title'>
                        Add Portfolio
                    </h2>

                    <div className="container">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                        />
                        <label htmlFor="name" className="label">Name</label>
                    </div>
                    <div className='container'>
                        <input type='text' id='symbol' placeholder="symbol" name="symbol"
                            value={formData.symbol}
                            onChange={handleChange} className='input' />
                        <label htmlFor='symbol' className='label'>Symbol</label>
                    </div>
                    <div className='container'>
                        <input type='number' id='quantity' placeholder="Quantity" name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className='input' />
                        <label htmlFor='quantity' className='label'>Quantity </label>
                    </div>
                    <div className='container'>
                        <input type='number' id='purchasePrice' placeholder="Purchase Price" name="purchasePrice"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            className='input' />
                        <label htmlFor='purchasePrice' className='label'>Purchase Price </label>
                    </div>
                    <div className='container'>
                        <input type='number' id='currentPrice' placeholder="Current Price" name="currentPrice"
                            value={formData.currentPrice}
                            onChange={handleChange}
                            className='input' />
                        <label htmlFor='currentPrice' className='label'>Current Price </label>
                    </div>

                    <button className='btn' onClick={actionType.includes('Portfolio') ? handlePortfolioSubmit : handleStockSubmit}>
                        {actionType === 'addPortfolio'
                            ? 'Add Portfolio'
                            : actionType === 'editPortfolio'
                                ? 'Edit Portfolio'
                                : actionType === 'addStock'
                                    ? 'Add Stock'
                                    : 'Edit Stock'}
                        <IoIosAddCircleOutline />
                    </button>

                    <button className="cancel" onClick={resetForm}>
                        <span className="button_top"> Cancel </span>
                    </button>
                </div>
            </div>
            <div className='parent-container'>
                <div className='filter-buttons'>
                    <button onClick={handleShowProfit} className='delete-button'>Show Profit</button>
                    <button onClick={handleShowLoss} className='delete-button'>Show Loss</button>
                    <button onClick={() => {
                        setShowProfit(false);
                        setShowLoss(false);
                    }} className='delete-button'>Show All</button>
                </div>

                {portfolios.length === 0 ? (
                    <p>No portfolios available.</p>
                ) : (
                    portfolios.map((portfolio) =>
                        ((showProfit && getProfitLossClass(portfolio) === "profit") ||
                            (showLoss && getProfitLossClass(portfolio) === "loss") ||
                            (!showProfit && !showLoss)) && (
                            <div key={portfolio._id} className='portfolio-rows'>
                                <h3 className='portfolio-name'>{portfolio.name}</h3>
                                <div className="update-info">
                                    <button className='delete-button small-button' onClick={() => onEditPortfolio(portfolio._id)}><MdEdit size={20} /></button>
                                    <button className='delete-button small-button' onClick={() => onDeletePortfolio(portfolio._id)}><MdDelete size={30} /></button>
                                    <button className='delete-button small-button' onClick={() => handleAddStockClick(portfolio._id)}><MdAddBox size={30} /> </button>
                                </div>
                                <table className='stock-table'>
                                    <thead className='description'>
                                        <tr>
                                            <th>Symbol</th>
                                            <th>Quantity</th>
                                            <th>Purchase Price</th>
                                            <th>Current Price</th>
                                            <th>Total Profit/Loss %</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {portfolio.stocks && portfolio.stocks.length > 0 ? (
                                            portfolio.stocks.map((stock) => (
                                                <tr key={stock._id}>  {/* Ensure 'stock' is in the map's scope */}
                                                    <td>{stock.symbol}</td>
                                                    <td>{stock.quantity}</td>
                                                    <td>{stock.purchasePrice}</td>
                                                    <td>{stock.currentPrice}</td>
                                                    <td>
                                                        {((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice * 100).toFixed(2)}%
                                                    </td>
                                                    <td>
                                                        <div className='update-info'>
                                                            <button
                                                                className='delete-button small-button'
                                                                onClick={() => onEditStock(portfolio._id, stock)}
                                                            >
                                                                <CiEdit />
                                                            </button>
                                                            <button
                                                                className='delete-button small-button'
                                                                onClick={() => onDeleteStock(portfolio._id, stock._id)}
                                                            >
                                                                <FaDeleteLeft />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6">No stocks in this portfolio.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div>
                                    <strong>CURRENT VALUE</strong>: ₹
                                    {calculateCurrentValue(portfolio).toFixed(2)}
                                    <br />
                                    <strong>INVESTED VALUE</strong>: ₹
                                    {calculateInvestedAmount(portfolio).toFixed(2)}
                                </div>

                            </div>
                        ))
                )}
            </div>

        </div>
    )
}

export default Home;


