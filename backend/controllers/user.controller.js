import User from "../models/user.model.js";
//esto es para los usuarios en la sidebar
export const getusersSidebar =  async (req, res) => {
    try {
        //se obtiene el id del usuario que esta, y se filtran todos los usuarios menos el tuyo
        const loggedInUserId = req.user._id;
        //se selecciona todo menos la contraseña
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");
        //se devuelven los usuarios filtrados
        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("error in getUsersSidebar controller", error.message);
        res.status(500).json({error: "internal server error"});
    }
}