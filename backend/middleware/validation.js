const ValidateCreateSiswa = (req, res, next) => {
    // field req body
    const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;
    // array menyimpan error
    const errors = [];

    // validasi nama siswa yang awajib ada dengan minimal 2 karakter
    if (!nama_siswa || nama_siswa.trim().length < 2)
        errors.push("Nama siswa wajib dicantumkan!");

    // validasi alamat siswa yang wajib ada dengan minimal 5 karakter
    if (!alamat_siswa || alamat_siswa.trim().length < 5)
        errors.push("Alamat siswa wajib dicantumkan!");

    // validasi tanggal lahir yang wajib ada
    if (!tgl_siswa)
        errors.push("Tanggal lahir wajib dicantumkan!");

    // validasi jurusan harus salah satu dari 3 pilihan
    const jurusanValid = ['IPA', 'IPS', 'Bahasa'];
    if (!jurusan_siswa || !jurusanValid.includes(jurusan_siswa))
        errors.push("Jurusan tidak valid!");

    // jika ada error, kembalikan daftar error
    if (errors.length)
        return res.status(400).json({ errors });

    next();
};


const ValidateUpdateSiswa = (req, res, next) => {
    const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;
    const errors = [];

    if (nama_siswa !== undefined && nama_siswa.trim().length < 2)
        errors.push("Nama siswa minimal 2 karakter!");

    if (alamat_siswa !== undefined && alamat_siswa.trim().length < 5)
        errors.push("Alamat siswa minimal 5 karakter!");

    if (tgl_siswa !== undefined && isNaN(Date.parse(tgl_siswa)))
        errors.push("Format tanggal lahir tidak valid!");

    const jurusanValid = ['IPA', 'IPS', 'Bahasa'];
    if (jurusan_siswa !== undefined && !jurusanValid.includes(jurusan_siswa))
        errors.push("Jurusan tidak valid!");

    if (errors.length)
        return res.status(400).json({ errors });

    next();
};

module.exports = {
    ValidateCreateSiswa,
    ValidateUpdateSiswa
};
