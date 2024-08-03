import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import { AdminNavbar } from '../components/Admin_Navbar';
import FormBuilder from '../components/FormBuilder';

function AdminForm() {
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
