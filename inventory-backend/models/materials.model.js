const db = require('../routes/db');

const Material = {
  getAll: (callback) => {
    const query = 'SELECT * FROM materiales';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM materiales WHERE id = ?';
    db.query(query, [id], callback);
  },

  registrarSalida: (id, cantidad, responsable, callback) => {
    const updateQuery = `
      UPDATE materiales 
      SET cantidad = cantidad - ? 
      WHERE id = ? AND cantidad >= ?`;

    db.query(updateQuery, [cantidad, id, cantidad], (err, result) => {
      if (err) return callback(err);
      if (result.affectedRows === 0) {
        return callback(null, { success: false, message: 'Stock insuficiente o material no encontrado' });
      }

      const insertQuery = `
        INSERT INTO historial_salidas (id_material, cantidad, responsable, fecha) 
        VALUES (?, ?, ?, NOW())`;

      db.query(insertQuery, [id, cantidad, responsable], (err2, result2) => {
        if (err2) return callback(err2);
        callback(null, { success: true, message: 'Salida registrada correctamente' });
      });
    });
  }
};

module.exports = Material;
