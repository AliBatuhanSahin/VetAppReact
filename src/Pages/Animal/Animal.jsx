import React, { useState, useEffect } from 'react';
import { getAnimals, deleteAnimal, createAnimal, updateAnimalFunc,findAnimalByName, findCustomerByName,} from '../../API/animal';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./Animal.css"
import Modal from '../../Components/Modal';
import { getCustomers } from '../../API/customer';

function Animal() {
  const [animals, setAnimals] = useState([]);
  const [reload, setReload] = useState(true);
  const [modalMessage, setModalMessage] = useState(''); 
  const [showModal, setShowModal] = useState(false); 
  const [customers, setCustomers] = useState([])
  const [searchName, setSearchName] = useState('');
  const [searchCustomerName, setSearchCustomerName] = useState('');
  const [newAnimal, setNewAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer:""
      
  });
  const [updateAnimal, setUpdateAnimal] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    colour: "",
    dateOfBirth: "",
    customer:""
  });

  useEffect(() => {
    getAnimals().then((data) => {
      setAnimals(data);
      console.log(data)
    });
    getCustomers().then((data) => {
      setCustomers(data);
      console.log(data)
    });
    setReload(false);
  }, [reload]);

  // Değerlendirme Formu 10: Hayvan CRUD operasyonları.
  const handleDelete = (id) => {
    deleteAnimal(id).then(() => {
      setReload(true);
    });
  };

  const handleReloadPage = () => {
    setReload(true)
  };

  const handleNewAnimal = (event) => {
    setNewAnimal({
      ...newAnimal,
      [event.target.name]: event.target.value,
    });
  };

  // Değerlendirme Formu 10: Hayvan CRUD operasyonları.
  const handleCreate = () => {
    
    createAnimal(newAnimal).then(() => {
      setReload(true);
    }).catch(() => {
      setModalMessage('Failed to create Animal. Please try again.');
      setShowModal(true);
    });
    setNewAnimal({
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "",
      customer:""
    });
  };

  // Değerlendirme Formu 10: Hayvan CRUD operasyonları.
  const handleUpdate = () => {
    updateAnimalFunc(updateAnimal).then(() => {
      setReload(true);
    }).catch(() => {
      setModalMessage('Failed to update Animal. Please try again.');
      setShowModal(true);
    });
    setUpdateAnimal({
      id:"",
      name: "",
      species: "",
      breed: "",
      gender: "",
      colour: "",
      dateOfBirth: "",
      customer:""
    });
  };

  const handleNewCustomer = (e) => {
    if (e.target.name === "customer") {
      return setNewAnimal({
        ...newAnimal,
        customer: {
          id: e.target.value,
        }
      })
    }
    console.log(e.target.value, e.target.name)
  }
  

  const handleUpdateBtn = (animal) => {
    setUpdateAnimal({
      id: animal.id,
      name: animal.name,
      species: animal.species,
      breed: animal.breed,
      gender: animal.gender,
      colour: animal.colour,
      dateOfBirth: animal.dateOfBirth,    
    });
  };

  const handleUpdateAnimal = (event) => {
    const { name, value } = event.target;
    setUpdateAnimal((prevAnimal) => ({
      ...prevAnimal,
      [name]: name === "customer" ? { id: value } : value,
    }));
  };

  // Değerlendirme Formu 11: Hayvan isme göre arama.
  const handleSearch = async () => {
    const data = await findAnimalByName(searchName);
    if (Array.isArray(data)) {
        setAnimals(data);
    } else {
        setAnimals([data]); // Tek bir hayvan objesini dizi içine alıyoruz
    }
    if (!data || (Array.isArray(data) && data.length === 0)) {
      setModalMessage('Date not found.');
      setShowModal(true);
    }
};

// Değerlendirme Formu 11: Müşteri isme göre arama.
const handleSearchCustomer = async () => {
  const customer = await findCustomerByName(searchCustomerName);
  if (customer) {
      console.log(customer)
      setAnimals(customer);
  } else {
      setCustomers([]);
  }
  if (!customer || (Array.isArray(customer) && customer.length === 0)) {
    setModalMessage('Customer not found.');
    setShowModal(true);
  }
};

  return (
    <div className='animal'>

      <div className='animal-search'>
        <h2>Search Animal Name</h2>
        <input
          type="text"
          placeholder='Search'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReloadPage}>Reload Page</button>
      </div>

      <div className='animal-search'>
            <h2>Search Customer Name</h2>
            <input
                type="text"
                placeholder='Search'
                value={searchCustomerName}
                onChange={(e) => setSearchCustomerName(e.target.value)}
            />
            <button onClick={handleSearchCustomer}>Search</button>
            <button onClick={handleReloadPage}>Reload Page</button>
            
        </div>
      <h2>Create Animal</h2>
      <div className='animal-create'>
        <input
          type="text"
          placeholder='Name'
          name="name"
          value={newAnimal.name}
          onChange={handleNewAnimal}
        />
        <input
          type="text"
          placeholder='Species'
          name="species"
          value={newAnimal.species}
          onChange={handleNewAnimal}
        />

        <input
          type="text"
          placeholder='Breed'
          name="breed"
          value={newAnimal.breed}
          onChange={handleNewAnimal}
        />

        <input
          type="text"
          placeholder='Gender'
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimal}
        />

        <input
          type="text"
          placeholder='Colour'
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimal}
        />

        <input
          type="date"
          placeholder='Date of Birth'
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimal}
        />

        <select 
          name="customer" 
          onChange={handleNewCustomer}
          value={newAnimal?.customer?.id}
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>



        <button onClick={handleCreate}>Create</button>
      </div>

      
      <div className='animal-update'>
        <h2>Update Animal</h2>
        <div className='animal-update'>
          <input
            type="text"
            placeholder='Name'
            name="name"
            value={updateAnimal.name}
            onChange={handleUpdateAnimal}
          />
          <input
            type="text"
            placeholder='Species'
            name="species"
            value={updateAnimal.species}
            onChange={handleUpdateAnimal}
          />
          <input
            type="text"
            placeholder='Breed'
            name="breed"
            value={updateAnimal.breed}
            onChange={handleUpdateAnimal}
          />
          <input
            type="text"
            placeholder='Gender'
            name="gender"
            value={updateAnimal.gender}
            onChange={handleUpdateAnimal}
          />
          <input
            type="text"
            placeholder='Colour'
            name="colour"
            value={updateAnimal.colour}
            onChange={handleUpdateAnimal}
          />
          <input
            type="date"
            placeholder='Date of Birth'
            name="dateOfBirth"
            value={updateAnimal.dateOfBirth}
            onChange={handleUpdateAnimal}
          />

          <select
            name="customer"
            onChange={handleUpdateAnimal}
            value={updateAnimal.customer?.id}
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>


          <button onClick={handleUpdate}>Update</button>
        </div>

      </div>
      <div className='animal-list'>
        <h2>Animals</h2>
        {animals.map((animal) => (
          <div
            key={animal.id}
          >

            <p>Name: {animal.name}
              <span className="delete-icon"> <DeleteIcon id={animal.id} onClick={() => handleDelete(animal.id)} />
              </span>
              <span className="update-icon" onClick={() => handleUpdateBtn(animal)}><ManageAccountsIcon /></span>
            </p>
            <p>Species: {animal.species}</p>
            <p>Breed: {animal.breed}</p>
            <p>Gender: {animal.gender}</p>
            <p>Colour: {animal.colour}</p>
            <p>Date of Birth: {animal.dateOfBirth}</p>
            



          </div>
        ))}
      </div>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Animal;
