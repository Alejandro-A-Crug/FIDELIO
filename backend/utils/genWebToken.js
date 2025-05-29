import jwt from "jsonwebtoken"
//se genera el token con el JWT_Secret, para que expire en 15 dias, y se guarda en una cookie
const generateTokenSetCookie =(userId, res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })

    res.cookie("jwt", token,{
        maxAge: 15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development",
    })
}

export default generateTokenSetCookie;