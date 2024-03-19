import React, { useState, useEffect } from 'react'
import { getDoctors, deleteDoctor, createDoctor, updateDoctorFunc } from '../../API/doctor';
import { getAvailableDates, deleteAvailableDate, createAvailableDate, updateAvailableDateFunc } from '../../API/availabledate';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./Doctor.css"
import Modal from '../../Components/Modal';

function Doctor() {
  const [doctor, setDoctor] = useState([]);
  const [reload, setReload] = useState(true);
  const [modalMessage, setModalMessage] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [newDoctor, setNewDoctor] = useState({
    name:"",
    phone:"",
    mail:"",
    address:"",
    city:"",
  });
  const [updateDoctor, setUpdateDoctor] = useState({
    name:"",
    phone:"",
    mail:"",
    address:"",
    city:"",
  });
  const [availableDates, setAvailableDates] = useState([]);
  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate:"",
  });
  const [updateAvailableDateState, setUpdateAvailableDateState] = useState({
    id:"",
    availableDate:"",
    
  });

  useEffect(() => {
    getDoctors().then((data) => {
      setDoctor(data);
    });
    getAvailableDates().then((data) => {
      setAvailableDates(data);
      console.log(data)
    });
    setReload(false)
  }, [reload]);

  // Değerlendirme Formu 12: Doctor CRUD operasyonları.
  const handleDelete = (id) => {
    deleteDoctor(id).then(() => {
      setReload(true);
    })
  };

  // Değerlendirme Formu 13: Çalışma Günü CRUD operasyonları.
  const handleDeleteAvailableDate = (id) => {
    deleteAvailableDate(id).then(() => {
      setReload(true);
    })
  };

  const handleNewDoctor = (event) => {
    setNewDoctor({
      ...newDoctor,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewAvailableDate = (event) => {
    setNewAvailableDate({
      ...newAvailableDate,
      [event.target.name]: event.target.value,
    });
  };

  // Değerlendirme Formu 12: Doctor CRUD operasyonları.
  const handleCreate = () => {
    createDoctor(newDoctor).then(() => {
      setReload(true)
    }).catch(() => {
      setModalMessage('Failed to create Doctor. Please try again.');
      setShowModal(true);
    });
    setNewDoctor({
      name:"",
      phone:"",
      mail:"",
      address:"",
      city:"",
    })
  }

  // Değerlendirme Formu 13: Çalışma Günü CRUD operasyonları.
  const handleCreateAvailableDate = () => {
    createAvailableDate(newAvailableDate).then(() => {
      setReload(true)
    })
    setNewAvailableDate({
      availableDate:"",
    })
  }

  const handleNewAvailableDateDoctor = (e) => {
    if (e.target.name === "doctor") {
      return setNewAvailableDate({
        ...newAvailableDate,
        doctor: {
          id: e.target.value,
        }
      })
    }
    console.log(e.target.value, e.target.name)
  }

  // Değerlendirme Formu 12: Doctor CRUD operasyonları.
  const handleUpdate = () => {
    updateDoctorFunc(updateDoctor).then(() => {
      setReload(true);
    }).catch(() => {
      setModalMessage('Failed to update Doctor. Please try again.');
      setShowModal(true);
    });
    setUpdateDoctor({
      name:"",
      phone:"",
      mail:"",
      address:"",
      city:"",
    })
  }

  // Değerlendirme Formu 13: Çalışma Günü CRUD operasyonları.
  const handleUpdateAvailableDate = () => {
    updateAvailableDateFunc(updateAvailableDateState).then(() => {
      setReload(true);
    })
    setUpdateAvailableDateState({
      id:"",
      availableDate:"",
      doctor:""
    })
  }

  const handleUpdateBtn = (doc) => {
    setUpdateDoctor({
      id: doc.id,
      name: doc.name,
      phone: doc.phone,
      mail: doc.mail,
      address: doc.address,
      city: doc.city,
    })
  }

  const handleUpdateAvailableDateBtn = (date) => {
    setUpdateAvailableDateState({
      id: date.id,
      availableDate: date.availableDate,
    })
  }

  const handleUpdateDoctor = (event) => (
    setUpdateDoctor({
      ...updateDoctor,
      [event.target.name]: event.target.value,
    })
  )


  const handleUpdateAvailableDateInput = (event) => {
    const { name, value } = event.target;
    setUpdateAvailableDateState((prevAvailableDate) => ({
      ...prevAvailableDate,
      [name]: name === "doctor" ? { id: value } : value,
    }));
  };

  return (
    <div className='doctor'>
    <h2>Create Doctor</h2>
    <div className='doctor-create'>
      <input 
      type="text"
      placeholder='Name'
      name="name" 
      value={newDoctor.name}
      onChange={handleNewDoctor}
        />
       <input 
    type="text"
    placeholder='Phone'
    name="phone" 
    value={newDoctor.phone}
    onChange={handleNewDoctor}
/>

<input 
    type="text"
    placeholder='Mail'
    name="mail" 
    value={newDoctor.mail}
    onChange={handleNewDoctor}
/>

<input 
    type="text"
    placeholder='Address'
    name="address" 
    value={newDoctor.address}
    onChange={handleNewDoctor}
/>

<input 
    type="text"
    placeholder='City'
    name="city" 
    value={newDoctor.city}
    onChange={handleNewDoctor}
/> 
        <button onClick={handleCreate}>Create</button>
    </div>
    <div className='doctor-update'>
      <h2>Update Doctor</h2>
      <div className='doctor-update'>
  <input 
    type="text"
    placeholder='Name'
    name="name" 
    value={updateDoctor.name}
    onChange={handleUpdateDoctor}
  />
  <input 
    type="text"
    placeholder='Phone'
    name="phone" 
    value={updateDoctor.phone}
    onChange={handleUpdateDoctor}
  />
  <input 
    type="text"
    placeholder='Mail'
    name="mail" 
    value={updateDoctor.mail}
    onChange={handleUpdateDoctor}
  />
  <input 
    type="text"
    placeholder='Address'
    name="address" 
    value={updateDoctor.address}
    onChange={handleUpdateDoctor}
  />
  <input 
    type="text"
    placeholder='City'
    name="city" 
    value={updateDoctor.city}
    onChange={handleUpdateDoctor}
  /> 
  <button onClick={handleUpdate}>Update</button>
</div>

    </div>
    <div className='doctor-list'>
      <h2>Doctors</h2>
      {doctor.map((doctor) => (
        <div 
        key={doctor.id}
        >

         <p>Name:{doctor.name} 
         <span className="delete-icon"> <DeleteIcon id={doctor.id} onClick={() => handleDelete(doctor.id)} />
         </span>
         <span className="update-icon" onClick={() => handleUpdateBtn(doctor)}><ManageAccountsIcon /></span>
         </p>
         <p>Phone:{doctor.phone}</p>
         <p>Mail:{doctor.mail}</p>
         <p>Address:{doctor.address}</p>
         <p>City:{doctor.city}</p>
         
         </div>
      ))}
    </div>
    <div className='availabledate'>

    <h2>Create Available Date</h2>
    <div className='available-date-create'>
      <input 
        type="date"
        placeholder='Available Date'
        name="availableDate" 
        value={newAvailableDate.availableDate}
        onChange={handleNewAvailableDate}
      />
      <select 
          name="doctor" 
          onChange={handleNewAvailableDateDoctor}
          value={newAvailableDate?.doctor?.id}
        >
          <option value="">Select Doctor</option>
          {doctor.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
      <button onClick={handleCreateAvailableDate}>Create</button>
    </div>

    <div className='available-date-update'>
      <h2>Update Available Date</h2>
      <div className='available-date-update'>
        <input 
          type="date"
          placeholder='Available Date'
          name="availableDate" 
          value={updateAvailableDateState.availableDate}
          onChange={handleUpdateAvailableDate}
        />
        <select
            name="doctor"
            onChange={handleUpdateAvailableDateInput}
            value={updateAvailableDateFunc.doctor?.id}
          >
            <option value="">Select Doctor</option>
            {doctor.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        <button onClick={handleUpdateAvailableDate}>Update</button>
      </div>
    </div>

    <div className='available-date-list'>
      <h2>Available Dates</h2>
      {availableDates.map((date) => (
        <div 
          key={date.id}
        >
          <p>Available Date: {date.availableDate} 
            <span className= "delete-icon">  <DeleteIcon id={date.id} onClick={() => handleDeleteAvailableDate(date.id)} /></span>
            <span className="update-icon" onClick={() => handleUpdateAvailableDateBtn(date)}><ManageAccountsIcon /></span>
          </p>
        </div>
      ))}
    </div>

    </div>
    {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default Doctor