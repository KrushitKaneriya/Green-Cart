import jwt from "jsonwebtoken";

// Login Seller: /api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

    if (password === process.env.SELLER_PASSWORD && process.env.SELLER_EMAIL) {
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn:'7d'});

        res.cookie('sellerToken', token, {
            httpOnly: true, // Prevent JavaScript to access cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie Expiration Time
        });

        return res.json({success: true, message: 'Logged In'});
    }else{
        return res.json({success: false, message: 'Invalid Credentials'});
    }
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}



// Seller isAuth: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({success: true})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Logout Seller: /api/seller/logout
export const sellerlogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({success: true, message: 'Logged Out'})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}