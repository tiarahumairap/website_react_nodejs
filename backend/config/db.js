//load variabel .env
require('dotenv').config()

//load mysql
const mysql = require('mysql2/promise');

//load url dari .env
const dburl = new URL(process.env.DATABASE_URL)

// logic jika 'dburl' tidak ditemukan
if(!dburl){
    throw Error ('Belum ada DATABASE_URL di .env')
}

//membuat pool koneksi
const pool = mysql.createPool({
    host                : dburl.hostname,
    user                : dburl.username,
    password            : dburl.password,
    database            : dburl.pathname.replace(/^\//, ""),
    port                : dburl.port ? Number(dburl.port) : 3306,
    waitForConnections  : true,
})

//export pool
module.exports = pool;