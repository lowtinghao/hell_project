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
    if (location.state == null){
      navigate('/');
    }
    if (location.state.id == null) {
      navigate('/');
    }
    console.log(parseFloat(location.state.id));
    console.log(parseInt(location.state.id));
    if (!Number.isInteger(parseFloat(location.state.id))) {
      navigate('/');
    }
    console.log(typeof(location.state.id));
  }, [location, navigate]);

  const [page, setPage] = useState("home-button")
  console.log("Page: " + page);



  if (page === "home-button"){
    console.log("Going to home page")
    return (
      <div>
        <AdminNavbar setPage = {setPage} data-testid="admin-navbar"/>
        <h2 data-testid="admin-page-heading">Admin Page</h2>
        <ThemeProvider data-testid="theme-provider">
          <WorkshopRequestTable data-testid="workshop-request-table"/>
        </ThemeProvider>
        <button data-testid="back-button-home"><Link to="/">Back</Link></button>
      </div>
    );
  } else if (page === "trainers-button"){
    console.log("Going to trainer page")
    return (
      <div>
        <AdminNavbar setPage = {setPage} data-testid="admin-navbar"/>
        <h2 data-testid="trainer-page-heading">Trainer Page : I need help with this</h2>
        <Admin_view_trainer_schedule data-testid="admin-view-trainer-schedule"/>
        {/* <ThemeProvider>
				  <TrainerAvailability/>
			  </ThemeProvider> */}
        <button data-testid="back-button-trainers"><Link to="/">Back</Link></button>
      </div>
      );
    } else if (page === "form-button"){
      console.log("Going to trainer page")
      return (
        <div>
          <AdminNavbar setPage = {setPage} data-testid="admin-navbar"/>
          <h1 data-testid="form-page-heading">Form Page : I need help with this</h1>
          <button data-testid="back-button-form"><Link to="/">Back</Link></button>
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