const port = 4000;

const express = require('express');

const app  = express();

app.listen(port, () => console.log(`Listening port ${port} at` + new Date()));
