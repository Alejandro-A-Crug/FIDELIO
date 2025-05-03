import User from "../models/user.model.js";

export const getusersSidebar =  async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        return res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("error in getUsersSidebar controller", error.message);
        res.status(500).json({error: "internal server error"});
    }
}