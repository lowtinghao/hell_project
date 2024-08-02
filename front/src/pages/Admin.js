import { Form, Link, useLocation} from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import WorkshopRequestTable from '../components/WorkshopRequestTable';
import { AdminNavbar } from '../components/Admin_Navbar';
import { useEffect, useState } from 'react';
import AdminForm from '../pages/AdminForm';
import AssignTrainer from '../pages/AssignTrainer';
import FormBuilder from '../components/FormBuilder';



function App() {
  const location = useLocation();
  //const [ id, setId ] = useState(location.state.id);
  const [page, setPage] = useState("home-button")
  //console.log(location)
  //console.log("Admin ID: " + id);
  console.log("Page: " + page);


  if (page === "home-button"){
    console.log("Going to home page")
    return (
      <div>
        <AdminNavbar setPage = {setPage}/>
        <h2>Admin Page</h2>
        <ThemeProvider>
          <WorkshopRequestTable />
        </ThemeProvider>
      </div>
    );
  } else if (page === "trainers-button"){
    console.log("Going to trainer page")
    return (
      <div>
        <AdminNavbar setPage = {setPage}/>
        <h2>Assign Trainer</h2>
        <ThemeProvider>
          <AssignTrainer />
        </ThemeProvider>
      </div>
      );
    };
}
    export default App;