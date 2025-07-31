import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.json({success: false, message: "Not Authorized"})
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if (tokenDecode.id) {
            // req.body.userId = tokenDecode.id;
            req.user = { id: tokenDecode.id };

        }else{
            return res.json({success: false, message: "Not Authorized"})
        }
        next()
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export default authUser

// import jwt from "jsonwebtoken";

// const authUser = (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return res.status(401).json({ success: false, message: "Not Authorized" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded?.id) {
//             req.user = { id: decoded.id };  // ✅ use req.user, not req.body
//             next();
//         } else {
//             return res.status(401).json({ success: false, message: "Invalid token" });
//         }
//     } catch (error) {
//         return res.status(401).json({ success: false, message: error.message });
//     }
// };

// export default authUser;

