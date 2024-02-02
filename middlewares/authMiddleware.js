import JWT from 'jsonwebtoken';
import multer from 'multer';

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
}

// Multer middleware for handling file uploads
export const upload = multer({ dest: 'uploads/' });