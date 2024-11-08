Tech Stack
Frontend
React with Hooks: Efficient state and effect management using useState and useEffect for a seamless UI experience.
Backend
Express.js: Manages server-side logic and API requests.
JWT Authentication: Ensures secure access with token-based authentication.
MongoDB with Mongoose: Stores user, portfolio, and stock data, optimized for real-time queries and updates.
Additional Libraries
Axios: For handling HTTP requests between frontend and backend.
Concurrently: To run frontend and backend servers in development.

API Endpoints
User Authentication
POST /api/auth/signup - Sign up a new user.
POST /api/auth/login - Log in an existing user.
Portfolio Management
GET /api/portfolios - Fetch all portfolios for a user.
POST /api/portfolios - Add a new portfolio.
PUT /api/portfolios/:id - Edit an existing portfolio.
DELETE /api/portfolios/:id - Delete a portfolio.
Stock Management
POST /api/portfolios/:id/stocks - Add a new stock to a portfolio.
PUT /api/portfolios/:portfolioId/stocks/:stockId - Edit an existing stock.
DELETE /api/portfolios/:portfolioId/stocks/:stockId - Delete a stock.
