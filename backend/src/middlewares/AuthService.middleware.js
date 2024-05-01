import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/serverConfig.js";

class AuthService {
  static async generateToken(user) {
    // console.log("generate Token method", user);
    try {
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      return await jwt.sign(payload, config.SECRET_KEY, {
        expiresIn: config.EXPIRES_IN,
      });
    } catch (error) {
      console.log("Error at generateToken method", error.message);
      throw error;
    }
  }

  static async verifyJwtToken(token) {
    return jwt.verify(token, config.SECRET_KEY);
  }

  static async getHashPassword(password) {
    let hashPassword = await bcrypt.hash(password, 10);
    hashPassword = hashPassword.toString();
    return hashPassword;
  }

  static async isPasswordCorrect(plainTextPassword, hashPassword) {
    return await bcrypt.compare(plainTextPassword, hashPassword);
  }
}

export default AuthService;
