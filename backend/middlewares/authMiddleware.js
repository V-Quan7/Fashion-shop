import jwt from 'jsonwebtoken';
export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'Không có token, truy cập bị từ chối'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Lỗi authMiddleware:", error)
        res.status(401).json({
            message: 'Token không hợp lệ'
        })
    } 
}