import React, { useState, useEffect } from 'react';
import { getAppointments, deleteAppointment, createAppointment, updateAppointmentFunc, findDoctorByName } from '../../API/appointment';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./Appointment.css"
import Modal from '../../Components/Modal';
import { getDoctors } from '../../API/doctor';
import { getAnimals } from '../../API/animal';

function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [modalMessage, setModalMessage] = useState(''); 
  const [showModal, setShowModal] = useState(false); 

 
  const [reload, setReload] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchAnimalName, setSearchAnimalName] = useState('');
  const [newAppointment, setNewAppointment] = useState({
    appointmentDate: "",
    animal: "",
    doctor: ""
  });
  const [updateAppointment, setUpdateAppointment] = useState({
    appointmentDate: "",
    animal: "",
    doctor: ""
  });
 

  useEffect(() => {
    getAppointments().then((data) => {
      setAppointments(data);
      console.log(data)
    });
    getAnimals().then((data) => {
      setAnimals(data);
      console.log(data)
    });
    getDoctors().then((data) => {
      setDoctors(data);
      console.log(data)
    });
    setReload(false);
  }, [reload]);

  // Değerlendirme Formu 16: Randevu CRUD operasyonları.
  const handleDelete = (id) => {
    deleteAppointment(id).then(() => {
      setReload(true);
    });
  };

  const handleNewAppointment = (event) => {
    setNewAppointment({
      ...newAppointment,
      [event.target.name]: event.target.value,
    });
  };


  


  const handleNewAnimal = (e) => {
    if (e.target.name === "animal") {
      return setNewAppointment({
        ...newAppointment,
        animal: {
          id: e.target.value,
        }
      })
    }
    console.log(e.target.value, e.target.name)
  }

  

  const handleNewDoctor = (e) => {
    if (e.target.name === "doctor") {
      return setNewAppointment({
        ...newAppointment,
        doctor: {
          id: e.target.value,
        }
      })
    }
    console.log(e.target.value, e.target.name)
  }

  const handleReloadPage = () => {
    setReload(true)
  };

  // Değerlendirme Formu 16: Randevu CRUD operasyonları.
  const handleCreate = () => {
    createAppointment(newAppointment).then(() => {
      setReload(true);
    }).catch(() => {
      setModalMessage('Failed to create Appointment. Please try again. Check availability to create an appointment');
      setShowModal(true);
    });
    setNewAppointment({
      id: "",
      appointmentDate: "",
      animal: "",
      doctor: ""
    });
    
  };
  


  // Değerlendirme Formu 16: Randevu CRUD operasyonları.
  const handleUpdate = () => {
    updateAppointmentFunc(updateAppointment).then(() => {
      setReload(true);
    }).catch(() => {
      setModalMessage('Failed to update Appointment. Please try again.');
      setShowModal(true);
    });
    setUpdateAppointment({
      id:"",
      appointmentDate: "",
      animal: "",
      doctor: ""
    });
  };



  const handleUpdateBtn = (appointment) => {
    const selectedDoctor = doctors.find((doctor) => doctor.id === appointment.doctor.id);
    const selectedAnimal = animals.find((animal) => animal.id === appointment.animal.id);
  
    setUpdateAppointment({
      id: appointment.id,
      appointmentDate: appointment.appointmentDate,
      doctor: selectedDoctor,
      animal: selectedAnimal
    });
  };

  const handleUpdateAppointment = (event) => {
    const { name, value } = event.target;
    setUpdateAppointment((prevAppointment) => ({
      ...prevAppointment,
      [name]: name === 'animal'  || name === 'doctor' ? { id: value } : value,
    }));
  };
  // Değerlendirme Formu 17: Doktor Adına göre arama.
  const handleSearch = async () => {
    const filteredAppointments = appointments.filter(appointment => appointment.doctor.name.toLowerCase().includes(searchName.toLowerCase()));
    setAppointments(filteredAppointments);
    if (filteredAppointments.length === 0) {
      setModalMessage('Doctor not found.');
      setShowModal(true);
  }
  };

  // Değerlendirme Formu 17: Hayvan Adına göre arama.
  const handleSearchAnimal = async () => {
    const filteredAppointments = appointments.filter(appointment => {
      return appointment.animal && appointment.animal.name.toLowerCase().includes(searchAnimalName.toLowerCase());
    });
    setAppointments(filteredAppointments);

    if (filteredAppointments.length === 0) {
      setModalMessage('Animal not found.');
      setShowModal(true);
  }
  };

  // Değerlendirme Formu 17: Tarih Aralığına göre arama.
  const handleSearchAppointmentByDate = async () => {
    const filteredAppointments = appointments.filter(appointment => {
      // Burada 'searchAppointmentDate' state'i, appointments içindeki her bir appointment'in appointmentDate'i ile karşılaştırılıyor
      return appointment.appointmentDate.toLowerCase().includes(searchDate.toLowerCase());
    });
    setAppointments(filteredAppointments);
    if (filteredAppointments.length === 0) {
      setModalMessage('Appointment Date not found.');
      setShowModal(true);
  }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-search">
        <h2>Search Doctor Name</h2>
        <input
          type="text"
          placeholder='Search'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
       
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReloadPage}>Reload Page</button>
      </div>

      <div className="appointment-search">
        <h2>Search Animal Name</h2>
        <input
          type="text"
          placeholder='Search'
          value={searchAnimalName}
          onChange={(e) => setSearchAnimalName(e.target.value)}
        />
       
        <button onClick={handleSearchAnimal}>Search</button>
        <button onClick={handleReloadPage}>Reload Page</button>
      </div>

      <div className="appointment-search">
        <h2>Search Date</h2>
        <input
          type="date"
          placeholder='Search'
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
       
        <button onClick={handleSearchAppointmentByDate}>Search</button>
        <button onClick={handleReloadPage}>Reload Page</button>
      </div>

      
      <div className='appointment-create'>
        <h2>Create Appointment</h2>
        <input
          type="datetime-local"
          placeholder='Appointment Date'
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointment}
        />

        <select
          name="animal"
          value={newAppointment?.animal?.id}
          onChange={handleNewAnimal}
        >
          <option value="">Select Animal</option>
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>{animal.name}</option>
          ))}
        </select>

        <select
          name="doctor"
          value={newAppointment.doctor?.id}
          onChange={handleNewDoctor}
        >
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
          ))}
        </select>
        <button onClick={handleCreate}>Create</button>
      </div>

      <div className='appointment-update'>
        <h2>Update Appointment</h2>
        <div className='appointment-update'>
          <input
            type="datetime-local"
            placeholder='Appointment Date'
            name="appointmentDate"
            value={updateAppointment.appointmentDate}
            onChange={handleUpdateAppointment}
          />
          <select
            name="animal"
            value={updateAppointment.animal?.id}
            onChange={handleUpdateAppointment}
          >
            <option value="">Select Animal</option>
            {animals.map(animal => (
              <option key={animal.id} value={animal.id}>{animal.name}</option>
            ))}
            
          </select>
          <select
            name="doctor"
            value={updateAppointment.doctor?.id}
            onChange={handleUpdateAppointment}
          >
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
            ))}
          </select>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>

      <div className='appointment-list'>
        <h2>Appointments</h2>
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            <p>Appointment Date: {appointment.appointmentDate}
              <span className="delete-icon"><DeleteIcon id={appointment.id} onClick={() => handleDelete(appointment.id)} /></span>
              <span className="update-icon" onClick={() => handleUpdateBtn(appointment)}><ManageAccountsIcon /></span>
            </p> 
            <p>Name: {appointment.animal.name}</p>
            <p>Doctor Name: {appointment.doctor.name}</p>
          </div>
        ))}
      </div>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Appointment;
