 create database if not exists siswa_db;
 
 use siswa_db;
 
 create table if not exists siswa (
	id_siswa INT AUTO_INCREMENT PRIMARY KEY,
    kode_siswa VARCHAR(20) NOT NULL,
    nama_siswa VARCHAR(200) NOT NULL,
    alamat_siswa VARCHAR(200) NOT NULL,
    tgl_siswa DATE NOT NULL,
    jurusan_siswa enum('IPA', 'IPS', 'Bahasa') not null
 );
