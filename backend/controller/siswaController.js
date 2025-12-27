//load pool untuk config
const pool = require('../config/db');

//getAll Data
// "api/siswa"
async function getAll (req, res, next){
    try{
        //menyimpan data siswa yang dipanggil dari query database di dalam row sebagai array
        const[rows] = await pool.execute('SELECT *, DATE_FORMAT(tgl_siswa, "%Y-%m-%d") AS tgl_siswa FROM siswa ORDER BY kode_siswa DESC');

        //memberikan respon dari variabel rows berupa json
        res.json(rows);
    } catch(err){
        next(err);
    }
}

//get Data by id
// "api/siswa/:id_siswa"
async function getById (req, res, next){
    try{
        //req parameter id_siswa yang diubah ke angka dengan parseint
        const id = parseInt(req.params.id_siswa);

        //menyimpan query select where id_siswa didalam rows berbentuk array
        const [rows] = await pool.execute('SELECT * FROM siswa WHERE id_siswa=?', [id]);

        //logika jika rows length = 0 artinya tidak ada data siswa yang ditemukan
        if (rows.length === 0)
            //mengirim respon status data tidak ditemukan
            return res.status(404).json({ message: "Data siswa tidak ditemukan!" });

        // jika ditemukan, maka akan menampilkan data ber-indeks 0
        res.json(rows[0]);
    } catch (err){
        next(err);
    }
}

//create data siswa
// "api/siswa"
async function create(req, res, next){
    try{
        //request body
        const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

        // Ambil kode_siswa terakhir
        const [rows] = await pool.execute(
            "SELECT kode_siswa FROM siswa ORDER BY kode_siswa DESC LIMIT 1"
        );

        // inisialisasi variabel kode_siswa
        let kode_siswa;

        // logic pembuatan kode_siswa
        //jika data masih belum ditemukan maka kode_siswa pertama adalah "KS20001"
        if (rows.length === 0) {
            // jika data siswa masih kosong
            kode_siswa = "KS20001";
        } else {
            // ambil kode_siswa terakhir dari baris pertama
            const lastKode = rows[0].kode_siswa;

            // ambil substring mulai index ke-2
            // lalu ubah ke angka dengan parseint dan tambahkan 1
            const angka = parseInt(lastKode.substring(2)) + 1;

            // meng gabungkan "KS" dengan angka baru
            // padstart 5 itu dimulai dengan panjang angka 5 digit
            // "0" => panjang digit diisi 0
            kode_siswa = "KS" + angka.toString().padStart(5, "0");
        }

        // menyimpan hasil query insert ke dalam variabel result berbentuk array
        const [result] = await pool.execute(
            `INSERT INTO siswa
                (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) 
                VALUES (?, ?, ?, ?, ?)`,
                [kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa]
        );

        // memberikan respon ke json dengan menampilkan data yang baru ditambahkan
        res.status(201).json({
            id_siswa: result.insertId,
            kode_siswa,
            nama_siswa,
            alamat_siswa,
            tgl_siswa,
            jurusan_siswa
        });
    } catch(err){
        next(err);
    }
}

//update data siswa
// "api/siswa/:id_siswa"
async function update(req, res, next) {
    try{
        //request parameter dari id_siswa yang diubah ke angka dengan parseint
        const id = parseInt(req.params.id_siswa);
        // dan request body
        const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

        // inisialisasi filed dan values berbentuk array
        const fields = [];
        const values = [];

        // cek jika ada nilainya dan terdefinisikan maka push values ke fields
        if (nama_siswa !== undefined) { fields.push('nama_siswa=?'); values.push(nama_siswa); }
        if (alamat_siswa !== undefined) { fields.push('alamat_siswa=?'); values.push(alamat_siswa); }
        if (tgl_siswa !== undefined) { fields.push('tgl_siswa=?'); values.push(tgl_siswa); }
        if (jurusan_siswa !== undefined) { fields.push('jurusan_siswa=?'); values.push(jurusan_siswa); }

        // jika tidak ada perubahan maka menghasilkan error
        if (fields.length === 0)
            return res.status(400).json({ message: 'Tidak ada yang diperbarui!' });
        // push ke id
        values.push(id);

        // query sql untuk update siswa fields join dimana id_siswa
        const sql = `UPDATE siswa SET ${fields.join(', ')} WHERE id_siswa=?`;

        // hasil disimpan di dalam result berbentuk array
        const [result] = await pool.execute(sql, values);

        // jika tidak ada yang ditemukan menghasilkan error
        if (result.affectedRows === 0)
            return res.status(404).json({ message: 'Data siswa tidak ditemukan!' });
        // jika data berhasil diperbarui
        res.json({ message: 'Data siswa berhasil diperbarui' });
    } catch (err){
        next(err);
    }
}

// "/api/siswa/:id_siswa" - DELETE
async function deleteB(req, res, next) {
    try {
        const id = parseInt(req.params.id_siswa);

        // hasil query untuk delete berdasarkan id_siswa disimpan di dalam result berbentuk array
        const [result] = await pool.execute('DELETE FROM siswa WHERE id_siswa=?', [id]);

        // jika tidak ada yang ditemukan menghasilkan error
        if(result.affectedRows === 0)
            return res.status(404).json({ message: 'Data siswa tidak ditemukan!' });
        // jika data berhasil diperbarui
        res.json({ message: 'Data siswa berhasil dihapus!' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteB
};