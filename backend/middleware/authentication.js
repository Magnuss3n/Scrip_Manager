import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';


const authentication = async (req, res, next) => {
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorised - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorised - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        console.log("Token:", token);           // Check if the token is being received
        console.log("Decoded:", decoded);       // Check if the token is properly decoded
        console.log("User:", user);             // Check if the user is found


        req.user = user;
        next();
    } catch (error) {
        console.log("Error in Authentication middleware: ", error.message);
        res.status(500).json({ error: "Inernal server error" });
    }
}

export default authentication;