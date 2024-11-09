import User from '../models/user.models.js';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    try {
        console.log(req.body)
        const { username, password, portfolios } = req.body;

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken !" })
        }
        if (password.length < 5) {
            return res.status(400).send({ message: "Password must be at least 5 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            portfolios: portfolios || []
        });

        if (newUser) {
            await newUser.save();
            generateTokenAndSetCookie(newUser._id, res);


            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                portfolios: newUser.portfolios,
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "internal server error" })
    }
};


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Buddy you got a username or password wrong! check again or create an account." });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
        });
    } catch (error) {
        console.log("Error in Login controller", error.message);
        res.status(500).json({ error: "internal server error", manage: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal server error!" });
    }
}