const db = require('../config/db');

// Obtener todos los materiales
exports.getMateriales = (req, res) => {
  db.query('SELECT * FROM materiales', (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener materiales', detalle: err });
    res.json(result);
  });
};

exports.registrarSalida = (req, res) => {
  const { id, cantidad, responsable } = req.body;

  if (!id || !cantidad || !responsable) {
    return res.status(400).json({ error: 'Faltan datos: id, cantidad o responsable' });
  }

  const getStockQuery = 'SELECT stock FROM materiales WHERE id = ?';
  const updateStockQuery = 'UPDATE materiales SET stock = stock - ? WHERE id = ?';
  const insertSalidaQuery = 'INSERT INTO salidas (material_id, cantidad, descripcion) VALUES (?, ?, ?)';

  db.query(getStockQuery, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el stock', detalle: err });

    const stockActual = result[0]?.stock || 0;

    if (cantidad > stockActual) {
      return res.status(400).json({ error: 'Stock insuficiente' });
    }

    db.query(updateStockQuery, [cantidad, id], (err2) => {
      if (err2) return res.status(500).json({ error: 'Error al actualizar el stock', detalle: err2 });

      db.query(insertSalidaQuery, [id, cantidad, `Responsable: ${responsable}`], (err3) => {
        if (err3) return res.status(500).json({ error: 'SaLida Regsitrada Con exito', detalle: err3 });

        db.query('SELECT * FROM materiales WHERE id = ?', [id], (err4, finalResult) => {
          if (err4) return res.status(500).json({ error: 'Error al obtener el stock actualizado', detalle: err4 });
          res.json({
            mensaje: 'Salida registrada correctamente',
            material: finalResult[0]
          });
        });
      });
    });
  });
};

exports.getHistorialSalidas = (req, res) => {
  const sql = `
    SELECT s.*, m.nombre AS material_nombre 
    FROM salidas s 
    JOIN materiales m ON s.material_id = m.id 
    ORDER BY s.fecha DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al obtener historial de salidas', detalle: err });
    res.json(result);
  });
};
