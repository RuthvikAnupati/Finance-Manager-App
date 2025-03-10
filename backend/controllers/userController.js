import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";

// ✅ REGISTER CONTROLLER
export const registerControllers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("📌 Register Request:", req.body); // Debugging Log

    // ✅ Validate Input
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // ✅ Check if User Already Exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Create User
    let newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { name: newUser.name, email: newUser.email, _id: newUser._id },
    });

  } catch (err) {
    console.error("❌ Error in registerControllers:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ✅ LOGIN CONTROLLER
export const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📌 Login Request:", req.body);

    // ✅ Validate Input
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // ✅ Find User
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}`,
      user: { _id: user._id, name: user.name, email: user.email },
    });

  } catch (err) {
    console.error("❌ Error in loginControllers:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ✅ SET AVATAR CONTROLLER
export const setAvatarController = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const imageData = req.body.image;
    console.log("📌 Set Avatar Request:", { userId, imageData });

    // ✅ Validate Input
    if (!userId || userId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // ✅ Update User Avatar
    const userData = await User.findByIdAndUpdate(
      userId,
      { isAvatarImageSet: true, avatarImage: imageData },
      { new: true }
    );

    // ✅ Handle If User Not Found
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });

  } catch (err) {
    console.error("❌ Error in setAvatarController:", err.message);
    next(err);
  }
};

// ✅ GET ALL USERS CONTROLLER
export const allUsers = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("📌 Get All Users Request for UserID:", userId);

    // ✅ Validate User ID
    if (!userId || userId.length !== 24) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // ✅ Check if the requesting user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Fetch users excluding the given userId
    const users = await User.find({ _id: { $ne: userId } }).select([
      "email",
      "name",
      "avatarImage",
      "_id",
    ]);

    console.log("📌 Users Found:", users.length);

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No other users found",
      });
    }

    return res.status(200).json({
      success: true,
      users,
    });

  } catch (err) {
    console.error("❌ Error in allUsers:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}; 