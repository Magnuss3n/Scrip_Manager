import axios from "axios";
import Cookies from 'js-cookie';


const api = axios.create({
    baseURL: 'http://localhost:2000/api/auth/',
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        // Retrieve the token from cookies
        const token = Cookies.get('jwt'); // Adjust according to your cookie name
        if (token) {
            // If the token exists, set it in the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle error
        return Promise.reject(error);
    }
);

export const getPortfolios = async () => {
    try {
        const response = await api.get('/portfolios')
        return response.data;
    } catch (error) {
        console.log("Error fetching Portfolios:", error);
        throw error;
    }
};

export const getPortfolio = async (portfolioId) => {
    try {
        const response = await api.post(`/portfolio/${portfolioId}`)
        return response.data;
    } catch (error) {
        console.log("error fetching portfolio:", error);
        throw error;
    }
}

export const addPortfolio = async (newPortfolio) => {
    try {
        const response = await api.post('/portfolio', newPortfolio);
        return response.data;
    } catch (error) {
        console.error("Error adding Portfolio:", error);
        throw error.response.data.error;
    }
}


export const updatePortfolio = async (portfolioId, updatedPortfolio) => {
    try {
        const response = await api.put(`/portfolio/${portfolioId}`, updatedPortfolio);
        return response.data;
    } catch (error) {
        console.error("Error updating portfolio:", error);
        throw error.response.data.error;
    }
};

export const deletePortfolio = async (portfolioId) => {
    try {
        const response = await api.delete(`/portfolio/${portfolioId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting portfolio:", error);
        throw error.response.data.error;
    }
}


export const addStock = async (portfolioId, newStock) => {
    try {
        const response = await api.post(`/portfolio/${portfolioId}/stocks`, newStock);
        return response.data;
    } catch (error) {
        throw error.response.data.error || "Error adding stock"
    }
}


export const updateStock = async (portfolioId, stockId, updatedStock) => {
    try {
        const response = await api.put(`/portfolio/${portfolioId}/stocks/${stockId}`, updatedStock);
        return response.data;  // Return the updated stock
    } catch (error) {
        throw error.response.data.error || "Error updating stock";
    }
};


export const deleteStock = async (portfolioId, stockId) => {
    try {
        const response = await api.delete(`/portfolio/${portfolioId}/stocks/${stockId}`);
        return response.data;  // Return a success message
    } catch (error) {
        throw error.response.data.error || "Error deleting stock";
    }
};