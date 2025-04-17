const express = require('express');
const router = express.Router();
const db = require('../config/db');


router.post('/salida', (req, res) => {
  const { id, cantidad } = req.body;

  if (!id || !cantidad) {
    return res.status(400).json({ error: 'Faltan datos' });
  }

  const getStockQuery = 'SELECT stock FROM materiales WHERE id = ?';
  const updateStockQuery = 'UPDATE materiales SET stock = stock - ? WHERE id = ?';
  const insertSalidaQuery = 'INSERT INTO salidas (material_id, cantidad, descripcion) VALUES (?, ?, ?)';

  db.query(getStockQuery, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el stock' });

    const stockActual = result[0]?.stock || 0;

    if (cantidad > stockActual) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    db.query(updateStockQuery, [cantidad, id], (err2) => {
      if (err2) return res.status(500).json({ error: 'Error al actualizar el stock' });

      db.query(insertSalidaQuery, [id, cantidad, `Salida de ${cantidad} unidades`], (err3) => {
        if (err3) return res.status(500).json({ error: 'Salida registrada correctamente' });

        res.json({ mensaje: 'Salida registrada correctamente' });
      });
    });
  });
  db.query('SELECT 1 + 1 AS resultado', (err, rows) => {
    if (err) throw err;
    console.log('Resultado test DB:', rows[0].resultado);
  });
});

module.exports = router;
