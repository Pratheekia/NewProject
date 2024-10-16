import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import { v4 as uuidv4 } from "uuid";

const genderMenu = ["Male", "Female"];
const serviceProviderMenu = ["Alex", "Marry", "Max", "Thiago"];
const serviceMenu = ["Injury Care", "Post-surgical Care", "Assisting elders", "Vaccination", "Injections"];

function App() {
  const [dataReserve, setDataReserve] = useState([]);
  const [residentName, setResidentName] = useState('');
  const [residentEmail, setResidentEmail] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState(0);
  const [contactNumber, setContactNumber] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [services, setServices] = useState('');  
  const [id, setId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('Residents');
    if (storedData) {
      setDataReserve(JSON.parse(storedData));
    }
  }, []);

  const saveToLocalStorage = (dataReserve) => {
    localStorage.setItem('Residents', JSON.stringify(dataReserve));
  };

  const handleEdit = (id) => {
    const updatedItem = dataReserve[id];
    if (updatedItem) {
      setIsUpdate(true);
      setId(updatedItem.id);
      setResidentName(updatedItem.residentName);
      setResidentEmail(updatedItem.residentEmail);
      setAddress(updatedItem.address);
      setAge(updatedItem.age);
      setContactNumber(updatedItem.contactNumber);
      setDob(updatedItem.dob);
      setGender(updatedItem.gender);
      setServiceProvider(updatedItem.serviceProvider);
      setServices(updatedItem.services); 
    }
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const filteredData = dataReserve.filter((_, i) => i !== index);
      setDataReserve(filteredData);
      saveToLocalStorage(filteredData);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';
    if (residentName === '') error += 'residentName is required, ';
    if (residentEmail === '') error += 'residentEmail is required, ';
    if (address === '') error += 'Address is required, ';
    if (age <= 0) error += 'Age is required, ';
    if (contactNumber === '') error += 'Contact number is required, ';
    if (dob === '') error += 'Date of birth is required, ';
    if (gender === '') error += 'Gender is required, ';
    if (serviceProvider === '') error += 'Service provider is required, ';
    if (services === '') error += 'Services are required. ';

    if (error === '') {
      const newItem = {
        id: uuidv4(),
        residentName,
        residentEmail,
        address,
        age,
        contactNumber,
        dob,
        gender,
        serviceProvider,
        services, 
      };
      alert("resident data saved succefully")
      const newData = [...dataReserve, newItem];
      setDataReserve(newData);
      saveToLocalStorage(newData);
      handleClear();
    } else {
      alert(error);
    }
  };

  const handleUpdate = () => {
    const index = dataReserve.findIndex((item) => item.id === id);
    if (index !== -1) {
      const updatedData = [...dataReserve];
      updatedData[index] = {
        ...updatedData[index],
        residentName,
        residentEmail,
        address,
        age,
        contactNumber,
        dob,
        gender,
        serviceProvider,
        services, 
      };
      setDataReserve(updatedData);
      saveToLocalStorage(updatedData);
      handleClear();
    }
  };

  const handleClear = () => {
    setId(null);
    setResidentName('');
    setResidentEmail('');
    setAddress('');
    setAge(0);
    setContactNumber('');
    setDob('');
    setGender('');
    setServiceProvider('');
    setServices(''); 
    setIsUpdate(false);
  };


  const columns = [
    { headerName: "Sr. No", valueGetter: "node.rowIndex + 1", sortable: false, filter: false, width: 80 },
    { headerName: "Resident Name", field: "residentName", sortable: true, filter: true, width: 180 },
    { headerName: "Resident Email", field: "residentEmail", sortable: true, filter: true, width: 180 },
    { headerName: "Address", field: "address", sortable: true, filter: true, width: 300 },
    { headerName: "Age", field: "age", sortable: true, filter: "agNumberColumnFilter", width: 80 },
    { headerName: "Contact Number", field: "contactNumber", sortable: true, filter: true, width: 200 },
    { headerName: "Date of Birth", field: "dob", sortable: true, filter: "agDateColumnFilter", width: 150 },
    { headerName: "Gender", field: "gender", sortable: false, filter: false, editable: true, width: 120 },
    { headerName: "Service Provider", field: "serviceProvider", sortable: true, filter: true, editable: true, width: 180 },
    { headerName: "Services", field: "services", sortable: true, filter: true, editable: true, width: 250 },
    {
      headerName: "Actions", 
      cellRenderer: (store) => (
        <div>
          <button onClick={() => handleEdit(store.node.rowIndex)} style={styles.actionButton}>Edit</button>
          <button onClick={() => handleDelete(store.node.rowIndex)} style={{ ...styles.actionButton, backgroundColor: '#ff4d4d' }}>Delete</button>
        </div>
      ),
      sortable: false,
      filter: false,
      width: 180,
    }
  ];

  return (
    <div style={styles.container}>
  
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>Resident Care Management</h2>
      </div>

    
      <div style={styles.formContainer}>
        <div style={styles.formRow}>
          <input type='text' placeholder='Enter Name' onChange={(e) => setResidentName(e.target.value)} value={residentName} style={styles.input} />
          <input type='email' placeholder='Enter email' onChange={(e) => setResidentEmail(e.target.value)} value={residentEmail} style={styles.input} />
          <input type='text' placeholder='Enter Address' onChange={(e) => setAddress(e.target.value)} value={address} style={styles.input} />
          <input type='number' placeholder='Enter Age' onChange={(e) => setAge(Number(e.target.value))} value={age} style={styles.input} />
          <input type='tel' placeholder='Enter Contact Number' onChange={(e) => setContactNumber(e.target.value)} value={contactNumber} style={styles.input} />
        </div>
        <div style={styles.formRow}>
          <input type='date' onChange={(e) => setDob(e.target.value)} value={dob} style={styles.input} />
          <select onChange={(e) => setGender(e.target.value)} value={gender} style={styles.input}>
            <option value=''>Select Gender</option>
            {genderMenu.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select onChange={(e) => setServiceProvider(e.target.value)} value={serviceProvider} style={styles.input}>
            <option value=''>Select Service Provider</option>
            {serviceProviderMenu.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
          <select onChange={(e) => setServices(e.target.value)} value={services} style={styles.input}>
            <option value=''>Select Services</option>
            {serviceMenu.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <div style={styles.buttonContainer}>
          <button onClick={isUpdate ? handleUpdate : handleSave} style={styles.saveButton}>{isUpdate ? 'Update' : 'Save'}</button>
          <button onClick={handleClear} style={styles.clearButton}>Clear</button>
        </div>
      </div>
    
      <div className="ag-theme-quartz" style={styles.table}>
        <AgGridReact rowData={dataReserve} columnDefs={columns} domLayout={'autoHeight'} pagination={true} paginationPageSize={10}  paginationPageSizeSelector={[10,20]}/>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Times New Roman, Times,serif',
    backgroundColor: '#f0f0f5',
    padding: '0',
    margin: '0',
    minHeight: '100vh', //this is equal to 1080px, we can write viewport width(vw)
  },
  navbar: {
    backgroundColor: '#004080',
    padding: '10px 20px',
    color: '#fff',
    textAlign: 'center',
  },
  navTitle: {
    margin: '0',
    fontSize: '24px',
  },
  formContainer: {
    padding: '20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
  },
  formRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '22%',
    backgroundColor: '#ffffe0',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  saveButton: {
    backgroundColor: 'lightgreen',
    borderRadius: '8px',
    padding: '10px 15px',
    border: 'none',
    marginRight: '10px',
  },
  clearButton: {
    backgroundColor: '#808080',
    borderRadius: '8px',
    padding: '10px 15px',
    border: 'none',
  },
  table: {
    width: '100%',
    padding: '20px',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    marginRight: '5px',
  },
};

export default App;

