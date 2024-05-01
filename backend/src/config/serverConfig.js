import dotenv from "dotenv";
dotenv.config();

export default {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DATABASE: process.env.DATABASE,
  MYSQL_PORT: process.env.MYSQL_PORT,
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,

  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,

  GMAIL: process.env.GMAIL,
  MAIL_PASS: process.env.MAIL_PASS,
  ORIGIN: process.env.ORIGIN,
};
