import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./backend/lifedashboard.sqlite"
});

export default sequelize;