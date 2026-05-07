import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await User.find();
        res.status(200).json({
            data: employees
        })
    } catch (error) {
        console.error("Lỗi getAllEmployees:", error)

    }
}

// 📌 ĐĂNG KÝ NGƯỜI DÙNG
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // chesk user email 
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({
                message: 'Email đã tồn tại'
            })
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            name, email, password: hashedPassword
        })
        res.status(201).json({
            message: 'Đăng ký thành công',
            data: user
        });
    } catch (error) {
        console.error("Lỗi khi goi register:", error)
        res.status(500).json({
            message: 'Lỗi server'
        })
    }
}
// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: 'sai email '
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'sai password'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'

        })
        res.status(200).json({
            message: 'Đăng nhập thành công',
            token,
            user,
        })
    } catch (error) {
        console.error("Lỗi khi goi login:", error)
        res.status(500).json({
            message: error.message
        })
    }
}