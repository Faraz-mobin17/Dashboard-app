import { ApiError } from "../../utils/ApiError.utils.js";
import HttpStatusCodes from "../../utils/httpStatusCodes.utils.js";

class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async getAllUsers() {
    try {
      const query = `SELECT * FROM USERS`;
      return await this.db.executeQuery(query);
    } catch (error) {
      throw error;
    }
  }

  async getUser(id) {
    try {
      const query = `SELECT * FROM USERS WHERE id = ?`;
      return await this.db.executeQuery(query, [id]);
    } catch (error) {
      throw error;
    }
  }

  async checkUserExists(email) {
    try {
      console.log("checkUserExists fn", email);
      const query = `SELECT * FROM users WHERE email = ?`;

      const response = await this.db.executeQuery(query, [email]);
      console.log("Inside user repo check User exists", response[0]);
      // Ensure that response is an array and has at least one element
      if (Array.isArray(response) && response.length > 0) {
        return response[0];
      }
      return false;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false; // Return false in case of any errors
    }
  }

  async updateUser(params = {}, id) {
    const columnsToUpdate = Object.keys(params)
      .map((key) => `${key} = ?`)
      .join(", ");
    const valuesToUpdate = Object.values(params);

    const query = `UPDATE USERS SET ${columnsToUpdate} WHERE id = ?`;

    console.log("query: ", query);
    console.log("values to update: ", valuesToUpdate);
    console.log("columns to update", columnsToUpdate);
    try {
      const result = await this.db.executeQuery(query, [...valuesToUpdate, id]);
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const query = `DELETE FROM USERS WHERE id = ?`;
      const response = await this.db.executeQuery(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      const query = `SELECT * FROM USERS WHERE email = ? AND password = ?`;
      const response = await this.db.executeQuery(query, [email, password]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async registerUser({ username, email, password, mobileNo, is_Admin }) {
    try {
      const userExists = await this.checkUserExists(username, email);

      if (userExists || userExists.length > 0) {
        throw new ApiError(HttpStatusCodes.CONFLICT, "User already exists");
      }

      const query = `INSERT INTO USERS (username, email, password,mobileNo,is_Admin) VALUES (?, ?, ?, ?, ?)`;
      return await this.db.executeQuery(query, [
        username,
        email,
        password,
        mobileNo,
        is_Admin,
      ]);
    } catch (error) {
      throw error;
    }
  }
}

export { UserRepository };
