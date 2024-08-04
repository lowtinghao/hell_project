import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TrainerNavbar } from '../components/Trainer_Navbar';
import ViewWorkshopsTable from '../components/Trainer_ViewWorkshopsTable';
import { useEffect, useState } from 'react';
import CalendarView from '../components/CalendarView';

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

  //const trainerId = location.state.id;
  //console.log("Trainer ID: " + trainerId);
      return (
        <div>
          <h2>Trainer Page</h2>
          <h3>{"ID : " + id}</h3>
          <br/>
          <ViewWorkshopsTable/>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;