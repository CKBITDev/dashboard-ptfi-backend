import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST_PTFI,
  database: process.env.DATABASE_NAME_PTFI,
  user: process.env.DATABASE_USERNAME_PTFI,
  password: process.env.DATABASE_PASSWORD_PTFI,
  connectionLimit: 10,
  typeCast: function (field, next) {
    if (field.type === "TIMESTAMP" || field.type === "DATETIME") {
      return field.string();
    } else {
      return next();
    }
  },
});

pool.getConnection(function (err, _connection) {
  if (err) throw err;
  console.log("[database] Connected to DB PTFI");
});

export const dbPtfi = {
  pool,
  query: async <T = any>(sql: string, values: any = undefined): Promise<T[]> =>
    new Promise((resolve, reject) => {
      pool.query({ sql, values }, (error, result, _fields) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    }),
};
