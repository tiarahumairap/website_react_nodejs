import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import DataSiswa from '../pages/DataSiswa';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/data-siswa" element={<DataSiswa />} />
    </Routes>
  );
}
