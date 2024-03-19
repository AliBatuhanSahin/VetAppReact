import React, { useState, useEffect } from 'react'
import { getVaccines, deleteVaccine, createVaccine, updateVaccineFunc, findAnimalByName, findAnimalByEndDate } from '../../API/vaccine';
import { getAnimals,} from '../../API/animal';
import Modal from '../../Components/Modal';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./Vaccine.css"

function Vaccine() {
  const [vaccines, setVaccines] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [modalMessage, setModalMessage] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [searchName, setSearchName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [newVaccine, setNewVaccine] = useState({
    name:"",
    code:"",
    protectionStartDate:"",
    protectionFinishDate:"",
  });
  const [updateVaccineData, setUpdateVaccineData] = useState({
    name:"",
    code:"",
    protectionStartDate:"",
    protectionFinishDate:"",
  });

  useEffect(() => {
    getVaccines().then((data) => {
      setVaccines(data);
    });
    getAnimals().then((data) => {
      setAnimals(data);
      console.log(data)
    });
    setReload(false)
  }, [reload]);

  // Değerlendirme Formu 14: Aşı CRUD operasyonları.
  const handleDelete = (id) => {
    deleteVaccine(id).then(() => {
      setReload(true);
    })
  };

  const handleReloadPage = () => {
    setReload(true)
  };
  

  const handleNewVaccine = (event) => {
    setNewVaccine({
      ...newVaccine,
      [event.target.name]: event.target.value,
    });
  };

  const handleNewAnimal = (e) => {
    if (e.target.name === "animal") {
      return setNewVaccine({
        ...newVaccine,
        animal: {
          id: e.target.value,
        }
      })
    }
    console.log(e.target.value, e.target.name)
  }

  // Değerlendirme Formu 14: Aşı CRUD operasyonları.
  const handleCreate = () => {
    console.log(newVaccine)
    createVaccine(newVaccine).then(() => {
      setReload(true)
    }).catch(() => {
      setModalMessage('Failed to create Vaccine. Please try again.');
      setShowModal(true);
    });
    setNewVaccine({
      name:"",
      code:"",
      protectionStartDate:"",
      protectionFinishDate:"",
    })
  }

  // Değerlendirme Formu 14: Aşı CRUD operasyonları.
  const handleUpdate = () => {
    updateVaccineFunc(updateVaccineData).then(() => {
      setReload(true);
    }).catch(() => {
      setModalMessage('Failed to update Vaccine. Please change the name or code.');
      setShowModal(true);
    });
    setUpdateVaccineData({
      id:"",
      name: "",
      code: "",
      protectionStartDate: "",
      protectionFinishDate: "",
      animal: updateVaccineData.animal.id, // animalı sıfırlamadan önce mevcut değeri koruyun
    });
  };

  const handleUpdateBtn = (vaccine) => {
    setUpdateVaccineData({
      id: vaccine.id,
      name: vaccine.name,
      code: vaccine.code,
      protectionStartDate: vaccine.protectionStartDate,
      protectionFinishDate: vaccine.protectionFinishDate,
    })
  }


  const handleUpdateVaccine = (event) => {
    const { name, value } = event.target;
    setUpdateVaccineData((prevVaccine) => ({
      ...prevVaccine,
      [name]: name === "animal" ? { id: value } : value,
    }));
  };

  // Değerlendirme Formu 15: Aşı Hayvan Adına Göre Arama.
  const handleSearchByName = async () => {
    const data = await findAnimalByName(searchName);
    if (Array.isArray(data)) {
        setVaccines(data);
    } else {
        setVaccines([data]); // Tek bir hayvan objesini dizi içine alıyoruz
    }
    if (!data || (Array.isArray(data) && data.length === 0)) {
      setModalMessage('Animal not found.');
      setShowModal(true);
    }
};

// Değerlendirme Formu 15: Aşı Bitiş Tarih Aralığına Göre Arama.
const handleSearchByEndDate = async () => {
  const data = await findAnimalByEndDate(startDate, endDate);
  if (data) {
    setVaccines(data);
  } else {
    setVaccines(data); // Tek bir hayvan objesini dizi içine alıyoruz
  }
  if (!data || (Array.isArray(data) && data.length === 0)) {
    setModalMessage('Date not found.');
    setShowModal(true);
  }
  
};

  return (
  <div className='vaccine'>

    <div className='vaccine-search'>
      <h2>Search Animal Name</h2>
      <input
          type="text"
          placeholder="Search"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={handleSearchByName}>Search</button>
      <button onClick={handleReloadPage}>Reload Page</button>

      <h2>Search Vaccination Start-End Date</h2>
      <label htmlFor="startDate">Start Date</label>
      <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="endDate">End Date</label>
      <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleSearchByEndDate}>Search</button>
      <button onClick={handleReloadPage}>Reload Page</button>
  </div>

      <h2>Create Vaccine</h2>
      <div className='vaccine-create'>
        <input 
        type="text"
        placeholder='Name'
        name="name" 
        value={newVaccine.name}
        onChange={handleNewVaccine}
          />
        <input 
        type="text"
        placeholder='Code'
        name="code" 
        value={newVaccine.code}
        onChange={handleNewVaccine}
        />

        <input 
        type="date"
        placeholder='Protection Start Date'
        name="protectionStartDate" 
        value={newVaccine.protectionStartDate}
        onChange={handleNewVaccine}
        />

        <input 
        type="date"
        placeholder='Protection Finish Date'
        name="protectionFinishDate" 
        value={newVaccine.protectionFinishDate}
        onChange={handleNewVaccine}
        /> 

      <select 
          name="animal" 
          onChange={handleNewAnimal}
          value={newVaccine?.animal?.id}
        >
          {animals.map((animal) => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
      </select>


        <button onClick={handleCreate}>Create</button>
    </div>
    <div className='vaccine-update'>
      <h2>Update Vaccine</h2>
      <div className='vaccine-update'>
  <input 
    type="text"
    placeholder='Name'
    name="name" 
    value={updateVaccineData.name}
    onChange={handleUpdateVaccine}
  />
  <input 
    type="text"
    placeholder='Code'
    name="code" 
    value={updateVaccineData.code}
    onChange={handleUpdateVaccine}
  />
  <input 
    type="date"
    placeholder='Protection Start Date'
    name="protectionStartDate" 
    value={updateVaccineData.protectionStartDate}
    onChange={handleUpdateVaccine}
  />
  <input 
    type="date"
    placeholder='Protection Finish Date'
    name="protectionFinishDate" 
    value={updateVaccineData.protectionFinishDate}
    onChange={handleUpdateVaccine}
  /> 

    <select
      name="animal"
      onChange={handleUpdateVaccine}
      value={updateVaccineData.animal?.id}
    >
      {animals.map((animal) => (
        <option key={animal.id} value={animal.id}>
          {animal.name}
        </option>
      ))}
    </select>

  <button onClick={handleUpdate}>Update</button>

  </div>
    </div>
    <div className='vaccine-list'>
      <h2>Vaccines</h2>
      {vaccines.map((vaccine) => (
        <div 
        key={vaccine.id}
        >

         <p>Name:{vaccine.name} 
         <span className="delete-icon"> <DeleteIcon id={vaccine.id} onClick={() => handleDelete(vaccine.id)} />
         </span>
         <span className="update-icon" onClick={() => handleUpdateBtn(vaccine)}><ManageAccountsIcon /></span>
         </p>
         <p>Code:{vaccine.code}</p>
         <p>Protection Start Date:{vaccine.protectionStartDate}</p>
         <p>Protection Finish Date:{vaccine.protectionFinishDate}</p>
         </div>
      ))}
    </div>

    {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default Vaccine