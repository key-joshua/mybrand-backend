import jwt from 'jsonwebtoken';
import config from '../config/config';

const SECRET_KEY = config.SECRET_KEY;

exports.authUser = (req, res, next) => {
    const authorization = req.header('auth-token');
    
    if (!authorization) return res.status(401).json({ error: 'Access denied.' });
    
    try {
        const decodePassword = jwt.verify(authorization, SECRET_KEY);
        req.user = decodePassword;
        
        // console.log(decodePassword);
        
        return next();
    }
    catch (error) {
        return res.status(403).json({ error: 'Invalid Token' });
    };
};


exports.authAdmin = (req, res, next) => {
    const { admin } = req.user;
    // console.log(admin);
    
    if (!admin) return res.status(401).json('Puuuh toka');
    
    return next();
};