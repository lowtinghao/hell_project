import { Form, Link, useLocation, useNavigate} from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import WorkshopRequestTable from '../components/WorkshopRequestTable';
import { AdminNavbar } from '../components/Admin_Navbar';
import { useEffect, useState } from 'react';
import AdminForm from '../pages/AdminForm';
import AssignTrainer from '../pages/AssignTrainer';
import FormBuilder from '../components/FormBuilder';
import TrainerAvailability from '../components/TrainerAvailability';
import Admin_view_trainer_schedule from '../components/Admin_view_trainer_schedule';
import TrainersTab from '../components/Admin_TrainersTab';

function checkIfIdIsValid(location_state){
  if (location_state == null){
    return false;
  }
  if (location_state.id == null) {
    return false;
  }
  if (!Number.isInteger(parseFloat(location_state.id))) {
    return false;
  }
  return true;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [id,setId] = useState();

  useEffect(() => {
    console.log(location.state);
    if (!checkIfIdIsValid(location.state)){
      navigate('/');
    } else {
      setId(location.state.id);
    }
  }, [location, navigate]);

  const [page, setPage] = useState("home-button")
  console.log("Page: " + page);

  if (page === "home-button"){
    console.log("Going to home page")
    return (
      <div>
        <AdminNavbar setPage = {setPage}/>
        <h2>Admin Page</h2>
        <h3>{"ID : " + id}</h3>
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
        <h2>Trainer Page : I need help with this</h2>

        <ThemeProvider>
				  <TrainersTab/>
			  </ThemeProvider>
        <button><Link to="/">Back</Link></button>
      </div>
      );
    } else if (page === "form-button"){
      console.log("Going to trainer page")
      return (
        <div>
          <AdminNavbar setPage = {setPage}/>
          <h1>Form Page : I need help with this</h1>

          <FormBuilder />

          <button><Link to="/">Back</Link></button>
        </div>
        
        

       
        
        // <div>
        //   
        //   <h2>Assign Trainer</h2>
        //   <ThemeProvider>
        //     <AssignTrainer />
        //   </ThemeProvider>
        // </div>
        );
      };
}
    export default App;