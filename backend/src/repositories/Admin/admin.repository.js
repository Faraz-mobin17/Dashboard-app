class AdminRepository {
  constructor(db) {
    this.db = db;
  }

  async getAllUsersByAdmin() {
    try {
      const query = `SELECT * FROM USERS where is_Admin <> 1`;
      return await this.db.executeQuery(query);
    } catch (error) {
      throw error;
    }
  }

  async getUserByAdmin(id) {
    try {
      const query = `SELECT * FROM USERS WHERE id = ?`;
      return await this.db.executeQuery(query, [id]);
    } catch (error) {
      throw error;
    }
  }

  async checkAdminExists(email) {
    try {
      console.log("checkUserExists fn", email);
      const query = `SELECT * FROM admin WHERE email = ?`;

      const response = await this.db.executeQuery(query, [email]);
      console.log("Inside admin repo check User exists", response[0]);
      // Ensure that response is an array and has at least one element
      if (Array.isArray(response) && response.length > 0) {
        console.log("inside if block of check admin exists fn");
        return this.loginAdmin(email, response[0].password);
      }
      return false;
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false; // Return false in case of any errors
    }
  }

  async updateUserByAdmin(params = {}, id) {
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

  async deleteUserByAdmin(id) {
    try {
      const query = `DELETE FROM USERS WHERE id = ?`;
      const response = await this.db.executeQuery(query, [id]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async loginAdmin(email, password) {
    try {
      const query = `SELECT * FROM admin WHERE email = ? AND password = ?`;
      const response = await this.db.executeQuery(query, [email, password]);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export { AdminRepository };
