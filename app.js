const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const whitelist = ['http://localhost:4200', 'http://re-modulees.ubikgs.com:8081']
const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(helmet());

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));

app.disable('x-powered-by');

require("./app/routes/user.routes")(app);
require("./app/routes/estate.routes")(app);
require("./app/routes/typology.routes")(app);
require("./app/routes/geodata.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
