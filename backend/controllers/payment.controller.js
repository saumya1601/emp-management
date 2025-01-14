import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import dotenv from 'dotenv';

// Ensure dotenv is called to load environment variables
dotenv.config();

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// Create Order Function
export const createOrder = (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100), // Convert to paise (1 INR = 100 paise)
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"), // Random receipt id
        };

        // Create the order using Razorpay API
        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.error("Error creating order:", error);
                return res.status(500).json({ message: "Something went wrong!" });
            }
            res.status(200).json({ data: order }); // Return order data
            console.log("Order created:", order);
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.error("Error:", error);
    }
};

// Verify Payment Function
export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // Create the string to generate signature
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Generate expected signature using HMAC SHA256
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // Check if the signature matches the one sent by Razorpay
        if (expectedSign === razorpay_signature) {
            // Save the payment details in the database
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
            });

            await payment.save();

            // Send success response to the client
            res.status(200).json({ message: "Payment Successfully Verified" });
        } else {
            // If signature does not match
            res.status(400).json({ message: "Invalid Signature" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.error("Error verifying payment:", error);
    }
};