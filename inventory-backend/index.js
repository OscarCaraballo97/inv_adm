const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const materialRoutes = require('./routes/materialRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/materiales', materialRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
