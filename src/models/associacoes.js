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
ClimaDaily.belongsTo(Clima, { foreignKey: "climaId" });
ClimaDailyUnits.belongsTo(Clima, { foreignKey: "climaId" });  
ClimaCurrent.belongsTo(Clima, { foreignKey: "climaId" });
ClimaCurrentUnits.belongsTo(Clima, { foreignKey: "climaId" });

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
Clima.hasOne(ClimaCurrent, { foreignKey: "climaId", as: "ClimaCurrent" });
Clima.hasOne(ClimaCurrentUnits, { foreignKey: "climaId", as: "ClimaCurrentUnits" });
Clima.hasMany(ClimaDaily, { foreignKey: "climaId", as: "ClimaDaily" });
Clima.hasOne(ClimaDailyUnits, { foreignKey: "climaId", as: "ClimaDailyUnits" });

export {
  Agenda,
  Catalogo,
  Clima,
  ClimaCurrent,
  ClimaCurrentUnits,
  ClimaDaily,
  ClimaDailyUnits,
  Curso,
  Transacao,
  Categoria,
  Status,
  Tipo,
  Plataforma,
  Area,
  Conta
};