import axios from "axios"
import { useEffect, useState } from "react";
import {Modal} from "bootstrap"
import { FaEdit, FaRegTrashAlt} from "react-icons/fa";

export default function DataSiswa(){
    const [siswa, setSiswa] = useState([])
    const [loading, setLoading] = useState(false)

    const [namaSiswa, setNamaSiswa] = useState("")
    const [alamatSiswa, setAlamatSiswa] = useState("")
    const [tglSiswa, setTglSiswa] = useState("")
    const [jurusanSiswa, setJurusanSiswa] = useState("IPA")

    const [editId, setEditId] = useState(null)
    const [editNama, setEditNama] = useState("")
    const [editAlamat, setEditAlamat] = useState("")
    const [editTgl, setEditTgl] = useState("")
    const [editJurusan, setEditJurusan] = useState("IPA")

    const fetchData = () => {
        setLoading(true)
        axios
            .get("http://localhost:3000/api/siswa")
            .then((res) => setSiswa(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleAdd = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/siswa", {
            nama_siswa: namaSiswa,
            alamat_siswa: alamatSiswa,
            tgl_siswa: tglSiswa,
            jurusan_siswa: jurusanSiswa,
        })
        .then(() => fetchData())
        .catch((err) => console.log(err))
        .finally(() => {
            setNamaSiswa(""); setAlamatSiswa(""); setTglSiswa(""); setJurusanSiswa("IPA")
            const modalEl = document.getElementById("addModal");
            const modalInstance = Modal.getOrCreateInstance(modalEl);
            modalInstance.hide();
        })
    }

    const handleDelete = (id_siswa) => {
        if(!window.confirm("Apakah Anda yakin akan menghapus data ini?")) return;
        setLoading(true)
        axios.delete(`http://localhost:3000/api/siswa/${id_siswa}`)
            .then(() => fetchData())
            .finally(() => setLoading(false))
    }

    // --- Edit ---
    const openEditModal = (item) => {
        setEditId(item.id_siswa)
        setEditNama(item.nama_siswa)
        setEditAlamat(item.alamat_siswa)
        setEditTgl(item.tgl_siswa)
        setEditJurusan(item.jurusan_siswa)
        const modalEl = document.getElementById("editModal");
        const modalInstance = new Modal(modalEl)
        modalInstance.show()
    }

    const handleEdit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/api/siswa/${editId}`, {
            nama_siswa: editNama,
            alamat_siswa: editAlamat,
            tgl_siswa: editTgl,
            jurusan_siswa: editJurusan,
        })
        .then(() => fetchData())
        .finally(() => {
            const modalEl = document.getElementById("editModal");
            const modalInstance = Modal.getOrCreateInstance(modalEl)
            modalInstance.hide()
        })
    }

    return (
        <>
        <div className="shadow rounded-4 m-4 p-4">
            <div className="d-flex justify-content-end mb-2">
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
                    Tambah Siswa
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>KODE</th>
                        <th>NAMA</th>
                        <th>ALAMAT</th>
                        <th>TANGGAL LAHIR</th>
                        <th>JURUSAN</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr><td colSpan={7} align="center">Loading...</td></tr> :
                        siswa.map((item, index) => (
                        <tr key={item.id_siswa}>
                            <td>{index+1}</td>
                            <td>{item.kode_siswa}</td>
                            <td>{item.nama_siswa}</td>
                            <td>{item.alamat_siswa}</td>
                            <td>{item.tgl_siswa?.slice(0, 10)}</td>
                            <td>{item.jurusan_siswa}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => openEditModal(item)}>
                                    <FaEdit />
                                </button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id_siswa)}>
                                    <FaRegTrashAlt/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Modal Tambah */}
        <div className="modal fade" id="addModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold" style={{fontFamily:"Roboto"}}>Tambah Siswa</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleAdd}>
                            <p className="fw-semibold" >Nama Siswa</p>
                            <input className="form-control mb-2" placeholder="Nama" value={namaSiswa} onChange={e => setNamaSiswa(e.target.value)} />
                            <br/>
                            <p className="fw-semibold" >Alamat Siswa</p>
                            <textarea className="form-control mb-2" placeholder="Alamat" value={alamatSiswa} onChange={e => setAlamatSiswa(e.target.value)} />
                            <br/>
                            <p className="fw-semibold" >Tanggal Lahir Siswa</p>
                            <input type="date" className="form-control mb-2" value={tglSiswa} onChange={e => setTglSiswa(e.target.value)} />
                            <br/>
                            <p className="fw-semibold" >Jurusan Siswa</p>
                            <select className="form-select mb-2" value={jurusanSiswa} onChange={e => setJurusanSiswa(e.target.value)}>
                                <option value="IPA">IPA</option>
                                <option value="IPS">IPS</option>
                                <option value="RPL">RPL</option>
                                <option value="TKJ">TKJ</option>
                                <option value="AKL">AKL</option>
                            </select>
                            <br/>
                            <button type="submit" className="btn btn-success w-100 fw-bold fs-5">Simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        {/* Modal Edit */}
        <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title fw-bold" style={{fontFamily:"Roboto"}}>Edit Siswa</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"/>
                    </div>
                    <div className="modal-body" style={{fontFamily:"Roboto"}} >
                        <form onSubmit={handleEdit}>
                            {/* <p className="fw-semibold" >Kode Siswa</p>
                            <input className="form-control mb-2" placeholder="Kode" value={editko} onChange={e => setEditNama(e.target.value)} />
                            <br/> */}
                            <p className="fw-semibold" >Nama Siswa</p>
                            <input className="form-control mb-2" placeholder="Nama" value={editNama} onChange={e => setEditNama(e.target.value)} />
                            <br/>
                            <p className="fw-semibold" >Alamat Siswa</p>
                            <textarea className="form-control mb-2" placeholder="Alamat" value={editAlamat} onChange={e => setEditAlamat(e.target.value)} />
                            <br/>
                            <p className="fw-semibold" >Tanggal Lahir Siswa</p>
                            <input type="date" className="form-control mb-2" value={editTgl} onChange={e => setEditTgl(e.target.value)} />
                            <br/>
                            <p className="fw-semibold" >Jurusan Siswa</p>
                            <select className="form-select mb-2" value={editJurusan} onChange={e => setEditJurusan(e.target.value)}>
                                <option value="IPA">IPA</option>
                                <option value="IPS">IPS</option>
                                <option value="RPL">RPL</option>
                                <option value="TKJ">TKJ</option>
                                <option value="AKL">AKL</option>
                            </select>
                            <br/>
                            <button type="submit" className="btn btn-warning w-100 fw-bold fs-5">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
