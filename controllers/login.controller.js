const { UserModel } = require("../database/db");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

require("dotenv").config();

const signupController = async (req, res) => {
  const myschema = z.object({
    email: z.string().email().trim().toLowerCase(),
    password: z
      .string()
      .min(6)
      .max(50)
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[!@#$%^*_]/, {
        message:
          "Password must include at least one special character (!@#$%^*_)",
      })
      .regex(/^\S+$/, "Password cannot contain spaces"),
    name: z
      .string()
      .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
  });

  const parsedData = myschema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      msg: "Incorrect format",
      error: parsedData.error.errors,
    });
  }

  const { email, password, name } = parsedData.data;

  try {
    const hashedpassword = await bcrypt.hash(password, 5);

    await UserModel.create({
      email: email,
      password: hashedpassword,
      name: name,
    });
    res.status(200).json({
      msg: "successfully signed up!",
    });
  } catch (error) {
    res.json({
      mes: "already signed in!",
    });
  }
};

const signinController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ msg: "Invalid email or password" });
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
      return res.status(403).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_SECRET
    );

    return res.json({
      msg: "Successfully signed in",
      token,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { signinController, signupController };
