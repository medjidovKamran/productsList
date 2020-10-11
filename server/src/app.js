const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 8000;

app.use(cors())
app.use(express.json({extended: true}));
require('./database/connection');

app.use('/', require('./routes/routes'));

app.listen(PORT, () => console.log(`Started on port ${PORT} ...`));