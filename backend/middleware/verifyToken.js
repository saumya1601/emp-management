import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import UserModel from '../models/User.js';


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, role) => {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];

   if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
   }

   try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await UserModel.findById(decoded.userId);

      if (!user || user.role !== role) {
         return res.status(401).json({ message: "Unauthorized: Invalid user or role" });
      }

      req.user = user;
      return { status: 200 };
   } catch (err) {
      return res.status(403).json({ message: "Forbidden: Could not verify token", error: err.message });
   }
};





const isAdmin = async (req, res, next) => {
   const result = await verifyToken(req, res, 'admin');
   if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
   }
   next();
};

const isUser = async (req, res, next) => {
   const result = await verifyToken(req, res, 'user');
   if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
   }
   next();
};

export { isAdmin, isUser, verifyToken };
