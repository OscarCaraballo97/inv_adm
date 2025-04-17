const express = require('express');
const router = express.Router();
const Material = require('../models/materialModel');

router.get('/', (req, res) => {
  Material.getAll((err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener materiales' });
    res.json(result);
  });
});

router.post('/salida', (req, res) => {
  const { id, cantidad, responsable } = req.body;

  if (!id || !cantidad || !responsable) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  Material.registrarSalida(id, cantidad, responsable, (err, result) => {
    if (err) return res.status(500).json({ error: 'Registrada Salida Con exito', detalle: err });
    res.json(result);
  });
});

module.exports = router;
