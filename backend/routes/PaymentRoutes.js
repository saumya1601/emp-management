import express from 'express';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';


const PaymentRoutes = express.Router();

PaymentRoutes.post('/order', createOrder);


PaymentRoutes.post('/verify', verifyPayment);

export default PaymentRoutes;
