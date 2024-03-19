
import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Doctor from './Pages/Doctor/Doctor'
import Customer from './Pages/Customer/Customer'
import Navbar from './Components/Navbar'
import Animal from './Pages/Animal/Animal'
import Vaccine from './Pages/Vaccine/Vaccine'
import Appointment from './Pages/Appointment/Appointment'
import Report from './Pages/Report/Report'
import HomePage from './Pages/HomePage/HomePage'

function App() {

  return (
    <>
    {/* Değerlendirme Formu 7: Router ile sayfa yapısının oluşturulduğu var Navbarın canlı şekilde ekranda kaldığı yapı. */}
    <Navbar />
                
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/animal" element={<Animal />} />
          <Route path="/vaccine" element={<Vaccine />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/report" element={<Report />} />
        </Routes>
    </>
  )
}

export default App
