import User from "../models/User.js";


// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { id } = req.user;
        const { cartItems } = req.body;
        await User.findByIdAndUpdate(id, {cartItems})
        res.json({success: true, message: 'Cart Updated'})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

