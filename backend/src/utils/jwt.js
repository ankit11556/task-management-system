import jwt from "jsonwebtoken";

//Generate JWT token
export const generateToken = (userId, role) => {
  try {
    const token = jwt.sign({ userId, role }, process.env.TOKEN_KEY, {
      expiresIn: "7d",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
