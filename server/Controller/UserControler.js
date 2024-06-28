import crypto from "crypto";
import jwt from "jsonwebtoken"
import { ethers } from 'ethers';
import User from "../Model/UserModel.js";

// register user
export const register = async (req, res) => {
    try { 
        const { name, email } = req.body;
        console.log(email, name)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        // Generate a new Ethereum wallet
        const wallet = ethers.Wallet.createRandom();

        // Get the address and private key of the new wallet
        const blockchainAddress = wallet.address;
        const blockchainPrivateKey = wallet.privateKey;
        console.log(blockchainAddress);

        // Save user data in MongoDB      
        const newUser = new User({ name, email, blockchainAddress });
        await newUser.save();

        res.status(200).json({ message: blockchainPrivateKey });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

// login user 
export async function login(req, res) {
    console.log(req.body);
    const { signedMessage, nonce, address } = req.body;
    const recoveredAddress = ethers.utils.verifyMessage(nonce, signedMessage);
    console.log(recoveredAddress);
    if (recoveredAddress !== address) {
        return res.status(401).json({ error: 'Invalid signature' });
    }
    // Generate the JWT token
    const token = jwt.sign({ address }, process.env.JWT_SECRETKEY, { expiresIn: '10m' });
    console.log(token);

    // Send the JWT token to the frontend
    res.status(200).json({ token });
}

export async function createNonce(req, res) {
    const { address } = req.body;
    console.log(address)
    const stringAddress = address.toString();
    try {
        const addressExists = await User.findOne({ blockchainAddress: stringAddress });
        console.log(addressExists)
        if (!addressExists) {
            return res.status(400).json({ message: 'Please register first' });
        }
        const nonce = crypto.randomBytes(32).toString('hex');
        res.status(200).json({ message: nonce });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
}

export async function handler(req, res) {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.secretKey);
        console.log(decoded);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(currentTime);
        if (decoded.exp < currentTime) {
            res.json({ message: 'Expired' });
        } else {
            res.json({ message: 'Valid' });
        }
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}