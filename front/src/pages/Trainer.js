import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TrainerNavbar } from '../components/Trainer_Navbar';
import ViewWorkshopsTable from '../components/Trainer_ViewWorkshopsTable';
import { useEffect } from 'react';

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

  //const trainerId = location.state.id;
  //console.log("Trainer ID: " + trainerId);
      return (
        <div>
          <h2>Trainer Page</h2>
          <br/>
          <ViewWorkshopsTable/>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;