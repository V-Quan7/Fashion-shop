import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRoutes from './routers/productRoutes.js';
import categoryRoutes from './routers/categoryRoutes.js'
import SubCategoryRoutes from './routers/subCategoryRoutes.js'

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test API
app.get('/', (req, res) => {
    res.send('backend is running successfully');
});

// connect MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB error:", error.message);
        process.exit(1);
    }
};

// 👉 GỌI CONNECT DB
connectDB();

// routes
app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes)
app.use("/api/subcategory", SubCategoryRoutes)
// port
const PORT = process.env.PORT || 5001;
// start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});