const express = require('express');
const Piscina = require('piscina');
const path = require('path');
require('dotenv').config(); 
const piscina = new Piscina({
  filename: path.resolve(__dirname, './src/detector-worker.js')
});

const app = express();
const port = process.env.PORT; 

app.get('/deviceDetection', async (req, res) => {
  const ua = req.query.ua;
  if (!ua) {
    return res.status(400).json({ error: 'Missing ua param' });
  }

  try {
    const result = await piscina.run({ ua, headers: req.headers });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at Port :${port}`);
});
