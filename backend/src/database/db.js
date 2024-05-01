import mysql from "mysql2/promise";
import config from "../config/serverConfig.js";
class Database {
  constructor() {
    this.pool = null;
    this.connect();
  }

  async connect() {
    try {
      const pool = mysql.createPool({
        host: config.HOST,
        user: config.USER,
        password: config.PASSWORD,
        database: config.DATABASE,
        port: config.MYSQL_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      console.log("Connected to MySQL database");
      this.pool = pool; // Assign the pool to the instance property
    } catch (err) {
      console.log("mysql connection error", err);
      process.exit(1);
    }
  }

  async getConnection() {
    if (!this.pool) {
      await this.connect(); // Call connect method if pool is not initialized
    }
    return this.pool.getConnection();
  }

  async executeQuery(query, values) {
    try {
      const connection = await this.getConnection();
      const [rows] = await connection.execute(query, values);
      connection.release();
      return rows;
    } catch (error) {
      console.error("Error executing queries: ", error);
      throw error;
    }
  }
}

const db = new Database(); // Create a new instance of the Database class
export default db;
