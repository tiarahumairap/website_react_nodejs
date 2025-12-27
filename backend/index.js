require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

// Routes siswa
const siswaRoutes = require('./routes/siswaRoutes');
app.use('/api/siswa', siswaRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
