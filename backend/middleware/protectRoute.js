import jwt from 'jsonwebtoken';
import User from "../models/user.model.js"
//protegemos las rutas con el jsonWebtoken
const protectRoute = async(req, res, next) => {
    try {
        //se saca el jwt de las cookies 
        const token = req.cookies.jwt;
        //si no hay cookie, no se puede hacer nada 
        if(!token){
            return res.status(401).json({error: "no token provided - Invalid "}) 
        }
        //se verifica 
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error: "no  token provided - Invalid "}) 
        }
// Buscar el usuario en la base de datos sin la contraseña
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({error: "User not found"}) 
        }

        req.user = user

        next(); // Continuar con la siguiente función del middleware


    } catch (error) {
        console.log("Error in protectroute midleware", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export default protectRoute;