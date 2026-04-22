import Agenda from "./Agenda.js";
import Catalogo from "./Catalogo.js";
import Curso from "./Curso.js";
import Transacao from "./Transacao.js";
import Conta from "./Conta.js";
import Categoria from "./Categoria.js";
import Status from "./Status.js";
import Tipo from "./Tipo.js";
import Plataforma from "./Plataforma.js";
import Area from "./Area.js";
import Clima from "./Clima.js";
import ClimaDaily from "./ClimaDaily.js";
import ClimaDailyUnits from "./ClimaDailyUnits.js";
import ClimaCurrent from "./ClimaCurrent.js";
import ClimaCurrentUnits from "./ClimaCurrentUnits.js";

// Relacionamentos
Agenda.belongsTo(Categoria, { foreignKey: "categoriaId", as: "Categoria" });
Agenda.belongsTo(Status, { foreignKey: "statusId", as: "Status" });
Agenda.belongsTo(Tipo, { foreignKey: "tipoId", as: "Tipo" });
Catalogo.belongsTo(Tipo, { foreignKey: "tipoId", as: "Tipo" });
Catalogo.belongsTo(Status, { foreignKey: "statusId", as: "Status" });
Catalogo.belongsTo(Plataforma, { foreignKey: "plataformaId", as: "Plataforma" });
Curso.belongsTo(Plataforma, { foreignKey: "plataformaId", as: "Plataforma" });
Curso.belongsTo(Area, { foreignKey: "areaId", as: "Area" });
Curso.belongsTo(Status, { foreignKey: "statusId", as: "Status" });
Transacao.belongsTo(Conta, { foreignKey: "contaOrigemId", as: "ContaOrigem" });
Transacao.belongsTo(Conta, { foreignKey: "contaDestinoId", as: "ContaDestino" });
Transacao.belongsTo(Categoria, { foreignKey: "categoriaId", as: "Categoria" });
Clima.belongsTo(ClimaCurrent, { foreignKey: "climaCurrentId", as: "ClimaCurrent" });
Clima.belongsTo(ClimaCurrentUnits, { foreignKey: "climaCurrentUnitsId", as: "ClimaCurrentUnits" });
Clima.belongsTo(ClimaDaily, { foreignKey: "climaDailyId", as: "ClimaDaily" });
Clima.belongsTo(ClimaDailyUnits, { foreignKey: "climaDailyUnitsId", as: "ClimaDailyUnits" });

Tipo.hasMany(Agenda, { foreignKey: "tipoId" });
Tipo.hasMany(Catalogo, { foreignKey: "tipoId" });
Status.hasMany(Agenda, { foreignKey: "statusId" });
Status.hasMany(Catalogo, { foreignKey: "statusId" });
Status.hasMany(Curso, { foreignKey: "statusId" });
Plataforma.hasMany(Catalogo, { foreignKey: "plataformaId" });
Plataforma.hasMany(Curso, { foreignKey: "plataformaId" });
Area.hasMany(Curso, { foreignKey: "areaId" });
Conta.hasMany(Transacao, { foreignKey: "contaOrigemId", as: "ContaOrigem" });
Conta.hasMany(Transacao, { foreignKey: "contaDestinoId", as: "ContaDestino" });
Categoria.hasMany(Agenda, { foreignKey: "categoriaId" });
Categoria.hasMany(Transacao, { foreignKey: "categoriaId" });
Clima.hasMany(ClimaCurrent, { foreignKey: "climaId" });
Clima.hasMany(ClimaCurrentUnits, { foreignKey: "climaId" });
Clima.hasMany(ClimaDaily, { foreignKey: "climaId" });
Clima.hasMany(ClimaDailyUnits, { foreignKey: "climaId" });

export {
  Agenda,
  Catalogo,
  Curso,
  Transacao,
  Categoria,
  Status,
  Tipo,
  Plataforma,
  Area,
  Conta
};