import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import { AdminNavbar } from '../components/Admin_Navbar';
import FormBuilder from '../components/FormBuilder';
import { useLocation } from 'react-router-dom';

function AdminForm() {
  const location = useLocation();
  //const id = location.state.id;
	//console.log("Admin ID: " + id);
  return (
    
    <div>
      <AdminNavbar/>
      <h2>Form Page</h2>
      <ThemeProvider>
        <FormBuilder/>
      </ThemeProvider>
      <button><Link to="/admin">Back</Link></button>
    </div>
  );
}

export default AdminForm;
