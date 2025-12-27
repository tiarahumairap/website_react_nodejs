import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ padding: "20px" }}>
      <nav className="navbar navbar-expand-lg navbar-dark shadow rounded-5 pt-4 pe-3 pb-4" style={{ backgroundColor: '#19341eff'}}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold ms-4" to="/">Dashboard Sekolah</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse ms-4" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/data-siswa">Data Siswa</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
