const express = require('express');
const router = express.Router();
const siswaController = require('../controller/siswaController')
const { ValidateCreateSiswa, ValidateUpdateSiswa } = require('../middleware/validation');

// "/api/siswa" => ambil seluruh data
router.get('/', siswaController.getAll);

// "/api/siswa/:id_siswa" => ambil data berdasarkan id
router.get('/:id_siswa', siswaController.getById);

// "/api/siswa" => create data siswa
router.post('/', ValidateCreateSiswa, siswaController.create);

// "/api/siswa/:id_siswa" => uppdate data siswa berdasarkan id
router.put('/:id_siswa', ValidateUpdateSiswa, siswaController.update);

// "/api/siswa/:id_siswa" => delete data siswa berdasarkan id
router.delete('/:id_siswa', siswaController.deleteB);

module.exports = router;
