import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenSetCookie from "../utils/genWebToken.js";
//proceso para el registro
export const signup = async (req,res) =>{
    try {
        //se saca todo de la request 
        const {fullName, username, password, confirmPassword, gender}= req.body;

        //validacion interna de contraseñas
        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"})
        }
        //busqueda de un usuario con un mismo nombre para decirle que no es posible
        const user = await User.findOne({username})

        if(user){
            return res.status(400).json({error: "Someone like that already exists"})
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //avatar
        // depende del genero = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`;
        //variable creada con el link a una api y el nombre de usuarios
     let pfp;

            if(gender === "Male"){
                pfp = `https://avatar.iran.liara.run/public/boy?username=${username}`;
            } else if(gender === "Female"){
                pfp = `https://avatar.iran.liara.run/public/girl?username=${username}`;
            } else {
                pfp = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}`;
            }
//se saca del modelo la creacion del nuevo usuario 
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            profilePic: pfp,
            gender,
        })
//si hay uno nuevo, se guarda en la base de datos y se crea una cookie con un token, enviandose la respuesta
        if(newUser){
        await newUser.save();
        generateTokenSetCookie(newUser._id, res);
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic:newUser.profilePic,
            gender:newUser.gender,
        })
        } else {
            return res.status(400).json({error: "Invalid user data"})
        }
    } catch (error) {
        //se notifica el error en el controlador
        console.log("error in signup controller", error.message);
        res.status(500).json({error: "internal server error"});
    }
}
// inicio de sesión 
export const login = async(req,res) =>{
    try {
        //se saca todo de la request 
        const {username, password} = req.body;
        const user= await User.findOne({username});
        //no se puede desencriptar con bcrypt pero se puede comparar con el mismo codigo de encriptación lo que introduce el usuario
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        //si no hay un usuario y la contraseña no es correcta se tira un error
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid credentials"});
        }
        //se genera la cookie con la respuesta y el id
        generateTokenSetCookie(user._id, res);
        //esta es la respuesta 
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch (error) {
        //se notifica del error y se dice cual es 
        console.log("error in login controller", error.message);
        res.status(500).json({error: "internal server error"}); 
    }
}

export const logout = (req,res) =>{
    //se borra la cookie poniendo la fecha de agotamiento ahora
    try {
        res.cookie("jwt", "", {maxAge : 0});
        res.status(200).json({message: "Logged out succesfully!"}); 
    } catch (error) {
        console.log("error in logout controller", error.message);
        res.status(500).json({error: "internal server error"}); 
    }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id; // Viene del middleware de autenticación
    //se encuentra y se borra el usuario por el userId del cuerpo, que es el id de la request
    const deletedUser = await User.findByIdAndDelete(userId);
    //si no hay usuario, no se borra
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Limpiar cookie
    res.cookie("jwt", "", { maxAge: 0 });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in deleteUser controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
