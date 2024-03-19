import React, { useState, useEffect } from 'react'
import { getCustomers, deleteCustomer, createCustomer, updateCustomerFunc, findCustomerByName } from '../../API/customer';
import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./Customer.css"
import Modal from '../../Components/Modal';

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [reload, setReload] = useState(true);
  const [modalMessage, setModalMessage] = useState(''); // Modal mesajını saklamak için state.
  const [showModal, setShowModal] = useState(false); // Modal'ı göstermek/gizlemek için  state.
  const [searchName, setSearchName] = useState('');
  const [newCustomer, setNewCustomer] = useState({
    name:"",
    phone:"",
    mail:"",
    address:"",
    city:"",
  });
  const [updateCustomerData, setUpdateCustomerData] = useState({
    name:"",
    phone:"",
    mail:"",
    address:"",
    city:"",
  });

  useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
    });
    setReload(false)
  }, [reload]);

  // Değerlendirme Formu 8: Müşteri CRUD operasyonları.
  const handleDelete = (id) => {
    deleteCustomer(id).then(() => {
      setReload(true);
    })
  };

  const handleReloadPage = () => {
    setReload(true)
  };

  const handleNewCustomer = (event) => {
    setNewCustomer({
      ...newCustomer,
      [event.target.name]: event.target.value,
    });
  };

  // Değerlendirme Formu 8: Müşteri CRUD operasyonları.
  const handleCreate = () => {
    createCustomer(newCustomer).then(() => {
      setReload(true)
    }).catch(() => {
      setModalMessage('Failed to create customer. Please try again.');
      setShowModal(true);
    });
    setNewCustomer({
      name:"",
      phone:"",
      mail:"",
      address:"",
      city:"",
    })
  }

  // Değerlendirme Formu 8: Müşteri CRUD operasyonları.
  const handleUpdate = () => {
    updateCustomerFunc(updateCustomerData).then(() => {
      setReload(true);
    }).catch(() => {
      setModalMessage('Failed to update customer. Please try again.');
      setShowModal(true);
    });
    setUpdateCustomerData({
      name:"",
      phone:"",
      mail:"",
      address:"",
      city:"",
    })
  }

  const handleUpdateBtn = (customer) => {
    setUpdateCustomerData({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      mail: customer.mail,
      address: customer.address,
      city: customer.city,
    })
  }

  const handleUpdateCustomer = (event) => (
    setUpdateCustomerData({
      ...updateCustomerData,
      [event.target.name]: event.target.value,
    })
  )

    // Değerlendirme Formu 9: Müşteri İsme göre arama.
  const handleSearch = async () => {
    const data = await findCustomerByName(searchName);
    if (Array.isArray(data) ) {
    } else {
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        setCustomers([data]);
      }
    }
    if (!data || (Array.isArray(data) && data.length === 0)) {
      setModalMessage('Date not found.');
      setShowModal(true);
    }
  };

  return (
    <div className='customer'>
    <div className='customer-search'> 
      <h2>Search Customer Name</h2>
        <input
            type="text"
            placeholder='Search'
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReloadPage}>Reload Page</button>
        
    </div>

    <h2>Create Customer</h2>
    <div className='customer-create'>
      <input 
      type="text"
      placeholder='Name'
      name="name" 
      value={newCustomer.name}
      onChange={handleNewCustomer}
        />
       <input 
    type="text"
    placeholder='Phone'
    name="phone" 
    value={newCustomer.phone}
    onChange={handleNewCustomer}
/>

<input 
    type="text"
    placeholder='Mail'
    name="mail" 
    value={newCustomer.mail}
    onChange={handleNewCustomer}
/>

<input 
    type="text"
    placeholder='Address'
    name="address" 
    value={newCustomer.address}
    onChange={handleNewCustomer}
/>

<input 
    type="text"
    placeholder='City'
    name="city" 
    value={newCustomer.city}
    onChange={handleNewCustomer}
/> 
        <button onClick={handleCreate}>Create</button>
    </div>
    <div className='customer-update'>
      <h2>Update Customer</h2>
      <div className='customer-update'>
  <input 
    type="text"
    placeholder='Name'
    name="name" 
    value={updateCustomerData.name}
    onChange={handleUpdateCustomer}
  />
  <input 
    type="text"
    placeholder='Phone'
    name="phone" 
    value={updateCustomerData.phone}
    onChange={handleUpdateCustomer}
  />
  <input 
    type="text"
    placeholder='Mail'
    name="mail" 
    value={updateCustomerData.mail}
    onChange={handleUpdateCustomer}
  />
  <input 
    type="text"
    placeholder='Address'
    name="address" 
    value={updateCustomerData.address}
    onChange={handleUpdateCustomer}
  />
  <input 
    type="text"
    placeholder='City'
    name="city" 
    value={updateCustomerData.city}
    onChange={handleUpdateCustomer}
  /> 
  <button onClick={handleUpdate}>Update</button>
</div>

    </div>
      <div className='customer-list'>
      <h2>Customers</h2>
      {customers.map((customer) => (
        <div 
        key={customer.id}
        >

         <p>Name:{customer.name} 
         <span className="delete-icon"> <DeleteIcon id={customer.id} onClick={() => handleDelete(customer.id)} />
         </span>
         <span className="update-icon" onClick={() => handleUpdateBtn(customer)}><ManageAccountsIcon /></span>
         </p>
         <p>Phone:{customer.phone}</p>
         <p>Mail:{customer.mail}</p>
         <p>Address:{customer.address}</p>
         <p>City:{customer.city}</p>
         
         </div>
      ))}
      
      </div>
      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default Customer
