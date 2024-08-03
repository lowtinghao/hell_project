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



function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.state);
    if (location.state == null){
      navigate('/');
    }
    if (location.state.id == null) {
      navigate('/');
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
        <ThemeProvider>
          <WorkshopRequestTable />
        </ThemeProvider>
        <button><Link to="/">Back</Link></button>
      </div>
    );
  } else if (page === "trainers-button"){
    console.log("Going to trainer page")
    return (
      <div>
        <AdminNavbar setPage = {setPage}/>
        <h2>Trainer Page : I need help with this</h2>
        <Admin_view_trainer_schedule />
        {/* <ThemeProvider>
				  <TrainerAvailability/>
			  </ThemeProvider> */}
        <button><Link to="/">Back</Link></button>
      </div>
      );
    } else if (page === "form-button"){
      console.log("Going to trainer page")
      return (
        <div>
          <AdminNavbar setPage = {setPage}/>
          <h1>Form Page : I need help with this</h1>
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