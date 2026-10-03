import { Sequelize } from "sequelize";
import "dotenv/config";

const dbPath = process.env.DB_STORAGE_PATH ;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath
});

export default sequelize;
