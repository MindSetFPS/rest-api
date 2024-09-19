const express = require("express");
const teamsRoutes = require("./routes/teams")
const playersRoutes = require("./routes/players")
const leaguesRoutes = require("./routes/leagues")
const matchesRoutes = require("./routes/matches")

// https://www.bezkoder.com/node-js-rest-api-express-mysql/
// https://diegooo.com/node-js-y-express-js-como-crear-un-proyecto/

const app = express();
const port = 3000;

app.use(express.json())

app.use('/teams', teamsRoutes)
app.use('/players', playersRoutes)
app.use('/leagues', leaguesRoutes)
app.use('/matches', matchesRoutes)

app.listen(port, () => {
  console.log("listening on port" + port)
})