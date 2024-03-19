import React, { useState, useEffect } from 'react'
import { getReports, deleteReport, createReport, updateReportFunc, } from '../../API/report';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./Report.css"
import Modal from '../../Components/Modal';
import { getAppointments } from '../../API/appointment';

function Report() {
  const [reports, setReports] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(true);
  const [modalMessage, setModalMessage] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [newReport, setNewReport] = useState({
    title:"",
    diagnosis:"",
    price:"",
    appointment:"",
  });
  const [updateReportData, setUpdateReportData] = useState({
    title:"",
    diagnosis:"",
    price:"",
    appointment:"",
  });

  useEffect(() => {
    getReports().then((data) => {
      setReports(data);
      console.log(data)
    });
    getAppointments().then((data) => {
        setAppointments(data);
        console.log(data)
      });
    setReload(false)
  }, [reload]);

  // Değerlendirme Formu 18: Rapor CRUD operasyonları.
  const handleDelete = (id) => {
    deleteReport(id).then(() => {
      setReload(true);
    });
  };

  const handleNewReport = (event) => {
    const { name, value } = event.target;
    setNewReport({
      ...newReport,
      [name]: value === '' ? null : name === 'appointment' ? { id: value, appointmentDate: appointments.find(appointment => appointment.id === parseInt(value)).appointmentDate } : value,
    });
  };

  // Değerlendirme Formu 18: Rapor CRUD operasyonları.
  const handleCreate = () => {
    console.log(newReport)
    createReport(newReport).then(() => {
      setReload(true);
    }).catch(() => {
      setModalMessage('Failed to create Report. Please try again.');
      setShowModal(true);
    });
    setNewReport({
        title:"",
        diagnosis:"",
        price:"",
        appointment:"",
    });
  };

  // Değerlendirme Formu 18: Rapor CRUD operasyonları.
  const handleUpdate = () => {
    updateReportFunc(updateReportData).then(() => {
      setReload(true);
    }).catch(() => {
      setModalMessage('Failed to update Report. Please change title.');
      setShowModal(true);
    });
    setUpdateReportData({
        title:"",
        diagnosis:"",
        price:"",
        appointment:"",
    });
  };

  const handleUpdateBtn = (report) => {
    console.log(report);
    setUpdateReportData({
      id: report.id,
      title: report.title,
      diagnosis: report.diagnosis,
      price: report.price,
      appointment: { id: report.appointment.id, appointmentDate: report.appointment.appointmentDate },
    });
  };

  const handleUpdateReport = (event) => {
    const { name, value } = event.target;
    setUpdateReportData({
      ...updateReportData,
      [name]: value === '' ? null : name === 'appointment' ? { id: value, appointmentDate: appointments.find(appointment => appointment.id === parseInt(value)).appointmentDate } : value,
    });
  };


  

  return (
    <div className='report'>
    <h2>Create Report</h2>
    <div className='report-create'>
        <input 
        type="text"
        placeholder='Title'
        name="title" 
        value={newReport.title}
        onChange={handleNewReport}
        />
        <input 
        type="text"
        placeholder='Diagnosis'
        name="diagnosis" 
        value={newReport.diagnosis}
        onChange={handleNewReport}
        />

        <input 
        type="text"
        placeholder='Price'
        name="price" 
        value={newReport.price}
        onChange={handleNewReport}
        />

        <select name="appointment" onChange={handleNewReport}>
          <option value="">Select Appointment Date</option>
          {appointments.map((appointment) => (
            <option key={appointment.id} value={appointment.id}>{appointment.appointmentDate}</option>
          ))}
        </select>


        <button onClick={handleCreate}>Create</button>

    </div>
    <div className='report-update'>
      <h2>Update Report</h2>
      <div className='report-update'>
        <input 
            type="text"
            placeholder='Title'
            name="title" 
            value={updateReportData.title}
            onChange={handleUpdateReport}
        />
        <input 
            type="text"
            placeholder='Diagnosis'
            name="diagnosis" 
            value={updateReportData.diagnosis}
            onChange={handleUpdateReport}
        />
        <input 
            type="text"
            placeholder='Price'
            name="price" 
            value={updateReportData.price}
            onChange={handleUpdateReport}
        />

        <select name="appointment" onChange={handleUpdateReport}>
            <option value="">Select Appointment Date</option>
            {appointments.map((appointment) => (
              <option key={appointment.id} value={appointment.id}>{appointment.appointmentDate}</option>
            ))}
          </select>

        
        <button onClick={handleUpdate}>Update</button>

    </div>
  </div>
    <div className='report-list'>
      <h2>Reports</h2>
      {reports.map((report) => (
        <div 
        key={report.id}
        >

         <p>Name:{report.title} 
         <span className="delete-icon"> <DeleteIcon id={report.id} onClick={() => handleDelete(report.id)} />
         </span>
         <span className="update-icon" onClick={() => handleUpdateBtn(report)}><ManageAccountsIcon /></span>
         </p>
         <p>Diagnosis:{report.diagnosis}</p>
         <p>Price:{report.price}</p>
         <p>Appointment Info:{report.appointment.appointmentDate}</p>
         <p>Doctor Name:{report.appointment.doctor.name}</p>
         <p>Animal Name:{report.appointment.animal.name}</p>
         
         </div>
      ))}
    </div>
    {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default Report
