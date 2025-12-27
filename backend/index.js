// load file .env
require('dotenv').config();

// import framework
const express = require('express');
// instance app express
const app = express();

// middleware parsing JSON
app.use(express.json());

// import cors untuk akses cors-origin
const cors = require('cors');
// mengaktifkan cors
app.use(cors());

// import routes siswa
const siswaRoutes = require('./routes/siswaRoutes');

// route base
app.use('/api/siswa', siswaRoutes);

// middleware error handler
// tangkap error yang dilempar dari route middleware sebelumnya
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// port dari .env atau gunakan 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
